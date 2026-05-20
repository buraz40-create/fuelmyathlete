"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/layout/AppShell";
import { ProfileSetup } from "@/components/onboarding/ProfileSetup";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";

export default function SettingsPage() {
  const { profile, hydrated } = usePlayerProfile();

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-2xl px-4 py-6 md:px-8 md:py-10">
        <Link
          href="/planner"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> Back to planner
        </Link>

        <header className="mb-6">
          <h1>Athlete profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update age and weight to keep hydration goals and portions accurate.
          </p>
        </header>

        {!hydrated ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <ProfileSetup
            redirectTo="/planner"
            submitLabel="Save changes"
            initial={profile ?? undefined}
          />
        )}
      </section>
    </AppShell>
  );
}
