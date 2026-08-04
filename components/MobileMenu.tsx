'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Phone, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { serviceNavLinks } from '@/lib/services';

export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="font-serif text-lg font-semibold">Decorecy</span>
          <button
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-5">
          <ul className="space-y-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Services
            </p>
            <ul className="space-y-1">
              {serviceNavLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="p-5 border-t border-border space-y-3">
          <Button asChild className="w-full">
            <Link href="/contact">Book Free Consultation</Link>
          </Button>
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
