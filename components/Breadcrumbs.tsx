import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { StructuredData } from './StructuredData';
import { buildBreadcrumbs } from '@/lib/schema';

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = buildBreadcrumbs(
    items.map((i) => ({ name: i.label, url: i.href || '' }))
  );

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-foreground font-medium' : ''}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <StructuredData data={jsonLd} />
    </>
  );
}
