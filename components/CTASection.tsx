'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function CTASection({
  title = 'Ready to design your',
  titleHighlight = 'dream space?',
  description = 'Book a free consultation with our expert design team in Bhubaneswar. We\'ll understand your space, lifestyle and budget — and show you what\'s possible.',
  primaryLabel = 'Book Free Consultation',
  primaryHref = '/contact',
  secondaryLabel = 'Learn More About Us',
  secondaryHref = '/about',
}: {
  title?: string;
  titleHighlight?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section style={{
      background: '#0e0e0e',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,169,110,0.10) 0%, transparent 70%)',
      }} />

      {/* Decorative top border line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 80, height: 1,
        background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
      }} />

      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'center',
      }} className="cta-grid">

        {/* ── Left: text ── */}
        <div>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{
              display: 'inline-block', width: 32, height: 1,
              background: '#c9a96e',
            }} />
            <span style={{
              fontSize: '0.6rem', fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#c9a96e',
            }}>
              Start Your Journey
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#fff',
            margin: 0,
          }}>
            {title}{' '}
            <em style={{ fontStyle: 'italic', color: '#c9a96e', fontWeight: 400 }}>
              {titleHighlight}
            </em>
          </h2>

          {/* Description */}
          <p style={{
            marginTop: 20,
            fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.50)',
            maxWidth: 520,
          }}>
            {description}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
            <Link href={primaryHref} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 26px',
              borderRadius: 999,
              background: '#c9a96e',
              color: '#0e0e0e',
              fontSize: 13.5, fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#d4b47a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.transform = 'none'; }}
            >
              {primaryLabel}
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 24, height: 24, borderRadius: '50%',
                background: 'rgba(0,0,0,0.15)',
              }}>
                <ArrowRight size={13} />
              </span>
            </Link>

            <Link href={secondaryHref} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.75)',
              fontSize: 13.5, fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
            >
              {secondaryLabel}
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 40,
            paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            {[
              { value: '500+', label: 'Happy Homeowners' },
              { value: '8+',   label: 'Years of Experience' },
              { value: '100%', label: 'On-Time Delivery' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 600, color: '#fff', lineHeight: 1,
                }}>{value}</div>
                <div style={{
                  fontSize: '0.72rem', color: 'rgba(255,255,255,0.42)',
                  marginTop: 5, letterSpacing: '0.02em',
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: contact card ── */}
        <div style={{
          flexShrink: 0,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 20,
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          minWidth: 240, maxWidth: 300,
          display: 'flex', flexDirection: 'column', gap: 20,
        }} className="cta-card">
          {/* Photo */}
          <div style={{
            width: '100%', aspectRatio: '4/3',
            borderRadius: 12, overflow: 'hidden',
            background: '#1a1a1a',
          }}>
            <img
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Interior design consultation"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Card content */}
          <div>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 16, fontStyle: 'italic',
              color: '#c9a96e', lineHeight: 1.4,
            }}>
              Let&apos;s bring your vision to life.
            </p>
            <p style={{
              fontSize: 12.5, color: 'rgba(255,255,255,0.42)',
              marginTop: 6, lineHeight: 1.5,
            }}>
              Talk to our design team today — no pressure, just ideas.
            </p>
          </div>

          {/* Call button */}
          <a
            href={`tel:${siteConfig.phoneHref}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px',
              borderRadius: 12,
              background: 'rgba(201,169,110,0.10)',
              border: '1px solid rgba(201,169,110,0.25)',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,169,110,0.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(201,169,110,0.10)')}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 10,
              background: '#c9a96e', color: '#0e0e0e', flexShrink: 0,
            }}>
              <Phone size={16} />
            </span>
            <div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>Call us now</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#fff', marginTop: 2 }}>{siteConfig.phone}</div>
            </div>
          </a>
        </div>
      </div>

      {/* Responsive override: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .cta-card { max-width: 100% !important; min-width: unset !important; }
        }
      `}</style>
    </section>
  );
}
