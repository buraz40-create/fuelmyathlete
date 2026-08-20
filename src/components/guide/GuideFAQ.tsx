"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import type { GuideFaqItem } from "@/types/domain";

// Collapsed by default so the list is scannable, which is how people read an FAQ: they look
// for their own question rather than reading all six answers.
//
// The answers stay in the DOM either way. FAQPage structured data claims they are on the page,
// and hiding them behind a click that a crawler never performs would make that claim false.
export function GuideFAQ({ items }: { items: GuideFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="faq-title"
      id="faq"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
    >
      <h2 id="faq-title" className="text-2xl font-semibold text-ink">
        Frequently asked questions
      </h2>

      <dl className="mt-5 flex flex-col">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="border-b border-border last:border-0">
              <dt>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-start justify-between gap-4 py-4 text-left"
                >
                  <span
                    className={cn(
                      "text-base font-semibold transition-colors",
                      open ? "text-primary" : "text-ink"
                    )}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.2 }}
                    className="mt-0.5 flex-shrink-0 text-muted-foreground"
                  >
                    <CaretDown size={16} weight="bold" />
                  </motion.span>
                </button>
              </dt>

              {/* Every answer stays mounted and is collapsed with height, never unmounted.
                  The page carries FAQPage structured data, which asserts these answers are on
                  the page; rendering only the open one would make that assertion false and
                  strip five of six answers out of the HTML a crawler reads. */}
              <motion.dd
                id={`faq-answer-${i}`}
                aria-hidden={!open}
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
              >
                <p className="pb-4">{item.answer}</p>
              </motion.dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
