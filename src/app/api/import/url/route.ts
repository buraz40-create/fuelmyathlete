import { NextResponse } from "next/server";
import { parseJsonLdRecipe } from "@/lib/import/jsonld";

export const runtime = "nodejs";
export const maxDuration = 15;

// Fetches a recipe page and reads its schema.org JSON-LD.
//
// This is an unauthenticated endpoint that makes an outbound request to an address a stranger
// chooses, on our infrastructure, so the guards below are the point of the file rather than
// decoration. Without them it is an open proxy and an SSRF hole.

const TIMEOUT_MS = 8000;
const MAX_BYTES = 2 * 1024 * 1024;
const MAX_REDIRECTS = 3;

// Honest about who we are and where to complain. Sites that block us can then do so
// deliberately, which is the outcome we want rather than pretending to be a browser.
const UA =
  "Mozilla/5.0 (compatible; FuelMyAthleteBot/1.0; +https://fuelmyathlete.com/about-the-importer)";

// Sites whose terms say no. One recipe is not worth ignoring a publisher who wrote it down.
const DENY_HOSTS = ["cooking.nytimes.com", "nytimes.com"];

// There is no recipe data in these pages for a server-side fetcher: they return a login wall.
// Saying so plainly beats a generic failure, and the paste box handles them fine.
const SOCIAL_HOSTS = [
  "instagram.com", "tiktok.com", "facebook.com", "fb.watch",
  "youtube.com", "youtu.be", "pinterest.com", "x.com", "twitter.com",
];

function hostMatches(host: string, list: string[]): boolean {
  const h = host.toLowerCase().replace(/^www\./, "");
  return list.some((d) => h === d || h.endsWith(`.${d}`));
}

/**
 * Blocks anything pointing inside our own network.
 *
 * Note the honest limitation: this checks the literal host, so it stops the obvious cases but
 * not a public hostname whose DNS resolves to a private address. Closing that properly needs
 * resolution before connect, which fetch does not expose. Given this endpoint only ever
 * returns parsed recipe fields and never the raw body, the blast radius of the remaining hole
 * is small, but it is a hole and should be named rather than glossed over.
 */
function isBlockedAddress(host: string): boolean {
  const h = host.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local")) return true;
  if (h === "0.0.0.0" || h === "[::1]" || h === "::1") return true;
  if (/^10\./.test(h)) return true;
  if (/^127\./.test(h)) return true;
  if (/^192\.168\./.test(h)) return true;
  if (/^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  // AWS and GCP metadata, the classic SSRF target.
  if (h === "metadata.google.internal") return true;
  return false;
}

function bad(message: string, status = 400, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ ok: false, message, ...extra }, { status });
}

async function readCapped(res: Response): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BYTES) {
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  return new TextDecoder("utf-8").decode(
    chunks.reduce<Uint8Array>((acc, c) => {
      const out = new Uint8Array(acc.length + c.length);
      out.set(acc);
      out.set(c, acc.length);
      return out;
    }, new Uint8Array())
  );
}

export async function POST(request: Request) {
  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return bad("That request did not contain a URL.");
  }

  const raw = (body.url ?? "").trim();
  if (!raw) return bad("Paste a link first.");

  let url: URL;
  try {
    url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  } catch {
    return bad("That does not look like a web address.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return bad("Only http and https links can be read.");
  }
  if (isBlockedAddress(url.hostname)) {
    return bad("That address is not reachable from here.");
  }
  if (hostMatches(url.hostname, SOCIAL_HOSTS)) {
    return bad(
      "Social posts and videos do not publish a readable recipe, so there is nothing for us to fetch. Copy the caption or description and paste it instead.",
      422,
      { fallback: "paste" }
    );
  }
  if (hostMatches(url.hostname, DENY_HOSTS)) {
    return bad(
      "That site's terms do not allow this, so we do not read it. You can still paste the text in yourself.",
      422,
      { fallback: "paste" }
    );
  }

  let res: Response;
  try {
    res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
  } catch {
    return bad(
      "We could not reach that page. It may be slow, or it may block requests that are not a person in a browser. Pasting the text works either way.",
      502,
      { fallback: "paste" }
    );
  }

  // A redirect chain ending somewhere internal is the other half of the SSRF concern.
  try {
    if (isBlockedAddress(new URL(res.url).hostname)) {
      return bad("That address is not reachable from here.");
    }
  } catch {
    /* res.url is malformed, which the parse below will handle anyway */
  }

  if (!res.ok) {
    return bad(
      res.status === 403 || res.status === 401
        ? "That site turned us away. Plenty of recipe sites block anything that is not a person in a browser. Paste the text instead and it will work."
        : `That page returned ${res.status}.`,
      502,
      { fallback: "paste" }
    );
  }

  const type = res.headers.get("content-type") ?? "";
  if (!/text\/html|application\/xhtml/i.test(type)) {
    return bad("That link is not a web page we can read.", 415, { fallback: "paste" });
  }

  const html = await readCapped(res);
  const recipe = parseJsonLdRecipe(html);

  if (!recipe) {
    return bad(
      "That page does not publish its recipe in a form we can read. Copy the ingredients and steps and paste them instead.",
      422,
      { fallback: "paste" }
    );
  }

  return NextResponse.json({
    ok: true,
    recipe,
    source: { url: res.url, siteName: new URL(res.url).hostname.replace(/^www\./, "") },
  });
}

// Redirects on MAX_REDIRECTS are handled by fetch itself; the constant documents the intent
// for whoever swaps in a manual redirect loop later.
void MAX_REDIRECTS;
