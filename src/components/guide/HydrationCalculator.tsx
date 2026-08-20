"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Drop, Warning } from "@phosphor-icons/react/dist/ssr";
import { hydrationFor } from "@/data/hydration";
import { cn } from "@/lib/utils";
import type { DayType, PlayerProfile } from "@/types/domain";

// Runs the same hydrationFor the planner uses, rather than a second copy of the numbers
// written into the guide. If the safety model ever changes, this page changes with it instead
// of quietly disagreeing with the app.

const DAYS: { key: DayType; label: string; tint: string }[] = [
  { key: "rest", label: "Rest", tint: "bg-day-rest" },
  { key: "school", label: "School", tint: "bg-day-school" },
  { key: "training", label: "Training", tint: "bg-day-training" },
  { key: "match", label: "Match", tint: "bg-day-match" },
];

export function HydrationCalculator() {
  const [age, setAge] = useState(11);
  const [weight, setWeight] = useState(88);
  const [dayType, setDayType] = useState<DayType>("training");
  const [hot, setHot] = useState(false);
  const reduced = useReducedMotion();

  const calc = useMemo(() => {
    const profile: PlayerProfile = {
      name: "Athlete",
      ageYears: age,
      weightLb: weight,
      createdAt: "",
      updatedAt: "",
    };
    return hydrationFor(profile, dayType, hot);
  }, [age, weight, dayType, hot]);

  const cups = Math.round(calc.goalOz / 8);
  const needsWeight = age >= 13;

  return (
    <section
      aria-labelledby="hydration-calc-title"
      className="not-prose rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Try it</p>
      <h3 id="hydration-calc-title" className="mt-1 text-xl">
        Work out your athlete&apos;s day
      </h3>

      <div className="mt-5 grid gap-5 md:grid-cols-[1fr_200px]">
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="flex items-baseline justify-between text-sm font-medium text-ink">
              Age
              <span className="tabular-nums text-muted-foreground">{age}</span>
            </span>
            <input
              type="range"
              min={8}
              max={18}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="mt-2 w-full accent-[color:var(--primary)]"
            />
          </label>

          {needsWeight && (
            <label className="block">
              <span className="flex items-baseline justify-between text-sm font-medium text-ink">
                Weight
                <span className="tabular-nums text-muted-foreground">{weight} lb</span>
              </span>
              <input
                type="range"
                min={60}
                max={220}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="mt-2 w-full accent-[color:var(--primary)]"
              />
            </label>
          )}

          <div role="radiogroup" aria-label="Day type" className="flex flex-wrap gap-1.5">
            {DAYS.map((d) => {
              const active = dayType === d.key;
              return (
                <button
                  key={d.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setDayType(d.key)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    active
                      ? cn("border-transparent text-ink", d.tint)
                      : "border-border text-muted-foreground hover:text-ink"
                  )}
                >
                  {d.label}
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={hot}
              onChange={(e) => setHot(e.target.checked)}
              className="h-4 w-4 accent-[color:var(--primary)]"
            />
            Hot weather (adds 10%, not 25%)
          </label>
        </div>

        <div className="flex flex-col justify-center rounded-3xl bg-primary-soft/50 px-5 py-6 text-center">
          <motion.p
            key={calc.goalOz}
            initial={reduced ? false : { y: -6 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-baseline justify-center gap-1"
          >
            <Drop size={20} weight="duotone" aria-hidden className="text-primary" />
            <span className="text-4xl font-bold tabular-nums text-ink">{calc.goalOz}</span>
            <span className="text-sm font-semibold text-muted-foreground">oz</span>
          </motion.p>
          <p className="mt-1 text-xs text-muted-foreground">about {cups} cups over the day</p>

          <p className="mt-3 border-t border-primary/15 pt-3 text-[11px] leading-relaxed text-muted-foreground">
            {calc.baselineOz} baseline
            {calc.exerciseAddOz > 0 && ` + ${calc.exerciseAddOz} for the session`}
            {calc.hotWeatherAddOz > 0 && ` + ${calc.hotWeatherAddOz} for heat`}
          </p>
        </div>
      </div>

      {calc.capped && (
        <p
          role="note"
          className="mt-4 flex items-start gap-2 rounded-2xl border border-day-match/60 bg-day-match/20 px-4 py-3 text-sm text-ink"
        >
          <Warning size={16} weight="duotone" aria-hidden className="mt-0.5 flex-shrink-0" />
          <span>
            The arithmetic came out above the {calc.capOz} oz ceiling for this age, so the
            ceiling wins. More fluid past this point is not safer, it is the direction
            hyponatremia lies in.
          </span>
        </p>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        Same formula the planner uses: {calc.formula}. Guidance, not a target to force. Thirst
        and pale straw urine are better signals than any number on a screen.
      </p>
    </section>
  );
}
