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

  // A radiogroup promises arrow keys. Ours had five tab stops and no arrow handling, so a
  // keyboard user tabbed through every star one at a time and could not actually move the
  // selection, which is the same shape as the day tabs fix in DayPicker.
  //
  // Arrows select as they move, which is what the pattern specifies for radios, and Home and
  // End jump to one and five. Nothing here clears the rating: that would make an arrow key
  // destructive, and clearing already has its own gesture in tapping the current star again.
  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowUp: -1,
      ArrowRight: 1,
      ArrowDown: 1,
    };
    const current = mine ?? (Math.round(fallback) as Stars);
    let next: number | null = null;
    if (event.key in moves) next = current + moves[event.key];
    if (event.key === "Home") next = 1;
    if (event.key === "End") next = 5;
    if (next === null) return;
    event.preventDefault();
    const clamped = Math.min(5, Math.max(1, next)) as Stars;
    mealRatings.set(slug, clamped);
    onChange?.(clamped);
    document.getElementById(`star-${slug}-${clamped}`)?.focus();
  }

  // Roving tabindex: one stop for the whole group. With nothing rated yet the first star takes
  // it, so the group is always reachable.
  const tabStop: Stars = mine ?? 1;

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
            // Ours in soft amber rather than grey. Filled grey stars read as unrated, so a
            // meal we scored four looked the same as one nobody has touched. Softer than a
            // parent's own rating, which stays full strength, so the two are still distinct.
            className={isMine ? "text-warning" : "text-warning/45"}
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
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHover(undefined)}
      >
        {STARS.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            id={`star-${slug}-${s}`}
            aria-checked={mine === s}
            aria-label={`${s} star${s === 1 ? "" : "s"}`}
            tabIndex={s === tabStop ? 0 : -1}
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
                isMine || hover !== undefined ? "text-warning" : "text-warning/45"
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
