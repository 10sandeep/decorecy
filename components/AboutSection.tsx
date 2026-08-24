'use client';

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

export function AboutSection() {
  return (
    <section style={{
      background: '#fff',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'center',
      }} className="about-grid">

        {/* ── Left: text ── */}
        <div>
          {/* Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{
              width: 9, height: 9, borderRadius: '50%',
              background: '#c9a96e', display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{
              fontSize: '0.82rem', fontWeight: 500,
              letterSpacing: '0.05em', color: '#555',
            }}>
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#111',
            margin: '0 0 24px',
          }}>
            Welcome to{' '}
            <span style={{ display: 'block', color: '#c9a96e' }}>
              Decorecy Interiors
            </span>
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(0.92rem, 1.3vw, 1rem)',
            lineHeight: 1.85,
            color: '#555',
            margin: '0 0 36px',
            textAlign: 'justify',
          }}>
            Decorecy Interiors is dedicated to creating modern, durable, and beautifully
            designed spaces that reflect quality and excellence in every detail. With years
            of experience in interior design, renovation, and space planning, we proudly
            deliver projects that combine innovative design, skilled craftsmanship, and
            long-lasting value. Our goal is to transform your ideas into functional and
            inspiring spaces that perfectly suit your lifestyle, business, and future needs.
          </p>

          {/* CTA */}
          <Link
            href="/about"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 26px',
              borderRadius: 999,
              border: '1.5px solid #ddd',
              color: '#111',
              fontSize: 14, fontWeight: 600,
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c9a96e';
              e.currentTarget.style.background = 'rgba(201,169,110,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#ddd';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            About More
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* ── Right: image composition ── */}
        <div style={{ position: 'relative' }}>

          {/* Main image */}
          <div style={{
            position: 'relative',
            borderRadius: '24px 24px 24px 0',
            overflow: 'hidden',
            aspectRatio: '4 / 4.5',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
          }}>
            <img
              src="https://images.pexels.com/photos/4977448/pexels-photo-4977448.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Decorecy Interiors material and design samples"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Concave notch at bottom-left — white quarter-circle overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 72,
            height: 72,
            borderRadius: '0 72px 0 0',
            background: '#fff',
            zIndex: 2,
          }} />

          {/* Second overlapping image — bottom-right */}
          <div style={{
            position: 'absolute',
            bottom: -32,
            right: -24,
            width: '52%',
            aspectRatio: '4 / 3',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            border: '4px solid #fff',
            zIndex: 3,
          }}>
            <img
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Decorecy Interiors completed interior project"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Location pill */}
          <div style={{
            position: 'absolute',
            bottom: -20,
            right: 12,
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 999,
            padding: '8px 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            fontSize: 13,
            fontWeight: 600,
            color: '#111',
          }}>
            <MapPin size={14} color="#c9a96e" />
            Bhubaneswar
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
