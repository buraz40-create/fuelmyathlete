"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, Drop, ForkKnife, Warning } from "@phosphor-icons/react/dist/ssr";
import { MEALS } from "@/data/meals";
import { hydrationFor } from "@/data/hydration";
import { useRovingGroup } from "@/hooks/useRovingGroup";
import { cn } from "@/lib/utils";
import type { Meal, MealSlot } from "@/types/domain";

// Bands rather than single years, and the value is the youngest year in each band so the
// numbers err on the side of the smaller child. The 12 and 13 split is not cosmetic: 13 is where
// ageToCohort turns a child into a teen, which changes the hydration ceiling, so a band must
// never straddle it.
const AGES = [8, 10, 12, 13, 15] as const;
type Age = (typeof AGES)[number];

const AGE_LABEL: Record<Age, string> = {
  8: "8-9",
  10: "10-11",
  12: "12",
  13: "13-14",
  15: "15+",
};

const KICKOFFS = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"] as const;

function label(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

function minus(time: string, hours: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m - Math.round(hours * 60);
  const wrapped = ((total % 1440) + 1440) % 1440;
  return `${String(Math.floor(wrapped / 60)).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
}

function pick(slot: MealSlot, count: number): Meal[] {
  return MEALS.filter((m) => m.slot === slot && m.suitableFor.includes("match"))
    .sort((a, b) => b.kidRating - a.kidRating)
    .slice(0, count);
}

export function GameDayClient() {
  // Ten covers the ten and eleven year olds this site was built for.
  const [age, setAge] = useState<Age>(10);
  const [kickoff, setKickoff] = useState<string>("10:00");

  const ageKeys = useRovingGroup({
    items: AGES,
    selected: age,
    onSelect: setAge,
    idFor: (a) => `gd-age-${a}`,
    wrap: false,
  });
  const timeKeys = useRovingGroup({
    items: KICKOFFS,
    selected: kickoff as (typeof KICKOFFS)[number],
    onSelect: setKickoff,
    idFor: (t) => `gd-time-${t.replace(":", "")}`,
    wrap: false,
  });

  // The hydration numbers come from the same function the planner uses, so this page cannot
  // drift away from the rest of the site and start giving a different answer for the same child.
  const now = new Date().toISOString();
  const hydration = useMemo(
    () =>
      hydrationFor(
        { name: "", ageYears: age, createdAt: now, updatedAt: now },
        "match"
      ),
    // Deliberately keyed on age alone. The timestamps are only there because PlayerProfile
    // requires them, and including them would recompute this on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [age]
  );

  const bigMeal = pick("breakfast", 3);
  const topUp = pick("snack", 3);

  // Three hours is the usual advice for a full meal before hard exercise, one hour for a small
  // top-up. Both are about digestion rather than nutrition: a child who eats a plate of pasta
  // forty minutes before kickoff plays with it still in their stomach.
  const mealAt = minus(kickoff, 3);
  const snackAt = minus(kickoff, 1);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 md:px-8">
      <header className="pt-8 md:pt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Game day
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-ink md:text-4xl">
          What to eat before the game
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          Two taps, no account. Set the age and what time they play, and this works backwards
          from kickoff.
        </p>
      </header>

      <section className="mt-8 flex flex-col gap-5 rounded-3xl border border-border bg-surface p-5 md:p-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            How old are they?
          </span>
          <div
            role="radiogroup"
            aria-label="Age"
            onKeyDown={ageKeys.onKeyDown}
            className="mt-2 flex flex-wrap gap-2"
          >
            {AGES.map((a) => (
              <button
                key={a}
                type="button"
                role="radio"
                id={`gd-age-${a}`}
                aria-checked={age === a}
                aria-label={`Age ${AGE_LABEL[a]}`}
                tabIndex={ageKeys.tabIndexFor(a)}
                onClick={() => setAge(a)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition",
                  age === a
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-ink"
                )}
              >
                {AGE_LABEL[a]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What time is kickoff?
          </span>
          <div
            role="radiogroup"
            aria-label="Kickoff time"
            onKeyDown={timeKeys.onKeyDown}
            className="mt-2 flex flex-wrap gap-2"
          >
            {KICKOFFS.map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                id={`gd-time-${t.replace(":", "")}`}
                aria-checked={kickoff === t}
                tabIndex={timeKeys.tabIndexFor(t)}
                onClick={() => setKickoff(t)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition",
                  kickoff === t
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-ink"
                )}
              >
                {label(t)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ol className="mt-8 flex flex-col gap-4">
        <Step
          icon={<ForkKnife size={18} weight="duotone" aria-hidden />}
          time={label(mealAt)}
          title="The real meal, about three hours before"
          body="Carbohydrate they like, some protein, not much fat and nothing very fibrous. Fat and fibre are fine food and slow to digest, which is the one thing you do not want this morning."
          meals={bigMeal}
        />
        <Step
          icon={<Clock size={18} weight="duotone" aria-hidden />}
          time={label(snackAt)}
          title="A small top-up, about an hour before"
          body="Something small and mostly carbohydrate. A banana, a slice of toast with honey, a handful of dried fruit. If they are not hungry, skip it rather than push it."
          meals={topUp}
        />
        <Step
          icon={<Drop size={18} weight="duotone" aria-hidden />}
          time={label(kickoff)}
          title="Water through the morning, not all at once"
          body={`About ${hydration.goalOz} oz across the whole day for a ${AGE_LABEL[age]} year old on a match day, sipped steadily. A full bottle in the ten minutes before kickoff gives them a sloshing stomach and no more hydration than sipping would have.`}
        />
      </ol>

      <aside className="mt-8 flex gap-3 rounded-3xl border border-warning/30 bg-warning/5 p-5">
        <Warning size={20} weight="duotone" className="mt-0.5 shrink-0 text-warning" aria-hidden />
        <div className="text-sm leading-relaxed text-ink">
          <p className="font-semibold">Two things not to do</p>
          <p className="mt-1 text-muted-foreground">
            Do not try anything new on a match day. The morning of a game is the worst possible
            time to find out a food disagrees with them. And do not push fluids well past thirst
            in the belief that more is safer: children are more vulnerable than adults to drinking
            too much water too quickly, which is why the number above has a ceiling rather than
            climbing forever.
          </p>
        </div>
      </aside>

      <section className="mt-10 rounded-3xl border border-border bg-primary-soft/30 p-5 md:p-6">
        <h2 className="text-base font-semibold text-ink">If this was useful</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The planner does the same thing for a whole week, including the shopping. It is free and
          it does not need an account either.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/planner"
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Plan the week
          </Link>
          <Link
            href="/guides/what-to-eat-before-a-soccer-game"
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-5 text-sm font-semibold text-ink transition hover:border-primary"
          >
            The longer answer
          </Link>
        </div>
      </section>
    </div>
  );
}

function Step({
  icon,
  time,
  title,
  body,
  meals = [],
}: {
  icon: React.ReactNode;
  time: string;
  title: string;
  body: string;
  meals?: Meal[];
}) {
  return (
    <li className="rounded-3xl border border-border bg-surface p-5 md:p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
          {icon}
        </span>
        <span className="text-lg font-bold text-ink">{time}</span>
      </div>
      <h2 className="mt-3 text-base font-semibold text-ink">{title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
      {meals.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {meals.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/recipe/${m.recipeSlug ?? m.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-border bg-background px-4 text-sm font-medium text-ink transition hover:border-primary"
              >
                {m.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
