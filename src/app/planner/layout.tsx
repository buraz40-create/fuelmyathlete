import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { AppShell } from "@/components/layout/AppShell";
import { BottomNav } from "@/components/layout/BottomNav";
import { TabBar } from "@/components/layout/TabBar";
import { PlanProvider } from "@/components/planner/PlanProvider";
import { ProfileGate } from "@/components/planner/ProfileGate";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  title: "Planner",
  description:
    "Plan a week of athlete meals. Auto grocery list, hydration tracking, portions by age and day type.",
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
    "Interactive weekly meal planner for athletes 8 and up. Auto grocery list, day-type aware portions, AAP-aligned hydration tracking.",
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
          {children}
          <BottomNav />
        </AppShell>
      </PlanProvider>
    </ProfileGate>
  );
}
