import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { AppFooter } from "@/components/layout/AppFooter";
import { UserMenu } from "@/components/auth/UserMenu";

export function LandingShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2 md:px-8">
          <Link href="/" aria-label="FuelMyAthlete home" className="flex items-center">
            <Logo width={220} priority />
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium">
            <Link
              href="/recipes"
              className="hidden text-muted-foreground transition hover:text-ink sm:inline"
            >
              Recipes
            </Link>
            <Link
              href="/guides"
              className="hidden text-muted-foreground transition hover:text-ink sm:inline"
            >
              Guides
            </Link>
            <UserMenu className="hidden sm:inline-flex" />
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Try the planner
              <ArrowRight size={14} weight="bold" aria-hidden />
            </Link>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <AppFooter />
    </div>
  );
}
