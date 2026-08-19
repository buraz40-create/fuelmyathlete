import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { AppShell } from "@/components/layout/AppShell";
import { InstallPrompt } from "@/components/layout/InstallPrompt";
import { BottomNav } from "@/components/layout/BottomNav";
import { TabBar } from "@/components/layout/TabBar";
import { PlanProvider } from "@/components/planner/PlanProvider";
import { ProfileGate } from "@/components/planner/ProfileGate";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  title: "Free Weekly Meal Planner for Athletes",
  description:
    "Plan breakfast, lunch, snack, and dinner across the week. Auto grocery list, hydration tracker, portions that scale by day type and servings. Saves to your browser, no signup.",
  robots: { index: false, follow: false },
};

const softwareAppLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/planner#software`,
  name: "FuelMyAthlete Planner",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Meal Planning",
  operatingSystem: "Any (Web)",
  url: `${SITE_URL}/planner`,
  description:
    "Interactive weekly meal planner for young athletes. Auto grocery list, day-type aware portions, AAP-aligned hydration tracking.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${SITE_URL}/#organization` },
  featureList: [
    "Day-type aware portion math (school, training, match, rest)",
    "Auto-generated grocery list grouped by aisle",
    "Hydration tracker with AAP pediatric and ACSM adult formulas",
    "Cohort-aware UI (child / teen / adult)",
    "23+ athlete-tested recipes",
    "localStorage offline mode",
  ],
};

export default function PlannerLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileGate>
      <PlanProvider>
        <AppShell>
          <Script
            id="ld-planner-software"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }}
          />
          <TabBar />
          <InstallPrompt />
          {children}
          <BottomNav />
        </AppShell>
      </PlanProvider>
    </ProfileGate>
  );
}
