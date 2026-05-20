import { CalendarPlus, Basket, Drop } from "@phosphor-icons/react/dist/ssr";
import { MockMealCard } from "./MockMealCard";
import { MockGroceryList } from "./MockGroceryList";
import { MockWaterTracker } from "./MockWaterTracker";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    icon: CalendarPlus,
    step: "Step 1",
    title: "Pick meals",
    body: "Tap any slot. Choose from athlete-friendly options pre-tagged for school days, training, match days, and rest.",
    mock: (
      <MockMealCard
        slot="breakfast"
        mealName="Berry banana smoothie"
        description="Hidden spinach for vitamins."
        imageEmoji="🥤"
        className="mt-auto"
      />
    ),
  },
  {
    icon: Basket,
    step: "Step 2",
    title: "Get a grocery list",
    body: "Quantities scale by day type and body weight. Grouped by produce, protein, pantry, so you can shop in one pass.",
    mock: <MockGroceryList className="mt-auto" />,
  },
  {
    icon: Drop,
    step: "Step 3",
    title: "Stay hydrated",
    body: "Daily water goals adjust for age, training load, and weather. Portions scale by athlete weight, all within pediatric safety guidelines.",
    mock: <MockWaterTracker filled={4} total={10} className="mt-auto" />,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="border-y border-border bg-surface/50 px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              How it works
            </p>
            <h2 id="how-title" className="mt-2">
              Three steps. Sixty seconds.
            </h2>
          </header>
        </Reveal>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, step, title, body, mock }, i) => (
            <Reveal key={title} as="li" delay={i * 0.08}>
              <article className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-6">
                <header className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Icon size={20} weight="duotone" aria-hidden />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {step}
                  </p>
                </header>
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
                {mock}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
