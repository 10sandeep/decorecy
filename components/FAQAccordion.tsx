'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FAQ } from '@/lib/faq';

export function FAQAccordion({
  faqs,
  heading = 'Frequently Asked Questions',
  subheading,
}: {
  faqs: FAQ[];
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            FAQ
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-serif text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
