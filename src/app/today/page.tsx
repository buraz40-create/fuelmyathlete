"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { usePlan } from "@/components/planner/PlanProvider";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useHydration } from "@/hooks/useHydration";
import { Mascot } from "@/components/brand/Mascot";
import { WaterCup } from "@/components/planner/WaterCup";
import { resolveMeal } from "@/lib/catalog";
import { MEAL_SLOTS, DAY_TYPES, DAYS_OF_WEEK } from "@/data/dayTypes";
import { hydrationFor } from "@/data/hydration";
import { ageToCohort } from "@/lib/player/cohort";
import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/ui/ProgressRing";

// The kid view. Deliberately not a planner: no week grid, no grocery list, no portion
// multipliers, and per AAP guidance on calorie counting in pre-teens, no calories or macro
// split. Protein grams and water only, which is what the constraints allow a child to see.
export default function TodayPage() {
  const { plan, custom } = usePlan();
  const { profile } = usePlayerProfile();

  const today = new Date().getDay();
  const entries = plan.entries.filter((e) => e.dayOfWeek === today);
  const dayType = entries[0]?.dayType ?? "school";
  const dayMeta = DAY_TYPES[dayType];

  const calc = profile ? hydrationFor(profile, dayType, false) : null;
  const { cups, oz, ozPerCup, capOz, maxCups, atCap, increment, decrement } = useHydration({
    capOz: calc?.capOz,
  });

  const goalOz = calc?.goalOz ?? 64;
  const goalCups = Math.ceil(goalOz / ozPerCup);
  const cupsToShow = Math.min(maxCups, Math.max(goalCups, cups));
  const hitGoal = oz >= goalOz;

  const planned = entries
    .map((e) => ({ slot: e.slot, meal: e.mealSlug ? resolveMeal(e.mealSlug, custom) : undefined }))
    .filter((x) => x.meal);

  const proteinG = planned.reduce((sum, x) => sum + (x.meal?.nutrition?.proteinG ?? 0), 0);
  const firstName = profile?.name?.split(" ")[0] ?? "Athlete";
  const isKid = profile ? ageToCohort(profile.ageYears) === "child" : true;

  return (
    <section
      aria-labelledby="today-title"
      className="mx-auto w-full max-w-2xl px-4 py-6 md:px-8 md:py-10"
    >
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {DAYS_OF_WEEK[today].long}
          </p>
          <h1 id="today-title" className="mt-1">
            Hey {firstName}
          </h1>
          <p
            className={cn(
              "mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-ink",
              dayMeta.tokenClass
            )}
          >
            {dayMeta.label}
          </p>
        </div>
        <Mascot
          size={80}
          expression={hitGoal ? "cheer" : "happy"}
          className="hidden flex-shrink-0 sm:block"
        />
      </header>

      <article
        aria-labelledby="water-title"
        className="mt-6 rounded-3xl border border-border bg-surface p-5 shadow-sm"
      >
        <header className="flex items-center gap-5">
          {/*
            The dial rather than a line of text. This is the first thing on the screen a child
            opens, and "6 / 8 cups" in a corner is something you read; a ring you have half
            filled is something you see.

            It turns warning at the cap, which is not decoration: the ceiling exists because
            children are more vulnerable than adults to drinking too much too quickly, so the
            one moment this must not look like an achievement is when it is full.
          */}
          <ProgressRing
            value={oz}
            max={goalOz}
            size={104}
            tone={atCap ? "warning" : "primary"}
            label={`${oz} of ${goalOz} ounces of water today`}
          >
            <span className="text-2xl font-bold text-ink">{cups}</span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              of {goalCups} cups
            </span>
          </ProgressRing>

          <div className="min-w-0">
            <h2 id="water-title" className="text-xl">
              Water
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {atCap
                ? "That is enough for today. More is not better."
                : hitGoal
                  ? `${oz} oz. Goal reached.`
                  : `${oz} oz of ${goalOz}. Sip through the day.`}
            </p>
          </div>
        </header>

        <ol aria-label={`${cups} cups of ${goalCups}`} className="mt-4 grid grid-cols-5 gap-2">
          {Array.from({ length: cupsToShow }, (_, i) => i < cups).map((filled, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => (filled && i === cups - 1 ? decrement() : increment())}
                disabled={!filled && atCap}
                aria-label={
                  filled ? `Cup ${i + 1} full, tap to undo` : `Cup ${i + 1} empty, tap to fill`
                }
                aria-pressed={filled}
                className={cn(
                  "grid aspect-square w-full place-items-center rounded-2xl border transition active:scale-95",
                  filled
                    ? "border-transparent bg-day-rest/40 shadow-sm"
                    : "border-border bg-muted/20 hover:border-primary/40",
                  !filled && atCap && "opacity-40"
                )}
              >
                <WaterCup
                  filled={filled}
                  size={36}
                  className={filled ? "text-ink" : "text-muted-foreground/50"}
                />
              </button>
            </li>
          ))}
        </ol>

        <p className="mt-3 text-sm text-muted-foreground">
          {atCap
            ? `That is ${capOz} oz. That is plenty for one day, so stop here.`
            : hitGoal
            ? "Goal hit. Drink when you are thirsty from here."
            : `${goalCups - cups} more to go. Sip through the day, do not chug it at the end.`}
        </p>
      </article>

      <article
        aria-labelledby="food-title"
        className="mt-4 rounded-3xl border border-border bg-surface p-5 shadow-sm"
      >
        <header className="flex items-baseline justify-between">
          <h2 id="food-title" className="text-xl">
            Eating today
          </h2>
          {proteinG > 0 && (
            <p className="text-sm text-muted-foreground">
              <span className="text-2xl font-bold text-ink">{proteinG}</span> g protein
            </p>
          )}
        </header>

        {planned.length === 0 ? (
          <div className="mt-4 rounded-2xl bg-muted/30 p-4 text-sm text-muted-foreground">
            <p>Nothing picked for today yet.</p>
            <Link
              href="/planner"
              className="mt-3 inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-2"
            >
              Go pick some food
              <ArrowRight size={14} weight="bold" aria-hidden />
            </Link>
          </div>
        ) : (
          <ol className="mt-4 space-y-2">
            {MEAL_SLOTS.map(({ slot, label }) => {
              const found = planned.find((p) => p.slot === slot);
              if (!found?.meal) return null;
              const meal = found.meal;
              // The same row as the recipe list, so a meal looks like the same object wherever
              // it appears. Without the photograph these were four lines of text, and the one
              // screen a child opens had nothing on it to recognise the food by.
              const body = (
                <>
                  {meal.imageUrl ? (
                    <span className="relative block aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={meal.imageUrl}
                        alt=""
                        fill
                        // 64px on screen, so ask for 128 and let a dense display have the rest.
                        sizes="128px"
                        className="object-cover"
                      />
                    </span>
                  ) : (
                    <span className="block w-16 shrink-0" aria-hidden />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </span>
                    <span className="mt-0.5 block font-medium leading-snug text-ink">
                      {meal.name}
                    </span>
                  </span>
                </>
              );
              return (
                <li
                  key={slot}
                  className="overflow-hidden rounded-2xl border border-border bg-background"
                >
                  {meal.recipeSlug ? (
                    <Link
                      href={`/recipe/${meal.recipeSlug}`}
                      className="flex items-center gap-3 p-2 pr-3 transition active:bg-muted/40"
                    >
                      {body}
                    </Link>
                  ) : (
                    <span className="flex items-center gap-3 p-2 pr-3">{body}</span>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </article>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {isKid
          ? "Food and water only. Numbers like calories are a grown-up thing, and they are not on this screen on purpose."
          : "A simplified daily view. The full week lives in the planner."}{" "}
        <Link href="/planner" className="underline underline-offset-2">
          Open the planner
        </Link>
      </p>
    </section>
  );
}
