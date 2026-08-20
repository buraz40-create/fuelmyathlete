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

/**
 * Android's share sheet sends the shared payload here as query params, per the share_target
 * declared in the manifest. Which field carries what is inconsistent between apps: a browser
 * usually fills `url`, while most social apps put everything into `text` and leave `url`
 * empty, so a link often arrives inside the text blob. The client sorts that out rather than
 * trusting the field names.
 */
export default async function ImportPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; text?: string; url?: string }>;
}) {
  const shared = await searchParams;

  return (
    <AppShell>
      <ImportClient
        sharedTitle={shared.title}
        sharedText={shared.text}
        sharedUrl={shared.url}
      />
    </AppShell>
  );
}
