import type { CapacitorConfig } from "@capacitor/cli";

/**
 * The Android shell around the site that already exists.
 *
 * The roadmap rejected React Native with numbers: 13,474 lines with about 2,750 reusable, every
 * route and all 61 components rewritten, and the recipe and guide pages unable to exist there at
 * all, which means two codebases forever. It left Capacitor open, and this is that.
 *
 * The important consequence of the choice below: `server.url` means the app loads the live site
 * rather than a copy bundled into the APK. One codebase, one database, one login. A fix pushed
 * to Vercel reaches the app on the next launch with no store review, which for a product being
 * handed to one team is the difference between fixing something on Saturday and fixing it in
 * three weeks.
 *
 * What it costs: the first launch needs a connection. After that the service worker in
 * public/sw.js is what makes the app work in a grocery aisle, which is why it precaches the
 * routes a parent opens away from home. That worker is the offline story here, not Capacitor.
 * If offline ever needs to survive a cold first launch on a plane, the answer is bundling a
 * static export, and that is a real project rather than a config change.
 */
const config: CapacitorConfig = {
  appId: "com.fuelmyathlete.app",
  appName: "FuelMyAthlete",
  // Required by the CLI even when server.url is set. It holds the page shown when the site
  // cannot be reached at all, which is the one screen that has to be inside the APK.
  webDir: "capacitor-shell",
  server: {
    url: "https://fuelmyathlete.com",
    // Without this an unreachable site shows a raw Chrome error inside the app, which reads as
    // a broken app rather than a missing signal.
    errorPath: "/offline.html",
    // The site is https and should stay that way in the shell. No cleartext.
    androidScheme: "https",
  },
  android: {
    // A parent who taps a link to a recipe should land in the app, not in a second browser.
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#F2F0EB",
      androidSplashResourceName: "splash",
      showSpinner: false,
    },
    PushNotifications: {
      // Sound and badge are opt-in per notification rather than global, so a hydration reminder
      // cannot be made to buzz a phone during a match by accident.
      presentationOptions: ["alert"],
    },
  },
};

export default config;
