import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * A circular progress dial with the number in the middle.
 *
 * The reason to use one rather than a bar: a bar tells you a proportion, and a ring tells you a
 * proportion while leaving a hole in the middle big enough for the figure that actually matters.
 * Six cups of eight, one meal of twenty-eight. Both readable from across a kitchen.
 *
 * Deliberately a server component with no animation. These sit on the first screen a parent
 * opens, and this project has spent a lot of time on animations that hid content: a dial that
 * fills from zero is the same trap in a different shape, because an interrupted run leaves the
 * ring showing a number the label contradicts.
 */
export function ProgressRing({
  value,
  max,
  size = 128,
  thickness = 10,
  tone = "primary",
  label,
  children,
  className,
}: {
  value: number;
  max: number;
  /** Outer diameter in pixels. */
  size?: number;
  thickness?: number;
  /** primary is the ordinary case; warning is for a figure at its ceiling. */
  tone?: "primary" | "warning";
  /** Read out to a screen reader, which cannot see the dial at all. */
  label: string;
  children?: ReactNode;
  className?: string;
}) {
  const safeMax = max > 0 ? max : 1;
  const fraction = Math.min(1, Math.max(0, value / safeMax));

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  // The gap is what is left, so a full ring closes exactly rather than nearly.
  const gap = circumference * (1 - fraction);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          className="text-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${circumference - gap} ${gap}`}
          // Start at the top rather than at three o'clock, which is where everybody reads a
          // dial from.
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className={tone === "warning" ? "text-warning" : "text-primary"}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
        {children}
      </div>
    </div>
  );
}
