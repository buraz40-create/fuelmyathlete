import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Trash, EnvelopeSimple, Database } from "@phosphor-icons/react/dist/ssr";
import { AppShell } from "@/components/layout/AppShell";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  title: "Delete Your FuelMyAthlete Account",
  description:
    "How to delete your FuelMyAthlete account and the data attached to it, what gets removed, and what is kept.",
  alternates: { canonical: `${SITE_URL}/delete-account` },
  openGraph: {
    type: "website",
    title: "Delete Your FuelMyAthlete Account",
    description: "How to delete your account and the data attached to it.",
    url: `${SITE_URL}/delete-account`,
  },
};

export default function DeleteAccountPage() {
  return (
    <AppShell>
      <article className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <Link
          href="/privacy"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden /> Privacy policy
        </Link>

        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Account deletion
          </p>
          <h1 className="mt-2">Deleting your FuelMyAthlete account</h1>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
            This page is for the app and website <strong>FuelMyAthlete</strong>, published by Haris
            Burazerovic. It explains how to have your account removed, what is deleted with it, and
            what is kept.
          </p>
        </header>

        <section
          aria-labelledby="no-account-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <Trash size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="no-account-title" className="text-base font-semibold text-ink">
              If you never made an account
            </h2>
          </header>
          <p className="text-sm leading-relaxed text-ink/90">
            The planner works without one, and in that case nothing about you exists on our servers
            to delete. Everything is on your own device. Clearing the app&rsquo;s storage in Android
            settings, or your browser&rsquo;s site data, removes it and we have no copy.
          </p>
        </section>

        <section
          aria-labelledby="steps-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <EnvelopeSimple size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="steps-title" className="text-base font-semibold text-ink">
              How to request deletion
            </h2>
          </header>
          <ol className="ml-5 flex list-decimal flex-col gap-3 text-sm leading-relaxed text-ink/90">
            <li>
              Email{" "}
              <a
                href="mailto:hi@fuelmyathlete.com?subject=Delete%20my%20account"
                className="font-medium text-primary underline underline-offset-2"
              >
                hi@fuelmyathlete.com
              </a>{" "}
              with the subject <strong>Delete my account</strong>.
            </li>
            <li>
              Send it <strong>from the email address the account uses</strong>. That is how we know
              the request is yours, and it is the only check we make.
            </li>
            <li>
              You do not need to explain why, and you do not need to include anything else. If we
              cannot match the address to an account we will reply and say so.
            </li>
            <li>
              We delete the account and everything attached to it{" "}
              <strong>within 30 days</strong>, usually the same week, and reply to confirm when it
              is done.
            </li>
          </ol>
        </section>

        <section
          aria-labelledby="what-title"
          className="mb-8 rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
        >
          <header className="mb-3 flex items-center gap-2">
            <Database size={20} weight="duotone" aria-hidden className="text-primary" />
            <h2 id="what-title" className="text-base font-semibold text-ink">
              What is deleted, and what is kept
            </h2>
          </header>

          <p className="mb-2 text-sm font-semibold text-ink">Deleted permanently</p>
          <ul className="mb-5 ml-5 flex list-disc flex-col gap-2 text-sm leading-relaxed text-ink/90">
            <li>Your account and the email address on it</li>
            <li>
              Every athlete profile in the household: first name, age, weight, height, sex, sport
              and position
            </li>
            <li>Meal plans, meal ratings, excluded foods, hydration entries and imported recipes</li>
            <li>Any household invitations you sent, and the device tokens used for notifications</li>
          </ul>

          <p className="mb-2 text-sm font-semibold text-ink">Kept, and why</p>
          <ul className="ml-5 flex list-disc flex-col gap-2 text-sm leading-relaxed text-ink/90">
            <li>
              <strong>Nothing that identifies you.</strong> There is no archive, no backup copy held
              back, and no marketing list you stay on.
            </li>
            <li>
              <strong>Anonymous page counts</strong> already recorded by analytics, which are not
              tied to your account and cannot be traced back to it.
            </li>
            <li>
              <strong>Server logs</strong> kept by our host for a short period as a normal part of
              running a website. These expire on their own.
            </li>
          </ul>

          <p className="mt-5 text-sm leading-relaxed text-ink/90">
            If you would rather remove some of your data without closing the account, say so in the
            same email and describe what you want gone. Deleting the app from your phone on its own
            does not delete the account.
          </p>
        </section>
      </article>
    </AppShell>
  );
}
