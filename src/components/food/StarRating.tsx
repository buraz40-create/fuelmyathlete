"use client";

import { useState, useSyncExternalStore } from "react";
import { Star } from "@phosphor-icons/react/dist/ssr";
import {
  mealRatings,
  ratingsSnapshot,
  ratingsServerSnapshot,
  subscribeToRatings,
  type Stars,
} from "@/lib/player/ratings";
import { cn } from "@/lib/utils";

const STARS: Stars[] = [1, 2, 3, 4, 5];

interface StarRatingProps {
  slug: string;
  /** Our estimate, shown greyed until the parent gives their own. */
  fallback: number;
  size?: number;
  /** Read-only display, for lists where tapping would fight the row's own click. */
  readOnly?: boolean;
  className?: string;
  onChange?: (stars: Stars | undefined) => void;
}

/**
 * Five tappable stars, storing what the athlete actually thought.
 *
 * Renders our default until the parent rates it, and says which it is showing, because a
 * number that looks like your opinion but is really ours is worse than no number. Tapping the
 * star that is already selected clears back to the default rather than leaving you stuck with
 * a rating you gave by accident.
 */
export function StarRating({
  slug,
  fallback,
  size = 16,
  readOnly = false,
  className,
  onChange,
}: StarRatingProps) {
  // useSyncExternalStore rather than an effect. localStorage is genuinely an external store,
  // this is the API React provides for one, and it hands us the server snapshot separately so
  // there is no hydration mismatch. It also means rating a meal here updates every other star
  // widget on the page at once.
  const ratings = useSyncExternalStore(
    subscribeToRatings,
    ratingsSnapshot,
    ratingsServerSnapshot
  );
  const mine = ratings[slug];
  const [hover, setHover] = useState<Stars | undefined>(undefined);

  const shown = hover ?? mine ?? (Math.round(fallback) as Stars);
  const isMine = mine !== undefined;

  function choose(stars: Stars) {
    const next = mine === stars ? undefined : stars;
    if (next === undefined) mealRatings.clear(slug);
    else mealRatings.set(slug, next);
    onChange?.(next);
  }

  if (readOnly) {
    return (
      <span
        className={cn("inline-flex items-center gap-0.5", className)}
        aria-label={
          isMine ? `Your rating, ${mine} out of 5` : `Our estimate, ${shown} out of 5`
        }
      >
        {STARS.map((s) => (
          <Star
            key={s}
            size={size}
            weight={s <= shown ? "fill" : "regular"}
            aria-hidden
            className={isMine ? "text-warning" : "text-muted-foreground/45"}
          />
        ))}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className="inline-flex items-center gap-0.5"
        role="radiogroup"
        aria-label="Rate this meal"
        onMouseLeave={() => setHover(undefined)}
      >
        {STARS.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={mine === s}
            aria-label={`${s} star${s === 1 ? "" : "s"}`}
            onClick={() => choose(s)}
            onMouseEnter={() => setHover(s)}
            onFocus={() => setHover(s)}
            onBlur={() => setHover(undefined)}
            className="rounded p-0.5 transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Star
              size={size}
              weight={s <= shown ? "fill" : "regular"}
              aria-hidden
              className={
                isMine || hover !== undefined ? "text-warning" : "text-muted-foreground/45"
              }
            />
          </button>
        ))}
      </span>
      <span className="text-[11px] text-muted-foreground">
        {isMine ? "Your rating" : "Our guess"}
      </span>
    </span>
  );
}
