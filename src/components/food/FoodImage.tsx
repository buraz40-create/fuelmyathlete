import { cn } from "@/lib/utils";
import { emojiClusterForSlug, emojiForSlug } from "@/data/foodEmoji";
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
  const cluster = emojiClusterForSlug(slug);
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
      {cluster.length > 1 ? (
        // The recipes with no photograph. Their own ingredients, largest first, overlapped
        // slightly so it looks composed rather than like three icons in a row.
        <span className="relative flex items-end justify-center gap-0">
          {cluster.map((item, i) => (
            <span
              key={item}
              className={cn(
                "select-none leading-none",
                i === 0 ? emojiSize : "text-3xl md:text-4xl",
                i > 0 && "-ml-2 md:-ml-3 pb-1 md:pb-2"
              )}
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))",
                transform: i === 0 ? "rotate(-4deg)" : `rotate(${i * 6}deg)`,
              }}
            >
              {item}
            </span>
          ))}
        </span>
      ) : (
        <span
          className={cn("relative select-none leading-none", emojiSize)}
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
        >
          {emoji}
        </span>
      )}
    </div>
  );
}
