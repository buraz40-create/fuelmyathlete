import type { GuideSection } from "@/types/domain";

export function GuideTOC({ sections }: { sections: GuideSection[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        In this guide
      </p>
      <ol className="mt-3 flex flex-col gap-1.5 text-sm">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-2.5">
            <span className="w-5 flex-shrink-0 text-right tabular-nums text-muted-foreground">
              {i + 1}.
            </span>
            <a
              href={`#${s.id}`}
              className="text-ink transition hover:text-primary"
            >
              {s.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
