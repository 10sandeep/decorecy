import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col rounded-xl overflow-hidden border border-border bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {project.location}
          </span>
          <span>{project.propertyType}</span>
          <span>{project.area}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all">
          View project
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function ProjectsEmptyState() {
  return (
    <div className="text-center py-16 px-6 border border-dashed border-border rounded-xl">
      <p className="font-serif text-xl font-semibold">Projects coming soon</p>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        We are working on sharing our latest interior design projects across
        Bhubaneswar. In the meantime, book a free consultation to see how we can
        transform your space.
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
