"use client";

import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { ageToCohort } from "@/lib/player/cohort";
import { cn } from "@/lib/utils";

// parent_show_calories_to_teen has existed in the schema, the domain type, and the calorie
// gate since the start, with no way for a parent to actually set it. So a 15-year-old's parent
// got the child treatment permanently, with no explanation and no control.
//
// Shown only for the teen cohort on purpose. Under 13 this is not a parental choice, per AAP
// guidance on weight-control practices in young athletes. Adults see their own numbers.
export function TeenCalorieToggle() {
  const { profile, hydrated, save } = usePlayerProfile();

  if (!hydrated || !profile) return null;
  if (ageToCohort(profile.ageYears) !== "teen") return null;

  const enabled = profile.parentShowCaloriesToTeen ?? false;

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">Show calorie counts to {profile.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Off by default for teenagers. The American Academy of Pediatrics advises against
          calorie focus in young athletes, and this is your call to make rather than ours.
          Protein and hydration are always shown either way.
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`Show calorie counts to ${profile.name}`}
        onClick={() => save({ ...profile, parentShowCaloriesToTeen: !enabled })}
        className={cn(
          "relative mt-0.5 h-6 w-11 flex-shrink-0 rounded-full border transition",
          enabled ? "border-transparent bg-primary" : "border-border bg-muted"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
            enabled ? "left-6" : "left-1"
          )}
        />
      </button>
    </div>
  );
}
