"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { GuideSection } from "@/types/domain";

// The contents list doubles as a position indicator. A static list tells you what exists; this
// tells you where you are in it, which is the thing you actually want two thousand words in.
export function GuideTOC({ sections }: { sections: GuideSection[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    // The top third of the viewport is the reading line. Anything above it counts as read.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Table of contents"
      data-print-hide
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        In this guide
      </p>
      <ol className="mt-3 flex flex-col text-sm">
        {sections.map((s, i) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id} className="relative">
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex gap-2.5 rounded-xl px-2 py-1.5 transition-colors",
                  isActive ? "text-ink" : "text-muted-foreground hover:text-ink"
                )}
              >
                <span className="w-5 flex-shrink-0 text-right tabular-nums opacity-70">
                  {i + 1}.
                </span>
                <span className="font-medium">{s.heading}</span>
              </a>

              {isActive && (
                <motion.span
                  aria-hidden
                  layoutId="toc-active"
                  transition={
                    reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                  }
                  className="absolute inset-y-0 left-0 -z-10 w-full rounded-xl bg-primary-soft/70"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
