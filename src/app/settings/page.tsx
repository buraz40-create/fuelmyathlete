"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  EnvelopeSimple,
  GoogleLogo,
  Key,
  SignOut,
  User as UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/layout/AppShell";
import { ProfileSetup } from "@/components/onboarding/ProfileSetup";
import { HiddenMeals } from "@/components/planner/HiddenMeals";
import { TeenCalorieToggle } from "@/components/planner/TeenCalorieToggle";
import { WeeklyScheduleEditor } from "@/components/planner/WeeklyScheduleEditor";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { resetActivePlayerCache } from "@/lib/supabase/family";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function SettingsPage() {
  const router = useRouter();
  const { profile, hydrated: profileLoaded } = usePlayerProfile();
  const { user, hydrated: authLoaded } = useAuthUser();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    setSigningOut(true);
    await supabase.auth.signOut();
    resetActivePlayerCache();
    router.push("/");
    router.refresh();
  }

  const authProvider = user?.app_metadata?.provider as string | undefined;
  const providerLabel =
    authProvider === "google"
      ? "Google"
      : authProvider === "email"
      ? "Email + password"
      : authProvider
      ? authProvider
      : "Magic link";

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
          <h1>Your profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update athlete details, manage your account, sign out.
          </p>
        </header>

        {/* Account card (only when authenticated) */}
        {isSupabaseConfigured && authLoaded && user && (
          <section
            aria-labelledby="account-title"
            className="mb-6 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
          >
            <header className="mb-4 flex items-center gap-2">
              <UserIcon size={20} weight="duotone" aria-hidden className="text-primary" />
              <h2 id="account-title" className="text-base font-semibold text-ink">
                Account
              </h2>
            </header>

            <dl className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-3">
                <dt className="flex items-center gap-1.5 text-muted-foreground">
                  <EnvelopeSimple size={14} weight="duotone" aria-hidden />
                  Email
                </dt>
                <dd className="font-medium text-ink">{user.email}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="flex items-center gap-1.5 text-muted-foreground">
                  {authProvider === "google" ? (
                    <GoogleLogo size={14} weight="bold" aria-hidden />
                  ) : (
                    <Key size={14} weight="duotone" aria-hidden />
                  )}
                  Signed in with
                </dt>
                <dd className="font-medium text-ink">{providerLabel}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-muted-foreground">Member since</dt>
                <dd className="font-medium text-ink">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:border-danger hover:text-danger disabled:opacity-50"
            >
              <SignOut size={16} weight="duotone" aria-hidden />
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </section>
        )}

        {/* Anonymous CTA */}
        {isSupabaseConfigured && authLoaded && !user && (
          <section
            aria-label="Not signed in"
            className="mb-6 rounded-3xl border border-border bg-primary-soft/40 p-5 md:p-6"
          >
            <h2 className="text-base font-semibold text-ink">Want plans to follow you?</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              You&apos;re using FuelMyAthlete without an account. Your plan saves to this device.
              Create an account to sync across your phone, tablet, and laptop.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Create an account
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink transition hover:border-primary"
              >
                I already have one
              </Link>
            </div>
          </section>
        )}

        {/* Teen-only calorie visibility. The component renders nothing outside that cohort,
            so the section wrapper goes with it rather than leaving an empty card. */}
        <section
          aria-label="Calorie visibility"
          className="mb-6 rounded-3xl border border-border bg-surface p-5 shadow-sm empty:hidden md:p-6"
        >
          <TeenCalorieToggle />
        </section>

        {/* Recurring training and match pattern */}
        <section
          aria-labelledby="schedule-title"
          className="mb-6 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
        >
          <header className="mb-4">
            <h2 id="schedule-title" className="text-base font-semibold text-ink">
              Weekly schedule
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Which days are training and match days. New weeks start with this pattern instead
              of a guess.
            </p>
          </header>
          <WeeklyScheduleEditor />
        </section>

        {/* Foods the athlete refuses */}
        <section
          aria-labelledby="hidden-title"
          className="mb-6 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
        >
          <header className="mb-4">
            <h2 id="hidden-title" className="text-base font-semibold text-ink">
              Hidden meals
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Foods kept out of suggestions and auto-fill. Stored on this device.
            </p>
          </header>
          <HiddenMeals />
        </section>

        {/* Athlete profile editor */}
        <section
          aria-labelledby="athlete-title"
          className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6"
        >
          <header className="mb-4">
            <h2 id="athlete-title" className="text-base font-semibold text-ink">
              Athlete profile
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Used to calculate hydration goals, portions, and recommendations.
            </p>
          </header>

          {!profileLoaded ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <ProfileSetup
              chrome={false}
              redirectTo="/planner"
              submitLabel="Save changes"
              initial={profile ?? undefined}
            />
          )}
        </section>
      </section>
    </AppShell>
  );
}
