import { Drop } from "@phosphor-icons/react/dist/ssr";
import { ozGoalForDay } from "@/data/hydration";
import type { MealPlan } from "@/types/domain";

export function HydrationBanner({ plan }: { plan: MealPlan }) {
  const intenseDays = Array.from(
    new Set(
      plan.entries
        .filter((e) => e.dayType === "training" || e.dayType === "match")
        .map((e) => e.dayOfWeek)
    )
  );

  if (intenseDays.length === 0) return null;

  const matchOz = ozGoalForDay("match");
  const trainOz = ozGoalForDay("training");

  return (
    <aside
      role="note"
      aria-labelledby="hydration-title"
      className="rounded-3xl border border-day-rest/60 bg-day-rest/40 p-4 md:p-5"
    >
      <header className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/70">
        <Drop size={18} weight="duotone" className="text-primary" aria-hidden />
        Florida heat alert
      </header>
      <h3 id="hydration-title" className="mt-1.5 text-base font-semibold text-ink">
        Hydration this week
      </h3>
      <p className="mt-1 text-sm text-ink/80">
        You&apos;ve got <strong>{intenseDays.length}</strong> active day{intenseDays.length === 1 ? "" : "s"} on the plan.
        Start drinking 2 hours before practice, not 5 minutes before.
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-white/70 p-2.5">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Training day goal
          </dt>
          <dd className="mt-0.5 text-base font-semibold text-ink">{trainOz} oz</dd>
        </div>
        <div className="rounded-xl bg-white/70 p-2.5">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Match day goal
          </dt>
          <dd className="mt-0.5 text-base font-semibold text-ink">{matchOz} oz</dd>
        </div>
      </dl>
    </aside>
  );
}
