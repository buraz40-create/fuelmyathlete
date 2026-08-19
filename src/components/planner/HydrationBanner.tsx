"use client";

import { Drop } from "@phosphor-icons/react/dist/ssr";
import { hydrationFor, ozGoalForDay } from "@/data/hydration";
import { dayTypeLabel } from "@/data/dayTypes";
import { ageToCohort } from "@/lib/player/cohort";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import type { MealPlan } from "@/types/domain";

export function HydrationBanner({ plan }: { plan: MealPlan }) {
  const { profile } = usePlayerProfile();
  const cohort = profile ? ageToCohort(profile.ageYears) : "child";

  const intenseDays = Array.from(
    new Set(
      plan.entries
        .filter((e) => e.dayType === "training" || e.dayType === "match")
        .map((e) => e.dayOfWeek)
    )
  );

  if (intenseDays.length === 0) return null;

  // This banner is the heat alert, so the hot-weather addition is intentional here.
  const matchOz = profile ? hydrationFor(profile, "match", true).goalOz : ozGoalForDay("match", true);
  const trainOz = profile ? hydrationFor(profile, "training", true).goalOz : ozGoalForDay("training", true);
  const trainLabel = dayTypeLabel("training", cohort);
  const matchLabel = dayTypeLabel("match", cohort);

  return (
    <aside
      role="note"
      aria-labelledby="hydration-title"
      className="rounded-3xl border border-day-rest/60 bg-day-rest/40 p-4 md:p-5"
    >
      <header className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/70">
        <Drop size={18} weight="duotone" className="text-primary" aria-hidden />
        Hot day guidance
      </header>
      <h3 id="hydration-title" className="mt-1.5 text-base font-semibold text-ink">
        Hydration this week
      </h3>
      <p className="mt-1 text-sm text-ink/80">
        You&apos;ve got <strong>{intenseDays.length}</strong> active day{intenseDays.length === 1 ? "" : "s"} on the plan.
        Start drinking 2 hours before, not 5 minutes before. These figures include the 10% hot
        weather addition, so on a cool day aim a little lower.
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-white/70 p-2.5">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {trainLabel}, hot
          </dt>
          <dd className="mt-0.5 text-base font-semibold text-ink">{trainOz} oz</dd>
        </div>
        <div className="rounded-xl bg-white/70 p-2.5">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {matchLabel}, hot
          </dt>
          <dd className="mt-0.5 text-base font-semibold text-ink">{matchOz} oz</dd>
        </div>
      </dl>
    </aside>
  );
}
