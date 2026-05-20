import { cn } from "@/lib/utils";
import { WaterCup } from "@/components/planner/WaterCup";

interface MockWaterTrackerProps {
  filled?: number;
  total?: number;
  className?: string;
}

export function MockWaterTracker({
  filled = 5,
  total = 10,
  className,
}: MockWaterTrackerProps) {
  const cups = Array.from({ length: total }, (_, i) => i < filled);
  const oz = filled * 8;
  const goalOz = total * 8;

  return (
    <article
      aria-hidden
      className={cn(
        "rounded-3xl border border-border bg-surface p-4 shadow-sm md:p-5",
        className
      )}
    >
      <header className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Water today
          </p>
          <h3 className="mt-0.5 text-sm">
            <span className="font-bold text-ink">{oz}</span>
            <span className="text-muted-foreground"> / {goalOz} oz</span>
          </h3>
        </div>
        <span className="rounded-full border border-border bg-day-rest/40 px-2 py-0.5 text-[10px] font-medium text-ink">
          Training day
        </span>
      </header>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[color:var(--day-rest)]"
          style={{ width: `${(filled / total) * 100}%` }}
        />
      </div>
      <ol className="mt-3 grid grid-cols-5 gap-1.5">
        {cups.map((isFilled, i) => (
          <li key={i}>
            <div
              className={cn(
                "grid aspect-square w-full place-items-center rounded-lg border p-1",
                isFilled
                  ? "border-transparent bg-day-rest/30"
                  : "border-border bg-muted/20"
              )}
            >
              <WaterCup
                filled={isFilled}
                size={20}
                className={isFilled ? "text-ink" : "text-muted-foreground/60"}
              />
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
