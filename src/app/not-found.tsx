import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <AppShell>
      <section className="mx-auto w-full max-w-xl px-4 py-16 text-center md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          404
        </p>
        <h1 className="mt-2">This page moved or never existed</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Nothing you planned is lost. Meal plans live on your own device, so they are still
          here.
        </p>

        <nav aria-label="Where to go next" className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/planner"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Back to the planner
          </Link>
          <Link
            href="/recipes"
            className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:border-primary/40"
          >
            Browse recipes
          </Link>
          <Link
            href="/guides"
            className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:border-primary/40"
          >
            Read the guides
          </Link>
        </nav>
      </section>
    </AppShell>
  );
}
