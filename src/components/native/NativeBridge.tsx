"use client";

import { useEffect } from "react";
import { isNativeApp, platformName } from "@/lib/native/platform";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { getActivePlayerId } from "@/lib/supabase/family";

/**
 * The small amount of native wiring the app needs. Renders nothing.
 *
 * Everything here is a no-op in a browser, and the Capacitor packages are imported dynamically
 * so they never reach the bundle a website visitor downloads.
 *
 * Push is the one thing that genuinely cannot be done on the web on iOS and is unreliable on
 * Android, and it is the reason this is an app rather than a bookmark. What it will not do is
 * decide what to send: this registers a device and stores the token, and nothing in the product
 * sends anything yet. Deliberately. A notification about a child's eating is easy to get wrong
 * and the roadmap already rejected one such mechanism on safety grounds.
 */
export function NativeBridge() {
  useEffect(() => {
    if (!isNativeApp()) return;
    let cancelled = false;

    // Everything app-shaped hangs off this one attribute: the bottom tab bar appears, the
    // website header and footer go away, and the page gains room for both. It is set here
    // rather than rendered conditionally because the server cannot know it is the app, and a
    // different tree on the client would make React throw the page away and rebuild it.
    document.documentElement.dataset.native = "true";

    async function wire() {
      // The status bar and splash are cosmetic, and failing to set them should never stop the
      // app starting, so each is isolated.
      try {
        const { StatusBar, Style } = await import("@capacitor/status-bar");
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: "#F2F0EB" });
      } catch {
        // Older device, or the plugin is unavailable. The app looks slightly different and works.
      }

      try {
        const { SplashScreen } = await import("@capacitor/splash-screen");
        await SplashScreen.hide();
      } catch {
        // If hiding fails the splash times out on its own from the config.
      }

      // The hardware back button is handled natively in MainActivity, not here.
      //
      // A listener was tried first and does fire, confirmed on an emulator, but firing it does
      // not stop Capacitor doing its default as well: back navigated the WebView and sent the
      // app to the background in the same press. One decision in one place is the fix, and the
      // only place that can make it is the activity.

      if (cancelled) return;
      await registerForPush();
    }

    void wire();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

async function registerForPush(): Promise<void> {
  try {
    const { PushNotifications } = await import("@capacitor/push-notifications");

    const existing = await PushNotifications.checkPermissions();

    if (existing.receive === "denied") return;

    if (existing.receive === "prompt") {
      // Do not ask on a cold first launch.
      //
      // The app opened on the landing page and put an Android permission dialog over it before
      // the parent had read a sentence, which is the moment people say no to everything. Worse,
      // it was asking for nothing: storeToken below needs a signed-in user and an active player,
      // so a yes on that screen registered a device the app could not attach to a household.
      //
      // Waiting until both exist means the question arrives after they have made an account and
      // set up a child, when it is obvious what a notification would be about.
      if (!(await hasHousehold())) return;
      const asked = await PushNotifications.requestPermissions();
      // Ask, and take no for an answer. A parent who declines is not asked again by this code;
      // Android will not re-prompt, and nagging through a custom dialog is exactly the behaviour
      // that gets an app deleted.
      if (asked.receive !== "granted") return;
    }

    await PushNotifications.addListener("registration", (token) => {
      void storeToken(token.value);
    });

    await PushNotifications.addListener("registrationError", (err) => {
      // The overwhelmingly likely cause is a missing google-services.json, which means the
      // Firebase project has not been created yet. Say so rather than logging an opaque error,
      // because this is the one part of the app that cannot work without a file only the owner
      // can generate.
      console.warn(
        `[push] registration failed: ${JSON.stringify(err)}. If this is a fresh build, ` +
          "android/app/google-services.json is probably missing. See docs/ANDROID.md."
      );
    });

    // Already granted from an earlier run: register anyway, without a dialog. Tokens rotate, and
    // this is what picks up the new one.
    await PushNotifications.register();
  } catch {
    // The plugin is not present, which means this is a browser. Nothing to do.
  }
}

/** Whether there is a signed-in parent with a child set up, which is what a token attaches to. */
async function hasHousehold(): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const supabase = getBrowserSupabase();
  if (!supabase) return false;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user?.id) return false;
  return Boolean(await getActivePlayerId());
}

/**
 * Keep the device's token on the server so something could message it later.
 *
 * Tokens rotate on reinstall, on clearing app data, and sometimes on their own, so this upserts
 * on the token rather than inserting and accumulating dead rows.
 */
async function storeToken(token: string): Promise<void> {
  if (!isSupabaseConfigured) return;
  const supabase = getBrowserSupabase();
  if (!supabase) return;

  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  // Signed out, so there is no household to attach this device to. It will register again on
  // the next launch, by which time they may have signed in.
  if (!userId) return;

  const playerId = await getActivePlayerId();
  if (!playerId) return;

  const { error } = await supabase.from("push_tokens").upsert(
    {
      player_id: playerId,
      user_id: userId,
      token,
      platform: platformName(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "token" }
  );

  if (error) {
    console.warn(
      error.code === "42P01"
        ? "[push] push_tokens does not exist yet. Run supabase/migrations/0007_push_tokens.sql."
        : `[push] could not store the device token: ${error.message}`
    );
  }
}
