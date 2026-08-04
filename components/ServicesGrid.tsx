import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Home, ChefHat, Sofa, BedDouble, Briefcase, Store, type LucideIcon } from 'lucide-react';
import { services } from '@/lib/services';

const iconMap: Record<string, LucideIcon> = {
  Home,
  ChefHat,
  Sofa,
  BedDouble,
  Briefcase,
  Store,
};

export function ServicesGrid() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            What We Do
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Interior Design Services in Bhubaneswar
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            From complete home interiors to modular kitchens and office spaces,
            we design and execute every project with care — tailored to the way
            you live and work.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-foreground/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center justify-center h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl font-semibold tracking-tight">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {service.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                    Explore service
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
