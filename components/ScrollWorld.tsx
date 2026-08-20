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
import { Phone, Facebook, Instagram, Youtube, MoveDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';
import type { WorldConfig } from '@/lib/scroll-world';

/* ── Layout constants ── */
const STRIP_H  = 88;              // white strip height below video card (px)
const TAB_RISE = 60;              // how many px tabs extend INTO the video area
const TAB_H    = STRIP_H + TAB_RISE; // total tab height

/* ── Framer Motion variants ── */
const EASE = [0.22, 1, 0.36, 1] as const;

export function ScrollWorld({ config }: { config: WorldConfig }) {
  const { scenes, headline, headlineHighlight, description,
          primaryCta, eyebrow } = config;

  /* ── refs ── */
  const containerRef   = useRef<HTMLDivElement>(null);
  const videoRefs      = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollPos      = useRef(0);
  const targetRate     = useRef(0);
  const activeRate     = useRef(0);
  const lastScrollY    = useRef(0);
  const lastScrollMs   = useRef(0);
  const rafId          = useRef<number>();

  /* ── state ── */
  const [sceneMeta, setSceneMeta]           = useState<{ duration: number; scrollPx: number }[]>([]);
  const [totalHeight, setTotalHeight]       = useState(0);
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

    const thresholds = sceneMeta.map((_, i) =>
      sceneMeta.slice(0, i + 1).reduce((s, m) => s + m.scrollPx, 0)
    );

    const onScroll = () => {
      const now = performance.now();
      const dt  = Math.max(now - lastScrollMs.current, 1);
      const dy  = window.scrollY - lastScrollY.current;

      const scrolled = -container.getBoundingClientRect().top;
      scrollPos.current = Math.min(Math.max(scrolled / totalScroll, 0), 1);

      const rawScrolled = scrollPos.current * totalScroll;
      const sceneIdx    = getSceneIndex(rawScrolled, thresholds);
      const pxPerSec    = scenes[sceneIdx]?.scrollPxPerSecond ?? 120;

      const rate = (dy / dt) * 1000 / pxPerSec;
      targetRate.current = Math.max(0, Math.min(12, rate));

      lastScrollY.current  = window.scrollY;
      lastScrollMs.current = now;
    };

    const tick = () => {
      targetRate.current  *= 0.80;
      activeRate.current  += (targetRate.current - activeRate.current) * 0.25;

      const rate        = activeRate.current;
      const rawScrolled = scrollPos.current * totalScroll;
      const sceneIdx    = getSceneIndex(rawScrolled, thresholds);
      const m           = sceneMeta[sceneIdx];
      const vid         = videoRefs.current[sceneIdx];

      const elapsed    = thresholds[sceneIdx - 1] ?? 0;
      const localP     = Math.min((rawScrolled - elapsed) / m.scrollPx, 1);
      const targetTime = localP * m.duration;

      if (vid && vid.readyState >= 2) {
        if (rate > 0.06) {
          const clamped = Math.max(0.0625, Math.min(12, rate));
          if (vid.paused) vid.play().catch(() => {});
          vid.playbackRate = clamped;
          if (Math.abs(vid.currentTime - targetTime) > 1.2) vid.currentTime = targetTime;
        } else {
          if (!vid.paused) { vid.pause(); vid.playbackRate = 1; }
          if (Math.abs(vid.currentTime - targetTime) > 0.03) vid.currentTime = targetTime;
        }
      }

      videoRefs.current.forEach((v, i) => {
        if (!v || i === sceneIdx) return;
        if (!v.paused) { v.pause(); v.playbackRate = 1; }
        const boundary = i < sceneIdx ? sceneMeta[i]?.duration ?? 0 : 0;
        if (Math.abs(v.currentTime - boundary) > 0.05) v.currentTime = boundary;
      });

      const p = scrollPos.current;
      setGlobalProgress(p);

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

  /* ── derived animation values ── */
  const entryOpacity = globalProgress >= 0.20
    ? 0
    : Math.max(0, 1 - easeOutQuart(globalProgress / 0.20));

  const endReveal = globalProgress < 0.80
    ? 0
    : easeOutQuart((globalProgress - 0.80) / 0.20);

  const overlayDark = 0.48 + entryOpacity * 0.14 + endReveal * 0.18;

  return (
    <div ref={containerRef} style={{ height: totalHeight > 0 ? totalHeight : '100vh' }}>

      {/* ══ Sticky viewport ══ */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh',
        background: '#ffffff',
        overflow: 'hidden',
      }}>

        {/* ══ Video card — rounded bottom, subtle scale-in on mount ══ */}
        <motion.div
          initial={{ scale: 1.045 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            bottom: STRIP_H,
            overflow: 'hidden',
            borderRadius: '0 0 36px 36px',
            background: '#080808',
            transformOrigin: 'center center',
            zIndex: 1,
          }}
        >
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

          {/* Dark overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `rgba(0,0,0,${f(overlayDark)})`,
          }} />

          {/* ── ENTRY LAYOUT ── */}
          <HeroLayout
            isEntry
            opacity={entryOpacity}
            reveal={1}
            pointerEvents={entryOpacity > 0.05 ? 'auto' : 'none'}
            headline={headline}
            headlineHighlight={headlineHighlight}
            description={description}
            primaryCta={primaryCta}
            eyebrow={eyebrow}
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
            background: 'rgba(255,255,255,0.35)',
            pointerEvents: 'none',
            transition: 'width 0.05s linear',
          }} />
        </motion.div>

        {/* ══ Left architectural tab — Scroll Down ══ */}
        <div
          className="sw-tab"
          style={{
            position: 'absolute', bottom: 0, left: 0,
            width: 'clamp(148px, 16vw, 210px)',
            height: TAB_H,
            background: '#ffffff',
            borderRadius: '0 32px 0 0',
            zIndex: 20,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: 22, paddingLeft: 72,
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#111111',
              opacity: 0.45,
            }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ lineHeight: 0 }}
            >
              <MoveDown size={12} style={{ color: '#111111', opacity: 0.40 }} />
            </motion.div>
          </div>
        </div>

        {/* ══ Right architectural tab — Social icons ══ */}
        <div
          className="sw-tab"
          style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 'clamp(148px, 16vw, 210px)',
            height: TAB_H,
            background: '#ffffff',
            borderRadius: '32px 0 0 0',
            zIndex: 20,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end', alignItems: 'flex-end',
            paddingBottom: 22, paddingRight: 72,
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { href: siteConfig.social.facebook,  label: 'Facebook',  icon: <Facebook  size={12} /> },
              { href: siteConfig.social.instagram, label: 'Instagram', icon: <Instagram size={12} /> },
              { href: siteConfig.social.youtube,   label: 'YouTube',   icon: <Youtube   size={12} /> },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#111111',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#c9a96e';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.10)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#111111';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
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
          50%      { opacity:.70; transform:scaleY(1.15); }
        }
        @media (max-width: 600px) {
          .sw-tab { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HeroLayout
   isEntry=true  → Framer Motion entrance animation
   isEntry=false → simple opacity-driven (end of scroll)
══════════════════════════════════════════════════════ */
function HeroLayout({
  isEntry = false, opacity, reveal, pointerEvents,
  headline, headlineHighlight, description,
  primaryCta, eyebrow,
}: {
  isEntry?: boolean;
  opacity: number;
  reveal: number;
  pointerEvents: React.CSSProperties['pointerEvents'];
  headline: string;
  headlineHighlight?: string;
  description: string;
  primaryCta: { label: string; href: string };
  eyebrow?: string;
}) {
  const words          = headline.split(' ');
  const highlightWords = headlineHighlight ? headlineHighlight.split(' ') : [];
  const totalWords     = words.length + highlightWords.length;

  const subtitleDelay = 0.32 + totalWords * 0.07 + 0.05;
  const ctaDelay      = subtitleDelay + 0.18;

  const containerStyle: React.CSSProperties = {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center',
    padding: 'clamp(80px, 10vh, 110px) clamp(1.5rem, 6vw, 6rem) clamp(16px, 3vh, 40px)',
    opacity,
    pointerEvents,
  };

  /* ── CLOSING layout — simple, opacity-driven ── */
  if (!isEntry) {
    const up = (d: number) => fadeUp(reveal, d, 28);
    return (
      <div style={containerStyle}>
        <div style={up(0)}>
          <Badge eyebrow={eyebrow} />
        </div>
        <div style={{ ...up(0.08), marginTop: '1.5rem' }}>
          <h2 style={headingStyle}>
            {headline}{' '}
            {headlineHighlight && <span style={{ color: '#c9a96e' }}>{headlineHighlight}</span>}
          </h2>
        </div>
        <div style={{ ...up(0.20), marginTop: '1.25rem' }}>
          <p style={subtitleStyle}>{description}</p>
        </div>
        <div style={{ ...up(0.30), marginTop: '2rem' }}>
          <CtaButton href={primaryCta.href} label={primaryCta.label} />
        </div>
      </div>
    );
  }

  /* ── ENTRY layout — Framer Motion entrance ── */
  return (
    <div style={containerStyle}>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      >
        <Badge eyebrow={eyebrow} />
      </motion.div>

      {/* Heading — word-by-word reveal */}
      <h1 style={{ ...headingStyle, marginTop: 'clamp(1rem, 2vh, 1.75rem)' }}>
        {words.map((word, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.72, delay: 0.30 + i * 0.07, ease: EASE }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
        {highlightWords.map((word, i) => (
          <span
            key={`h${i}`}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
          >
            <motion.span
              style={{ display: 'inline-block', color: '#c9a96e' }}
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.72, delay: 0.30 + (words.length + i) * 0.07, ease: EASE }}
            >
              {word}{i < highlightWords.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        style={{ ...subtitleStyle, marginTop: 'clamp(0.9rem, 1.8vh, 1.5rem)' }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: subtitleDelay, ease: EASE }}
      >
        {description}
      </motion.p>

      {/* CTA */}
      <motion.div
        style={{ marginTop: 'clamp(1.5rem, 2.8vh, 2.25rem)' }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: ctaDelay, ease: EASE }}
      >
        <CtaButton href={primaryCta.href} label={primaryCta.label} />
      </motion.div>

    </div>
  );
}

/* ── Sub-components ── */

function Badge({ eyebrow }: { eyebrow?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 9,
      padding: '9px 20px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.10)',
      border: '1px solid rgba(255,255,255,0.22)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      fontSize: '0.72rem', fontWeight: 500,
      letterSpacing: '0.05em',
      color: 'rgba(255,255,255,0.88)',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: '#c9a96e', flexShrink: 0,
        boxShadow: '0 0 6px rgba(201,169,110,0.8)',
      }} />
      {eyebrow ?? 'Premium Interior Design Studio'}
    </span>
  );
}

function CtaButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '16px 32px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.93)',
        color: '#1a120b',
        fontSize: '0.9rem', fontWeight: 650,
        letterSpacing: '0.01em',
        textDecoration: 'none',
        boxShadow: '0 8px 36px rgba(0,0,0,0.28)',
        transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1), box-shadow 300ms cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 44px rgba(0,0,0,0.36)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 36px rgba(0,0,0,0.28)';
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: '50%',
        background: '#1a120b', color: '#fff', flexShrink: 0,
      }}>
        <Phone size={14} />
      </span>
      {label}
    </Link>
  );
}

/* ── Static styles ── */
const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
  fontWeight: 700,
  letterSpacing: '-0.035em',
  lineHeight: 0.97,
  color: '#fff',
  margin: 0,
  maxWidth: '18ch',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
  lineHeight: 1.72,
  color: 'rgba(255,255,255,0.70)',
  maxWidth: 580,
  margin: '0 auto',
};

/* ── Utilities ── */

function getSceneIndex(rawScrolled: number, thresholds: number[]): number {
  for (let i = 0; i < thresholds.length; i++) {
    if (rawScrolled <= thresholds[i]) return i;
  }
  return thresholds.length - 1;
}

function fadeUp(reveal: number, delay: number, lift: number): React.CSSProperties {
  const local = easeOutQuart(Math.min(Math.max((reveal - delay) / (1 - delay + 0.001), 0), 1));
  return { opacity: local, transform: `translateY(${lift * (1 - local)}px)` };
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function f(n: number) { return n.toFixed(2); }
