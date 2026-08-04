import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import {
  designIdeaCategories,
  getDesignIdeaCategoryBySlug,
  getDesignIdeasByCategory,
} from '@/lib/design-ideas';
import { buildMetadata } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';

export function generateStaticParams() {
  return designIdeaCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = getDesignIdeaCategoryBySlug(params.category);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} Design Ideas in Bhubaneswar`,
    description: category.description,
    path: `/design-ideas/${category.slug}`,
    image: category.image,
  });
}

export default function DesignIdeaCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getDesignIdeaCategoryBySlug(params.category);
  if (!category) notFound();

  const ideas = getDesignIdeasByCategory(category.slug);

  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Design Ideas', href: '/design-ideas' },
              { label: category.name },
            ]}
          />
          <div className="mt-6 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Design Ideas
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
              {category.name} Design Ideas
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {ideas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <div
                  key={idea.slug}
                  className="group flex flex-col rounded-xl overflow-hidden border border-border bg-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={idea.image}
                      alt={idea.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-serif text-lg font-semibold">
                      {idea.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {idea.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 border border-dashed border-border rounded-xl">
              <p className="font-serif text-xl font-semibold">
                More ideas coming soon
              </p>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                We are curating {category.name.toLowerCase()} design ideas for
                homes in Bhubaneswar. Please check back shortly.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              >
                Book Free Consultation
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
