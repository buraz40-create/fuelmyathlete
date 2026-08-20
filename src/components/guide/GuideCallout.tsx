import type { ReactNode } from "react";
import { Warning, Lightbulb, Target } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

type CalloutKind = "safety" | "tip" | "number";

const STYLE: Record<CalloutKind, { icon: typeof Warning; label: string; box: string }> = {
  // Safety uses the match-day tint rather than a red alarm. This is guidance for a parent, not
  // an error state, and a page of red boxes stops being read.
  safety: { icon: Warning, label: "Safety", box: "border-day-match/60 bg-day-match/20" },
  tip: { icon: Lightbulb, label: "In practice", box: "border-border bg-muted/40" },
  number: { icon: Target, label: "The number", box: "border-primary/25 bg-primary-soft/50" },
};

export function GuideCallout({
  kind = "tip",
  title,
  children,
}: {
  kind?: CalloutKind;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, label, box } = STYLE[kind];

  return (
    <aside
      role="note"
      aria-label={title ?? label}
      className={cn("not-prose my-5 rounded-3xl border p-4 md:p-5", box)}
    >
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink/70">
        <Icon size={14} weight="duotone" aria-hidden className="text-primary" />
        {title ?? label}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-ink/90">{children}</div>
    </aside>
  );
}

// A single figure, pulled out of the prose so it can be seen from across a kitchen.
export function GuideStat({
  value,
  unit,
  caption,
}: {
  value: string | number;
  unit?: string;
  caption: string;
}) {
  return (
    <div className="not-prose rounded-3xl border border-primary/20 bg-primary-soft/40 px-5 py-4 text-center">
      <p className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-bold leading-none tabular-nums text-ink">{value}</span>
        {unit && <span className="text-sm font-semibold text-muted-foreground">{unit}</span>}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{caption}</p>
    </div>
  );
}
