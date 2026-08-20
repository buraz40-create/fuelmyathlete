import Link from "next/link";
import { ArrowLeft, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";
import { GuideJsonLd } from "./GuideJsonLd";
import { GuideProgress } from "./GuideProgress";
import { GuideAnswerBlock } from "./GuideAnswerBlock";
import { GuideTOC } from "./GuideTOC";
import { GuideFAQ } from "./GuideFAQ";
import { GuideCitations } from "./GuideCitations";
import { RelatedRecipes, RelatedGuides } from "./GuideRelated";
import type { Guide } from "@/types/domain";

function formatDate(iso: string): string {
  // A bare "2026-08-19" parses as UTC midnight, so rendering it in any negative offset
  // (all of the US) shows the previous day. Format in UTC so the date shown matches the
  // date written.
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function GuideLayout({
  guide,
  relatedGuideObjects,
}: {
  guide: Guide;
  relatedGuideObjects: Guide[];
}) {
  return (
    <article className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-10">
      <GuideJsonLd guide={guide} />
      <GuideProgress />

      <nav aria-label="Breadcrumb" className="mb-4">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> All guides
        </Link>
      </nav>

      <header>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          {guide.category.replace(/-/g, " ")}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
          {guide.metaDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarBlank size={14} weight="duotone" aria-hidden />
            Updated {formatDate(guide.updatedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} weight="duotone" aria-hidden />
            {guide.readMinutes} min read
          </span>
          <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Reviewed against AAP · NATA · ACSM
          </span>
        </div>
      </header>

      <GuideAnswerBlock>{guide.answer}</GuideAnswerBlock>

      <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[1fr_260px]">
        <div className="order-2 flex flex-col gap-10 md:order-1">
          {/* Deliberately not wrapped in a scroll reveal. An entry animation starts at
              opacity 0, and anything that hides prose until JavaScript runs is one failed
              hydration, one background tab, or one blocked script away from a blank page.
              Movement on this page belongs to the chrome, not the words. */}
          {guide.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="scroll-mt-24"
            >
              <h2
                id={`${section.id}-heading`}
                className="text-2xl font-semibold text-ink md:text-3xl"
              >
                {section.heading}
              </h2>
              <div className="prose-guide mt-4 max-w-prose text-base leading-relaxed text-ink/90">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        {/* Contents sits beside the prose on a desktop and above it on a phone, where a
            sticky sidebar would eat the screen. */}
        <div className="order-1 md:order-2">
          <div className="md:sticky md:top-20">
            <GuideTOC sections={guide.sections} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        <RelatedRecipes slugs={guide.relatedRecipes} />
        <GuideFAQ items={guide.faq} />
        <RelatedGuides guides={relatedGuideObjects} />
        <GuideCitations citations={guide.citations} />
        <p className="rounded-2xl border border-border bg-surface px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
          FuelMyAthlete provides general guidance based on published sources from the American
          Academy of Pediatrics (AAP), National Athletic Trainers&apos; Association (NATA), and
          American College of Sports Medicine (ACSM). This is not medical advice. For personalized
          sports nutrition plans, especially for children, consult a registered sports dietitian
          or pediatrician. See our{" "}
          <Link href="/methodology" className="underline decoration-primary/40 hover:text-ink">
            editorial methodology
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
