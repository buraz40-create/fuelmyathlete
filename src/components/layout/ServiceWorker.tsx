"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    // Not in development. Next serves dev CSS and JS from URLs that are not fingerprinted, so
    // a cache-first worker happily serves yesterday's stylesheet and you spend an hour
    // debugging a layout that is actually correct. Learned the hard way.
    if (process.env.NODE_ENV !== "production") return;
    // Whether a worker was already driving this page when we started. A first-ever install
    // also fires controllerchange, because the worker calls clients.claim, and reloading then
    // would flash the page for somebody who is already looking at current content.
    const hadController = navigator.serviceWorker.controller !== null;
    let reloading = false;

    // When a new worker takes over, the page in front of the visitor is still the one the old
    // worker built. Reload once so they see the deploy rather than yesterday.
    //
    // This is not hypothetical. The v1 worker served everything except navigations cache
    // first, including the payloads Next uses for client-side routing, so a visitor could sit
    // on stale content indefinitely and the fix for it could not reach them either, because
    // the stale worker was the thing in the way. That happened on 2026-08-20 with a set of
    // recipe photographs that were live and correct on the server and invisible in the
    // browser.
    const onControllerChange = () => {
      if (!hadController || reloading) return;
      reloading = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    // Registration is deferred to load so it never competes with first paint.
    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          // Browsers only check for a new worker on their own schedule. Asking on each load
          // costs one conditional request, since sw.js is served must-revalidate, and it is
          // what makes a deploy reach an installed visitor promptly.
          registration.update().catch(() => {});
        })
        .catch(() => {
          // Unsupported, blocked by the browser, or running on http. The app works without it.
        });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  return null;
}
