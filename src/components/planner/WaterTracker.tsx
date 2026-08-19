"use client";

import { useMemo } from "react";
import { Plus, Minus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { useHydration } from "@/hooks/useHydration";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { hydrationFor } from "@/data/hydration";
import { ageToCohort } from "@/lib/player/cohort";
import { dayTypeLabel } from "@/data/dayTypes";
import { WaterCup } from "@/components/planner/WaterCup";
import type { DayType } from "@/types/domain";

interface WaterTrackerProps {
  dayType: DayType;
}

export function WaterTracker({ dayType }: WaterTrackerProps) {
  const { profile } = usePlayerProfile();
  // Hot weather is passed explicitly rather than defaulted, so a January goal is not
  // silently inflated by 10%. The heat case is surfaced by HydrationBanner instead.
  const calc = profile ? hydrationFor(profile, dayType, false) : null;
  const { cups, oz, ozPerCup, capOz, maxCups, atCap, increment, decrement } = useHydration({
    capOz: calc?.capOz,
  });
  const goalOz = calc?.goalOz ?? 64;
  const goalCups = Math.ceil(goalOz / ozPerCup);
  const cohort = profile ? ageToCohort(profile.ageYears) : null;
  const pct = Math.min(100, Math.round((oz / goalOz) * 100));
  const reached = oz >= goalOz;
  const dayLabel = dayTypeLabel(dayType, cohort ?? "child");

  const slots = useMemo(
    () => Array.from({ length: Math.min(maxCups, Math.max(goalCups, cups)) }, (_, i) => i < cups),
    [cups, goalCups, maxCups]
  );

  return (
    <section
      aria-labelledby="water-title"
      className="rounded-3xl border border-border bg-surface p-4 shadow-sm md:p-5"
    >
      <header className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Water today
          </p>
          <h3 id="water-title" className="mt-0.5 text-lg">
            {oz} <span className="text-muted-foreground">/ {goalOz} oz</span>
          </h3>
        </div>
        <span
          className="rounded-full border border-border bg-day-rest/40 px-2.5 py-1 text-[11px] font-medium text-ink"
          title={dayLabel}
        >
          {dayLabel} goal
        </span>
      </header>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goalOz}
        aria-valuenow={oz}
        aria-label={`Hydration progress: ${oz} of ${goalOz} ounces`}
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            reached ? "bg-success" : "bg-[color:var(--day-rest)] brightness-90"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      <ol
        aria-label={`${cups} cups logged of ${goalCups}`}
        className="mt-4 grid grid-cols-4 gap-2"
      >
        {slots.map((filled, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => (filled && i === cups - 1 ? decrement() : increment())}
              aria-label={filled ? `Cup ${i + 1} filled, tap to remove` : `Cup ${i + 1} empty, tap to fill`}
              aria-pressed={filled}
              className={cn(
                "flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-2xl border transition",
                filled
                  ? "border-transparent bg-day-rest/30 shadow-sm"
                  : "border-border bg-muted/20 hover:border-primary/40 hover:bg-primary-soft/30"
              )}
            >
              <WaterCup
                filled={filled}
                size={40}
                className={cn(
                  "transition",
                  filled ? "text-ink" : "text-muted-foreground/60"
                )}
              />
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {(i + 1) * ozPerCup}
                <span className="ml-px text-[8px]">oz</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {atCap ? (
            <>
              That is {capOz}oz, the safe daily maximum. More is not better, so stop here for
              today.
            </>
          ) : reached ? (
            <>Goal hit. Drink to thirst from here.</>
          ) : (
            <>
              {goalCups - cups} more cup{goalCups - cups === 1 ? "" : "s"} to hit the goal.
            </>
          )}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={decrement}
            disabled={cups === 0}
            aria-label="Remove a cup"
            className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-ink disabled:opacity-40 disabled:hover:text-muted-foreground"
          >
            <Minus size={14} weight="bold" aria-hidden />
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={atCap}
            aria-label={atCap ? `Daily maximum of ${capOz} ounces reached` : "Add a cup"}
            className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40 disabled:hover:opacity-40"
          >
            <Plus size={14} weight="bold" aria-hidden />
          </button>
        </div>
      </div>

      <details className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-medium text-ink/70 hover:text-ink">
          How is this calculated?
        </summary>
        {calc && profile && (
          <p className="mt-2 leading-relaxed">
            For {profile.name} ({profile.ageYears}y, {profile.weightLb}lb): {calc.baselineOz}oz baseline
            {calc.exerciseAddOz > 0 && <>, +{calc.exerciseAddOz}oz for {dayType}</>}
            {calc.hotWeatherAddOz > 0 && <>, +{calc.hotWeatherAddOz}oz hot weather</>}
            {calc.capped && <>, capped at {calc.capOz}oz</>}. Formula: {calc.formula}.
          </p>
        )}
        <p className="mt-2 leading-relaxed">
          On a hot day, add roughly 10% more, never 25%. Logging stops at {capOz}oz because that
          is the safe daily ceiling.
        </p>
        <p className="mt-2 leading-relaxed">
          <strong className="text-ink/80">Important:</strong> this is a guide, not a target to force.
          Stop drinking when full.{" "}
          {cohort === "child" &&
            "Drinking far past thirst is dangerous for kids, because too much plain water dilutes blood sodium (hyponatremia)."}
        </p>
      </details>
    </section>
  );
}
