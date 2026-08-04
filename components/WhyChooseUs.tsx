import { Sparkles, Ruler, Gem, MessageSquare, Workflow, MapPin } from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'Personalized Designs',
    description:
      'Every project starts with understanding how you live. We design around your routine, taste and budget — not a template.',
  },
  {
    icon: Ruler,
    title: 'Thoughtful Space Planning',
    description:
      'Good design begins with good planning. We optimise layouts for flow, storage and natural light before selecting a single finish.',
  },
  {
    icon: Gem,
    title: 'Quality Materials',
    description:
      'We select materials and hardware suited to the Bhubaneswar climate and built to handle daily use — not just look good in photos.',
  },
  {
    icon: MessageSquare,
    title: 'Transparent Communication',
    description:
      'You always know what is happening on site. Clear estimates, regular updates and no surprise costs halfway through a project.',
  },
  {
    icon: Workflow,
    title: 'End-to-End Execution',
    description:
      'From design and 3D visualisation to carpentry, painting and handover — one team handles the entire project so you do not coordinate multiple vendors.',
  },
  {
    icon: MapPin,
    title: 'Local Bhubaneswar Expertise',
    description:
      'We work across Patia, Jaydev Vihar, Saheed Nagar, Chandrasekharpur and the rest of Bhubaneswar, so we understand local contractors, climate and constraints.',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-decorecy" className="py-16 lg:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Why Decorecy
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Why Choose Decorecy Interiors?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We focus on the things that make a real difference to your home and
            your experience — planning, materials, communication and execution.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="p-7 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-foreground/5">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold tracking-tight">
                {reason.title}
              </h3>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
