import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Terms of service for Decorecy Interiors.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms' },
            ]}
          />
          <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                1. Use of This Website
              </h2>
              <p className="mt-3">
                This website is provided by {siteConfig.name} for informational
                purposes. By using this site you agree to these terms.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                2. Design Consultations
              </h2>
              <p className="mt-3">
                Initial consultations are offered free of charge. Any design
                work, drawings or execution services will be covered by a
                separate agreement specific to your project.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                3. Project Estimates
              </h2>
              <p className="mt-3">
                Estimates provided through this website are indicative and based
                on the information you share. Final pricing depends on site
                measurements, material selection and project scope.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                4. Images and Content
              </h2>
              <p className="mt-3">
                Images shown on this website are for inspiration and may
                include representative photography. Actual project outcomes
                depend on site conditions and agreed specifications.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                5. Contact
              </h2>
              <p className="mt-3">
                For questions about these terms, please contact us at{' '}
                {siteConfig.email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
