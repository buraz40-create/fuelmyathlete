import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LandingShell } from "@/components/layout/LandingShell";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SampleWeek } from "@/components/landing/SampleWeek";
import { Audiences } from "@/components/landing/Audiences";
import { Credibility } from "@/components/landing/Credibility";
import { FounderNote } from "@/components/landing/FounderNote";
import { Faq, LANDING_FAQ } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  title: "FuelMyAthlete: Weekly Meal Planner for Athletes 8 and Up",
  description:
    "Plan a week of meals, get an auto grocery list, track hydration. Free interactive meal planner for athletes 8 and up. Pediatric-safe, reviewed against AAP, NATA, and ACSM sources.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    title: "FuelMyAthlete: Weekly Meal Planner for Athletes 8 and Up",
    description:
      "Free interactive meal planner for athletes 8 and up. Auto grocery list, hydration tracking, pediatric safety caps.",
    url: `${SITE_URL}/`,
  },
};

interface HomeProps {
  searchParams: Promise<{ code?: string; error?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  // If a magic-link landed at the root because Supabase fell back to Site URL,
  // forward to /auth/callback for session exchange.
  if (params.code) {
    redirect(`/auth/callback?code=${encodeURIComponent(params.code)}`);
  }

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_URL}/#webapp`,
    name: "FuelMyAthlete",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    url: SITE_URL,
    description:
      "Weekly meal planner for athletes 8 and up. Auto grocery list, hydration tracking, pediatric safety caps.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${SITE_URL}/#organization` },
    audience: {
      "@type": "Audience",
      audienceType: "Athletes age 8 and up, youth sports families, coaches",
    },
    featureList: [
      "Weekly meal planning",
      "Auto-generated grocery list",
      "Hydration tracker with AAP-aligned pediatric formulas",
      "Day-type aware portion math",
      "23+ athlete-tested recipes",
      "Age-band cohort support (child, teen, adult)",
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: LANDING_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: "FuelMyAthlete: Weekly Meal Planner for Athletes 8 and Up",
    description:
      "Free interactive meal planner for athletes 8 and up. Auto grocery list, hydration tracking, pediatric safety caps.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: `${SITE_URL}/opengraph-image`,
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        id="ld-webpage-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        id="ld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        id="ld-faq-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <LandingShell>
        <Hero />
        <HowItWorks />
        <SampleWeek />
        <Audiences />
        <Credibility />
        <FounderNote />
        <Faq />
        <FinalCta />
      </LandingShell>
    </>
  );
}
