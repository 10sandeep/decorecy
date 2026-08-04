import { ServicesGrid } from '@/components/ServicesGrid';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Interior Design Services in Bhubaneswar',
  description:
    'Explore interior design services by Decorecy Interiors in Bhubaneswar — complete home interiors, modular kitchen, living room, bedroom, office and commercial interiors.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services' },
            ]}
          />
          <div className="mt-6 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Our Services
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
              Interior Design Services in Bhubaneswar
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              From complete home interiors to modular kitchens, living rooms,
              bedrooms and office spaces — every service is designed and
              executed by one team, tailored to your space and budget.
            </p>
          </div>
        </div>
      </section>
      <ServicesGrid />
      <CTASection />
    </>
  );
}
