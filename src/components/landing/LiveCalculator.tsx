"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { hydrationFor } from "@/data/hydration";
import { DAY_TYPES, DAY_TYPE_ORDER } from "@/data/dayTypes";
import { ageToCohort, cohortLabel, portionScale } from "@/lib/player/cohort";
import { WaterCup } from "@/components/planner/WaterCup";
import type { DayType, PlayerProfile } from "@/types/domain";

const TINT_BG: Record<DayType, string> = {
  school: "bg-day-school",
  training: "bg-day-training",
  match: "bg-day-match",
  rest: "bg-day-rest",
};

export function LiveCalculator() {
  const [age, setAge] = useState(11);
  const [weight, setWeight] = useState(88);
  const [dayType, setDayType] = useState<DayType>("training");

  const { goalOz, cohort, scale, calc } = useMemo(() => {
    const profile: PlayerProfile = {
      name: "Demo",
      ageYears: age,
      weightLb: weight,
      createdAt: "",
      updatedAt: "",
    };
    const calc = hydrationFor(profile, dayType);
    return {
      goalOz: calc.goalOz,
      cohort: ageToCohort(age),
      scale: portionScale(profile),
      calc,
    };
  }, [age, weight, dayType]);

  const cups = Math.ceil(goalOz / 8);
  const visibleCups = Math.min(cups, 16);
  const overflow = cups - visibleCups;

  return (
    <article
      aria-label="Live hydration calculator"
      className="relative overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-md md:p-7"
    >
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Try the math, live
          </p>
          <h3 className="mt-1 text-lg">Move the sliders</h3>
        </div>
        <span
          className={cn(
            "rounded-full border border-transparent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors",
            cohort === "child" && "bg-meal-snack text-ink",
            cohort === "teen" && "bg-meal-breakfast text-ink",
            cohort === "adult" && "bg-meal-dinner text-ink"
          )}
        >
          {cohortLabel(cohort)}
        </span>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <SliderControl
          label="Age"
          value={age}
          unit="years"
          min={5}
          max={99}
          onChange={setAge}
        />
        <SliderControl
          label="Weight"
          value={weight}
          unit="lb"
          min={40}
          max={400}
          onChange={setWeight}
        />
      </div>

      <div role="radiogroup" aria-label="Day type" className="mt-4 grid grid-cols-4 gap-1.5">
        {DAY_TYPE_ORDER.map((key) => {
          const active = dayType === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setDayType(key)}
              className={cn(
                "rounded-full border px-2 py-1.5 text-[11px] font-semibold capitalize transition",
                active
                  ? `${TINT_BG[key]} border-transparent text-ink shadow-sm`
                  : "border-border bg-surface text-muted-foreground hover:text-ink"
              )}
            >
              {DAY_TYPES[key].label.replace(" day", "")}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-primary-soft/40 p-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Water goal
            </p>
            <p className="mt-0.5 flex items-baseline gap-1">
              <AnimatedNumber value={goalOz} className="text-3xl font-bold text-ink md:text-4xl" />
              <span className="text-base text-muted-foreground">oz / day</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Portion scale
            </p>
            <p className="mt-0.5 text-lg font-bold text-ink">
              {scale.toFixed(2)}<span className="text-sm text-muted-foreground">×</span>
            </p>
          </div>
        </div>

        <ol
          aria-label={`${cups} cups`}
          className="mt-3 grid grid-cols-8 gap-1"
        >
          <AnimatePresence initial={false}>
            {Array.from({ length: visibleCups }, (_, i) => (
              <motion.li
                key={`cup-${i}`}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.18, delay: i * 0.01 }}
                className="grid aspect-square w-full place-items-center rounded-md bg-day-rest/30 p-0.5"
              >
                <WaterCup filled={true} size={18} className="text-ink" />
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>

        {overflow > 0 && (
          <p className="mt-2 text-[11px] text-muted-foreground">
            + {overflow} more cup{overflow === 1 ? "" : "s"}
          </p>
        )}

        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          Formula: {calc.formula}. {calc.capped && "Safety cap applied. "}This is a guide, not a target to force.
        </p>
      </div>
    </article>
  );
}

function SliderControl({
  label,
  value,
  unit,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        <span className="text-base font-bold text-ink">
          {value}
          <span className="ml-1 text-xs font-medium text-muted-foreground">{unit}</span>
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[color:var(--primary)]"
        aria-label={`${label} (${unit})`}
      />
    </label>
  );
}

function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 8, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className={cn("inline-block tabular-nums", className)}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}
