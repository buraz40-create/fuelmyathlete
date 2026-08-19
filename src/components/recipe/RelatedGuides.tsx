import Link from "next/link";
import { BookOpen, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Guide } from "@/types/domain";

interface RelatedGuidesProps {
  guides: Guide[];
}

export function RelatedGuides({ guides }: RelatedGuidesProps) {
  if (guides.length === 0) return null;

  return (
    <section
      aria-labelledby="why-this-works"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
    >
      <header className="mb-3 flex items-center gap-2">
        <BookOpen size={18} weight="duotone" aria-hidden className="text-primary" />
        <h2 id="why-this-works" className="text-base font-semibold text-ink">
          Why this meal works
        </h2>
      </header>

      <ul className="flex flex-col gap-2">
        {guides.slice(0, 3).map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-background p-3 transition hover:border-primary/40"
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium text-ink">{guide.title}</span>
                <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">
                  {guide.answer}
                </span>
              </span>
              <ArrowRight
                size={15}
                weight="bold"
                aria-hidden
                className="mt-0.5 flex-shrink-0 text-muted-foreground"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
