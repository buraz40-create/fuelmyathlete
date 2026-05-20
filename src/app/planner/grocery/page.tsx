"use client";

import { GroceryList } from "@/components/planner/GroceryList";
import { HydrationBanner } from "@/components/planner/HydrationBanner";
import { usePlan } from "@/components/planner/PlanProvider";
import { useGroceryList } from "@/hooks/useGroceryList";
import { formatWeekRange } from "@/lib/planner/isoWeek";

export default function GroceryPage() {
  const { plan, weekStart, toggleGroceryItem } = usePlan();
  const grouped = useGroceryList(plan);

  return (
    <section
      aria-labelledby="grocery-title"
      className="mx-auto w-full max-w-3xl px-4 py-6 md:px-8 md:py-10"
    >
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Week of {formatWeekRange(weekStart)}
        </p>
        <h1 id="grocery-title" className="mt-1">
          Grocery list
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Auto-built from your meal plan. Quantities scale by day type: match days +30%, rest days −10%.
        </p>
      </header>

      <div className="mb-6">
        <HydrationBanner plan={plan} />
      </div>

      <GroceryList
        grouped={grouped}
        checked={plan.groceryChecked}
        onToggle={toggleGroceryItem}
      />
    </section>
  );
}
