// Trimmed on the way in, deliberately.
//
// The deployed NEXT_PUBLIC_SUPABASE_URL currently ends with a newline, because it was pasted
// into Vercel with one. Nothing is visibly broken: new URL() normalises the whitespace away
// and fetch reaches Supabase, which is why it went unnoticed. But it only survives because
// every consumer happens to route through URL parsing. The first place that concatenates the
// value straight into a header, a redirect, or an allow-list comparison would fail, and it
// would fail in a way that looks like an auth bug rather than a stray character.
//
// Trimming here fixes it for every consumer at once and cannot be undone by a future paste.
// The env var in Vercel is still worth cleaning up, but this no longer depends on it.
const clean = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export const SUPABASE_URL = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
export const SUPABASE_ANON_KEY = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const isSupabaseConfigured: boolean = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
