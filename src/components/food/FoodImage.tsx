import { cn } from "@/lib/utils";
import { emojiForSlug } from "@/data/foodEmoji";
import type { MealSlot } from "@/types/domain";

const SLOT_BG: Record<MealSlot, string> = {
  breakfast: "bg-meal-breakfast/60",
  lunch: "bg-meal-lunch/60",
  snack: "bg-meal-snack/60",
  dinner: "bg-meal-dinner/60",
};

const FALLBACK_BG = "bg-primary-soft";

interface FoodImageProps {
  slug?: string;
  slot?: MealSlot;
  /** Tailwind size for the wrapper aspect (e.g. "aspect-[4/3]", "aspect-square", "aspect-[16/9]") */
  aspect?: string;
  /** Tailwind text size for the emoji ("text-5xl", "text-7xl", etc.) */
  emojiSize?: string;
  className?: string;
  rounded?: string;
}

export function FoodImage({
  slug,
  slot,
  aspect = "aspect-[4/3]",
  emojiSize = "text-7xl md:text-8xl",
  rounded,
  className,
}: FoodImageProps) {
  const emoji = emojiForSlug(slug);
  const bg = slot ? SLOT_BG[slot] : FALLBACK_BG;

  return (
    <div
      aria-hidden
      className={cn(
        "relative grid w-full place-items-center overflow-hidden",
        aspect,
        rounded,
        bg,
        className
      )}
    >
      {/* A soft wash so the tile has some depth instead of reading as one flat swatch. */}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/45 via-transparent to-black/5"
      />
      <span
        className={cn("relative select-none leading-none", emojiSize)}
        style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
      >
        {emoji}
      </span>
    </div>
  );
}
