/**
 * Where the Android app lives, and whether it is there yet.
 *
 * The listing URL is predictable from the package name and exists as a string long before the
 * page it points at does. Google serves a 404 for an app that has not completed production
 * review, so a badge shipped early sends every visitor to a dead page, which reads worse than
 * having no badge at all.
 *
 * Hence the flag. Everything that links to the store is behind it, so the app can be promoted
 * and reviewed on Google's schedule while the site stays honest, and going live is one boolean
 * rather than a hunt through components.
 *
 * Flip PLAY_LISTING_LIVE to true only once the URL below actually loads in a browser.
 */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.fuelmyathlete.app";

export const PLAY_LISTING_LIVE = true;
