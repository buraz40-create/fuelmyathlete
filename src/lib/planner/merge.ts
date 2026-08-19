import type { MealPlan } from "@/types/domain";

// The old behaviour was `if (remote) setPlan(remote)`, with a comment claiming remote won only
// if newer and no comparison anywhere. Remote always won, so opening the app on a second
// device silently discarded whatever had been planned locally since the last sync.
//
// Merge per cell rather than per week. Two parents filling different days is the realistic
// case, and last-write-wins on the whole week throws away one of them. Within a single cell
// the newer side wins, which is as far as this needs to go without a real CRDT.
export function mergePlans(local: MealPlan, remote: MealPlan): MealPlan {
  const localTime = Date.parse(local.updatedAt ?? "") || 0;
  const remoteTime = Date.parse(remote.updatedAt ?? "") || 0;
  const remoteIsNewer = remoteTime >= localTime;

  const remoteByCell = new Map(
    remote.entries.map((e) => [`${e.dayOfWeek}:${e.slot}`, e] as const)
  );

  return {
    ...(remoteIsNewer ? remote : local),
    weekStart: local.weekStart,
    entries: local.entries.map((localEntry) => {
      const remoteEntry = remoteByCell.get(`${localEntry.dayOfWeek}:${localEntry.slot}`);
      if (!remoteEntry) return localEntry;
      // An empty cell never beats a filled one. Losing a pick is worse than keeping a stale
      // one, because the parent can see and change a wrong meal but cannot see a missing one.
      if (localEntry.mealSlug && !remoteEntry.mealSlug) return localEntry;
      if (!localEntry.mealSlug && remoteEntry.mealSlug) return remoteEntry;
      return remoteIsNewer ? remoteEntry : localEntry;
    }),
    groceryChecked: remoteIsNewer
      ? { ...local.groceryChecked, ...remote.groceryChecked }
      : { ...remote.groceryChecked, ...local.groceryChecked },
  };
}
