'use client';

/**
 * ScrollWorld — ultra-smooth scroll-driven multi-scene video engine.
 *
 * Smoothness strategy
 * ───────────────────
 * Naïve approach:  set video.currentTime every RAF frame
 *   → browser must decode from nearest keyframe on every frame → CHOPPY
 *
 * This engine:
 *   1. Tracks scroll VELOCITY (px/ms) in the scroll event.
 *   2. Converts velocity → playbackRate and lets the video play naturally.
 *      The browser can pipeline frame decoding → buttery smooth.
 *   3. Lerps the active playbackRate toward the target so acceleration feels organic.
 *   4. When scrolling stops the rate decays to 0, video pauses, then ONE precise
 *      currentTime seek snaps it to the exact frame — invisible to the user.
 *   5. If accumulated drift > threshold, a correction seek happens silently.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Facebook, Instagram, Youtube, MoveDown } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import type { WorldConfig } from '@/lib/scroll-world';

export function ScrollWorld({ config }: { config: WorldConfig }) {
  const { scenes, headline, headlineHighlight, description,
          primaryCta, secondaryCta, eyebrow } = config;

  /* ── refs ── */
  const containerRef   = useRef<HTMLDivElement>(null);
  const videoRefs      = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollPos      = useRef(0);       // raw scroll progress 0-1
  const targetRate     = useRef(0);       // desired playback rate (from velocity)
  const activeRate     = useRef(0);       // smoothed playback rate
  const lastScrollY    = useRef(0);
  const lastScrollMs   = useRef(0);
  const rafId          = useRef<number>();

  /* ── state ── */
  const [sceneMeta, setSceneMeta]         = useState<{ duration: number; scrollPx: number }[]>([]);
  const [totalHeight, setTotalHeight]     = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  /* ── load metadata for all videos ── */
  useEffect(() => {
    let loaded = 0;
    const meta: ({ duration: number; scrollPx: number } | null)[] = new Array(scenes.length).fill(null);

    const tryFinish = () => {
      if (loaded < scenes.length) return;
      if (meta.some((m) => m === null)) return;
      const validated = meta as { duration: number; scrollPx: number }[];
      setSceneMeta(validated);
      const totalScroll = validated.reduce((s, m) => s + m.scrollPx, 0);
      setTotalHeight(window.innerHeight + totalScroll);
    };

    scenes.forEach((scene, i) => {
      const vid = videoRefs.current[i];
      if (!vid) return;
      const pxPerSec = scene.scrollPxPerSecond ?? 120;
      const calc = () => {
        meta[i] = { duration: vid.duration, scrollPx: vid.duration * pxPerSec };
        loaded++;
        tryFinish();
      };
      if (vid.readyState >= 1) calc();
      else vid.addEventListener('loadedmetadata', calc, { once: true });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── main engine loop ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container || totalHeight === 0 || sceneMeta.length === 0) return;

    const totalScroll = sceneMeta.reduce((s, m) => s + m.scrollPx, 0);

    /* Build cumulative scroll thresholds once */
    const thresholds = sceneMeta.map((_, i) =>
      sceneMeta.slice(0, i + 1).reduce((s, m) => s + m.scrollPx, 0)
    );

    /* ── scroll event: capture velocity ── */
    const onScroll = () => {
      const now = performance.now();
      const dt  = Math.max(now - lastScrollMs.current, 1);
      const dy  = window.scrollY - lastScrollY.current;

      /* Convert px/ms → playback rate for the current scene */
      const scrolled = -container.getBoundingClientRect().top;
      scrollPos.current = Math.min(Math.max(scrolled / totalScroll, 0), 1);

      const rawScrolled = scrollPos.current * totalScroll;
      const sceneIdx    = getSceneIndex(rawScrolled, thresholds);
      const pxPerSec    = scenes[sceneIdx]?.scrollPxPerSecond ?? 120;

      /* velocity (px/ms) * 1000 (ms/s) / (px per video-second) = playback rate */
      const rate = (dy / dt) * 1000 / pxPerSec;
      targetRate.current = Math.max(0, Math.min(12, rate));

      lastScrollY.current  = window.scrollY;
      lastScrollMs.current = now;
    };

    /* ── RAF tick: smooth playback ── */
    const tick = () => {
      /* 1. Decay target rate (scrolling inertia), lerp active rate */
      targetRate.current  *= 0.80;
      activeRate.current  += (targetRate.current - activeRate.current) * 0.25;

      const rate        = activeRate.current;
      const rawScrolled = scrollPos.current * totalScroll;
      const sceneIdx    = getSceneIndex(rawScrolled, thresholds);
      const m           = sceneMeta[sceneIdx];
      const vid         = videoRefs.current[sceneIdx];

      const elapsed     = thresholds[sceneIdx - 1] ?? 0;
      const localP      = Math.min((rawScrolled - elapsed) / m.scrollPx, 1);
      const targetTime  = localP * m.duration;

      if (vid && vid.readyState >= 2) {
        if (rate > 0.06) {
          /* ── SCROLLING: drive with playbackRate — zero seeks, silky smooth ── */
          const clamped = Math.max(0.0625, Math.min(12, rate));
          if (vid.paused) vid.play().catch(() => {});
          vid.playbackRate = clamped;

          /* Silent drift correction: only seek if very far off */
          if (Math.abs(vid.currentTime - targetTime) > 1.2) {
            vid.currentTime = targetTime;
          }
        } else {
          /* ── STOPPED: pause and snap to exact frame (one seek, invisible) ── */
          if (!vid.paused) { vid.pause(); vid.playbackRate = 1; }
          if (Math.abs(vid.currentTime - targetTime) > 0.03) {
            vid.currentTime = targetTime;
          }
        }
      }

      /* ── Manage non-active scene videos ── */
      videoRefs.current.forEach((v, i) => {
        if (!v || i === sceneIdx) return;
        if (!v.paused) { v.pause(); v.playbackRate = 1; }
        /* Park each inactive video at its boundary frame */
        const boundary = i < sceneIdx ? sceneMeta[i]?.duration ?? 0 : 0;
        if (Math.abs(v.currentTime - boundary) > 0.05) v.currentTime = boundary;
      });

      /* ── Update React state (coarse — drives text reveal + progress bar) ── */
      const p = scrollPos.current;
      setGlobalProgress(p);

      /* ── Navbar signal ── */
      const key = p < 1 ? 'true' : 'false';
      if (document.documentElement.dataset.heroActive !== key) {
        document.documentElement.dataset.heroActive = key;
        window.dispatchEvent(new CustomEvent('heroactivechange'));
      }

      rafId.current = requestAnimationFrame(tick);
    };

    lastScrollY.current  = window.scrollY;
    lastScrollMs.current = performance.now();

    document.documentElement.dataset.heroActive = 'true';
    window.dispatchEvent(new CustomEvent('heroactivechange'));

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.documentElement.dataset.heroActive = 'false';
      window.dispatchEvent(new CustomEvent('heroactivechange'));
    };
  }, [totalHeight, sceneMeta, scenes]);

  /* ── Entry text: fade in instantly, fully gone by 20% scroll ── */
  const entryOpacity = globalProgress >= 0.20
    ? 0
    : Math.max(0, 1 - easeOutQuart(globalProgress / 0.20));

  /* ── Closing text: last 20% of scroll ── */
  const endReveal = globalProgress < 0.80
    ? 0
    : easeOutQuart((globalProgress - 0.80) / 0.20);

  const overlayDark = 0.50 + entryOpacity * 0.15 + endReveal * 0.18;

  const BOTTOM_STRIP = 64; // px — white strip height

  return (
    <div ref={containerRef} style={{ height: totalHeight > 0 ? totalHeight : '100vh' }}>

      {/* ── Sticky wrapper — full viewport, white bg shows in bottom strip ── */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh',
        background: 'var(--background, #fff)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* ── Video card — rounded bottom corners ── */}
        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: `0 0 28px 28px`,
          background: '#080808',
          minHeight: 0,
        }}>
          {/* Video layers */}
          {scenes.map((scene, i) => (
            <video
              key={scene.src}
              ref={(el) => { videoRefs.current[i] = el; }}
              src={scene.src}
              muted
              playsInline
              preload="auto"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: i === 0 ? 1 : 0,
                transition: 'opacity 0.7s ease',
                willChange: 'opacity',
              }}
            />
          ))}

          {/* Base dark layer */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `rgba(0,0,0,${f(overlayDark)})`,
          }} />

          {/* ── ENTRY LAYOUT ── */}
          <HeroLayout
            opacity={entryOpacity}
            reveal={1}
            pointerEvents={entryOpacity > 0.05 ? 'auto' : 'none'}
            headline={headline}
            headlineHighlight={headlineHighlight}
            description={description}
            primaryCta={primaryCta}
            eyebrow={eyebrow}
            scrollHint={false}
          />

          {/* ── CLOSING LAYOUT ── */}
          <HeroLayout
            opacity={endReveal}
            reveal={endReveal}
            pointerEvents={endReveal > 0.5 ? 'auto' : 'none'}
            headline={headline}
            headlineHighlight={headlineHighlight}
            description={description}
            primaryCta={primaryCta}
            eyebrow={eyebrow}
          />

          {/* Progress bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            height: 2, width: `${globalProgress * 100}%`,
            background: 'rgba(255,255,255,0.40)',
            pointerEvents: 'none',
            transition: 'width 0.05s linear',
          }} />
        </div>

        {/* ── Bottom strip ── */}
        <div style={{
          height: BOTTOM_STRIP,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.25rem, 3vw, 2.5rem)',
          flexShrink: 0,
        }}>
          {/* Scroll Down */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'var(--foreground, #111)',
            opacity: 0.55,
          }}>
            <span style={{
              fontSize: '0.72rem', fontWeight: 500,
              letterSpacing: '0.04em',
            }}>Scroll Down</span>
            <MoveDown size={14} strokeWidth={1.8} />
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {[
              { href: siteConfig.social.facebook,  label: 'Facebook',  icon: <Facebook  size={14} /> },
              { href: siteConfig.social.instagram, label: 'Instagram', icon: <Instagram size={14} /> },
              { href: siteConfig.social.youtube,   label: 'YouTube',   icon: <Youtube   size={14} /> },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--foreground, #111)',
                  color: 'var(--background, #fff)',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sw-pulse {
          0%,100% { opacity:.25; transform:scaleY(1);    }
          50%      { opacity:.7;  transform:scaleY(1.15); }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HeroLayout — centred hero panel, shown at entry + end
══════════════════════════════════════════════════════ */
function HeroLayout({
  opacity, reveal, pointerEvents,
  headline, headlineHighlight, description,
  primaryCta, eyebrow, scrollHint,
}: {
  opacity: number;
  reveal: number;
  pointerEvents: React.CSSProperties['pointerEvents'];
  headline: string;
  headlineHighlight?: string;
  description: string;
  primaryCta: { label: string; href: string };
  eyebrow?: string;
  scrollHint?: boolean;
}) {
  const up = (d: number, lift = 32) => fadeUp(reveal, d, lift);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: 'clamp(80px, 10vh, 110px) clamp(1.5rem, 6vw, 6rem) clamp(16px, 3vh, 40px)',
      opacity,
      pointerEvents,
    }}>

      {/* ── Badge pill ── */}
      <div style={up(0, 16)}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 9,
          padding: '9px 20px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          fontSize: '0.72rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: 'rgba(255,255,255,0.88)',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#c9a96e', flexShrink: 0,
            boxShadow: '0 0 6px #c9a96e',
          }} />
          {eyebrow ?? 'Premium Interior Design Studio'}
        </span>
      </div>

      {/* ── Headline ── */}
      <div style={{ ...up(0.08, 50), marginTop: 'clamp(1.25rem, 2.5vh, 2rem)' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(3rem, 7.5vw, 7rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          color: '#fff',
          margin: 0,
        }}>
          {headline}
          {headlineHighlight && (
            <>
              {' '}
              <span style={{ color: '#c9a96e' }}>{headlineHighlight}</span>
            </>
          )}
        </h1>
      </div>

      {/* ── Description ── */}
      <div style={{ ...up(0.20, 24), marginTop: 'clamp(1rem, 2vh, 1.75rem)' }}>
        <p style={{
          fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.58)',
          maxWidth: 580,
          margin: '0 auto',
        }}>
          {description}
        </p>
      </div>

      {/* ── CTA button ── */}
      <div style={{ ...up(0.30, 20), marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
        <Link href={primaryCta.href} style={{
          display: 'inline-flex', alignItems: 'center', gap: 11,
          padding: '15px 36px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.92)',
          color: '#111',
          fontSize: '0.88rem',
          fontWeight: 600,
          letterSpacing: '0.01em',
          textDecoration: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s, background 0.2s',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 30, height: 30, borderRadius: '50%',
            background: '#111',
            color: '#fff',
            flexShrink: 0,
          }}>
            <Phone size={14} />
          </span>
          {primaryCta.label}
        </Link>
      </div>

      {/* ── Scroll hint (entry only) ── */}
      {scrollHint && (
        <div style={{
          ...up(0.45, 12),
          marginTop: 'clamp(2rem, 4vh, 3.5rem)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 10,
        }}>
          <span style={{
            fontSize: '0.55rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
          }}>Scroll Down</span>
          <div style={{
            width: 1, height: 44,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)',
            animation: 'sw-pulse 2s ease-in-out infinite',
          }} />
        </div>
      )}
    </div>
  );
}

