import Script from "next/script";
import { redirect } from "next/navigation";
import { LandingShell } from "@/components/layout/LandingShell";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Audiences } from "@/components/landing/Audiences";
import { Credibility } from "@/components/landing/Credibility";
import { FounderNote } from "@/components/landing/FounderNote";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";

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

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FuelMyAthlete",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    url: "https://fuelmyathlete.com",
    description:
      "Weekly meal planner for athletes 8 and up. Auto grocery list, hydration tracking, pediatric safety caps.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <Script
        id="ld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <LandingShell>
        <Hero />
        <HowItWorks />
        <Audiences />
        <Credibility />
        <FounderNote />
        <Faq />
        <FinalCta />
      </LandingShell>
    </>
  );
}
