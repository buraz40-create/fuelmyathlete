"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock, ForkKnife, Drop, Trophy } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

// Every guide on this topic prints the same table: "3 to 4 hours before", "30 to 60 minutes
// before". A parent standing in a kitchen has to do the arithmetic against an 8am kickoff
// while finding shin pads. This does the arithmetic.

interface Step {
  minutesBefore: number;
  label: string;
  detail: string;
  kind: "meal" | "snack" | "drink" | "kickoff";
}

const STEPS: Step[] = [
  {
    minutesBefore: 210,
    label: "Main meal",
    detail: "Carb-forward and familiar: pasta, rice, a sandwich. Low fat, low fibre.",
    kind: "meal",
  },
  {
    minutesBefore: 120,
    label: "Drink 16 oz",
    detail: "Early enough to absorb it and still find a bathroom before warm-ups.",
    kind: "drink",
  },
  {
    minutesBefore: 45,
    label: "Top-up snack",
    detail: "A banana, a few pretzels, apple sauce. Small and fast.",
    kind: "snack",
  },
  {
    minutesBefore: 15,
    label: "Drink 8 oz",
    detail: "Last sip. Nothing new, nothing fizzy.",
    kind: "drink",
  },
  { minutesBefore: 0, label: "Kickoff", detail: "", kind: "kickoff" },
];

const ICON = {
  meal: ForkKnife,
  snack: ForkKnife,
  drink: Drop,
  kickoff: Trophy,
} as const;

const TINT = {
  meal: "bg-meal-dinner",
  snack: "bg-meal-snack",
  drink: "bg-day-rest",
  kickoff: "bg-day-match",
} as const;

function formatClock(kickoff: string, minutesBefore: number): string {
  const [h, m] = kickoff.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return "--:--";
  const d = new Date();
  d.setHours(h, m - minutesBefore, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function KickoffTimeline({ defaultKickoff = "09:00" }: { defaultKickoff?: string }) {
  const [kickoff, setKickoff] = useState(defaultKickoff);
  const reduced = useReducedMotion();

  const rows = useMemo(
    () => STEPS.map((s) => ({ ...s, at: formatClock(kickoff, s.minutesBefore) })),
    [kickoff]
  );

  // A 6am kickoff cannot fit a full meal three hours earlier without waking a child at 3am.
  const early = Number(kickoff.split(":")[0]) < 8;

  return (
    <section
      aria-labelledby="kickoff-timeline-title"
      className="not-prose rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Try it
          </p>
          <h3 id="kickoff-timeline-title" className="mt-1 text-xl">
            Your game day, by the clock
          </h3>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <Clock size={16} weight="duotone" aria-hidden className="text-primary" />
          <span>Kickoff</span>
          <input
            type="time"
            value={kickoff}
            onChange={(e) => setKickoff(e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-1.5 text-sm text-ink"
          />
        </label>
      </header>

      <ol className="mt-5 flex flex-col">
        {rows.map((row, i) => {
          const Icon = ICON[row.kind];
          const isKickoff = row.kind === "kickoff";
          return (
            <li key={row.label} className="relative flex gap-4 pb-5 last:pb-0">
              {/* The rail, drawn behind the markers, stopping at the last one. */}
              {i < rows.length - 1 && (
                <span aria-hidden className="absolute left-[15px] top-8 h-full w-px bg-border" />
              )}

              <span
                aria-hidden
                className={cn(
                  "grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-ink",
                  TINT[row.kind]
                )}
              >
                <Icon size={16} weight="duotone" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  {/* Keyed on the value so each recalculation animates, which makes cause and
                      effect visible when the kickoff time changes. Movement only, never
                      opacity: a number that fades in is a number that is missing until the
                      animation runs, and this one is the whole point of the component. */}
                  <motion.span
                    key={row.at}
                    initial={reduced ? false : { y: -5 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.22, delay: reduced ? 0 : i * 0.03 }}
                    className={cn(
                      "tabular-nums font-semibold",
                      isKickoff ? "text-lg text-primary" : "text-base text-ink"
                    )}
                  >
                    {row.at}
                  </motion.span>
                  <span className="text-sm font-medium text-ink">{row.label}</span>
                  {!isKickoff && (
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {row.minutesBefore >= 60
                        ? `${Math.round((row.minutesBefore / 60) * 10) / 10} h before`
                        : `${row.minutesBefore} min before`}
                    </span>
                  )}
                </p>
                {row.detail && (
                  <p className="mt-0.5 text-sm text-muted-foreground">{row.detail}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {early && (
        <p
          role="note"
          className="mt-2 rounded-2xl bg-primary-soft/60 px-4 py-3 text-sm text-ink"
        >
          That main meal lands before most children are awake. For an early kickoff, move it to
          dinner the night before and make the morning liquid: milk, a smoothie, or a banana.
        </p>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        Timings follow AAP guidance on pre-activity meals for children and NATA fluid
        replacement guidance. Shift anything that upsets your athlete&apos;s stomach, and never test
        a new food on a game day.
      </p>
    </section>
  );
}
