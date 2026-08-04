'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Palette, Gem, Award, Headphones } from 'lucide-react';

interface Cta { label: string; href: string }
interface Feature { icon: React.ReactNode; title: string; desc: string }

interface Props {
  src: string;
  label?: string;
  heading?: string;
  subheading?: string;
  scrollPxPerSecond?: number;
  /* Rich entry layout */
  eyebrow?: string;
  headline?: string;
  headlineHighlight?: string;
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  features?: Feature[];
}

const DEFAULT_FEATURES: Feature[] = [
  { icon: <Palette size={22} />, title: 'Bespoke Design',        desc: 'Custom layouts tailored to your lifestyle.' },
  { icon: <Gem size={22} />,     title: 'Premium Materials',     desc: 'Handpicked finishes for timeless beauty.' },
  { icon: <Award size={22} />,   title: 'Expert Craftsmanship',  desc: 'Precision built with uncompromising quality.' },
  { icon: <Headphones size={22} />, title: 'End-to-End Service', desc: 'Seamless experience from concept to completion.' },
];

export function ScrollVideoSection({
  src,
  label,
  heading,
  subheading,
  scrollPxPerSecond = 120,
  eyebrow,
  headline,
  headlineHighlight,
  description,
  primaryCta,
  secondaryCta,
  features = DEFAULT_FEATURES,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const scrollPos    = useRef(0);
  const targetRate   = useRef(0);
  const activeRate   = useRef(0);
  const lastScrollY  = useRef(0);
  const lastScrollMs = useRef(0);
  const rafId        = useRef<number>();

  const [sectionHeight, setSectionHeight] = useState(0);
  const [progress, setProgress]           = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const calc = () => setSectionHeight(window.innerHeight + video.duration * scrollPxPerSecond);
    if (video.readyState >= 1) calc();
    else video.addEventListener('loadedmetadata', calc, { once: true });
  }, [scrollPxPerSecond]);

  useEffect(() => {
    const container = containerRef.current;
    const video     = videoRef.current;
    if (!container || !video || sectionHeight === 0) return;

    const totalScroll = sectionHeight - window.innerHeight;

    const onScroll = () => {
      const now      = performance.now();
      const dt       = Math.max(now - lastScrollMs.current, 1);
      const dy       = window.scrollY - lastScrollY.current;
      const scrolled = -container.getBoundingClientRect().top;

      scrollPos.current = Math.min(Math.max(scrolled / totalScroll, 0), 1);

      const rate = (dy / dt) * 1000 / scrollPxPerSecond;
      targetRate.current = Math.max(0, Math.min(12, rate));

      lastScrollY.current  = window.scrollY;
      lastScrollMs.current = now;
    };

    const tick = () => {
      targetRate.current *= 0.80;
      activeRate.current += (targetRate.current - activeRate.current) * 0.25;

      const rate       = activeRate.current;
      const p          = scrollPos.current;
      const targetTime = p * (video.duration || 1);

      if (video.readyState >= 2) {
        if (rate > 0.06) {
          const clamped = Math.max(0.0625, Math.min(12, rate));
          if (video.paused) video.play().catch(() => {});
          video.playbackRate = clamped;
          if (Math.abs(video.currentTime - targetTime) > 1.2) {
            video.currentTime = targetTime;
          }
        } else {
          if (!video.paused) { video.pause(); video.playbackRate = 1; }
          if (Math.abs(video.currentTime - targetTime) > 0.03) {
            video.currentTime = targetTime;
          }
        }
      }

      setProgress(p);
      rafId.current = requestAnimationFrame(tick);
    };

    lastScrollY.current  = window.scrollY;
    lastScrollMs.current = performance.now();

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [sectionHeight, scrollPxPerSecond]);

  /* Entry text: fade in 0–15%, visible 15–25%, fade out 25–40% */
  const entryOpacity = progress < 0.15
    ? easeOut(progress / 0.15)
    : progress < 0.25
    ? 1
    : progress < 0.40
    ? easeOut(1 - (progress - 0.25) / 0.15)
    : 0;

  /* Fallback centred text (when no rich layout props) */
  const simpleOpacity = progress < 0.15
    ? easeOut(progress / 0.15)
    : progress > 0.85
    ? easeOut(1 - (progress - 0.85) / 0.15)
    : 1;

  const hasRich = !!(headline || eyebrow || description);

  return (
    <div ref={containerRef} style={{ height: sectionHeight > 0 ? sectionHeight : '100vh' }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        background: '#080808',
      }}>
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

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'rgba(0,0,0,0.48)',
        }} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* ── Rich entry layout ── */}
        {hasRich && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: entryOpacity,
            pointerEvents: entryOpacity > 0.05 ? 'auto' : 'none',
            transition: 'opacity 0.1s linear',
          }}>
            {/* Main content area */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              padding: 'clamp(5rem, 8vh, 7rem) clamp(1.5rem, 5vw, 4rem) 2rem',
            }}>
              <div style={{ maxWidth: 620 }}>

                {/* Eyebrow */}
                {eyebrow && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28,
                  }}>
                    <span style={{
                      display: 'inline-block', width: 40, height: 1,
                      background: 'rgba(255,255,255,0.45)',
                    }} />
                    <span style={{
                      fontSize: '0.62rem', letterSpacing: '0.25em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
                      fontWeight: 500,
                    }}>{eyebrow}</span>
                  </div>
                )}

                {/* Headline */}
                {headline && (
                  <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
                    fontWeight: 600,
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    color: '#fff',
                    margin: 0,
                  }}>
                    {headline}
                    {headlineHighlight && (
                      <>
                        {' '}
                        <em style={{
                          fontStyle: 'italic',
                          color: '#c9a96e',
                          fontWeight: 400,
                        }}>
                          {headlineHighlight}
                        </em>
                      </>
                    )}
                  </h2>
                )}

                {/* Description */}
                {description && (
                  <p style={{
                    marginTop: 24,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.62)',
                    maxWidth: 480,
                  }}>{description}</p>
                )}

                {/* CTAs */}
                {(primaryCta || secondaryCta) && (
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36,
                  }}>
                    {primaryCta && (
                      <Link href={primaryCta.href} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '12px 24px',
                        borderRadius: 999,
                        background: 'rgba(255,255,255,0.92)',
                        color: '#111',
                        fontSize: 13.5, fontWeight: 600,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}>
                        {primaryCta.label}
                        <ArrowRight size={15} />
                      </Link>
                    )}
                    {secondaryCta && (
                      <Link href={secondaryCta.href} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '12px 24px',
                        borderRadius: 999,
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.40)',
                        color: '#fff',
                        fontSize: 13.5, fontWeight: 500,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}>
                        {secondaryCta.label}
                      </Link>
                    )}
                  </div>
                )}

                {/* Social proof */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14, marginTop: 36,
                }}>
                  {/* Avatar stack */}
                  <div style={{ display: 'flex' }}>
                    {[
                      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80',
                      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80',
                      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80',
                      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80',
                      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80',
                    ].map((url, i) => (
                      <div key={i} style={{
                        width: 34, height: 34, borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.25)',
                        overflow: 'hidden',
                        marginLeft: i === 0 ? 0 : -10,
                        background: '#333',
                      }}>
                        <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ color: '#f5b942', fontSize: 13, letterSpacing: 2 }}>★★★★★</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.50)', marginTop: 2, lineHeight: 1.4 }}>
                      Trusted by 500+ homeowners<br />to create beautiful spaces
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features bar */}
            {features.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${features.length}, 1fr)`,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(12px)',
              }}>
                {features.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: 'clamp(1rem, 2.5vh, 1.5rem) clamp(1rem, 2vw, 1.75rem)',
                    borderRight: i < features.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.14)',
                      color: 'rgba(255,255,255,0.55)',
                    }}>
                      {f.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4,
                      }}>{f.title}</div>
                      <div style={{
                        fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5,
                      }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Simple centred fallback (no rich props) ── */}
        {!hasRich && (heading || subheading) && (
          <>
            {label && (
              <div style={{
                position: 'absolute', top: '5.5rem', left: '2.5rem',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ display: 'inline-block', width: 20, height: 1, background: 'rgba(255,255,255,0.35)' }} />
                <span style={{
                  fontSize: '0.58rem', letterSpacing: '0.30em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
                }}>{label}</span>
              </div>
            )}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '0 2rem', textAlign: 'center',
              opacity: simpleOpacity,
              pointerEvents: 'none',
            }}>
              {heading && (
                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.06,
                  color: '#fff',
                }}>{heading}</h2>
              )}
              {subheading && (
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 2rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.52)',
                  marginTop: '0.5rem',
                  letterSpacing: '-0.01em',
                }}>{subheading}</p>
              )}
            </div>
          </>
        )}

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: 1.5, width: `${progress * 100}%`,
          background: 'rgba(255,255,255,0.38)',
          pointerEvents: 'none',
          transition: 'width 0.05s linear',
        }} />
      </div>
    </div>
  );
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
}
