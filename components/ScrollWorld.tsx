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
import { ArrowRight } from 'lucide-react';
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

  return (
    <div ref={containerRef} style={{ height: totalHeight > 0 ? totalHeight : '100vh' }}>

      {/* ── Sticky fullscreen viewport ── */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        background: '#080808',
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

        {/* ── ENTRY LAYOUT — visible on load, fades as scroll starts ── */}
        <HeroLayout
          opacity={entryOpacity}
          reveal={1}
          pointerEvents="none"
          headline={headline}
          headlineHighlight={headlineHighlight}
          description={description}
          primaryCta={primaryCta}
          eyebrow={eyebrow}
          scrollHint
        />

        {/* ── CLOSING LAYOUT — same layout, revealed at end of scroll ── */}
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
          height: 1.5, width: `${globalProgress * 100}%`,
          background: 'rgba(255,255,255,0.38)',
          pointerEvents: 'none',
          transition: 'width 0.05s linear',
        }} />
      </div>

      <style>{`
        @keyframes sw-pulse {
          0%,100% { opacity:.25; transform:scaleY(1);    }
          50%      { opacity:.7;  transform:scaleY(1.15); }
        }
        @media (max-width: 768px) {
          .hero-card-col { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HeroLayout — the split left/right hero content panel
   shown at both entry and end of scroll
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
      display: 'flex', alignItems: 'flex-start',
      /* navbar pill bottom ≈ 74px; use 100px (6.25rem) guaranteed clearance */
      paddingTop: 100,
      paddingBottom: 32,
      paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
      paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
      opacity,
      pointerEvents,
    }}>
      {/* ── Left column ── */}
      <div style={{ flex: '0 0 auto', width: 'min(55%, 600px)', paddingRight: '2rem' }}>

        {/* Eyebrow */}
        <div style={up(0, 20)}>
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.50)',
          }}>
            {eyebrow ?? 'Interior Design Studio · Bhubaneswar'}
          </span>
        </div>

        {/* Headline */}
        <div style={{ marginTop: '1rem' }}>
          <div style={up(0.06, 44)}>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: '#fff',
              margin: 0,
            }}>
              {headline}
            </h1>
          </div>
          {headlineHighlight && (
            <div style={up(0.14, 44)}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 4rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.50)',
                letterSpacing: '-0.015em',
                lineHeight: 1.1,
                marginTop: '0.15rem',
              }}>
                {headlineHighlight}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div style={up(0.22, 24)}>
          <p style={{
            marginTop: '1.5rem',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 460,
          }}>
            {description}
          </p>
        </div>

        {/* CTA */}
        <div style={{ ...up(0.30, 20), marginTop: '2rem' }}>
          <Link href={primaryCta.href} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '13px 28px',
            borderRadius: 999,
            border: '1.5px solid rgba(255,255,255,0.70)',
            color: '#fff',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            backdropFilter: 'blur(8px)',
            background: 'rgba(255,255,255,0.08)',
          }}>
            {primaryCta.label}
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: '50%',
              background: '#fff',
            }}>
              <ArrowRight size={14} color="#111" />
            </span>
          </Link>
        </div>

        {/* Stats row */}
        <div style={{ ...up(0.40, 16), marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
          {[
            { num: '50+',  label: 'Homes\nDelivered' },
            { num: '10+',  label: 'Years of\nExcellence' },
            { num: '100%', label: 'Client\nSatisfaction' },
          ].map(({ num, label }) => (
            <div key={num} style={{
              padding: '14px 20px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
              minWidth: 90,
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 600,
                color: '#fff',
                lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontSize: '0.65rem',
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.45)',
                marginTop: 6,
                whiteSpace: 'pre-line',
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint (entry only) */}
        {scrollHint && (
          <div style={{
            marginTop: '2.5rem',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 1, height: 40,
              background: 'rgba(255,255,255,0.28)',
              animation: 'sw-pulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: '0.55rem', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
            }}>Scroll to enter</span>
          </div>
        )}
      </div>

      {/* ── Right column — floating project card ── */}
      <div style={{
        ...up(0.18, 48),
        flex: '0 0 auto',
        width: 'min(40%, 420px)',
        marginLeft: 'auto',
        alignSelf: 'flex-start',
        paddingTop: 16,
      }} className="hero-card-col">
        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: '4/5',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}>
          {/* Project image */}
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Interior project by Decorecy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Testimonial overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '1.25rem 1.25rem 1.5rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          }}>
            <p style={{
              fontSize: '0.78rem', lineHeight: 1.55,
              color: 'rgba(255,255,255,0.88)', margin: 0,
            }}>
              "Decorecy transformed our home into something we never imagined possible."
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, marginTop: 8,
            }}>
              <span style={{ color: '#f5c842', fontSize: '0.7rem', letterSpacing: 1 }}>★★★★★</span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>— Priya Mohanty</span>
            </div>
          </div>
        </div>
      </div>
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
