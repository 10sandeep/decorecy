import { Star } from 'lucide-react';

const placeholderTestimonials = [
  {
    name: 'Client Name',
    location: 'Patia, Bhubaneswar',
    project: '3 BHK Home Interior',
    rating: 5,
    review:
      'This is a placeholder testimonial. Real customer reviews will be added here once they are provided. We do not publish fabricated reviews.',
  },
  {
    name: 'Client Name',
    location: 'Jaydev Vihar, Bhubaneswar',
    project: 'Modular Kitchen',
    rating: 5,
    review:
      'This is a placeholder testimonial. Real customer reviews will be added here once they are provided. We do not publish fabricated reviews.',
  },
  {
    name: 'Client Name',
    location: 'Saheed Nagar, Bhubaneswar',
    project: 'Office Interior',
    rating: 5,
    review:
      'This is a placeholder testimonial. Real customer reviews will be added here once they are provided. We do not publish fabricated reviews.',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Client Stories
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Real reviews from real clients will appear here. The cards below are
            placeholders — we do not publish fabricated testimonials.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderTestimonials.map((t, i) => (
            <div
              key={i}
              className="p-7 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-foreground/20 text-foreground/30"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="mt-5 pt-5 border-t border-border">
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t.project} • {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
