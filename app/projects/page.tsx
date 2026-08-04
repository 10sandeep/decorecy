import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { ProjectCard, ProjectsEmptyState } from '@/components/ProjectCard';
import { getPublishedProjects, projectCategories } from '@/lib/projects';
import { buildMetadata } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Our Interior Design Projects',
  description:
    'Explore interior design projects by Decorecy Interiors in Bhubaneswar — full home interiors, modular kitchens, living rooms, bedrooms, offices and commercial spaces.',
  path: '/projects',
});

export default function ProjectsPage() {
  const publishedProjects = getPublishedProjects();

  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Projects' },
            ]}
          />
          <div className="mt-6 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
              Our Interior Design Projects
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              A look at the homes and workspaces we have designed across
              Bhubaneswar. Each project is tailored to the client's lifestyle,
              space and budget.
            </p>
          </div>

          {publishedProjects.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              {projectCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {publishedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <ProjectsEmptyState />
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
