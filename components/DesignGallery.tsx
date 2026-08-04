import Image from 'next/image';
import Link from 'next/link';
import { designIdeaCategories } from '@/lib/design-ideas';

export function DesignGallery() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Inspiration
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Explore Interior Design Ideas
            </h2>
          </div>
          <Link
            href="/design-ideas"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            View all ideas
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {designIdeaCategories.slice(0, 8).map((cat) => (
            <Link
              key={cat.slug}
              href={`/design-ideas/${cat.slug}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg font-semibold text-white">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
