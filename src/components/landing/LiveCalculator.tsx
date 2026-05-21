"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { hydrationFor } from "@/data/hydration";
import { DAY_TYPE_ORDER, dayTypeShortLabel } from "@/data/dayTypes";
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
  const visibleCups = Math.min(cups, 20);
  const overflow = cups - visibleCups;

  return (
    <article
      aria-label="Live hydration calculator"
      className="relative overflow-hidden rounded-3xl border border-border bg-surface p-4 shadow-md md:p-7"
    >
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Try the math, live
          </p>
          <h3 className="mt-1 text-lg">Move the sliders</h3>
        </div>
        <span
          className={cn(
            "flex-shrink-0 rounded-full border border-transparent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors md:text-[11px]",
            cohort === "child" && "bg-meal-snack text-ink",
            cohort === "teen" && "bg-meal-breakfast text-ink",
            cohort === "adult" && "bg-meal-dinner text-ink"
          )}
        >
          {cohortLabel(cohort)}
        </span>
      </header>

      <div className="mt-5 flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-4">
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

      <div role="radiogroup" aria-label="Day type" className="mt-5 grid grid-cols-4 gap-2">
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
                "rounded-full border px-2 py-2 text-xs font-semibold capitalize transition",
                active
                  ? `${TINT_BG[key]} border-transparent text-ink shadow-sm`
                  : "border-border bg-surface text-muted-foreground hover:text-ink"
              )}
            >
              {dayTypeShortLabel(key, cohort)}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-primary-soft/40 p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-[11px]">
              Water goal
            </p>
            <p className="mt-0.5 flex items-baseline gap-1">
              <AnimatedNumber value={goalOz} className="text-3xl font-bold text-ink md:text-4xl" />
              <span className="text-sm text-muted-foreground md:text-base">oz / day</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-[11px]">
              Portion scale
            </p>
            <p className="mt-0.5 text-lg font-bold text-ink">
              {scale.toFixed(2)}
              <span className="text-sm text-muted-foreground">×</span>
            </p>
          </div>
        </div>

        <ol
          aria-label={`${cups} cups`}
          className="mt-3 grid grid-cols-5 gap-1.5 md:grid-cols-10"
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
                <WaterCup filled={true} size={22} className="text-ink" />
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
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-xl font-bold text-ink">
          {value}
          <span className="ml-1 text-xs font-medium text-muted-foreground">{unit}</span>
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-border bg-surface text-ink transition active:scale-95 hover:border-primary disabled:opacity-40 disabled:hover:border-border"
        >
          <Minus size={16} weight="bold" aria-hidden />
        </button>

        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${label} (${unit})`}
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${pct}%, color-mix(in srgb, var(--muted) 65%, transparent) ${pct}%, color-mix(in srgb, var(--muted) 65%, transparent) 100%)`,
          }}
          className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full outline-none touch-pan-y
            focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[color:var(--primary)]
            [&::-webkit-slider-thumb]:bg-surface
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:cursor-grab
            [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-webkit-slider-thumb]:active:scale-110
            [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[color:var(--primary)]
            [&::-moz-range-thumb]:bg-surface
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-grab
            [&::-moz-range-thumb]:active:cursor-grabbing"
        />

        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-border bg-surface text-ink transition active:scale-95 hover:border-primary disabled:opacity-40 disabled:hover:border-border"
        >
          <Plus size={16} weight="bold" aria-hidden />
        </button>
      </div>
    </div>
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
