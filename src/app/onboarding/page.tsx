import type { Metadata } from "next";
import { ProfileSetup } from "@/components/onboarding/ProfileSetup";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  title: "Get Started: Free Athlete Profile Setup (30 Seconds)",
  description:
    "Set up your free athlete profile in 30 seconds. Age, weight, name. Every portion, hydration goal, and recipe in the planner scales to fit. No signup, no email required.",
  alternates: { canonical: `${SITE_URL}/onboarding` },
  openGraph: {
    type: "website",
    title: "Get Started: Free Athlete Profile Setup (30 Seconds)",
    description:
      "Free athlete profile setup. Age, weight, name. Every portion and hydration goal scales to fit.",
    url: `${SITE_URL}/onboarding`,
  },
};

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/onboarding#webpage`,
  url: `${SITE_URL}/onboarding`,
  name: "Welcome to FuelMyAthlete",
  description: "Athlete profile setup. Age, weight, name. Scales the entire planner.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  inLanguage: "en-US",
};

export default function OnboardingPage() {
  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
    >
      <script
        id="ld-onboarding-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <ProfileSetup />
    </main>
  );
}
