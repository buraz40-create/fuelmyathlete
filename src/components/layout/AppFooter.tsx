import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-surface/40 px-4 py-8 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-[11px] leading-relaxed text-muted-foreground">
          FuelMyAthlete provides general guidance based on AAP, NATA, and ACSM sources. Not medical
          advice. For personalized sports nutrition plans, especially for children, consult a
          registered sports dietitian or pediatrician.
        </p>
        <nav className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
          <Link href="/recipes" className="transition hover:text-ink">
            Recipes
          </Link>
          <Link href="/guides" className="transition hover:text-ink">
            Guides
          </Link>
          <Link href="/methodology" className="transition hover:text-ink">
            Methodology
          </Link>
          <Link href="/sign-in" className="transition hover:text-ink">
            Sign in
          </Link>
          <a href="mailto:hi@fuelmyathlete.com" className="transition hover:text-ink">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
