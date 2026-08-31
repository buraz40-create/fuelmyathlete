import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Baby, Database, ChartBar } from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/layout/AppShell";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

// The date this text last changed. Not a build date: a policy that silently claims to be current
// on every deploy tells a reader nothing about whether the terms moved.
const LAST_UPDATED = "August 31, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What FuelMyAthlete stores, where it stores it, and what happens to a child's information. No ads, no data sales, and no account required to use the planner.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    type: "website",
    title: "Privacy Policy",
    description:
      "What FuelMyAthlete stores, where it stores it, and what happens to a child's information.",
    url: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Privacy", item: `${SITE_URL}/privacy` },
    ],
  };

  return (
    <AppShell>
      <script
        id="ld-privacy-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <article className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> Home
        </Link>

        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Privacy</p>
          <h1 className="mt-2">What we store, and what we do not</h1>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
            This app is built by a parent for his own child, and the shortest honest summary is
            that it tries to hold as little as it can get away with. There are no ads. Nothing
            here is sold or shared with data brokers. The planner works without an account at all.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Last updated {LAST_UPDATED}.</p>
        </header>

        <section
          aria-labelledby="no-account-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <Shield size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="no-account-title" className="text-base font-semibold text-ink">
              Using it without an account
            </h2>
          </header>
          <p className="text-sm leading-relaxed text-ink/90">
            If you never sign in, your information never leaves your device. The profile you set
            up, the week you plan, the meals you rate and the ones you exclude are all written to
            your browser&rsquo;s own storage under keys beginning{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[13px]">fma:</code>. We cannot read
            them, because they are never sent anywhere. Clearing your browser data, or the app&rsquo;s
            data in Android settings, deletes them permanently and we have no copy to restore.
          </p>
        </section>

        <section
          aria-labelledby="account-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <Database size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="account-title" className="text-base font-semibold text-ink">
              If you make an account
            </h2>
          </header>
          <p className="mb-3 text-sm leading-relaxed text-ink/90">
            An account exists so a plan follows you between a phone and a laptop, and so a second
            parent can see the same week. Signing in is by email and password, or through Google
            if you choose that. Accounts are for the adult. A child is never asked to make one.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-ink/90">Stored on our behalf, we hold:</p>
          <ul className="ml-5 flex list-disc flex-col gap-2 text-sm leading-relaxed text-ink/90">
            <li>
              <strong>Your email address</strong>, to identify the account and let you sign back in.
            </li>
            <li>
              <strong>Your athlete&rsquo;s first name, age, weight, height, sex, sport and position.</strong>{" "}
              Every number the planner produces scales off these, which is the whole reason it asks.
              A nickname works as well as a real name.
            </li>
            <li>
              <strong>What you planned and what they thought of it</strong>: the week&rsquo;s meals,
              star ratings, foods you have excluded, hydration entries, and any recipe you imported.
            </li>
            <li>
              <strong>Anyone you invite</strong> to share the household, by the email address you
              send the invitation to.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-ink/90">
            This sits in a Postgres database hosted by Supabase, protected by row level security,
            which means the database itself refuses to return another household&rsquo;s rows rather
            than relying on the app to remember to filter them. Email delivery for sign-in and
            invitations runs through the same provider.
          </p>
        </section>

        <section
          aria-labelledby="children-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <Baby size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="children-title" className="text-base font-semibold text-ink">
              About children
            </h2>
          </header>
          <ul className="ml-5 flex list-disc flex-col gap-2 text-sm leading-relaxed text-ink/90">
            <li>
              The account holder is a parent or guardian. By entering a child&rsquo;s details you
              are giving consent, as their parent, for us to store them for the purpose described
              above and nothing else.
            </li>
            <li>
              A child&rsquo;s information is never used for advertising, never used to build a
              profile, and never sold or shared with anyone outside the providers listed here that
              are needed to run the service.
            </li>
            <li>
              Calorie figures are deliberately hidden from athletes under 13, following American
              Academy of Pediatrics guidance. That is a product decision rather than a privacy one,
              but it comes from the same place.
            </li>
            <li>
              To see, correct, or delete everything held about your child, email{" "}
              <a
                href="mailto:hi@fuelmyathlete.com"
                className="font-medium text-primary underline underline-offset-2"
              >
                hi@fuelmyathlete.com
              </a>{" "}
              and it will be done. Deleting the account removes the household and every row
              attached to it.
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="analytics-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <ChartBar size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="analytics-title" className="text-base font-semibold text-ink">
              Analytics, notifications, and what we switched off
            </h2>
          </header>
          <ul className="ml-5 flex list-disc flex-col gap-2 text-sm leading-relaxed text-ink/90">
            <li>
              <strong>Google Analytics</strong> counts page views so we know which guides get read.
              Its advertising features are explicitly disabled: no Google Signals, no ad
              personalization. It is measurement, and it is not allowed to become anything else.
            </li>
            <li>
              <strong>Notifications</strong> are opt-in through the Android permission prompt, and
              the app only asks once you have an account and an athlete set up. Declining is
              remembered and you will not be asked again. If you allow them, a device token is
              stored so a reminder can reach that phone.
            </li>
            <li>
              <strong>Importing a recipe by link</strong> sends that URL to our server so the page
              can be fetched and read. The link is used for that and not kept as a browsing record.
            </li>
            <li>
              <strong>Hosting.</strong> The site runs on Vercel, which keeps standard server logs
              including IP addresses for a limited period, as any web host does.
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="contact-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <h2 id="contact-title" className="mb-3 text-base font-semibold text-ink">
            Asking us anything
          </h2>
          <p className="text-sm leading-relaxed text-ink/90">
            Questions, corrections, or a request to delete an account go to{" "}
            <a
              href="mailto:hi@fuelmyathlete.com"
              className="font-medium text-primary underline underline-offset-2"
            >
              hi@fuelmyathlete.com
            </a>
            . If this policy changes in a way that affects what we hold, the date at the top moves
            and the change is described here rather than applied quietly.
          </p>
        </section>
      </article>
    </AppShell>
  );
}
