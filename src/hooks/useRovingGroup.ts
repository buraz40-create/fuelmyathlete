import { useCallback } from "react";
import type React from "react";

/**
 * Keyboard behaviour for a radiogroup or a tablist.
 *
 * Nine of these shipped across the app with none of it: the star rating, the serving presets,
 * the day-type chips in three places, the import source picker, the recipes filter tabs and the
 * sign-in tabs. Every one put a tab stop on every option and listened for no keys at all, so a
 * keyboard user tabbed through each option one at a time and still could not move the
 * selection. With a mouse they all look finished, which is why it went unnoticed for so long.
 *
 * Two things are needed and they are easy to get half right:
 *
 *   - a roving tabindex, so the group is one tab stop rather than N
 *   - arrow keys that move the selection and take focus with them
 *
 * Focus has to follow the selection, otherwise the next arrow press is handled by an element
 * that is no longer the one the user is on and the selection jumps.
 */
export function useRovingGroup<T>({
  items,
  selected,
  onSelect,
  idFor,
  wrap = true,
}: {
  items: readonly T[];
  selected: T | undefined;
  onSelect: (item: T) => void;
  /** Must match the id rendered on each option, so focus can follow the selection. */
  idFor: (item: T) => string;
  /**
   * Wrapping is right for a ring of choices such as day types, where past the last one the
   * first is the natural next. It is wrong for a scale such as one to five stars, where going
   * left from one should stop rather than jump to five.
   */
  wrap?: boolean;
}) {
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const moves: Record<string, number> = {
        ArrowLeft: -1,
        ArrowUp: -1,
        ArrowRight: 1,
        ArrowDown: 1,
      };

      const current = selected === undefined ? -1 : items.indexOf(selected);
      const from = current === -1 ? 0 : current;

      let next: number | null = null;
      if (event.key in moves) next = from + moves[event.key];
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = items.length - 1;
      if (next === null) return;

      // Only swallow the key once we know it is ours. Otherwise Home and End stop scrolling
      // the page everywhere else.
      event.preventDefault();

      const index = wrap
        ? (next + items.length) % items.length
        : Math.min(items.length - 1, Math.max(0, next));

      const value = items[index];
      onSelect(value);
      document.getElementById(idFor(value))?.focus();
    },
    [items, selected, onSelect, idFor, wrap]
  );

  const tabIndexFor = useCallback(
    (item: T) => {
      // When nothing is selected, or the current value is not one of the presets, the first
      // option holds the tab stop so the group stays reachable at all.
      const anchored = selected !== undefined && items.includes(selected);
      const isTabStop = anchored ? item === selected : item === items[0];
      return isTabStop ? 0 : -1;
    },
    [items, selected]
  );

  return { onKeyDown, tabIndexFor };
}
