import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium">
          {post.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
        <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight leading-snug">
          {post.title}
        </h3>
        <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all">
          Read article
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function BlogEmptyState() {
  return (
    <div className="text-center py-16 px-6 border border-dashed border-border rounded-xl">
      <p className="font-serif text-xl font-semibold">Articles coming soon</p>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        We are preparing in-depth guides on interior design, modular kitchens
        and home renovation in Bhubaneswar. Please check back shortly.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2.5 transition-all"
      >
        Book Free Consultation
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
