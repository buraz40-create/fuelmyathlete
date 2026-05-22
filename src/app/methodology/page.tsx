import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, BookOpen, Shield } from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/layout/AppShell";
import { CITATIONS } from "@/data/citations";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  title: "Editorial Methodology: How We Cite AAP, NATA, and ACSM Sources",
  description:
    "How FuelMyAthlete researches and reviews nutrition content. Every claim is cited to AAP, NATA, ACSM, ISSN, NSCA, or peer-reviewed journals. Pediatric-safe by default.",
  alternates: { canonical: `${SITE_URL}/methodology` },
  openGraph: {
    type: "website",
    title: "Editorial Methodology: How We Cite AAP, NATA, and ACSM Sources",
    description:
      "Every claim cited to AAP, NATA, ACSM, ISSN, NSCA, or peer-reviewed journals. Pediatric-safe by default.",
    url: `${SITE_URL}/methodology`,
  },
};

export default function MethodologyPage() {
  const sources = Object.values(CITATIONS);

  const aboutPageLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/methodology#aboutpage`,
    name: "Editorial Methodology and Sources",
    description:
      "How FuelMyAthlete writes and reviews nutrition content. Every claim is cited to AAP, NATA, ACSM, ISSN, or peer-reviewed sources.",
    url: `${SITE_URL}/methodology`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: "main",
    },
    citation: sources.map((c) => ({
      "@type": "CreativeWork",
      name: c.title,
      author: c.authors,
      publisher: c.publisher,
      datePublished: c.year ? `${c.year}` : undefined,
      url: c.url,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Methodology", item: `${SITE_URL}/methodology` },
    ],
  };

  return (
    <AppShell>
      <Script
        id="ld-methodology-aboutpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageLd) }}
      />
      <Script
        id="ld-methodology-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <article className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <Link
          href="/guides"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> All guides
        </Link>

        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Editorial methodology
          </p>
          <h1 className="mt-2">How we research and review content</h1>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
            Every guide on FuelMyAthlete is reviewed against the position stands and clinical
            guidance below. We do not write generic nutrition content. Every macronutrient target,
            timing window, hydration formula, and pediatric guardrail is anchored to a specific
            cited authority.
          </p>
        </header>

        <section
          aria-labelledby="principles-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <Shield size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="principles-title" className="text-base font-semibold text-ink">
              Our principles
            </h2>
          </header>
          <ul className="ml-5 flex list-disc flex-col gap-2 text-sm leading-relaxed text-ink/90">
            <li>
              <strong>Cite by document name.</strong> &ldquo;Per ACSM 2016 position stand&rdquo; beats &ldquo;per
              experts.&rdquo;
            </li>
            <li>
              <strong>Pediatric safety first.</strong> Calorie counts hidden for under-13s per AAP
              guidance. Hydration capped well below pediatric water-intoxication risk thresholds.
              No supplement or caffeine recommendations for youth.
            </li>
            <li>
              <strong>Age and weight scaling.</strong> Every portion, hydration goal, and macro
              target scales by athlete weight and age band. We do not write
              one-size-fits-all numbers.
            </li>
            <li>
              <strong>No medical claims.</strong> Guides are general guidance based on cited
              authority. They do not replace consultation with a registered dietitian or
              pediatrician.
            </li>
            <li>
              <strong>No em-dashes, no AI tells.</strong> Content is written and edited by humans
              with real product context. The founder is a parent of a competitive youth soccer
              player.
            </li>
            <li>
              <strong>Last-reviewed dates are honest.</strong> When we update a guide, the date
              updates. When we don&apos;t, it doesn&apos;t.
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="sources-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <BookOpen size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="sources-title" className="text-base font-semibold text-ink">
              Authority sources we cite
            </h2>
          </header>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            These are the published position stands, clinical reports, and peer-reviewed papers
            we reference across the guide library. Click any one to read the original document.
          </p>
          <ol className="flex flex-col gap-3 text-sm">
            {sources.map((c) => (
              <li
                key={c.id}
                id={`source-${c.id}`}
                className="border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline decoration-primary/40 underline-offset-2 transition hover:decoration-primary"
                >
                  {c.title}
                </a>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {c.authors && <span>{c.authors} · </span>}
                  {c.publisher}
                  {c.year && <span> · {c.year}</span>}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="who-title"
          className="rounded-3xl border border-border bg-primary-soft/30 p-5 md:p-7"
        >
          <h2 id="who-title" className="text-base font-semibold text-ink">
            Who writes this
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">
            FuelMyAthlete is built by Haris, a parent of an 11-year-old competitive youth soccer
            player in Florida. The product exists because no interactive meal planner served real
            youth athletes; competitor content is static articles, mostly authored for adult
            general-fitness audiences.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            We do not employ registered dietitians as authors. We cite registered dietitians,
            sports medicine organizations, and peer-reviewed journals throughout the guide
            library. For personalized sports nutrition plans, especially for children, consult a
            registered sports dietitian or pediatrician.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            Questions, corrections, or research suggestions? Email{" "}
            <a
              href="mailto:hi@fuelmyathlete.com"
              className="text-primary underline hover:text-ink"
            >
              hi@fuelmyathlete.com
            </a>
            .
          </p>
        </section>
      </article>
    </AppShell>
  );
}
