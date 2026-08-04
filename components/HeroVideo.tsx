'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroVideoProps {
  src: string;
  scrollPxPerSecond?: number;
}

export function HeroVideo({ src, scrollPxPerSecond = 120 }: HeroVideoProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const scrollRef     = useRef(0);   // raw scroll progress 0–1 (written on scroll)
  const [sectionHeight, setSectionHeight] = useState(0);
  const [progress, setProgress]           = useState(0);

  // Compute section height from video duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const calculate = () => {
      setSectionHeight(window.innerHeight + video.duration * scrollPxPerSecond);
    };

    if (video.readyState >= 1) calculate();
    else video.addEventListener('loadedmetadata', calculate, { once: true });
  }, [scrollPxPerSecond]);

  // Scroll → target time (read on scroll, applied on RAF for smoothness)
  useEffect(() => {
    const container = containerRef.current;
    const video     = videoRef.current;
    if (!container || !video || sectionHeight === 0) return;

    const onScroll = () => {
      const scrolled   = -container.getBoundingClientRect().top;
      const scrollable = sectionHeight - window.innerHeight;
      scrollRef.current = Math.min(Math.max(scrolled / scrollable, 0), 1);
    };

    let rafId: number;
    const tick = () => {
      const p = scrollRef.current;
      setProgress(p);

      if (video.readyState >= 2) {
        video.currentTime = p * video.duration;
      }

      // Signal navbar
      const active = p < 1;
      const key    = active ? 'true' : 'false';
      if (document.documentElement.dataset.heroActive !== key) {
        document.documentElement.dataset.heroActive = key;
        window.dispatchEvent(new CustomEvent('heroactivechange'));
      }

      rafId = requestAnimationFrame(tick);
    };

    document.documentElement.dataset.heroActive = 'true';
    window.dispatchEvent(new CustomEvent('heroactivechange'));

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      document.documentElement.dataset.heroActive = 'false';
      window.dispatchEvent(new CustomEvent('heroactivechange'));
    };
  }, [sectionHeight]);

  // Text entrance: only visible in the last 20% of scroll (progress 0.80 → 1.0)
  const textStart  = 0.80;
  const textReveal = progress < textStart
    ? 0
    : (progress - textStart) / (1 - textStart);

  // Staggered offsets for each text layer
  const eyebrowStyle   = textStyle(textReveal, 0.00, 28);
  const line1Style     = textStyle(textReveal, 0.12, 36);
  const line2Style     = textStyle(textReveal, 0.22, 36);
  const line3Style     = textStyle(textReveal, 0.32, 36);
  const dividerStyle   = textStyle(textReveal, 0.40, 20);
  const descStyle      = textStyle(textReveal, 0.48, 24);
  const btnsStyle      = textStyle(textReveal, 0.58, 24);

  // Scroll-to-enter hint: only at the very start
  const hintOpacity = Math.max(0, 1 - progress / 0.10);

  return (
    <div ref={containerRef} style={{ height: sectionHeight > 0 ? sectionHeight : '100vh' }}>
      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Gradient — darkens progressively as text appears */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,${0.28 + textReveal * 0.28}) 0%,
            rgba(0,0,0,${0.05 + textReveal * 0.20}) 40%,
            rgba(0,0,0,${0.30 + textReveal * 0.35}) 100%
          )`,
          pointerEvents: 'none',
          transition: 'background 0.1s',
        }} />

        {/* ── Hero copy — revealed at end of scroll ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 1.5rem',
          textAlign: 'center',
          pointerEvents: textReveal > 0.5 ? 'auto' : 'none',
        }}>

          {/* Eyebrow */}
          <div style={eyebrowStyle}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              fontSize: '0.65rem', letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
            }}>
              <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(255,255,255,0.35)' }} />
              Interior Design Studio · Bhubaneswar
              <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(255,255,255,0.35)' }} />
            </span>
          </div>

          {/* Headline — three staggered lines */}
          <div style={{ marginTop: '1.25rem', lineHeight: 1.06 }}>
            <div style={line1Style}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}>Beautiful,</span>
            </div>
            <div style={line2Style}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}>functional interiors</span>
            </div>
            <div style={line3Style}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.60)',
                letterSpacing: '-0.01em',
                marginTop: '0.25rem',
              }}>designed around your life</span>
            </div>
          </div>

          {/* Thin divider */}
          <div style={{ ...dividerStyle, marginTop: '2rem', width: '100%', maxWidth: 480 }}>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.18)' }} />
          </div>

          {/* Description */}
          <p style={{
            ...descStyle,
            maxWidth: 480,
            marginTop: '1.5rem',
            fontSize: '0.95rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.60)',
          }}>
            Decorecy Interiors creates personalized, beautifully executed home and
            commercial interiors across Bhubaneswar.
          </p>

          {/* CTA buttons */}
          <div style={{
            ...btnsStyle,
            marginTop: '2rem',
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px',
              background: '#fff', color: '#111',
              borderRadius: 999, fontSize: '0.825rem',
              fontWeight: 600, letterSpacing: '0.02em',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}>
              Book Free Consultation
              <ArrowRight size={15} />
            </Link>
            <Link href="/projects" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '12px 28px',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.28)',
              color: '#fff',
              borderRadius: 999, fontSize: '0.825rem',
              fontWeight: 500, letterSpacing: '0.02em',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}>
              View Our Projects
            </Link>
          </div>
        </div>

        {/* ── Scroll to enter hint ── */}
        <div style={{
          position: 'absolute', bottom: '2rem', right: '2rem',
          display: 'flex', alignItems: 'center', gap: 8,
          opacity: hintOpacity, pointerEvents: 'none', userSelect: 'none',
        }}>
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.24em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
          }}>Scroll to enter</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block', width: 1, height: 6,
                background: 'rgba(255,255,255,0.45)',
                animation: `hv-drip 1.4s ease-in-out ${i * 0.18}s infinite`,
              }} />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: 1.5, width: `${progress * 100}%`,
          background: 'rgba(255,255,255,0.45)',
          pointerEvents: 'none',
        }} />
      </div>

      <style>{`
        @keyframes hv-drip {
          0%,100% { opacity: 0.3; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(1.6); }
        }
      `}</style>
    </div>
  );
}

/** Returns inline style for a staggered fade+slide element */
function textStyle(
  reveal: number,   // 0–1 overall reveal progress
  delay: number,    // 0–1 within-reveal delay offset
  lift: number,     // px to translate upward when hidden
): React.CSSProperties {
  const localReveal = Math.min(Math.max((reveal - delay) / (1 - delay + 0.001), 0), 1);
  const eased       = easeOutQuart(localReveal);
  return {
    opacity:   eased,
    transform: `translateY(${lift * (1 - eased)}px)`,
    transition: 'none', // driven by scroll, no CSS transition needed
  };
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
