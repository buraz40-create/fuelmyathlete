"use client";

import { WeekGrid } from "@/components/planner/WeekGrid";
import { usePlan } from "@/components/planner/PlanProvider";
import { formatWeekRange } from "@/lib/planner/isoWeek";

export default function WeekViewPage() {
  const { plan, weekStart } = usePlan();
  const plannedCount = plan.entries.filter((e) => e.mealSlug).length;

  return (
    <section
      aria-labelledby="week-title"
      className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10"
    >
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Week of {formatWeekRange(weekStart)}
        </p>
        <h1 id="week-title" className="mt-1">
          The whole week
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {plannedCount} of 28 slots planned. Tap <span className="font-medium text-ink">Edit</span> on any day to change meals.
        </p>
      </header>

      <WeekGrid plan={plan} />
    </section>
  );
}
