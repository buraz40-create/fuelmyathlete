import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="mx-auto w-full max-w-3xl px-4 py-20 md:px-8 md:py-28"
    >
      <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-sm md:px-12 md:py-16">
        <h2 id="final-cta-title" className="text-3xl md:text-4xl text-primary-foreground">
          Plan your first week in 60 seconds.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80 md:text-base">
          No signup. No credit card. No ads. Just open it.
        </p>
        <Link
          href="/onboarding"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-primary shadow-sm transition hover:opacity-90"
        >
          Try the planner
          <ArrowRight size={16} weight="bold" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