/* ── Utilities ── */

function getSceneIndex(rawScrolled: number, thresholds: number[]): number {
  for (let i = 0; i < thresholds.length; i++) {
    if (rawScrolled <= thresholds[i]) return i;
  }
  return thresholds.length - 1;
}

/** inline style for a fade + slide-up element */
function fadeUp(reveal: number, delay: number, lift: number): React.CSSProperties {
  const local = easeOutQuart(Math.min(Math.max((reveal - delay) / (1 - delay + 0.001), 0), 1));
  return { opacity: local, transform: `translateY(${lift * (1 - local)}px)` };
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/** round to 2 dp for style strings */
function f(n: number) { return n.toFixed(2); }

function Hairline() {
  return <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(255,255,255,0.25)' }} />;
}

/* ── Static styles ── */
const headlineStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.8rem, 7vw, 5.75rem)',
  fontWeight: 600, letterSpacing: '-0.025em',
  lineHeight: 1.04, color: '#fff',
};

const sublineStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
  fontWeight: 300, fontStyle: 'italic',
  letterSpacing: '-0.015em', lineHeight: 1.1,
  color: 'rgba(255,255,255,0.50)', marginTop: '0.2rem',
};

const ctaPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '11px 26px', borderRadius: 999,
  background: '#fff', color: '#111',
  fontSize: '0.78rem', fontWeight: 600,
  letterSpacing: '0.025em', textDecoration: 'none',
};

const ctaSecondary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center',
  padding: '11px 26px', borderRadius: 999,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.22)',
  color: '#fff',
  fontSize: '0.78rem', fontWeight: 500,
  letterSpacing: '0.025em', textDecoration: 'none',
};
