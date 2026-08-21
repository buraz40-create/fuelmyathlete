/**
 * Is this running inside the Android shell, or in a browser?
 *
 * The same site serves both, so anything that only makes sense in one has to ask. The obvious
 * example is the "add to home screen" coaching, which is actively confusing inside an app that
 * is already on the home screen.
 *
 * Deliberately does not import @capacitor/core. That package is only meaningful in the app, and
 * pulling it into every page would put it in the bundle every visitor downloads. Capacitor
 * injects window.Capacitor at runtime, so reading it is enough and costs nothing.
 */

interface CapacitorGlobal {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
}

function capacitor(): CapacitorGlobal | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor;
}

/** True only inside the native shell. False on the website, and false during server render. */
export function isNativeApp(): boolean {
  return capacitor()?.isNativePlatform?.() === true;
}

/** "android", "ios", or "web". */
export function platformName(): string {
  return capacitor()?.getPlatform?.() ?? "web";
}
