"use client";

import { useState } from "react";
import { DayPicker } from "@/components/planner/DayPicker";
import { DayTypeSelector } from "@/components/planner/DayTypeSelector";
import { MealSlotCard } from "@/components/planner/MealSlotCard";
import { MealPickerSheet } from "@/components/planner/MealPickerSheet";
import { NutritionTip } from "@/components/planner/NutritionTip";
import { WaterTracker } from "@/components/planner/WaterTracker";
import { HydrationHistory } from "@/components/planner/HydrationHistory";
import { HowItWorks } from "@/components/planner/HowItWorks";
import { WeekProgress } from "@/components/planner/WeekProgress";
import { WeekSwitcher } from "@/components/planner/WeekSwitcher";
import { usePlan } from "@/components/planner/PlanProvider";
import { MEAL_SLOTS, DAYS_OF_WEEK } from "@/data/dayTypes";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { ageToCohort } from "@/lib/player/cohort";
import { hydrationFor } from "@/data/hydration";
import type { MealSlot } from "@/types/domain";

export default function PlannerPage() {
  const {
    plan,
    weekStart,
    isCurrentWeek,
    previousWeekHasPlan,
    hydrated,
    plannedCount,
    updateEntry,
    setDayType,
    smartFillWeek,
    resetWeek,
    nextWeek,
    prevWeek,
    goToCurrentWeek,
    copyPreviousWeek,
  } = usePlan();
  const { profile } = usePlayerProfile();
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [pickerSlot, setPickerSlot] = useState<MealSlot | null>(null);

  const dayEntries = plan.entries.filter((e) => e.dayOfWeek === selectedDay);
  const currentDayType = dayEntries[0]?.dayType ?? "school";
  const dayMeta = DAYS_OF_WEEK[selectedDay];
  const athleteName = profile?.name || "your athlete";
  const cohort = profile ? ageToCohort(profile.ageYears) : "child";
  const possessive = cohort === "adult" ? "they" : "he";
  const goalOzForDay = profile ? hydrationFor(profile, currentDayType, false).goalOz : 64;

  function entryFor(slot: MealSlot) {
    return dayEntries.find((e) => e.slot === slot);
  }

  return (
    <section
      aria-labelledby="planner-title"
      className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10"
    >
      <header className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Your plan
          </p>
          <WeekSwitcher
            weekStart={weekStart}
            isCurrentWeek={isCurrentWeek}
            onPrev={prevWeek}
            onNext={nextWeek}
            onToday={goToCurrentWeek}
          />
        </div>
        <h1 id="planner-title" className="mt-1">
          Fuel the week for {athleteName}
        </h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          {cohort === "adult"
            ? "Pick what you'll eat each day, and we'll do the math on portions, hydration, and the grocery list."
            : `Pick what ${possessive}'ll eat each day, and we'll do the math on portions, hydration, and the grocery list.`}
        </p>
      </header>

      <HowItWorks />
      <WeekProgress
        plannedCount={plannedCount}
        total={28}
        canCopyPreviousWeek={previousWeekHasPlan}
        onSmartFill={smartFillWeek}
        onCopyPreviousWeek={copyPreviousWeek}
        onClear={resetWeek}
      />

      <article
        aria-labelledby="day-title"
        className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
      >
        <header className="mb-4">
          <h2 id="day-title" className="text-2xl">
            Pick a day
          </h2>
        </header>

        <DayPicker selected={selectedDay} onSelect={setSelectedDay} plan={plan} />

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            <section aria-labelledby="daytype-title">
              <header className="mb-3">
                <h3 id="daytype-title" className="text-xl">
                  What&apos;s on for {dayMeta.long}?
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Portions and recommendations adjust to match.
                </p>
              </header>
              <DayTypeSelector
                value={currentDayType}
                onChange={(type) => setDayType(selectedDay, type)}
              />
            </section>

            <section aria-labelledby="meals-title">
              <header className="mb-3">
                <h3 id="meals-title" className="text-xl">
                  Build the plate
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Tap any slot. Picks save automatically.
                </p>
              </header>
              <ol className="grid gap-3 sm:grid-cols-2">
                {MEAL_SLOTS.map(({ slot }) => {
                  const entry = entryFor(slot);
                  return (
                    <li key={slot}>
                      <MealSlotCard
                        slot={slot}
                        dayType={currentDayType}
                        mealSlug={entry?.mealSlug ?? null}
                        onPick={() => setPickerSlot(slot)}
                        onClear={() => updateEntry(selectedDay, slot, null)}
                      />
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>

          <aside className="space-y-4">
            <WaterTracker dayType={currentDayType} />
            <HydrationHistory goalOz={goalOzForDay} />
            <NutritionTip dayType={currentDayType} />
            {!hydrated && (
              <p className="text-xs text-muted-foreground">Loading your plan…</p>
            )}
          </aside>
        </div>
      </article>

      <MealPickerSheet
        open={pickerSlot !== null}
        onOpenChange={(o) => !o && setPickerSlot(null)}
        slot={pickerSlot}
        dayType={currentDayType}
        selectedSlug={pickerSlot ? entryFor(pickerSlot)?.mealSlug ?? null : null}
        onSelect={(slug) => pickerSlot && updateEntry(selectedDay, pickerSlot, slug)}
      />
    </section>
  );
}
