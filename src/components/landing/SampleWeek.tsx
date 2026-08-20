"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { MEALS_BY_SLUG } from "@/data/meals";
import { DAY_TYPES } from "@/data/dayTypes";
import { cn } from "@/lib/utils";
import type { DayType, MealSlot } from "@/types/domain";

interface SampleDay {
  day: string;
  abbr: string;
  type: DayType;
  meals: Record<MealSlot, string>;
}

const SAMPLE_WEEK: SampleDay[] = [
  {
    day: "Sunday",
    abbr: "Sun",
    type: "rest",
    meals: {
      breakfast: "yogurt-parfait",
      lunch: "turkey-wrap",
      snack: "apple-pb",
      dinner: "salmon-sweet-potato",
    },
  },
  {
    day: "Monday",
    abbr: "Mon",
    type: "school",
    meals: {
      breakfast: "cereal-banana-milk",
      lunch: "hibachi-chicken-bowl",
      snack: "cheese-crackers",
      dinner: "chicken-rice-broccoli",
    },
  },
  {
    day: "Tuesday",
    abbr: "Tue",
    type: "training",
    meals: {
      breakfast: "eggs-toast",
      lunch: "hibachi-chicken-bowl",
      snack: "banana-almonds",
      dinner: "turkey-tacos",
    },
  },
  {
    day: "Wednesday",
    abbr: "Wed",
    type: "school",
    meals: {
      breakfast: "berry-smoothie",
      lunch: "hibachi-chicken-bowl",
      snack: "apple-pb",
      dinner: "chicken-rice-broccoli",
    },
  },
  {
    day: "Thursday",
    abbr: "Thu",
    type: "training",
    meals: {
      breakfast: "eggs-toast",
      lunch: "hibachi-chicken-bowl",
      snack: "yogurt-honey-berries",
      dinner: "stirfry-chicken-rice",
    },
  },
  {
    day: "Friday",
    abbr: "Fri",
    type: "school",
    meals: {
      breakfast: "yogurt-parfait",
      lunch: "hibachi-chicken-bowl",
      snack: "apple-pb",
      dinner: "pasta-marinara",
    },
  },
  {
    day: "Saturday",
    abbr: "Sat",
    type: "match",
    meals: {
      breakfast: "english-muffin-pb",
      lunch: "turkey-wrap",
      snack: "banana-almonds",
      dinner: "chicken-rice-broccoli",
    },
  },
];

const SLOT_DOT: Record<MealSlot, string> = {
  breakfast: "bg-meal-breakfast",
  lunch: "bg-meal-lunch",
  snack: "bg-meal-snack",
  dinner: "bg-meal-dinner",
};

const SLOT_LABEL: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  snack: "Snack",
  dinner: "Dinner",
};

const DAY_DOT: Record<DayType, string> = {
  school: "bg-day-school",
  training: "bg-day-training",
  match: "bg-day-match",
  rest: "bg-day-rest",
};

const SLOTS_ORDER: MealSlot[] = ["breakfast", "lunch", "snack", "dinner"];

export function SampleWeek() {
  return (
    <section
      aria-labelledby="sample-week-title"
      className="px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              What a week looks like
            </p>
            <h2 id="sample-week-title" className="mt-2">
              A real youth soccer week, planned.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Sunday rest, two practice days, a Friday carb load, a Saturday match. The plan
              changes with the day type. The grocery list comes from this.
            </p>
          </header>
        </Reveal>

        <Reveal>
          <div className="mt-10 -mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0 md:pb-0">
            <ol className="flex min-w-max snap-x snap-mandatory gap-3 md:grid md:min-w-0 md:grid-cols-7 md:gap-3">
              {SAMPLE_WEEK.map((d) => (
                <li
                  key={d.day}
                  className="w-[220px] flex-shrink-0 snap-start md:w-auto"
                >
                  <DayCard data={d} />
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Hibachi chicken five lunches in a row? Yes. One Sunday cook session feeds the
              entire school week.
            </p>
            <Link
              href="/onboarding"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Plan your own week
              <ArrowRight
                size={14}
                weight="bold"
                aria-hidden
                className="transition group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DayCard({ data }: { data: SampleDay }) {
  const dayMeta = DAY_TYPES[data.type];

  return (
    <article className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-surface p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {data.abbr}
          </p>
          <p className="mt-0.5 text-base font-semibold text-ink">{data.day.slice(0, 3)}</p>
        </div>
        <span
          title={dayMeta.label}
          className={cn(
            "rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink",
            DAY_DOT[data.type]
          )}
        >
          {dayMeta.label.replace(" day", "")}
        </span>
      </header>

      <ul className="flex flex-1 flex-col gap-2">
        {SLOTS_ORDER.map((slot) => {
          const mealSlug = data.meals[slot];
          const meal = MEALS_BY_SLUG[mealSlug];
          return (
            <li key={slot} className="rounded-xl bg-muted/30 p-2.5">
              <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <span className={cn("h-1.5 w-1.5 rounded-full", SLOT_DOT[slot])} />
                {SLOT_LABEL[slot]}
              </span>
              <p className="mt-0.5 text-xs font-medium leading-snug text-ink line-clamp-2">
                {meal?.name ?? "—"}
              </p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
