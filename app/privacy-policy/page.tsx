import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for Decorecy Interiors.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy' },
            ]}
          />
          <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                1. Information We Collect
              </h2>
              <p className="mt-3">
                When you contact us through our consultation form, we collect
                the information you provide — including your name, phone number,
                email, property type, project type, location, budget and any
                message you send us.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                2. How We Use Your Information
              </h2>
              <p className="mt-3">
                We use the information you provide to respond to your enquiry,
                schedule consultations and prepare design proposals. We do not
                sell or rent your personal information to third parties.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                3. Data Storage
              </h2>
              <p className="mt-3">
                Your information is stored securely and used only for the
                purpose of responding to your enquiry and delivering our
                services. We retain enquiry data only as long as necessary.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                4. Cookies
              </h2>
              <p className="mt-3">
                This website may use cookies and analytics tools to understand
                how visitors use the site. You can control cookies through your
                browser settings.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                5. Contact
              </h2>
              <p className="mt-3">
                If you have questions about this privacy policy, please contact
                us at {siteConfig.email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
