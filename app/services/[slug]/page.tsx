import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { services, getServiceBySlug } from '@/lib/services';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { serviceSchema, faqSchema } from '@/lib/schema';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <StructuredData data={serviceSchema(service)} />
      {service.faqs.length > 0 && <StructuredData data={faqSchema(service.faqs)} />}

      <section className="pt-28 lg:pt-36 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.shortTitle },
            ]}
          />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {service.tagline}
              </span>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
                {service.title}
              </h1>
              <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                {service.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Button asChild size="lg" className="mt-8">
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold tracking-tight">
            What We Do
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.whatWeDo.map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-foreground/50" />
                  <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-center">
            Our Process
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div key={i} className="relative">
                <span className="font-serif text-4xl font-light text-foreground/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-center">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-6">
              {service.faqs.map((faq, i) => (
                <div key={i} className="border-b border-border pb-5">
                  <h3 className="font-serif text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Ready to start your ${service.shortTitle.toLowerCase()} project?`}
        description="Book a free consultation with our team in Bhubaneswar and let us help you design a space that works for you."
      />
    </>
  );
}
