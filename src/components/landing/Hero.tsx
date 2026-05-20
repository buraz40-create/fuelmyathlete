import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { MockMealCard } from "@/components/landing/MockMealCard";
import { MockWaterTracker } from "@/components/landing/MockWaterTracker";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto w-full max-w-6xl px-4 pt-10 pb-16 md:px-8 md:pt-16 md:pb-24"
    >
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
        <div>
          <p className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            For athletes 8 and up
          </p>
          <h1 id="hero-title" className="mt-4">
            Plan the week. Shop once. Cook smart.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            A weekly meal planner built for athletes, from soccer kids to adult lifters. Pick
            what they will eat, get an auto grocery list, and track hydration. No signup needed
            to start.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Try the planner
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:border-primary"
            >
              See how it works
            </a>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Built by a parent of a competitive youth soccer player. Free, no ads, no upsell.
          </p>
        </div>

        <div aria-hidden className="relative flex flex-col gap-3">
          <MockMealCard
            slot="lunch"
            mealName="Hibachi chicken rice bowl"
            description="Elvis's favorite school lunch. One Sunday cook feeds the week."
            imageEmoji="🍱"
            className="md:translate-x-4"
          />
          <MockWaterTracker filled={6} total={10} className="md:-translate-x-4" />
          <MockMealCard
            slot="dinner"
            mealName="Salmon + sweet potato"
            description="Recovery dinner. Omega-3s and slow carbs."
            imageEmoji="🐟"
            className="md:translate-x-2"
          />
        </div>
      </div>
    </section>
  );
}
