"use client";

import { mealPreferences } from "@/lib/player/preferences";
import { weeklySchedule } from "@/lib/player/schedule";
import { markPreferencesChanged, preferencesUpdatedAt } from "@/lib/player/preferences-clock";
import {
  chooseNewer,
  hasSettings,
  type StoredPreferences,
} from "@/lib/player/preferences-merge";

// Re-exported so callers have one place to import from, while the decision itself stays in a
// module the test runner can load.
export { chooseNewer, hasSettings, type StoredPreferences };

/** What this device currently believes, in the shape the column stores. */
export function localSnapshot(): StoredPreferences {
  return {
    excludedMeals: mealPreferences.excluded(),
    weeklySchedule: weeklySchedule.isCustomized() ? weeklySchedule.load() : null,
    updatedAt: preferencesUpdatedAt(),
  };
}

/** Write a remote record over the device's copy. Only call this once chooseNewer says so. */
export function applyToLocal(remote: StoredPreferences): void {
  for (const slug of mealPreferences.excluded()) {
    if (!remote.excludedMeals.includes(slug)) mealPreferences.restore(slug);
  }
  for (const slug of remote.excludedMeals) mealPreferences.exclude(slug);

  if (remote.weeklySchedule) weeklySchedule.save(remote.weeklySchedule);
  else weeklySchedule.clear();

  // Adopt the remote timestamp rather than stamping now, or this device would immediately look
  // newer than the one it just copied from and push the same values back.
  if (remote.updatedAt) markPreferencesChanged(remote.updatedAt);
}
