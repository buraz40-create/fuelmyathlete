import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "@phosphor-icons/react/dist/ssr";
import { RECIPES_BY_SLUG } from "@/data/recipes";
import type { Guide } from "@/types/domain";

export function RelatedRecipes({ slugs }: { slugs: string[] }) {
  const recipes = slugs.map((s) => RECIPES_BY_SLUG[s]).filter(Boolean);
  if (recipes.length === 0) return null;

  return (
    <section
      aria-labelledby="related-recipes-title"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 id="related-recipes-title" className="text-xl font-semibold text-ink">
          Recipes that fit
        </h2>
        <Link
          href="/recipes"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition hover:text-ink"
        >
          All recipes
          <ArrowRight size={12} weight="bold" aria-hidden />
        </Link>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {recipes.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/recipe/${r.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3 transition hover:border-primary/40 hover:shadow-sm"
            >
              {r.imageUrl && (
                <Image
                  src={r.imageUrl}
                  alt=""
                  width={64}
                  height={64}
                  // Optimised, not raw.
                  //
                  // unoptimized dates from when these were Pexels URLs that arrived already sized. Every
                  // photograph is a local 800x800 file now, so passing it through untouched means sending
                  // roughly 80 KB to fill a a 64px box, four or more times on a screen. The optimiser resizes
                  // and serves webp instead.
                  className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                  sizes="128px"
                />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{r.name}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {r.totalMinutes} min · {r.servings} serving{r.servings === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedGuides({ guides }: { guides: Guide[] }) {
  if (guides.length === 0) return null;
  return (
    <section
      aria-labelledby="related-guides-title"
      className="rounded-3xl border border-border bg-primary-soft/30 p-5 md:p-7"
    >
      <header className="mb-4 flex items-center gap-2">
        <BookOpen size={20} weight="duotone" aria-hidden className="text-primary" />
        <h2 id="related-guides-title" className="text-xl font-semibold text-ink">
          Keep reading
        </h2>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="block rounded-2xl border border-border bg-background p-4 transition hover:border-primary/40 hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-ink">{g.title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {g.metaDescription}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                Read guide
                <ArrowRight size={10} weight="bold" aria-hidden />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
