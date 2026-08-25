import { ScrollWorld } from '@/components/ScrollWorld';
import { ScrollVideoSection } from '@/components/ScrollVideoSection';
import { ServicesGrid } from '@/components/ServicesGrid';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { DesignGallery } from '@/components/DesignGallery';
import { Testimonials } from '@/components/Testimonials';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CTASection } from '@/components/CTASection';
import { AboutSection } from '@/components/AboutSection';
import { StructuredData } from '@/components/StructuredData';
import { generalFaqs } from '@/lib/faq';
import { faqSchema } from '@/lib/schema';

export default function HomePage() {
  return (
    <>
      <StructuredData data={faqSchema(generalFaqs.slice(0, 6))} />

      <ScrollWorld config={{
        scenes: [
          {
            src: '/assets/7578547-uhd_3840_2160_30fps.mp4',
            scrollPxPerSecond: 120,
          },
          {
            src: '/assets/video_watermark_removed_compatible.mp4',
            scrollPxPerSecond: 120,
            label: 'Step Inside',
          },
        ],
        eyebrow: "Bhubaneswar's Premier Interior Design Studio",
        headline: 'Spaces That Make You',
        headlineHighlight: 'Stay.',
        description:
          'Great design doesn\'t just look beautiful — it feels inevitable. We craft interiors so perfectly suited to you, every room feels like it was always yours.',
        primaryCta:   { label: 'Begin Your Transformation', href: '/contact' },
        secondaryCta: { label: 'View Our Projects',         href: '/projects' },
      }} />

      <ServicesGrid />

      <ScrollVideoSection
        src="/assets/kitchen.mp4"
        scrollPxPerSecond={120}
        eyebrow="Bespoke Kitchens"
        headline="Where everyday moments become"
        headlineHighlight="extraordinary."
        description="Thoughtfully designed kitchens where timeless aesthetics meet effortless functionality."
        primaryCta={{ label: 'Explore Kitchens', href: '/services' }}
        secondaryCta={{ label: 'Book a Design Consultation', href: '/contact' }}
      />

      {/* ── Marquee divider ── */}
      <div style={{
        background: '#fff',
        overflow: 'hidden',
        padding: '18px 0',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}>
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 28s linear infinite',
          gap: 0,
        }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              whiteSpace: 'nowrap',
            }}>
              {[
                'Interior Design',
                'Bhubaneswar',
                'Modular Kitchens',
                '3D Visualisation',
                'Premium Materials',
                'End-to-End Execution',
                'Decorecy Interiors',
                'Space Planning',
              ].map((text) => (
                <span key={text} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#111',
                    padding: '0 28px',
                  }}>{text}</span>
                  <span style={{ color: '#c9a96e', fontSize: '0.55rem' }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <ProcessTimeline />

      <WhyChooseUs />

      <DesignGallery />

      <AboutSection />

      <Testimonials />

      <FAQAccordion faqs={generalFaqs.slice(0, 6)} />

      <CTASection />
    </>
  );
}
