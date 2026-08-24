'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';

export function CTASection({
  title = 'Start Your Interior\nTransformation Today',
  description = "Tell us about your space — we’ll help bring clarity, ideas, and a personalised design direction.",
}: {
  title?: string;
  description?: string;
} = {}) {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '48px 48px 0 0',
    }}>

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }} />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(8,8,8,0.72)',
      }} />

      {/* Large watermark brand text */}
      <div style={{
        position: 'absolute',
        top: '-4%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(6rem, 20vw, 20rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        color: 'rgba(255,255,255,0.55)',
        WebkitMaskImage: 'linear-gradient(to bottom, white 30%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, white 30%, transparent 100%)',
      }}>
        Decorecy
      </div>

      {/* Center content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 6vw, 4rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 32,
        }}>
          <span style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#c9a96e',
            display: 'inline-block',
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: '0.82rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.65)',
          }}>
            Work With Us
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          color: '#fff',
          margin: '0 0 24px',
          maxWidth: '14ch',
        }}>
          {title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.95rem, 1.4vw, 1.08rem)',
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 520,
          margin: '0 0 44px',
        }}>
          {description}
        </p>

        {/* CTA button */}
        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 34px',
            borderRadius: 999,
            background: '#ffffff',
            color: '#111111',
            fontSize: 15,
            fontWeight: 650,
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)';
          }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: '#c9a96e',
            color: '#fff',
            flexShrink: 0,
          }}>
            <Phone size={16} />
          </span>
          Schedule a Design Call
        </Link>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .cta-wm { display: none !important; }
        }
      `}</style>
    </section>
  );
}
