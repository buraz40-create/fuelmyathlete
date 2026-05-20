import type { NutritionFacts } from "@/types/domain";

interface NutritionCardProps {
  nutrition: NutritionFacts;
}

export function NutritionCard({ nutrition }: NutritionCardProps) {
  const { kcal, proteinG, carbsG, fatG, fiberG, source } = nutrition;

  // Energy distribution for the macro bar (kcal from each macro).
  const proteinKcal = proteinG * 4;
  const carbsKcal = carbsG * 4;
  const fatKcal = fatG * 9;
  const totalMacroKcal = Math.max(1, proteinKcal + carbsKcal + fatKcal);

  const pct = (n: number) => `${Math.round((n / totalMacroKcal) * 100)}%`;

  return (
    <section
      aria-labelledby="nutrition-title"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Nutrition
          </p>
          <h2 id="nutrition-title" className="mt-1 text-xl">
            Per serving
          </h2>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold leading-none text-ink">{kcal}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            kcal
          </p>
        </div>
      </header>

      <div
        role="img"
        aria-label={`Macro split: ${pct(carbsKcal)} carbs, ${pct(proteinKcal)} protein, ${pct(fatKcal)} fat`}
        className="flex h-2.5 w-full overflow-hidden rounded-full"
      >
        <span style={{ width: pct(carbsKcal) }} className="bg-meal-lunch" />
        <span style={{ width: pct(proteinKcal) }} className="bg-meal-dinner" />
        <span style={{ width: pct(fatKcal) }} className="bg-meal-snack" />
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-3">
        <Macro label="Carbs" value={carbsG} dotClass="bg-meal-lunch" />
        <Macro label="Protein" value={proteinG} dotClass="bg-meal-dinner" />
        <Macro label="Fat" value={fatG} dotClass="bg-meal-snack" />
      </ul>

      {fiberG != null && (
        <p className="mt-3 text-xs text-muted-foreground">
          <strong className="text-ink">Fiber:</strong> {fiberG} g
        </p>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        {source ?? "Estimated"} based on USDA FoodData Central reference values for the listed
        ingredients. Actual values may vary by brand and portion.
      </p>
    </section>
  );
}

function Macro({
  label,
  value,
  dotClass,
}: {
  label: string;
  value: number;
  dotClass: string;
}) {
  return (
    <li>
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span className={`h-2 w-2 rounded-full ${dotClass}`} />
        {label}
      </span>
      <p className="mt-1 text-lg font-bold text-ink">
        {value}
        <span className="ml-0.5 text-xs font-medium text-muted-foreground">g</span>
      </p>
    </li>
  );
}
