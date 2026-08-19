"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { recentDays, type HydrationDay } from "@/lib/player/hydration-history";

const BAR_MAX_PX = 56;

// Parent-facing on purpose. A streak or a run of days shown to a child turns hydration into a
// score to beat, which is the exact pressure the 100oz cap exists to prevent. A parent looking
// at a week is different: they are checking whether anything is drifting, not competing.
export function HydrationHistory({ goalOz }: { goalOz: number }) {
  const [days, setDays] = useState<HydrationDay[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only localStorage read; SSR renders nothing and the client fills it in.
    setDays(recentDays(7));
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const logged = days.filter((d) => d.cups > 0);
  if (logged.length === 0) return null;

  const max = Math.max(goalOz, ...days.map((d) => d.oz));

  return (
    <section
      aria-labelledby="hydration-history-title"
      className="rounded-3xl border border-border bg-surface p-4 shadow-sm md:p-5"
    >
      <header className="mb-3">
        <h3
          id="hydration-history-title"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Last 7 days
        </h3>
      </header>

      <ol className="flex items-end justify-between gap-1.5">
        {days.map((day, i) => {
          // Pixel heights, not percentages. A percentage height inside a flex child has no
          // definite parent to resolve against, so the bars rendered at zero.
          const height = day.oz === 0 ? 3 : Math.max(6, Math.round((day.oz / max) * BAR_MAX_PX));
          const isToday = i === days.length - 1;
          return (
            <li key={day.date} className="flex flex-1 flex-col items-center gap-1">
              <div
                role="img"
                aria-label={`${day.date}: ${day.oz} ounces`}
                style={{ height }}
                className={cn(
                  "w-full rounded-t-md",
                  day.oz === 0
                    ? "bg-muted"
                    : isToday
                    ? "bg-primary"
                    : "bg-[color:var(--day-rest)] brightness-95"
                )}
              />
              <span className="text-[10px] font-medium text-muted-foreground">
                {new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
                  weekday: "narrow",
                })}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        Days with no bar were not logged, which is not the same as not drinking. This is for
        spotting a pattern, not a score to beat.
      </p>
    </section>
  );
}
