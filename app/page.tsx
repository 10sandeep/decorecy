import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollWorld } from '@/components/ScrollWorld';
import { ScrollVideoSection } from '@/components/ScrollVideoSection';
import { ServicesGrid } from '@/components/ServicesGrid';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { DesignGallery } from '@/components/DesignGallery';
import { Testimonials } from '@/components/Testimonials';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
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
        eyebrow: 'Premium Interior Design Studio · Bhubaneswar',
        headline: 'Designing Spaces That Feel Like',
        headlineHighlight: 'Home.',
        description:
          'We craft warm, timeless interiors that balance beauty, comfort, and function — thoughtfully designed to elevate your everyday living.',
        primaryCta:   { label: 'Book Free Consultation', href: '/contact' },
        secondaryCta: { label: 'View Our Projects',      href: '/projects' },
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

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                About Decorecy
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Creating Beautiful Spaces in Bhubaneswar
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                At Decorecy Interiors, we believe a great interior is not just
                about how a space looks — it is about how it works for the people
                who use it every day. We start by understanding your lifestyle,
                then plan the space, select the right materials and execute
                with care.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                From complete home interiors and modular kitchens to office and
                commercial spaces, our focus is on clear communication,
                thoughtful design and end-to-end execution — so you get a space
                that feels genuinely yours.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/about">
                  Know More About Decorecy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/4977448/pexels-photo-4977448.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Interior design planning with material samples at Decorecy Interiors"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <FAQAccordion faqs={generalFaqs.slice(0, 6)} />

      <CTASection />
    </>
  );
}
