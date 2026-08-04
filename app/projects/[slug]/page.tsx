import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Ruler, Home, Palette } from 'lucide-react';
import { projects, getProjectBySlug } from '@/lib/projects';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { websiteSchema } from '@/lib/schema';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.name} — ${project.location}`,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: project.name },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {project.category}
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
              {project.name}
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Project Overview
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              {project.gallery.length > 0 && (
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="p-6 rounded-xl border border-border bg-card sticky top-24">
                <h3 className="font-serif text-lg font-semibold">Project Details</h3>
                <dl className="mt-4 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-muted-foreground">Location</dt>
                      <dd className="font-medium">{project.location}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-muted-foreground">Property Type</dt>
                      <dd className="font-medium">{project.propertyType}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Ruler className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-muted-foreground">Area</dt>
                      <dd className="font-medium">{project.area}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Palette className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <dt className="text-muted-foreground">Design Style</dt>
                      <dd className="font-medium">{project.designStyle}</dd>
                    </div>
                  </div>
                </dl>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Services Provided
                  </p>
                  <ul className="space-y-1.5">
                    {project.services.map((s) => (
                      <li key={s} className="text-sm">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full mt-6">
                  <Link href="/contact">
                    Start a Similar Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
