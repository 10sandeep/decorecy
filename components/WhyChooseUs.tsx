'use client';

import { Sparkles, Ruler, Gem, MessageSquare, Workflow, MapPin } from 'lucide-react';

const reasons = [
  {
    number: '01',
    Icon: Sparkles,
    title: 'Personalized Designs',
    description:
      'Every project starts with understanding how you live. We design around your routine, taste and budget — not a template.',
  },
  {
    number: '02',
    Icon: Ruler,
    title: 'Thoughtful Space Planning',
    description:
      'Good design begins with good planning. We optimise layouts for flow, storage and natural light before selecting a single finish.',
  },
  {
    number: '03',
    Icon: Gem,
    title: 'Quality Materials',
    description:
      'We select materials and hardware suited to the Bhubaneswar climate and built to handle daily use — not just look good in photos.',
  },
  {
    number: '04',
    Icon: MessageSquare,
    title: 'Transparent Communication',
    description:
      'You always know what is happening on site. Clear estimates, regular updates and no surprise costs halfway through a project.',
  },
  {
    number: '05',
    Icon: Workflow,
    title: 'End-to-End Execution',
    description:
      'From design and 3D visualisation to carpentry, painting and handover — one team handles everything so you never juggle vendors.',
  },
  {
    number: '06',
    Icon: MapPin,
    title: 'Local Bhubaneswar Expertise',
    description:
      'We work across Patia, Jaydev Vihar, Saheed Nagar and Chandrasekharpur — local knowledge means faster decisions and better results.',
  },
];

function Card({ number, Icon, title, description }: typeof reasons[0]) {
  return (
    <div
      className="why-card"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 'clamp(1.4rem, 2vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'background 0.25s, border-color 0.25s, transform 0.25s',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(201,169,110,0.06)';
        el.style.borderColor = 'rgba(201,169,110,0.30)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.transform = 'none';
      }}
    >
      {/* Top gold line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #c9a96e, transparent)',
        borderRadius: '20px 20px 0 0',
        opacity: 0.5,
      }} />

      {/* Icon + number row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14, flexShrink: 0,
          background: 'rgba(201,169,110,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={22} color="#c9a96e" />
        </div>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.2rem', fontWeight: 700, lineHeight: 1,
          color: 'rgba(255,255,255,0.06)',
          userSelect: 'none',
        }}>{number}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
        fontWeight: 700,
        color: '#fff',
        margin: 0,
        lineHeight: 1.3,
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
        lineHeight: 1.75,
        color: 'rgba(255,255,255,0.45)',
        margin: 0,
      }}>
        {description}
      </p>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why-decorecy" style={{
      background: '#0c0c0c',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '48px 48px 0 0',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)',
      }} />

      <div style={{
        maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 'clamp(3rem, 6vw, 7rem)',
        alignItems: 'start',
      }} className="why-outer">

        {/* ── Left: sticky heading ── */}
        <div style={{ position: 'sticky', top: '30vh' }} className="why-left">

          {/* Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#c9a96e', display: 'inline-block',
            }} />
            <span style={{
              fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#c9a96e',
            }}>
              Why Decorecy
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            color: '#fff',
            margin: '0 0 20px',
          }}>
            Why Choose{' '}
            <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>
              Decorecy
            </em>{' '}
            Interiors?
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(0.88rem, 1.2vw, 0.98rem)',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.42)',
            margin: '0 0 40px',
          }}>
            We focus on the things that make a real difference — planning,
            materials, communication and flawless execution.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 24,
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            {[
              { value: '500+', label: 'Happy Homeowners' },
              { value: '8+',   label: 'Years of Experience' },
              { value: '100%', label: 'On-Time Delivery' },
            ].map(({ value, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 700, color: '#c9a96e', lineHeight: 1,
                  minWidth: 72,
                }}>{value}</div>
                <div style={{
                  fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.02em',
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: cards grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }} className="why-cards">
          {reasons.map((r) => (
            <Card key={r.number} {...r} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-outer { grid-template-columns: 1fr !important; }
          .why-left  { position: static !important; }
          .why-cards { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .why-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
