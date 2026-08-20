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
      { name: "Add a recipe", url: "/import" },
    ],
    // Puts FuelMyAthlete in Android's share sheet, so a recipe found in a browser or a social
    // app can be sent straight here instead of copied, app-switched and pasted. That gap is
    // where the intention to save a recipe usually dies.
    //
    // GET rather than POST on purpose: a POST target needs a service worker to intercept the
    // request and re-serve the page, which is a lot of moving parts for a text payload. GET
    // lands on /import with the text in the query string and the page reads it.
    //
    // iOS does not implement Web Share Target at all, so this does nothing on an iPhone. The
    // iOS route would be a Shortcut that opens /import, or a wrapped native app. Worth knowing
    // before anyone concludes the feature is broken on their phone.
    share_target: {
      action: "/import",
      method: "GET",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },
  };
}
