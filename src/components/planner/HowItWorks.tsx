"use client";

import { useEffect, useState } from "react";
import { CalendarPlus, ListChecks, Lightning, Question, X } from "@phosphor-icons/react/dist/ssr";

const STORAGE_KEY = "fma:tour-dismissed";

const STEPS = [
  {
    icon: CalendarPlus,
    title: "Pick meals",
    body: "Tap any slot (breakfast, lunch, snack, dinner) and choose from athlete-friendly options.",
  },
  {
    icon: Lightning,
    title: "Set the day type",
    body: "School, training, match, or rest. Portions and recommendations scale automatically.",
  },
  {
    icon: ListChecks,
    title: "Get a grocery list",
    body: "Open the Grocery tab. Quantities get added up and grouped by aisle. Check things off as you shop.",
  },
];

export function HowItWorks() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration of a localStorage flag; SSR renders the banner and the client hides it on mount if already dismissed.
    if (stored === "1") setDismissed(true);
  }, []);

  function dismiss() {
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "1");
    }
  }

  function reopen() {
    setDismissed(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  if (dismissed) {
    return (
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={reopen}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-ink hover:border-primary/40"
        >
          <Question size={14} weight="duotone" aria-hidden />
          How this works
        </button>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="how-title"
      className="relative mb-6 overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss intro"
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-ink"
      >
        <X size={16} weight="bold" aria-hidden />
      </button>

      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          New here? Here&apos;s the loop
        </p>
        <h2 id="how-title" className="mt-1 text-xl md:text-2xl">
          Plan the week → Shop once → Cook smart
        </h2>
      </header>

      <ol className="grid gap-3 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <li
            key={title}
            className="flex gap-3 rounded-2xl bg-primary-soft/40 p-3"
          >
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Icon size={18} weight="duotone" aria-hidden />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Step {i + 1}
              </p>
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
