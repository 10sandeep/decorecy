import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ConsultationForm } from '@/components/ConsultationForm';
import { StructuredData } from '@/components/StructuredData';
import { siteConfig } from '@/lib/site-config';
import { buildMetadata } from '@/lib/seo';
import { localBusinessSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Contact Decorecy Interiors',
  description:
    'Get in touch with Decorecy Interiors in Bhubaneswar. Book a free interior design consultation for your home or office.',
  path: '/contact',
});

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    siteConfig.whatsappMessage
  )}`;

  return (
    <>
      <StructuredData data={localBusinessSchema()} />
      <section className="pt-28 lg:pt-36 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact' },
            ]}
          />
          <div className="mt-6 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Get in Touch
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
              Contact Decorecy Interiors
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Tell us about your space and we will get back to you within one
              business day. Book a free consultation or reach out directly —
              whichever works for you.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="font-serif text-lg font-semibold">Contact Details</h2>
                <ul className="mt-4 space-y-5">
                  <li>
                    <a
                      href={`tel:${siteConfig.phoneHref}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-foreground/5 shrink-0">
                        <Phone className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted-foreground">Phone</span>
                        <span className="text-sm font-medium group-hover:underline">
                          {siteConfig.phone}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-foreground/5 shrink-0">
                        <Mail className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted-foreground">Email</span>
                        <span className="text-sm font-medium group-hover:underline">
                          {siteConfig.email}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group"
                    >
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#25D366]/10 shrink-0">
                        <MessageCircle className="h-5 w-5 text-[#25D366]" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted-foreground">WhatsApp</span>
                        <span className="text-sm font-medium group-hover:underline">
                          Chat with us
                        </span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-foreground/5 shrink-0">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Address</span>
                      <span className="text-sm font-medium">
                        {siteConfig.address.locality}, {siteConfig.address.region}{' '}
                        {siteConfig.address.postalCode}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        {siteConfig.address.street}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="font-serif text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {siteConfig.businessHours.map((item) => (
                    <li
                      key={item.day}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card">
                <h2 className="font-serif text-lg font-semibold">Find Us</h2>
                <div className="mt-4 relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                  <iframe
                    title="Decorecy Interiors location in Bhubaneswar"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1197.6489!2d85.8245!3d20.2960!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="p-6 sm:p-8 rounded-xl border border-border bg-card">
                <ConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
