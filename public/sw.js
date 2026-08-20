// Deliberately small and hand-written rather than a generated Workbox bundle. This app is
// local-first: the meal plan lives in localStorage, so the service worker only has to make the
// shell reachable with no signal. It is not a sync layer and it must never cache anything
// personal.
//
// The case this exists for: a parent standing in a grocery aisle with one bar of signal,
// opening the app fresh rather than resuming an already-open tab.

const VERSION = "v2";
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

// Next fingerprints everything under /_next/static, so the URL changes whenever the bytes do
// and a cache hit can never be stale. Nothing else on this origin has that guarantee.
function isFingerprinted(url) {
  return url.pathname.startsWith("/_next/static/");
}

// Keep the runtime cache from growing without limit. A parent's phone is not a good place to
// quietly store fifty megabytes, and on iOS an origin that leans on its storage budget risks
// eviction of everything it owns, which here would include the meal plan in localStorage.
// Oldest first, because Cache.keys() returns insertion order.
const RUNTIME_MAX_ENTRIES = 80;

async function trimRuntimeCache() {
  const cache = await caches.open(RUNTIME_CACHE);
  const keys = await cache.keys();
  if (keys.length <= RUNTIME_MAX_ENTRIES) return;
  await Promise.all(
    keys.slice(0, keys.length - RUNTIME_MAX_ENTRIES).map((key) => cache.delete(key))
  );
}

// A failed write is not worth failing the response over. Quota errors in particular are
// expected on a phone that is nearly full, and the fetch already succeeded.
async function cachePut(request, response) {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response);
    await trimRuntimeCache();
  } catch {
    // Serving the response matters more than storing it.
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (!isCacheable(request)) return;
  const url = new URL(request.url);

  // Navigations: network first, so a parent on a good connection always gets fresh content,
  // falling back to cache and then to the offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          event.waitUntil(cachePut(request, response.clone()));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || (await caches.match("/offline")) || Response.error();
        })
    );
    return;
  }

  // Fingerprinted build output: cache first. A hit is always correct by construction, and this
  // is the traffic where cache first actually pays for itself.
  if (isFingerprinted(url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            if (response.ok && response.type === "basic") {
              event.waitUntil(cachePut(request, response.clone()));
            }
            return response;
          })
          .catch(() => Response.error());
      })
    );
    return;
  }

  // Everything else, which in practice means the recipe photographs in /images/recipes:
  // stale while revalidate. Serve the cached copy instantly, then refresh it in the background
  // so the next load is current.
  //
  // These filenames are stable, not fingerprinted. turkey-tacos.jpg stays turkey-tacos.jpg when
  // the picture behind it is replaced, and the pictures on this site do get replaced: two of
  // them were corrected for showing the wrong food, a corn tortilla on a whole-grain recipe and
  // a white wrap on a whole-grain one. Under cache first, a visitor who had already loaded the
  // wrong photograph would keep it permanently and no correction would ever reach them.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            event.waitUntil(cachePut(request, response.clone()));
          }
          return response;
        })
        .catch(() => cached || Response.error());
      return cached || network;
    })
  );
});
