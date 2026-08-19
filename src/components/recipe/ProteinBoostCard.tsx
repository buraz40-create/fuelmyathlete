"use client";

import { Barbell } from "@phosphor-icons/react/dist/ssr";
import type { NutritionFacts, ProteinBoost } from "@/types/domain";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { shouldShowCalories } from "@/lib/player/cohort";

interface ProteinBoostCardProps {
  boost: ProteinBoost;
  baseNutrition?: NutritionFacts;
}

export function ProteinBoostCard({ boost, baseNutrition }: ProteinBoostCardProps) {
  const { profile } = usePlayerProfile();
  // This card is adult content by its own badge and it quotes kcal, so it stays hidden
  // from the youth view entirely rather than being partially redacted.
  const showCalories = profile ? shouldShowCalories(profile) : false;
  const boostedKcal = baseNutrition ? baseNutrition.kcal + boost.addedKcal : null;

  if (!showCalories) return null;
  const boostedProteinG = baseNutrition
    ? baseNutrition.proteinG + boost.addedProteinG
    : null;

  return (
    <section
      aria-labelledby="boost-title"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Barbell size={18} weight="duotone" aria-hidden className="text-primary" />
          <h2 id="boost-title" className="text-base font-semibold text-ink">
            Boost it
          </h2>
        </div>
        <span className="rounded-full bg-day-rest/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
          Athletes 18+
        </span>
      </header>

      <p className="text-sm leading-relaxed text-muted-foreground">{boost.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-primary-soft/40 p-3">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Adds protein
          </dt>
          <dd className="mt-0.5 text-lg font-bold text-ink">
            +{boost.addedProteinG}
            <span className="ml-0.5 text-xs font-medium text-muted-foreground">g</span>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Adds energy
          </dt>
          <dd className="mt-0.5 text-lg font-bold text-ink">
            +{boost.addedKcal}
            <span className="ml-0.5 text-xs font-medium text-muted-foreground">kcal</span>
          </dd>
        </div>
      </dl>

      {boostedKcal != null && boostedProteinG != null && (
        <p className="mt-3 text-xs text-muted-foreground">
          New per-serving total:{" "}
          <strong className="text-ink">{boostedKcal} kcal</strong> ·{" "}
          <strong className="text-ink">{boostedProteinG}g protein</strong>
        </p>
      )}

      {boost.note && (
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{boost.note}</p>
      )}
    </section>
  );
}
