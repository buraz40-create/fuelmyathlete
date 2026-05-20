"use client";

import Image from "next/image";
import { Plus, ArrowCounterClockwise } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { MEALS_BY_SLUG } from "@/data/meals";
import { DAY_TYPES } from "@/data/dayTypes";
import type { DayType, MealSlot } from "@/types/domain";

const ACCENT: Record<MealSlot, string> = {
  breakfast: "before:bg-meal-breakfast",
  lunch:     "before:bg-meal-lunch",
  snack:     "before:bg-meal-snack",
  dinner:    "before:bg-meal-dinner",
};

const SLOT_LABEL: Record<MealSlot, { label: string; dotClass: string }> = {
  breakfast: { label: "Breakfast", dotClass: "bg-meal-breakfast" },
  lunch:     { label: "Lunch",     dotClass: "bg-meal-lunch" },
  snack:     { label: "Snack",     dotClass: "bg-meal-snack" },
  dinner:    { label: "Dinner",    dotClass: "bg-meal-dinner" },
};

interface MealSlotCardProps {
  slot: MealSlot;
  dayType: DayType;
  mealSlug: string | null;
  onPick: () => void;
  onClear: () => void;
}

export function MealSlotCard({ slot, dayType, mealSlug, onPick, onClear }: MealSlotCardProps) {
  const meal = mealSlug ? MEALS_BY_SLUG[mealSlug] : null;
  const portion = DAY_TYPES[dayType].portionMultiplier;
  const slotMeta = SLOT_LABEL[slot];

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface p-4 pl-6 shadow-sm transition hover:shadow-md",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:rounded-l-3xl",
        ACCENT[slot]
      )}
    >
      <header className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span className="flex items-center gap-2">
          <span aria-hidden className={cn("h-2 w-2 rounded-full", slotMeta.dotClass)} />
          {slotMeta.label}
        </span>
        {portion !== 1 && meal && (
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-primary normal-case">
            {portion.toFixed(1)}× portion
          </span>
        )}
      </header>

      {meal ? (
        <div className="mt-3 flex items-start gap-3">
          <Image
            src={meal.imageUrl}
            alt=""
            width={88}
            height={88}
            className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover"
            unoptimized
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold leading-snug text-ink">{meal.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{meal.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onPick}
                className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Swap
              </button>
              <button
                type="button"
                onClick={onClear}
                className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground transition hover:text-danger"
              >
                <ArrowCounterClockwise size={12} weight="bold" aria-hidden /> Clear
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onPick}
          className="mt-3 flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 px-4 py-5 text-left transition hover:border-primary/40 hover:bg-primary-soft/40"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
            <Plus size={22} weight="bold" aria-hidden />
          </span>
          <span className="text-sm font-medium text-ink">Pick a {slotMeta.label.toLowerCase()}</span>
        </button>
      )}
    </article>
  );
}
