"use client";

import Image from "next/image";
import { ArrowCounterClockwise, Check, Prohibit } from "@phosphor-icons/react/dist/ssr";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FoodImage } from "@/components/food/FoodImage";
import { mealsForSlot } from "@/lib/catalog";
import { StarRating } from "@/components/food/StarRating";
import { usePlan } from "@/components/planner/PlanProvider";
import { dayTypeLabel, dayTypeDescription } from "@/data/dayTypes";
import { ageToCohort } from "@/lib/player/cohort";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useMealPreferences } from "@/hooks/useMealPreferences";
import type { DayType, Meal, MealSlot } from "@/types/domain";

interface MealPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: MealSlot | null;
  dayType: DayType;
  selectedSlug: string | null;
  onSelect: (mealSlug: string) => void;
}

const SLOT_TITLE: Record<MealSlot, string> = {
  breakfast: "Pick breakfast",
  lunch:     "Pick lunch",
  snack:     "Pick a snack",
  dinner:    "Pick dinner",
};

export function MealPickerSheet({
  open,
  onOpenChange,
  slot,
  dayType,
  selectedSlug,
  onSelect,
}: MealPickerSheetProps) {
  const { custom } = usePlan();
  const meals: Meal[] = slot ? mealsForSlot(slot, custom) : [];
  const { profile } = usePlayerProfile();
  const cohort = profile ? ageToCohort(profile.ageYears) : "child";
  const dayLabel = dayTypeLabel(dayType, cohort);
  const dayDescription = dayTypeDescription(dayType, cohort);
  const { isExcluded, toggle } = useMealPreferences();
  // Hidden meals drop out of both lists rather than being greyed in place, so the picker
  // stops offering food the athlete has already refused.
  const visible = meals.filter((m) => !isExcluded(m.slug));
  const filtered = visible.filter((m) => m.suitableFor.includes(dayType));
  const others = visible.filter((m) => !m.suitableFor.includes(dayType));
  const hidden = meals.filter((m) => isExcluded(m.slug));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] gap-0 rounded-t-3xl px-0"
        aria-live="polite"
      >
        {slot && (
          <>
            <SheetHeader className="px-5 pt-5 pb-2">
              <SheetTitle className="text-xl">{SLOT_TITLE[slot]}</SheetTitle>
              <SheetDescription>
                <span className="font-medium text-ink">{dayLabel}.</span> {dayDescription}
              </SheetDescription>
            </SheetHeader>

            <ol className="flex-1 overflow-y-auto px-5 pb-8 pt-2">
              {filtered.length === 0 && (
                <li className="mb-4 list-none rounded-2xl border border-dashed border-border bg-muted/20 p-4 text-sm text-muted-foreground">
                  {hidden.length > 0
                    ? `Nothing recommended for a ${dayLabel.toLowerCase()} once hidden meals are excluded. Anything below still works, or bring one back.`
                    : `Nothing in the catalog is tagged for a ${dayLabel.toLowerCase()} in this slot yet. Anything below still works.`}
                </li>
              )}

              {filtered.length > 0 && (
                <Section title="Recommended for this day">
                  {filtered.map((meal) => (
                    <MealRow
                      key={meal.slug}
                      meal={meal}
                      selected={meal.slug === selectedSlug}
                      onSelect={() => {
                        onSelect(meal.slug);
                        onOpenChange(false);
                      }}
                      onHide={() => toggle(meal.slug)}
                    />
                  ))}
                </Section>
              )}

              {others.length > 0 && (
                <Section title="Other options">
                  {others.map((meal) => (
                    <MealRow
                      key={meal.slug}
                      meal={meal}
                      selected={meal.slug === selectedSlug}
                      onSelect={() => {
                        onSelect(meal.slug);
                        onOpenChange(false);
                      }}
                      onHide={() => toggle(meal.slug)}
                    />
                  ))}
                </Section>
              )}

              {hidden.length > 0 && (
                <Section title={`Hidden (${hidden.length})`}>
                  {hidden.map((meal) => (
                    <li key={meal.slug}>
                      <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border px-3 py-2">
                        <span className="truncate text-sm text-muted-foreground line-through">
                          {meal.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggle(meal.slug)}
                          className="inline-flex flex-shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-ink"
                        >
                          <ArrowCounterClockwise size={13} weight="bold" aria-hidden />
                          Bring back
                        </button>
                      </div>
                    </li>
                  ))}
                </Section>
              )}
            </ol>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="mb-4 list-none">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">{children}</ul>
    </li>
  );
}

function MealRow({
  meal,
  selected,
  onSelect,
  onHide,
}: {
  meal: Meal;
  selected: boolean;
  onSelect: () => void;
  onHide: () => void;
}) {
  return (
    <li className="relative">
      <button
        type="button"
        onClick={onHide}
        aria-label={`Hide ${meal.name}, he will not eat it`}
        title="Not for him"
        className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition hover:border-danger/40 hover:text-danger"
      >
        <Prohibit size={13} weight="bold" aria-hidden />
      </button>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "flex w-full items-center gap-3 rounded-2xl border bg-surface p-3 text-left transition hover:border-primary/40",
          selected ? "border-primary bg-primary-soft" : "border-border"
        )}
      >
        {meal.imageUrl ? (
          <Image
            src={meal.imageUrl}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
            unoptimized
          />
        ) : (
          <FoodImage
            slug={meal.slug}
            slot={meal.slot}
            aspect="aspect-square"
            emojiSize="text-2xl"
            rounded="rounded-xl"
            className="h-16 w-16 flex-shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h5 className="truncate text-sm font-semibold text-ink">{meal.name}</h5>
            <StarRating slug={meal.slug} fallback={meal.kidRating} size={11} readOnly />
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{meal.description}</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {meal.prepMinutes} min prep
          </p>
        </div>
        {selected && (
          <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check size={14} weight="bold" aria-hidden />
          </span>
        )}
      </button>
    </li>
  );
}

