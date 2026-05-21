import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { IconProvider } from "@/components/IconProvider";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-7ZJ4GLBXHV";

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
    default: "FuelMyAthlete: Meal Planning for Athletes",
    template: "%s · FuelMyAthlete",
  },
  description:
    "Plan a week of meals, get an auto grocery list, track hydration. Built for athletes 8 and up, from soccer kids to adult lifters.",
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
    title: "FuelMyAthlete: Meal Planning for Athletes",
    description:
      "Plan a week of meals, get an auto grocery list, track hydration. Built for athletes 8 and up.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FuelMyAthlete: Meal Planning for Athletes",
    description:
      "Plan a week of meals, get an auto grocery list, track hydration. Built for athletes 8 and up.",
  },
  robots: {
    index: true,
    follow: true,
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
        <Toaster position="top-center" richColors />
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
