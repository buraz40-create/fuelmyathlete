import { Plus } from "@phosphor-icons/react/dist/ssr";

const QUESTIONS = [
  {
    q: "Is it free?",
    a: "Yes, completely free for individual athletes and families. No account required to start, no credit card, no ads.",
  },
  {
    q: "Do I need to sign up?",
    a: "No. The planner works without an account, saving to your browser. Sign in only if you want your plan synced across devices.",
  },
  {
    q: "Is it safe for kids?",
    a: "Yes. Calorie counts are hidden for athletes under 13 per AAP guidance against calorie counting in pre-teens. Hydration goals are capped well below pediatric thresholds for water intoxication risk.",
  },
  {
    q: "Will it work for adult athletes?",
    a: "Yes. Formulas adapt by age and weight. Adults see full calorie targets via Mifflin-St Jeor and macro splits by sport category. A 30-year-old training for a triathlon gets different recommendations than an 11-year-old soccer player.",
  },
  {
    q: "What sports does it cover?",
    a: "All of them. The meal catalog covers general athletic nutrition. Soccer, basketball, baseball, running, lifting, swimming, anything that burns calories and needs recovery food.",
  },
];

export function Faq() {
  return (
    <section
      aria-labelledby="faq-title"
      className="border-y border-border bg-surface/50 px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-3xl">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</p>
          <h2 id="faq-title" className="mt-2">
            Common questions
          </h2>
        </header>

        <ul className="mt-8 flex flex-col gap-3">
          {QUESTIONS.map((item) => (
            <li key={item.q}>
              <details className="group rounded-2xl border border-border bg-background p-4 md:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-ink">
                  {item.q}
                  <Plus
                    size={18}
                    weight="bold"
                    aria-hidden
                    className="flex-shrink-0 text-muted-foreground transition group-open:rotate-45"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
