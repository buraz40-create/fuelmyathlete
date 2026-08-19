// Deliberately small and hand-written rather than a generated Workbox bundle. This app is
// local-first: the meal plan lives in localStorage, so the service worker only has to make the
// shell reachable with no signal. It is not a sync layer and it must never cache anything
// personal.
//
// The case this exists for: a parent standing in a grocery aisle with one bar of signal,
// opening the app fresh rather than resuming an already-open tab.

const VERSION = "v1";
const SHELL_CACHE = `fma-shell-${VERSION}`;
const RUNTIME_CACHE = `fma-runtime-${VERSION}`;

// Routes worth having offline. /planner and /today are the two a parent opens away from home.
const SHELL_ROUTES = ["/today", "/planner", "/planner/grocery", "/offline"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ROUTES))
      .then(() => self.skipWaiting())
      .catch(() => {
        // A failed precache must not block installation. Runtime caching still fills in.
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("fma-") && !key.endsWith(VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isCacheable(request) {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  // Never cache auth or API traffic. A stale auth response is worse than no response, and
  // /api/health exists precisely to report live state.
  if (url.pathname.startsWith("/api")) return false;
  if (url.pathname.startsWith("/auth")) return false;
  return true;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (!isCacheable(request)) return;

  // Navigations: network first, so a parent on a good connection always gets fresh content,
  // falling back to cache and then to the offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || (await caches.match("/offline")) || Response.error();
        })
    );
    return;
  }

  // Static assets: cache first, since Next fingerprints them and a hit is always correct.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached || Response.error());
    })
  );
});
