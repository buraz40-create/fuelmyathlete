# Supabase setup (Phase 1B)

These files set up the FuelMyAthlete database. No Supabase CLI required, just paste each file into the SQL Editor in the Supabase dashboard in order.

## Run order

1. `migrations/0001_init_schema.sql`: tables, enums, auto-bootstrap trigger
2. `migrations/0002_rls_policies.sql`: row-level security policies (REQUIRED before any user signs in)
3. `seed-meals.sql`: global meal + recipe + ingredient catalog (idempotent; re-run when `src/data/*.ts` changes)

## After running

1. Authentication → Providers → Email → enable, enable magic link
2. Authentication → URL Configuration:
   - Site URL: `http://localhost:3000` (for dev), later add `https://fuelmyathlete.com`
   - Redirect URLs: add both `http://localhost:3000/auth/callback` and `https://fuelmyathlete.com/auth/callback`
3. Settings → API → copy `Project URL` and `anon public` key into `.env.local` at the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

4. Restart `npm run dev`. Sign in with your email, click the magic link in your inbox, land on `/onboarding` to set your athlete profile.
