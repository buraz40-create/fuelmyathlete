import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2 md:px-8">
          <Link href="/planner" aria-label="FuelMyAthlete home" className="flex items-center">
            <Logo width={260} priority />
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-muted-foreground">
            <Link
              href="/recipe/hibachi-chicken"
              className="transition hover:text-ink"
            >
              Recipes
            </Link>
            <Link
              href="/settings"
              className="transition hover:text-ink"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1 pb-24 md:pb-12">
        {children}
      </main>

      <footer className="border-t border-border bg-surface/40 px-4 py-6 md:px-8">
        <p className="mx-auto max-w-6xl text-[11px] leading-relaxed text-muted-foreground">
          FuelMyAthlete provides general guidance based on AAP, NATA, and ACSM sources. Not medical
          advice. For personalized sports nutrition plans, especially for children, consult a
          registered sports dietitian or pediatrician.
        </p>
      </footer>
    </div>
  );
}
