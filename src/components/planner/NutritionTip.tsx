import { NUTRITION_CARDS } from "@/data/nutritionCards";
import type { DayType } from "@/types/domain";

interface NutritionTipProps {
  dayType: DayType;
}

export function NutritionTip({ dayType }: NutritionTipProps) {
  const candidates = NUTRITION_CARDS.filter((c) => c.appliesTo.includes(dayType));
  if (candidates.length === 0) return null;
  const tip = candidates[dayType.length % candidates.length];

  return (
    <aside
      role="note"
      className="rounded-3xl border border-border bg-primary-soft/60 p-4 md:p-5"
    >
      <header className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
        <span aria-hidden className="h-1.5 w-6 rounded-full bg-primary" />
        Coach&apos;s tip
      </header>
      <h3 className="mt-2 text-base font-semibold text-ink">{tip.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{tip.body}</p>
    </aside>
  );
}
