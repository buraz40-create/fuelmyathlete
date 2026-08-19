import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { ServiceWorker } from "@/components/layout/ServiceWorker";
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
    "Free weekly meal planner, 24 athlete-tested recipes, and AAP-aligned hydration tracker for athletes 8 and up. Built for youth sports families. No signup.",
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
      "Free weekly meal planner, 24 athlete-tested recipes, and AAP-aligned hydration tracker for athletes 8 and up.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FuelMyAthlete: Free Meal Planner & Recipes for Athletes 8+",
    description:
      "Free weekly meal planner, 24 athlete-tested recipes, and AAP-aligned hydration tracker for athletes 8 and up.",
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
    <html lang="en" className={`${manrope.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <IconProvider>{children}</IconProvider>
        <ServiceWorker />
        <Toaster position="top-center" richColors />
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }}
        />
        <Script
          id="ld-person-editorial"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_LD) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
