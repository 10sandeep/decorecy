import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Ruler, Gem, MessageSquare, Workflow, MapPin } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'About Decorecy Interiors',
  description:
    'Decorecy Interiors is a Bhubaneswar-based interior design studio focused on creating functional, personalized and aesthetically refined residential and commercial spaces.',
  path: '/about',
});

const philosophy = [
  {
    icon: Sparkles,
    title: 'Understanding Lifestyle',
    description:
      'We begin with how you live and work. Your routine, preferences and constraints shape every design decision we make.',
  },
  {
    icon: Ruler,
    title: 'Space Planning',
    description:
      'A beautiful space that does not function well fails its purpose. We plan layouts for flow, storage and light first.',
  },
  {
    icon: Gem,
    title: 'Material Selection',
    description:
      'We choose materials that look good and last — suited to the Bhubaneswar climate and the realities of daily use.',
  },
  {
    icon: Sparkles,
    title: 'Aesthetics',
    description:
      'Good design should feel effortless. We aim for interiors that look considered and timeless, not trendy.',
  },
  {
    icon: Workflow,
    title: 'Execution',
    description:
      'Design is only as good as its execution. We supervise every stage on site, from carpentry to final handover.',
  },
  {
    icon: MessageSquare,
    title: 'Client Communication',
    description:
      'You always know where your project stands. Clear estimates, regular updates and honest conversations throughout.',
  },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About' },
            ]}
          />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                About Us
              </span>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
                Creating Beautiful Spaces in Bhubaneswar
              </h1>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Decorecy Interiors is a Bhubaneswar-based interior design
                  studio focused on creating functional, personalized and
                  aesthetically refined spaces. We design for the way people
                  actually live and work — not for catalogues.
                </p>
                <p>
                  Our approach is built on a few simple beliefs: a home should
                  feel like yours, good design should also be practical, and a
                  project should be honest from start to finish. That means
                  understanding your lifestyle, planning the space carefully,
                  choosing materials that last and executing with care.
                </p>
                <p>
                  Whether it is a 2 BHK apartment in Patia, a family home in
                  Saheed Nagar or an office in Chandrasekharpur, our goal is the
                  same — a space that works for you and feels genuinely yours.
                </p>
              </div>
              <Button asChild size="lg" className="mt-8">
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/7491145/pexels-photo-7491145.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Decorecy Interiors design team reviewing material samples"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Our Philosophy
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
              How We Think About Design
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Great interiors come from understanding people, not just rooms.
              Here are the principles that guide every project we take on.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophy.map((item) => (
              <div key={item.title} className="p-7 rounded-xl border border-border bg-card">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-foreground/5">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
