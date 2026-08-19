import type { MetadataRoute } from "next";

// Installing to the home screen is not cosmetic here. On iOS, a site added to the home screen
// is exempt from Safari's 7 day storage eviction, and this app keeps a family's meal plan in
// localStorage. Without installing, a parent who plans on Sunday and does not reopen the app
// for a week can lose the week.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FuelMyAthlete: meal planner for young athletes",
    short_name: "FuelMyAthlete",
    description:
      "Plan a week of meals for a young athlete, get the grocery list, and track hydration against pediatric guidelines.",
    start_url: "/today",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F5F4F1",
    theme_color: "#6B9148",
    categories: ["health", "food", "sports"],
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Today", url: "/today" },
      { name: "Grocery list", url: "/planner/grocery" },
    ],
  };
}
