"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newProfile } from "@/lib/player/profile";
import { isValidProfile, ageToCohort, cohortLabel } from "@/lib/player/cohort";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";

interface ProfileSetupProps {
  redirectTo?: string;
  submitLabel?: string;
  initial?: { name?: string; ageYears?: number; weightLb?: number };
}

export function ProfileSetup({
  redirectTo = "/planner",
  submitLabel = "Start planning",
  initial,
}: ProfileSetupProps) {
  const router = useRouter();
  const { save } = usePlayerProfile();
  const [name, setName] = useState(initial?.name ?? "");
  const [ageYears, setAgeYears] = useState<number | "">(initial?.ageYears ?? "");
  const [weightLb, setWeightLb] = useState<number | "">(initial?.weightLb ?? "");
  const [error, setError] = useState<string | null>(null);

  // Weight is only asked for where a formula uses it. Under 13 the hydration baseline is
  // flat and portions do not scale, so the field would be busywork with a bathroom scale.
  const needsWeight = ageYears === "" || Number(ageYears) >= 13;
  const draft = {
    name,
    ageYears: Number(ageYears),
    weightLb: weightLb === "" ? undefined : Number(weightLb),
  };
  const valid = isValidProfile(draft);
  const cohort = valid ? ageToCohort(draft.ageYears) : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidProfile(draft)) {
      setError(
        needsWeight
          ? "Add a name, age (5-99), and weight (30-500 lb)."
          : "Add a name and an age (5-99)."
      );
      return;
    }
    await save(newProfile(draft));
    router.push(redirectTo);
  }

  return (
    <article className="mx-auto w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8">
      <header className="mb-5 flex flex-col items-center text-center">
        <Logo width={340} priority />
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
          Welcome
        </p>
        <h1 className="mt-1 text-2xl">Tell us about the athlete</h1>
      </header>

      <p className="mb-5 text-sm text-muted-foreground">
        We use age to calculate the right hydration, portions, and recommendations. Your
        data stays on this device until you create an account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Athlete name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Elvis"
            autoComplete="off"
            required
          />
        </div>

        <div className={needsWeight ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 gap-3"}>
          <div className="space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              inputMode="numeric"
              min={5}
              max={99}
              value={ageYears}
              onChange={(e) => setAgeYears(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="11"
              required
            />
          </div>
          {needsWeight && (
            <div className="space-y-1.5">
              <Label htmlFor="weight">Weight (lb)</Label>
              <Input
                id="weight"
                type="number"
                inputMode="numeric"
                min={30}
                max={500}
                value={weightLb}
                onChange={(e) => setWeightLb(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="150"
                required
              />
            </div>
          )}
        </div>

        {cohort && (
          <p className="rounded-2xl bg-primary-soft/60 px-3 py-2 text-xs text-primary">
            We&apos;ll set up <strong>{cohortLabel(cohort).toLowerCase()}</strong> guidance.
            {cohort === "child" &&
              " Calorie counts stay hidden (AAP guidance), and we do not need a weight."}
            {cohort === "adult" && " Calorie + macro tracking available."}
          </p>
        )}

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!valid}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-40"
        >
          {submitLabel}
          <ArrowRight size={16} weight="bold" aria-hidden />
        </button>

        <p className="pt-2 text-center text-[11px] leading-relaxed text-muted-foreground">
          FuelMyAthlete provides general guidance based on AAP, NATA, and ACSM sources.
          Not medical advice. Talk to a registered sports dietitian for personalized plans.
        </p>
      </form>
    </article>
  );
}
