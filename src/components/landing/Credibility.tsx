import { Books, Heartbeat, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const PILLARS = [
  {
    icon: Books,
    title: "Pediatric hydration",
    body: "Formulas from the American Academy of Pediatrics (AAP) and the National Athletic Trainers' Association (NATA). A flat 64 oz baseline for ages 8 to 12, with a hard 100 oz daily ceiling.",
  },
  {
    icon: Heartbeat,
    title: "Adult calorie targets",
    body: "BMR via Mifflin-St Jeor. Activity multipliers and macro splits from ACSM Position Stand on Exercise and Fluid Replacement.",
  },
  {
    icon: ShieldCheck,
    title: "Safety caps for kids",
    body: "Hard ceilings on hydration for under-13 athletes to prevent water intoxication. Calorie counts hidden for pre-teens per AAP guidance against pre-pubescent calorie counting.",
  },
];

export function Credibility() {
  return (
    <section
      aria-labelledby="credibility-title"
      className="border-y border-border bg-primary-soft/30 px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Built on real guidelines
            </p>
            <h2 id="credibility-title" className="mt-2">
              Backed by real sports nutrition science.
            </h2>
          </header>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} as="li" delay={i * 0.08}>
              <article className="h-full rounded-3xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-background text-primary">
                  <Icon size={24} weight="duotone" aria-hidden />
                </span>
                <h3 className="mt-4 text-base">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
            FuelMyAthlete provides general guidance, not medical advice. For personalized sports
            nutrition plans, consult a registered sports dietitian or pediatrician.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
