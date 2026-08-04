import Link from 'next/link';
import { ArrowRight, Check, MapPin, Phone } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { ServicesGrid } from '@/components/ServicesGrid';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { generalFaqs } from '@/lib/faq';
import { faqSchema, localBusinessSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

export const metadata = buildMetadata({
  title: 'Best Interior Designers in Bhubaneswar',
  description:
    'Looking for the best interior designers in Bhubaneswar? Decorecy Interiors creates beautiful, functional and personalized home and commercial interiors. Book a consultation today.',
  path: '/best-interior-designers-in-bhubaneswar',
});

const trustIndicators = [
  'Personalized Designs',
  'Transparent Process',
  'End-to-End Execution',
  'Bhubaneswar Based',
];

export default function LocalLandingPage() {
  return (
    <>
      <StructuredData data={localBusinessSchema()} />
      <StructuredData data={faqSchema(generalFaqs)} />

      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Interior Designers', href: '/best-interior-designers-in-bhubaneswar' },
              { label: 'Bhubaneswar' },
            ]}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-8 bg-foreground/40" />
                Interior Design Studio • Bhubaneswar
              </span>
              <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08]">
                Best Interior Designers in Bhubaneswar
              </h1>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Transform your home into a space designed around your lifestyle
                with Decorecy Interiors — creating thoughtful, functional and
                beautiful interiors across Bhubaneswar.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/projects">View Our Projects</Link>
                </Button>
              </div>
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 max-w-md">
                {trustIndicators.map((indicator) => (
                  <li
                    key={indicator}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <Check className="h-4 w-4 text-foreground/50 shrink-0" />
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Luxurious living room interior designed by Decorecy Interiors in Bhubaneswar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-center">
            Interior Designers You Can Trust in Bhubaneswar
          </h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Finding the right interior designer in Bhubaneswar is about more
              than picking a style you like — it is about working with a team
              that listens, plans carefully and executes honestly. At Decorecy
              Interiors, we design homes and workspaces that reflect the people
              who use them, built around real routines and real budgets.
            </p>
            <p>
              Whether you are setting up a new 2 BHK or 3 BHK apartment in Patia,
              renovating a family home in Saheed Nagar, or planning an office in
              Chandrasekharpur, our process stays the same: understand your
              lifestyle, plan the space, select durable materials, and execute
              end-to-end with clear communication throughout.
            </p>
            <p>
              As a Bhubaneswar-based interior design company, we understand the
              local climate, materials and contractors — which means fewer
              surprises and a smoother project from start to finish.
            </p>
          </div>
        </div>
      </section>

      <ServicesGrid />

      <ProcessTimeline />

      <WhyChooseUs />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Areas We Serve
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
              Interior Design Projects Across Bhubaneswar
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We work across Bhubaneswar, designing homes and workspaces in
              neighbourhoods throughout the city.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {siteConfig.areasServed.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion
        faqs={generalFaqs}
        subheading="Answers to common questions about working with an interior designer in Bhubaneswar."
      />

      <CTASection
        title="Start your interior design journey in Bhubaneswar"
        description="Book a free consultation with Decorecy Interiors. Tell us about your space and we will show you what is possible — with no obligation."
      />
    </>
  );
}
