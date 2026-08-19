import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <AppShell>
      <section className="mx-auto w-full max-w-xl px-4 py-16 text-center md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          No connection
        </p>
        <h1 className="mt-2">You are offline</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your meal plan and grocery list are stored on this device, so they still work. Pages
          you have not opened before need a connection.
        </p>

        <nav aria-label="Available offline" className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/planner/grocery"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Grocery list
          </Link>
          <Link
            href="/today"
            className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:border-primary/40"
          >
            Today
          </Link>
        </nav>
      </section>
    </AppShell>
  );
}
