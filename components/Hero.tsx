import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trustIndicators = [
  'Personalized Designs',
  'Transparent Process',
  'End-to-End Execution',
  'Bhubaneswar Based',
];

export function Hero({
  eyebrow = 'Interior Design Studio • Bhubaneswar',
  title,
  titleHighlight,
  description,
  image,
  imageAlt,
  primaryLabel = 'Book Free Consultation',
  primaryHref = '/contact',
  secondaryLabel = 'View Our Projects',
  secondaryHref = '/projects',
}: {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              {eyebrow}
            </span>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08]">
              {title}{' '}
              {titleHighlight && (
                <span className="text-foreground/70 italic font-light">
                  {titleHighlight}
                </span>
              )}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {secondaryLabel && secondaryHref && (
                <Button asChild size="lg" variant="outline">
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              )}
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

          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden sm:block bg-background border border-border rounded-xl shadow-xl p-5 max-w-[220px]">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Designing for
              </p>
              <p className="mt-1 font-serif text-lg font-semibold">
                Homes & Workspaces
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Across Bhubaneswar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
