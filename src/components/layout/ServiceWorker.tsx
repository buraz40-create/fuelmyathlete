"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    // Not in development. Next serves dev CSS and JS from URLs that are not fingerprinted, so
    // a cache-first worker happily serves yesterday's stylesheet and you spend an hour
    // debugging a layout that is actually correct. Learned the hard way.
    if (process.env.NODE_ENV !== "production") return;
    // Registration is deferred to load so it never competes with first paint.
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Unsupported, blocked by the browser, or running on http. The app works without it.
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
