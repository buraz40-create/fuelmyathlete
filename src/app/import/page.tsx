import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { ImportClient } from "./ImportClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  title: "Add Your Own Recipe: Paste It and We Will Sort It Out",
  description:
    "Paste a recipe from anywhere and we turn it into ingredients and steps you can plan and shop from. Nothing is invented: anything the recipe did not say, we ask you for.",
  alternates: { canonical: `${SITE_URL}/import` },
  openGraph: {
    type: "website",
    title: "Add Your Own Recipe",
    description:
      "Paste a recipe from anywhere and we turn it into ingredients and steps you can plan and shop from.",
    url: `${SITE_URL}/import`,
  },
};

export default function ImportPage() {
  return (
    <AppShell>
      <ImportClient />
    </AppShell>
  );
}
