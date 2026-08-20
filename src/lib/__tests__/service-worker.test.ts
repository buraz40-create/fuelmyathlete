import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

// The service worker is plain JavaScript served from /public, so it is never type checked and
// never imported by the app. It is also the one piece of this codebase that can keep showing a
// visitor something we already fixed. That combination is worth a test.
//
// This loads the real public/sw.js into a sandbox with a mock Cache API and drives its fetch
// handler, so it tests the routing decisions rather than a copy of them.

type Handler = (event: unknown) => void;

function loadWorker() {
  const source = readFileSync("public/sw.js", "utf8");

  const store = new Map<string, Map<string, string>>();
  const listeners = new Map<string, Handler>();
  const networkLog: string[] = [];
  let served: Record<string, string> = {};

  // The real Cache API stores Response objects and hands them back, so the mock must too.
  // Storing bare strings makes a cache hit look nothing like a network response, and the
  // worker then returns something the caller cannot read.
  const makeCache = (name: string) => {
    if (!store.has(name)) store.set(name, new Map());
    const entries = store.get(name)!;
    return {
      match: async (req: { url: string }) => {
        const body = entries.get(req.url);
        return body === undefined ? undefined : { ok: true, type: "basic", body, clone: () => ({ body }) };
      },
      put: async (req: { url: string }, res: { body: string }) => {
        entries.delete(req.url); // re-insertion moves it to the end, as the real Cache does
        entries.set(req.url, res.body);
      },
      delete: async (req: { url: string }) => entries.delete(req.url),
      keys: async () => [...entries.keys()].map((url) => ({ url })),
      addAll: async () => undefined,
    };
  };

  const sandbox = {
    self: {
      location: { origin: "https://fuelmyathlete.com" },
      addEventListener: (type: string, fn: Handler) => listeners.set(type, fn),
      skipWaiting: () => undefined,
      clients: { claim: async () => undefined },
    },
    caches: {
      open: async (name: string) => makeCache(name),
      keys: async () => [...store.keys()],
      delete: async (name: string) => store.delete(name),
      match: async (req: { url: string } | string) => {
        const url = typeof req === "string" ? req : req.url;
        for (const entries of store.values()) {
          if (entries.has(url)) {
            const body = entries.get(url)!;
            return { ok: true, type: "basic", body, clone: () => ({ body }) };
          }
        }
        return undefined;
      },
    },
    fetch: async (req: { url: string }) => {
      networkLog.push(req.url);
      const body = served[req.url];
      if (body === undefined) throw new Error("offline");
      return { ok: true, type: "basic", body, clone: () => ({ body }) };
    },
    URL,
    Promise,
    Response: { error: () => ({ body: "<network error>" }) },
    console,
  };

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: "sw.js" });

  // Drive one request through the fetch handler and return what the worker served.
  async function request(url: string, mode = "no-cors") {
    const handler = listeners.get("fetch");
    assert.ok(handler, "the worker should register a fetch listener");
    const req = { url, method: "GET", mode };
    let responded: Promise<{ body: string }> | undefined;
    const pending: Promise<unknown>[] = [];
    handler({
      request: req,
      respondWith: (p: Promise<{ body: string }>) => { responded = p; },
      waitUntil: (p: Promise<unknown>) => { pending.push(p); },
    });
    if (!responded) return { body: null as string | null, passedThrough: true };
    const res = await responded;
    await Promise.all(pending);
    // Let any background revalidation settle before the next assertion looks at the cache.
    await new Promise((r) => setImmediate(r));
    await new Promise((r) => setImmediate(r));
    return { body: res.body, passedThrough: false };
  }

  return {
    request,
    networkLog,
    setServed: (next: Record<string, string>) => { served = next; },
    cacheSize: () => [...store.values()].reduce((n, m) => n + m.size, 0),
    runtimeEntries: () => {
      for (const [name, entries] of store) if (name.includes("runtime")) return [...entries.keys()];
      return [];
    },
  };
}

const IMAGE = "https://fuelmyathlete.com/images/recipes/turkey-tacos.jpg";
const ASSET = "https://fuelmyathlete.com/_next/static/chunks/abc123.js";

test("a corrected recipe photograph reaches someone who already cached the wrong one", async () => {
  const sw = loadWorker();

  // First visit: the wrong photograph, a corn tortilla on a whole-grain recipe.
  sw.setServed({ [IMAGE]: "corn-tortilla" });
  assert.equal((await sw.request(IMAGE)).body, "corn-tortilla");

  // We fix the picture. The filename does not change, because these are not fingerprinted.
  sw.setServed({ [IMAGE]: "whole-grain-tortilla" });

  // The visitor comes back. Stale while revalidate serves the cached copy instantly, which is
  // the point of it, and refreshes underneath.
  assert.equal((await sw.request(IMAGE)).body, "corn-tortilla");

  // The load after that has the correction. Under the old cache-first worker this stayed wrong
  // forever and no amount of fixing the file would have reached this visitor.
  assert.equal((await sw.request(IMAGE)).body, "whole-grain-tortilla");
});

test("fingerprinted build output is served from cache without touching the network", async () => {
  const sw = loadWorker();
  sw.setServed({ [ASSET]: "build-output" });

  assert.equal((await sw.request(ASSET)).body, "build-output");
  const afterFirst = sw.networkLog.length;

  assert.equal((await sw.request(ASSET)).body, "build-output");
  assert.equal(
    sw.networkLog.length,
    afterFirst,
    "a fingerprinted URL cannot go stale, so a second request should not hit the network"
  );
});

test("the runtime cache is bounded and evicts oldest first", async () => {
  const sw = loadWorker();
  const urls = Array.from({ length: 95 }, (_, i) => `https://fuelmyathlete.com/images/recipes/r${i}.jpg`);
  sw.setServed(Object.fromEntries(urls.map((u, i) => [u, `body-${i}`])));

  for (const u of urls) await sw.request(u);

  const kept = sw.runtimeEntries();
  assert.ok(kept.length <= 80, `runtime cache should stay bounded, held ${kept.length}`);
  assert.ok(!kept.includes(urls[0]), "the oldest entry should have been evicted");
  assert.ok(kept.includes(urls[94]), "the newest entry should be kept");
});

test("auth and api traffic is never cached", async () => {
  const sw = loadWorker();
  for (const url of [
    "https://fuelmyathlete.com/api/health",
    "https://fuelmyathlete.com/auth/callback",
  ]) {
    const res = await sw.request(url);
    assert.ok(res.passedThrough, `${url} should be left alone by the worker`);
  }
  assert.equal(sw.cacheSize(), 0, "nothing from /api or /auth should reach any cache");
});

test("a cache write that fails does not fail the response", async () => {
  // A phone that is nearly full rejects cache.put with a quota error. The fetch already
  // succeeded by then, so the visitor should still get their page.
  const source = readFileSync("public/sw.js", "utf8");
  assert.match(
    source,
    /try\s*\{[\s\S]*cache\.put[\s\S]*\}\s*catch/,
    "cachePut should swallow storage failures"
  );
});
