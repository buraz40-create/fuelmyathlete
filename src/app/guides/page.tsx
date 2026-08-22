import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/layout/AppShell";
import { GUIDES } from "@/data/guides";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  title: "Athlete Nutrition Guides: Pre-Workout, Pre-Game, Hydration & Carb Loading",
  description:
    "Evidence-based guides on pre-workout meals, pre-game fueling, carb loading, and hydration for athletes 8 and up. Cited to AAP, NATA, ACSM, and ISSN position stands.",
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    type: "website",
    title: "Athlete Nutrition Guides: Pre-Workout, Pre-Game, Hydration & Carb Loading",
    description:
      "Evidence-based guides on pre-workout meals, pre-game fueling, carb loading, and hydration. Cited to AAP, NATA, ACSM.",
    url: `${SITE_URL}/guides`,
  },
};

const CATEGORY_LABEL: Record<string, string> = {
  "pre-workout": "Pre-workout",
  "post-workout": "Post-workout",
  "match-day": "Match day",
  "youth-nutrition": "Youth nutrition",
  hydration: "Hydration",
};

export default function GuidesIndexPage() {
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/guides#collection`,
    name: "Athlete Nutrition Guides",
    description:
      "Evidence-based guides on pre-workout meals, pre-game fueling, hydration, and recovery for athletes 8 and up.",
    url: `${SITE_URL}/guides`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: GUIDES.length,
      itemListElement: GUIDES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/guides/${g.slug}`,
        name: g.title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    ],
  };

  return (
    <AppShell>
      <script
        id="ld-guides-collection"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        id="ld-guides-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <section
        aria-labelledby="guides-title"
        className="mx-auto w-full max-w-5xl px-4 pb-8 md:px-8 md:py-12"
      >
        <header className="mb-6 pt-[calc(env(safe-area-inset-top)+0.75rem)] md:mb-10 md:pt-0 md:text-center">
          <p className="hidden text-xs font-semibold uppercase tracking-wider text-primary md:block">
            <BookOpen size={14} weight="duotone" aria-hidden className="-mt-0.5 mr-1 inline" />
            Guides
          </p>
          <h1 id="guides-title" className="md:mt-2">
            Athlete nutrition guides
          </h1>
          {/* Trimmed to one line on a phone. The full version names the three position stands,
              which is worth saying to somebody arriving from a search and not to somebody who
              just tapped Guides in the tab bar. */}
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:mt-3 md:text-base">
            <span className="md:hidden">Evidence-based, and pediatric-safe.</span>
            <span className="hidden md:inline">
              Evidence-based guides on pre-workout meals, pre-game fueling, hydration, and
              recovery. Reviewed against AAP, NATA, and ACSM position stands. Pediatric-safe.
            </span>
          </p>
        </header>

        <ol className="grid gap-4 md:grid-cols-2">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="flex h-full flex-col rounded-3xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md md:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {CATEGORY_LABEL[g.category] ?? g.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <Clock size={12} weight="duotone" aria-hidden />
                    {g.readMinutes} min
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-ink md:text-xl">{g.title}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {g.metaDescription}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Read guide
                  <ArrowRight size={12} weight="bold" aria-hidden />
                </p>
              </Link>
            </li>
          ))}
        </ol>

        <aside className="mt-10 rounded-3xl border border-border bg-primary-soft/30 p-5 text-center md:p-7">
          <h2 className="text-base font-semibold text-ink">
            Skip the reading. Plan a week of meals.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every recipe is already wired in. The planner does the portion math by age and day type.
          </p>
          <Link
            href="/planner"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Open the planner
            <ArrowRight size={14} weight="bold" aria-hidden />
          </Link>
        </aside>
      </section>
    </AppShell>
  );
}
