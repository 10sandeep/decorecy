'use client';

import { MessageSquare, Lightbulb, Settings2, BadgeCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    Icon: MessageSquare,
    title: 'Consultation',
    description:
      'We begin by understanding your needs, style preferences, and budget. Our team discusses your vision in detail to create a clear direction for your interior project.',
    highlight: true,
  },
  {
    number: '02',
    Icon: Lightbulb,
    title: 'Design & Planning',
    description:
      'Our designers create customised layouts, concepts, and 3D designs to bring your ideas to life. We carefully plan every element, from materials to space utilisation.',
    highlight: false,
  },
  {
    number: '03',
    Icon: Settings2,
    title: 'Project Execution',
    description:
      'Once the design is finalised, our skilled team starts the execution process. We ensure high-quality workmanship, timely delivery, and seamless coordination at every stage.',
    highlight: false,
  },
  {
    number: '04',
    Icon: BadgeCheck,
    title: 'Final Handover',
    description:
      'After completing the project, we conduct a final quality check and hand over the space. We also provide post-project support to ensure your complete satisfaction.',
    highlight: false,
  },
];

export function ProcessTimeline() {
  return (
    <section style={{
      position: 'relative',
      background: '#0a0a0a',
      overflow: 'hidden',
    }}>
      {/* Background image — top portion only */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '55%',
        backgroundImage: 'url("https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.35,
      }} />

      {/* Gradient fade from image to dark */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '65%',
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,1) 100%)',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3rem)',
      }}>

        {/* Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 28,
        }}>
          <span style={{
            width: 9, height: 9, borderRadius: '50%',
            background: '#c9a96e',
            display: 'inline-block', flexShrink: 0,
          }} />
          <span style={{
            fontSize: '0.82rem', fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.65)',
          }}>
            Our Process
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          color: '#fff',
          textAlign: 'center',
          margin: '0 0 clamp(3rem, 6vw, 5rem)',
        }}>
          How We Turn Vision Into{' '}
          <em style={{ color: '#c9a96e', fontStyle: 'italic', fontWeight: 700 }}>
            Well-Designed
          </em>{' '}
          Spaces
        </h2>

        {/* Cards */}
        <div className="process-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {steps.map(({ number, Icon, title, description, highlight }) => (
            <div
              key={number}
              style={{
                position: 'relative',
                background: highlight ? '#c9a96e' : '#ffffff',
                borderRadius: 20,
                padding: 'clamp(1.4rem, 2.5vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                overflow: 'hidden',
                minHeight: 340,
              }}
            >
              {/* Icon box */}
              <div style={{
                width: 52, height: 52,
                borderRadius: 14,
                background: '#1e1407',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={22} color="#c9a96e" />
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
                fontWeight: 700,
                color: highlight ? '#1e1407' : '#111',
                margin: 0,
                lineHeight: 1.2,
              }}>
                {title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)',
                lineHeight: 1.7,
                color: highlight ? 'rgba(30,20,7,0.75)' : 'rgba(0,0,0,0.55)',
                margin: 0,
                flex: 1,
              }}>
                {description}
              </p>

              {/* Step number watermark */}
              <div style={{
                position: 'absolute',
                bottom: -10,
                right: 16,
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(4rem, 7vw, 7rem)',
                fontWeight: 700,
                lineHeight: 1,
                color: highlight
                  ? 'rgba(30,20,7,0.12)'
                  : 'rgba(0,0,0,0.07)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {number}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
