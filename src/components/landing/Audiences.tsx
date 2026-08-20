import { Baby, PersonSimpleRun, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";

const AUDIENCES = [
  {
    icon: Baby,
    title: "Young athletes (8-17)",
    body: "Kid-friendly UI, calorie totals hidden per AAP guidance, pediatric safety caps on hydration. Elvis is 11 and uses it on his own.",
  },
  {
    icon: PersonSimpleRun,
    title: "Adult athletes (18+)",
    body: "Full kcal and macro tracking via Mifflin-St Jeor. Sport-specific macro splits for endurance, strength, and mixed team sports.",
  },
  {
    icon: UsersThree,
    title: "Coaches and teams",
    body: "Coming soon. Manage athletes across a roster, share a single meal philosophy with the whole team.",
  },
];

export function Audiences() {
  return (
    <section
      aria-labelledby="audiences-title"
      className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24"
    >
      <Reveal>
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Who it is for
          </p>
          <h2 id="audiences-title" className="mt-2">
            One product, every athlete in your house.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Same app adapts by age, and by body weight from 13 up, so the calculations are right whether you are
            planning for an 11-year-old soccer kid or a 30-year-old training for a marathon.
          </p>
        </header>
      </Reveal>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {AUDIENCES.map(({ icon: Icon, title, body }, i) => (
          <Reveal key={title} as="li" delay={i * 0.08}>
            <article className="h-full rounded-3xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon size={26} weight="duotone" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
