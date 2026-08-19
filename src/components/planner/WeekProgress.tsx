"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowsClockwise,
  Basket,
  MagicWand,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import { Mascot } from "@/components/brand/Mascot";

interface WeekProgressProps {
  plannedCount: number;
  total: number;
  canCopyPreviousWeek?: boolean;
  onSmartFill: () => void;
  onCopyPreviousWeek?: () => void | Promise<boolean>;
  onClear: () => void;
}

export function WeekProgress({
  plannedCount,
  total,
  canCopyPreviousWeek = false,
  onSmartFill,
  onCopyPreviousWeek,
  onClear,
}: WeekProgressProps) {
  const showCopy = canCopyPreviousWeek && plannedCount === 0 && Boolean(onCopyPreviousWeek);
  function handleClear() {
    if (plannedCount === 0) return;
    const ok = window.confirm(
      "Clear all picks for this week? Day types stay, only the meals get reset."
    );
    if (ok) onClear();
  }
  const pct = total === 0 ? 0 : Math.round((plannedCount / total) * 100);
  const complete = plannedCount === total;

  return (
    <section
      aria-labelledby="progress-title"
      className="mb-6 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {complete && (
          <Mascot size={72} expression="cheer" className="flex-shrink-0" />
        )}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your week so far
          </p>
          <h2 id="progress-title" className="mt-1 text-2xl">
            {complete ? (
              <>You&apos;re all set 🎉</>
            ) : plannedCount === 0 ? (
              <>Let&apos;s build the week</>
            ) : (
              <>
                <span className="text-primary">{plannedCount}</span>
                <span className="text-muted-foreground">/{total}</span> meals planned
              </>
            )}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {complete
              ? "Head to the Grocery tab to start shopping."
              : plannedCount === 0
              ? showCopy
              ? "Start from last week to reuse what worked, or let us fill the whole week for you."
              : "Start by tapping a meal slot below, or let us fill the whole week for you in one click."
              : `${total - plannedCount} more slot${total - plannedCount === 1 ? "" : "s"} to go.`}
          </p>

          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={plannedCount}
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col gap-2 md:items-end">
          {!complete && (
            <button
              type="button"
              onClick={onSmartFill}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              <MagicWand size={18} weight="duotone" aria-hidden />
              {plannedCount === 0 ? "Auto-fill my week" : "Fill the rest"}
            </button>
          )}
          {showCopy && (
            <button
              type="button"
              onClick={() => onCopyPreviousWeek?.()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-primary/40 hover:bg-primary-soft/30"
            >
              <ArrowsClockwise size={17} weight="duotone" aria-hidden />
              Start from last week
            </button>
          )}
          {complete && (
            <Link
              href="/planner/grocery"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              <Basket size={18} weight="duotone" aria-hidden />
              See grocery list
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
          )}
          <div className="flex items-center gap-3">
            {plannedCount > 0 && !complete && (
              <Link
                href="/planner/grocery"
                className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-ink hover:underline"
              >
                Peek at grocery list
              </Link>
            )}
            {plannedCount > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-danger"
              >
                <Trash size={13} weight="duotone" aria-hidden />
                Clear week
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
