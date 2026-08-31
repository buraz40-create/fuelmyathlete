import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { ServiceWorker } from "@/components/layout/ServiceWorker";
import { NativeBridge } from "@/components/native/NativeBridge";
import { AppTabBar } from "@/components/native/AppTabBar";
import { IconProvider } from "@/components/IconProvider";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-7ZJ4GLBXHV";

const SITE_URL_FOR_LD =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL_FOR_LD}/#organization`,
  name: "FuelMyAthlete",
  url: SITE_URL_FOR_LD,
  logo: `${SITE_URL_FOR_LD}/images/favicon.png`,
  description:
    "Interactive weekly meal planner, recipe library, and hydration tracker for athletes 8 and up.",
  knowsAbout: [
    "youth sports nutrition",
    "pre-workout meals",
    "post-workout recovery",
    "pre-game fueling",
    "carb loading",
    "hydration for athletes",
    "AAP pediatric sports nutrition",
    "NATA fluid replacement guidance",
    "ACSM nutrition and athletic performance",
  ],
  sameAs: ["https://fuelmyathlete.com"],
};

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL_FOR_LD}/#editorial-team`,
  name: "FuelMyAthlete Editorial Team",
  url: `${SITE_URL_FOR_LD}/methodology`,
  description:
    "Editorial team behind FuelMyAthlete guides. Content is reviewed against published position stands from the American Academy of Pediatrics, National Athletic Trainers' Association, and American College of Sports Medicine.",
  knowsAbout: [
    "youth sports nutrition",
    "pediatric hydration",
    "match-day fueling",
    "pre-workout nutrition",
    "carb loading protocols",
  ],
  worksFor: { "@id": `${SITE_URL_FOR_LD}/#organization` },
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL_FOR_LD}/#website`,
  url: SITE_URL_FOR_LD,
  name: "FuelMyAthlete",
  publisher: { "@id": `${SITE_URL_FOR_LD}/#organization` },
  inLanguage: "en-US",
};

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://fuelmyathlete.com");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FuelMyAthlete: Free Meal Planner & Recipes for Athletes 8+",
    template: "%s · FuelMyAthlete",
  },
  description:
    "Free weekly meal planner, 31 athlete-tested recipes, and AAP-aligned hydration tracker for athletes 8 and up. Built for youth sports families. No signup.",
  applicationName: "FuelMyAthlete",
  keywords: [
    "meal planner",
    "youth athlete nutrition",
    "soccer nutrition",
    "sports meal prep",
    "grocery list app",
    "hydration tracker",
    "athlete fuel",
  ],
  authors: [{ name: "FuelMyAthlete" }],
  openGraph: {
    type: "website",
    siteName: "FuelMyAthlete",
    title: "FuelMyAthlete: Free Meal Planner & Recipes for Athletes 8+",
    description:
      "Free weekly meal planner, 31 athlete-tested recipes, and AAP-aligned hydration tracker for athletes 8 and up.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FuelMyAthlete: Free Meal Planner & Recipes for Athletes 8+",
    description:
      "Free weekly meal planner, 31 athlete-tested recipes, and AAP-aligned hydration tracker for athletes 8 and up.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "rEXMEjwQ4l2fIq176IiNVhiuEsL2eSZnyv8-kQYKmik",
  },
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
    ],
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#6b9148",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning covers this element's own attributes, nothing inside it.
    //
    // The Android WebView writes --safe-area-inset-* onto the document element before the page
    // hydrates, so React saw a style attribute the server never rendered and reported a
    // mismatch on every app launch. Confirmed it is the shell and not us: loaded in a plain
    // browser, html carries no style attribute at all, and the only safe-area references in
    // this codebase are env() calls in CSS.
    //
    // The warning is dev-only but the mismatch is not: a difference on the root is the sort
    // React can decide to recover from by rebuilding the tree on the client, which is a flash
    // of blank on a phone at the moment the app opens.
    <html lang="en" className={`${manrope.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <IconProvider>{children}</IconProvider>
        <ServiceWorker />
        {/*
          Root layout, not AppShell. AppShell wraps most routes but not the landing page, which
          uses LandingShell, so mounting it there left "/" with no status bar, no splash hide
          and no back button handling. Pressing back on the landing page exited the app to the
          launcher instead of going back, which only showed up running the real thing on a
          device. Renders nothing, and does nothing at all in a browser.
        */}
        <NativeBridge />
        {/* Present on every page, and invisible unless the document is marked native. */}
        <AppTabBar />
        <Toaster position="top-center" richColors />
        <script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }}
        />
        <script
          id="ld-person-editorial"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
        <script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_LD) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        {/*
          Analytics with the advertising half switched off.

          This is a product for children. Google Play's Families policy does not allow an app
          whose audience includes under 13s to collect an advertising identifier from them, and
          COPPA is the same answer from the other direction. Left at its defaults, gtag is
          allowed to hand measurement over to Google Signals and to build an advertising profile
          from it, which is a thing nobody signed up for by opening a meal planner.

          So: page counts stay, the advertising path goes. These two flags are the documented
          way to say that, and they have to be set on config rather than after it, because by
          the time the first page_view fires the decision has already been made.
        */}
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `}
        </Script>
      </body>
    </html>
  );
}
