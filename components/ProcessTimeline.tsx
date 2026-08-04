const steps = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'We start with a conversation about your space, lifestyle, taste and budget — so the design is built around you.',
  },
  {
    number: '02',
    title: 'Requirement & Space Analysis',
    description:
      'We measure the space, understand structural constraints and document your requirements in detail.',
  },
  {
    number: '03',
    title: 'Concept & 3D Design',
    description:
      'You see your home before it is built. We share layouts, material palettes and 3D views for your feedback.',
  },
  {
    number: '04',
    title: 'Material Selection',
    description:
      'We guide you through finishes, fabrics and hardware — balancing look, durability and budget.',
  },
  {
    number: '05',
    title: 'Execution',
    description:
      'Carpentry, painting, electricals, ceilings and installation — supervised on site with regular quality checks.',
  },
  {
    number: '06',
    title: 'Final Handover',
    description:
      'A clean, move-in ready space with styling and a walkthrough — so your new interior feels like home from day one.',
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            How It Works
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            From Idea to Your Dream Interior
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A clear, step-by-step process so you always know what comes next —
            from the first conversation to the final handover.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-5xl font-light text-foreground/20">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-6 text-foreground/20">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
