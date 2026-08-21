import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { AppFooter } from "@/components/layout/AppFooter";
import { UserMenu } from "@/components/auth/UserMenu";
import { RatingsSync } from "@/components/auth/RatingsSync";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Renders nothing. Here rather than in PlanProvider because ratings show on the recipe
          pages and the recipes grid too, which are outside the planner. */}
      <RatingsSync />
      <header data-print-hide className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-1 px-3 py-2 md:gap-4 md:px-8">
          {/*
            The logo was a flat 260px wide. On a 375px phone that is 69% of the screen, which
            squeezed the whole of the navigation into the strip left over and made the header
            102px tall. It scales now: the intrinsic width stays 260 so the srcset is still
            right, and CSS shrinks it on small screens.
          */}
          <Link
            href="/planner"
            aria-label="FuelMyAthlete home"
            className="flex min-w-0 shrink items-center"
          >
            {/*
              Allowed to shrink rather than shrink-0. The four navigation items need about
              225px, and a 320px phone only has 296 once the padding is off, so something has
              to give. Better the wordmark than the navigation: it stays legible small, and the
              alternative was Sign in hanging off the edge of the screen.
            */}
            <Logo
              width={260}
              className="h-auto w-[104px] min-w-[76px] md:w-[260px]"
              priority
            />
          </Link>
          {/*
            Every link here is at least 44px tall. They used to be bare text, which rendered
            about 20 pixels high on a phone: reported as not being able to tap them. The padded
            box is invisible, so nothing looks different on a desktop.
          */}
          <nav className="flex shrink-0 items-center gap-0.5 text-[13px] font-medium text-muted-foreground md:gap-4 md:text-sm">
            <Link
              href="/recipes"
              className="flex min-h-11 items-center rounded-lg px-1.5 transition hover:text-ink md:px-2"
            >
              Recipes
            </Link>
            {/*
              This was hidden below 640px, so Guides simply could not be reached from a phone.
              The bottom bar only covers the planner's own sections, so there was no other way
              to it.
            */}
            <Link
              href="/guides"
              className="flex min-h-11 items-center rounded-lg px-1.5 transition hover:text-ink md:px-2"
            >
              Guides
            </Link>
            <Link
              href="/settings"
              className="flex min-h-11 items-center rounded-lg px-1.5 transition hover:text-ink md:px-2"
            >
              Profile
            </Link>
            <UserMenu />
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1 pb-24 md:pb-12">
        {children}
      </main>

      <AppFooter />
    </div>
  );
}
