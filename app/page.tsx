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
