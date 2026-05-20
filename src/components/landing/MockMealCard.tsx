import { cn } from "@/lib/utils";

type Slot = "breakfast" | "lunch" | "snack" | "dinner";

const ACCENT: Record<Slot, string> = {
  breakfast: "before:bg-meal-breakfast",
  lunch: "before:bg-meal-lunch",
  snack: "before:bg-meal-snack",
  dinner: "before:bg-meal-dinner",
};

const DOT: Record<Slot, string> = {
  breakfast: "bg-meal-breakfast",
  lunch: "bg-meal-lunch",
  snack: "bg-meal-snack",
  dinner: "bg-meal-dinner",
};

interface MockMealCardProps {
  slot: Slot;
  mealName: string;
  description: string;
  imageEmoji?: string;
  className?: string;
}

export function MockMealCard({
  slot,
  mealName,
  description,
  imageEmoji = "🍽️",
  className,
}: MockMealCardProps) {
  return (
    <article
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface p-4 pl-6 shadow-sm",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:rounded-l-3xl",
        ACCENT[slot],
        className
      )}
    >
      <header className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <span className={cn("h-2 w-2 rounded-full", DOT[slot])} />
        {slot}
      </header>
      <div className="mt-3 flex items-start gap-3">
        <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-primary-soft/50 text-3xl">
          {imageEmoji}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-snug text-ink">{mealName}</h3>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
