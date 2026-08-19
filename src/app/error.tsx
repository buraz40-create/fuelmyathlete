"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No error service wired up yet, so at least leave a trace in the browser console.
    console.error("Route error:", error);
  }, [error]);

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-16 text-center md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Something broke
      </p>
      <h1 className="mt-2">That did not load</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Your meal plan is saved on this device, so nothing you picked is gone. Try again, and if
        it keeps happening the planner itself still works offline.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/planner"
          className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:border-primary/40"
        >
          Back to the planner
        </Link>
      </div>

      {error.digest && (
        <p className="mt-6 text-[11px] text-muted-foreground">Reference: {error.digest}</p>
      )}
    </section>
  );
}
