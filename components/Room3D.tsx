'use client';

import { Suspense, lazy, useRef, useEffect, useState } from 'react';

const Room3DScene = lazy(() =>
  import('./Room3DScene').then((m) => ({ default: m.Room3DScene }))
);

const stages = [
  { label: 'Floor', hint: 'Laying the foundation' },
  { label: 'Walls', hint: 'Raising the walls' },
  { label: 'Rug', hint: 'Adding warmth' },
  { label: 'Sofa', hint: 'Bringing in furniture' },
  { label: 'Coffee Table', hint: 'Styling the space' },
  { label: 'TV Unit', hint: 'Building the media wall' },
  { label: 'Lighting', hint: 'Setting the mood' },
  { label: 'Decor', hint: 'Finishing touches' },
  { label: 'Ready', hint: 'Your dream interior' },
];

export function Room3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.8;
        const end = -rect.height + vh * 0.5;
        const scrolled = start - rect.top;
        const total = start - end;
        const p = Math.max(0, Math.min(1, scrolled / total));
        progressRef.current = p;
        const idx = Math.min(stages.length - 1, Math.floor(p * stages.length));
        setActiveStage(idx);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-foreground"
      style={{ height: '320vh' }}
      aria-label="Watch a room come to life as you scroll"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1612] via-[#221d18] to-[#1a1612]" />

        {/* 3D Canvas or fallback */}
        <div className="absolute inset-0">
          {reducedMotion ? (
            <div className="flex h-full w-full items-center justify-center">
              <img
                src="https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Finished modern living room interior designed by Decorecy Interiors"
                className="h-full w-full object-cover opacity-60"
              />
            </div>
          ) : (
            inView && (
              <Suspense fallback={null}>
                <Room3DScene progressRef={progressRef} />
              </Suspense>
            )
          )}
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top label */}
          <div className="pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <span className="text-xs uppercase tracking-[0.25em] text-white/50">
                Watch It Come To Life
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                A Room, Built From Scratch
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/60 max-w-lg">
                Keep scrolling to watch an empty space transform into a finished
                interior — piece by piece.
              </p>
            </div>
          </div>

          {/* Stage indicator */}
          <div className="flex-1 flex items-end justify-center pb-16 lg:pb-20 px-4">
            <div className="w-full max-w-2xl">
              {/* Progress bar */}
              <div className="relative h-1 w-full rounded-full bg-white/15 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-white/80 rounded-full transition-all duration-200"
                  style={{ width: `${(activeStage + 1) * (100 / stages.length)}%` }}
                />
              </div>

              {/* Stage dots */}
              <div className="mt-4 flex items-center justify-between">
                {stages.map((stage, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1.5"
                    style={{ width: `${100 / stages.length}%` }}
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        i <= activeStage
                          ? 'bg-white scale-125'
                          : 'bg-white/25'
                      }`}
                    />
                    <span
                      className={`hidden sm:block text-[10px] uppercase tracking-wider transition-colors duration-300 ${
                        i === activeStage ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active stage hint */}
              <p className="mt-5 text-center font-serif text-lg sm:text-xl text-white/90">
                {stages[activeStage].hint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
