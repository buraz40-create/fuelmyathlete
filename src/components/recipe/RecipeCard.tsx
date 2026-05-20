import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import type { MealSlot, Recipe } from "@/types/domain";

const SLOT_DOT: Record<MealSlot, string> = {
  breakfast: "bg-meal-breakfast",
  lunch: "bg-meal-lunch",
  snack: "bg-meal-snack",
  dinner: "bg-meal-dinner",
};

const SLOT_LABEL: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snack: "Snack",
  dinner: "Dinner",
};

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const slot = recipe.slot;
  return (
    <Link
      href={`/recipe/${recipe.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {recipe.imageUrl && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={recipe.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            unoptimized
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        {slot && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span className={cn("h-2 w-2 rounded-full", SLOT_DOT[slot])} />
            {SLOT_LABEL[slot]}
          </span>
        )}
        <h3 className="mt-1.5 text-base font-semibold leading-snug text-ink md:text-lg">
          {recipe.name}
        </h3>
        {recipe.whenToEat && (
          <p className="mt-2 text-xs leading-snug text-muted-foreground line-clamp-2">
            {recipe.whenToEat}
          </p>
        )}
        <dl className="mt-auto flex items-center gap-3 pt-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={12} weight="duotone" aria-hidden />
            <span>{recipe.totalMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} weight="duotone" aria-hidden />
            <span>
              {recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}
            </span>
          </div>
        </dl>
      </div>
    </Link>
  );
}
