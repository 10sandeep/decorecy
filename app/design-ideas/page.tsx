import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { designIdeaCategories } from '@/lib/design-ideas';
import { buildMetadata } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Interior Design Ideas & Inspiration',
  description:
    'Explore interior design ideas for living rooms, bedrooms, kitchens, dining rooms, wardrobes, TV units, false ceilings and offices in Bhubaneswar.',
  path: '/design-ideas',
});

export default function DesignIdeasPage() {
  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Design Ideas' },
            ]}
          />
          <div className="mt-6 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Inspiration
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
              Explore Interior Design Ideas
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Browse design ideas by room — from living rooms and bedrooms to
              modular kitchens, wardrobes and false ceilings. Use these as
              inspiration for your own project in Bhubaneswar.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {designIdeaCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/design-ideas/${cat.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-serif text-2xl font-semibold text-white">
                    {cat.name}
                  </h2>
                  <p className="mt-1 text-sm text-white/80">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
