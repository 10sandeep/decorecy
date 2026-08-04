import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="pt-36 pb-24 min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-serif text-7xl font-light text-foreground/20">
          404
        </span>
        <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-md mx-auto">
          The page you are looking for may have been moved or no longer exists.
          Let's get you back on track.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </section>
  );
}
