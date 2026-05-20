import { CalendarPlus, Basket, Drop } from "@phosphor-icons/react/dist/ssr";
import { MockMealCard } from "./MockMealCard";
import { MockGroceryList } from "./MockGroceryList";
import { MockWaterTracker } from "./MockWaterTracker";

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="border-y border-border bg-surface/50 px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            How it works
          </p>
          <h2 id="how-title" className="mt-2">
            Three steps. Sixty seconds.
          </h2>
        </header>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          <li>
            <article className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-background p-5 shadow-sm md:p-6">
              <header className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                  <CalendarPlus size={20} weight="duotone" aria-hidden />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Step 1
                </p>
              </header>
              <div>
                <h3 className="text-lg">Pick meals</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tap any slot. Choose from athlete-friendly options pre-tagged for school days,
                  training, match days, and rest.
                </p>
              </div>
              <MockMealCard
                slot="breakfast"
                mealName="Berry banana smoothie"
                description="Hidden spinach for vitamins."
                imageEmoji="🥤"
                className="mt-auto"
              />
            </article>
          </li>

          <li>
            <article className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-background p-5 shadow-sm md:p-6">
              <header className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Basket size={20} weight="duotone" aria-hidden />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Step 2
                </p>
              </header>
              <div>
                <h3 className="text-lg">Get a grocery list</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Quantities scale by day type and body weight. Grouped by produce, protein,
                  pantry, so you can shop in one pass.
                </p>
              </div>
              <MockGroceryList className="mt-auto" />
            </article>
          </li>

          <li>
            <article className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-background p-5 shadow-sm md:p-6">
              <header className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Drop size={20} weight="duotone" aria-hidden />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Step 3
                </p>
              </header>
              <div>
                <h3 className="text-lg">Stay hydrated</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Daily water goals adjust for age, training load, and weather. Portions scale by
                  athlete weight, all within pediatric safety guidelines.
                </p>
              </div>
              <MockWaterTracker filled={4} total={10} className="mt-auto" />
            </article>
          </li>
        </ol>
      </div>
    </section>
  );
}
