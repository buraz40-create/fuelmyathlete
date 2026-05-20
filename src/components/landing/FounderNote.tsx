import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

export function FounderNote() {
  return (
    <section
      aria-labelledby="founder-title"
      className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8 md:py-24"
    >
      <Reveal as="article" className="rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-10">
        <Quotes size={32} weight="duotone" aria-hidden className="text-primary" />
        <h2 id="founder-title" className="mt-4 text-2xl leading-snug md:text-3xl">
          I built this because Elvis was always hungry but my grocery list never matched his
          training week. Now Sunday meal prep takes 30 minutes and he plans his own week.
        </h2>
        <footer className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft font-semibold text-primary">
            H
          </span>
          <span>
            <strong className="block text-ink">Haris</strong>
            Parent of an 11-year-old competitive soccer player
          </span>
        </footer>
        <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
          The site is free forever for individual families. If your team wants a coach dashboard,{" "}
          <a
            href="mailto:hi@fuelmyathlete.com"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            reach out
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}
