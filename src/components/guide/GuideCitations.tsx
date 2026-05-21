import type { Citation } from "@/types/domain";

export function GuideCitations({ citations }: { citations: Citation[] }) {
  if (citations.length === 0) return null;
  return (
    <section
      aria-labelledby="sources-title"
      id="sources"
      className="rounded-3xl border border-border bg-primary-soft/30 p-5 md:p-7"
    >
      <h2 id="sources-title" className="text-base font-semibold uppercase tracking-wider text-ink">
        Sources
      </h2>
      <ol className="mt-4 flex flex-col gap-2.5 text-xs leading-relaxed text-muted-foreground">
        {citations.map((c) => (
          <li key={c.id} id={`cite-${c.id}`} className="flex gap-2">
            <span className="flex-shrink-0 font-semibold text-ink">[{c.id}]</span>
            <span>
              {c.authors && <span>{c.authors}. </span>}
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-primary/40 underline-offset-2 transition hover:decoration-primary"
              >
                {c.title}
              </a>
              . {c.publisher}
              {c.year && <span>, {c.year}</span>}.
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Cite({ id }: { id: string }) {
  return (
    <sup>
      <a
        href={`#cite-${id}`}
        className="ml-0.5 text-primary no-underline hover:underline"
        aria-label={`Citation ${id}`}
      >
        [{id}]
      </a>
    </sup>
  );
}
