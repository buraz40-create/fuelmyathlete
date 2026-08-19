# Phase 1B Deploy Checklist

End state: a real URL at `https://fuelmyathlete.com` where anyone can sign in with their email, set up their athlete profile, and have meal plans + hydration logs persist in Supabase.

You'll bounce between three tabs: **Supabase dashboard**, **GitHub**, and **Vercel**. Then your domain registrar at the end. Budget 45-60 minutes.

---

## Step 1: Create the Supabase project

1. Go to https://supabase.com → **New project**
2. Name: `fuelmyathlete`, region: **East US (North Virginia)** (closest to most Florida traffic), generate a strong database password and save it to your password manager
3. Wait ~2 minutes for provisioning

## Step 2: Run the database migrations

In the Supabase dashboard, left sidebar → **SQL Editor** → **+ New query**.

For each file below: open in VS Code, copy entire contents, paste into a new SQL Editor query, click **Run**. Wait for "Success" before the next one.

1. `supabase/migrations/0001_init_schema.sql` (creates tables + auto-bootstrap trigger)
2. `supabase/migrations/0002_rls_policies.sql` (security policies, REQUIRED before any signup)
3. `supabase/seed-meals.sql` (global meal catalog)

## Step 3: Configure auth

1. Left sidebar → **Authentication** → **Providers** → **Email** → ensure both **Enable email provider** and **Enable email confirmations** are ON, **Enable email magic link** ON
2. **Authentication** → **URL Configuration**:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: add `http://localhost:3000/auth/callback`
   - (You'll add the production URL in Step 8)

### Google ("Continue with Google")

The sign-in page shows a Google button. It stays broken until both halves below are done.

**Google Cloud side:**

1. https://console.cloud.google.com → create or pick a project
2. **APIs & Services** → **OAuth consent screen** → External → fill in app name, support email, developer email → add scopes `email`, `profile`, `openid` → publish it (in Testing mode only listed test users can sign in)
3. **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID** → **Web application**
4. Authorized JavaScript origins: `https://fuelmyathlete.com`
5. Authorized redirect URIs: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`

   This is the **Supabase** callback, not your own site. Pointing it at `https://fuelmyathlete.com/auth/callback` is the usual mistake and produces `redirect_uri_mismatch`.
6. Copy the **Client ID** and **Client secret**

**Supabase side:**

7. **Authentication** → **Providers** → **Google** → toggle on, paste the Client ID and Client secret → Save
8. Confirm the callback URL Supabase displays matches exactly what you pasted into step 5

## Step 4: Get your API keys + create `.env.local`

1. Left sidebar → **Project Settings** → **API**
2. Copy `Project URL` and `anon` `public` key
3. In VS Code, create `.env.local` at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

4. Stop and restart `npm run dev`. Visit `http://localhost:3000/api/health`. Should return `{"ok":true,"supabase":true,...}`

## Step 5: Test locally before deploying

1. Visit `http://localhost:3000` → should redirect to `/sign-in`
2. Enter your real email → click "Send me a sign-in link" → check inbox
3. Click the magic link → should land on `/onboarding`
4. Fill in name + age + weight → land on `/planner`
5. Pick a meal → refresh page → still there
6. In Supabase dashboard → **Table Editor** → `players` → see your row. Click `meal_plans` → see your week. Click `meal_plan_entries` → see your meal pick

If any step fails, fix before proceeding.

## Step 6: Push code to GitHub

In your terminal at `d:\fuelmyathlete.com`:

```powershell
git add .
git commit -m "Phase 1B: Supabase auth + storage"
```

Then create a GitHub repo:
- Easiest: VS Code Source Control panel → "Publish Branch" → choose public or private → name `fuelmyathlete`
- OR: go to https://github.com/new, create empty `fuelmyathlete` repo, then:
  ```powershell
  git remote add origin https://github.com/YOUR-USER/fuelmyathlete.git
  git branch -M main
  git push -u origin main
  ```

## Step 7: Deploy to Vercel

1. Go to https://vercel.com → sign in with GitHub → **Add New Project** → import `fuelmyathlete`
2. Framework Preset should auto-detect **Next.js** (leave defaults)
3. **Environment Variables**: add BOTH `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your `.env.local`. Apply to Production + Preview + Development.
4. Click **Deploy**. Wait ~2 minutes.
5. Click the resulting `.vercel.app` URL. Test the sign-in flow end-to-end.
6. Visit `https://YOUR-PROJECT.vercel.app/api/health` → should return `supabase:true`

## Step 8: Add `fuelmyathlete.com` as custom domain

In Vercel project → **Settings** → **Domains** → **Add** → enter `fuelmyathlete.com` and `www.fuelmyathlete.com`.

Vercel will show you exactly which DNS records to add at your registrar. Typically:
- A record: `@` → `76.76.21.21`
- CNAME record: `www` → `cname.vercel-dns.com`

At your domain registrar (Namecheap / GoDaddy / whoever):
- Find the DNS Management page for `fuelmyathlete.com`
- Add the records Vercel showed
- Save

DNS usually propagates in 5-30 minutes. Vercel issues the SSL cert automatically once it sees the records.

## Step 9: Update Supabase auth URLs for production

Back in Supabase → **Authentication** → **URL Configuration**:
- Add `https://fuelmyathlete.com` to Site URL (in addition to localhost)
- Add `https://fuelmyathlete.com/auth/callback` and `https://www.fuelmyathlete.com/auth/callback` to Redirect URLs

Without this, magic-link emails will redirect to localhost in production.

## Step 10: Final verification

1. Open `https://fuelmyathlete.com` in an incognito window
2. Sign in with a different email than Step 5 (to verify a fresh user)
3. Confirm: redirect to sign-in → magic link → onboarding → planner
4. In Supabase Table Editor, verify a new `families` row with your second email's `owner_id`
5. RLS smoke test: log out of the first user, sign in as the second; you see ONLY your data, not the first user's plans

If 1-5 all pass: you're live. Share the URL with Elvis's team.

---

## Rollback / troubleshooting

- **"This site can't be reached" / `ERR_NAME_NOT_RESOLVED` on a `*.supabase.co` URL after clicking a sign-in button**: **check the Supabase dashboard first.** Free projects pause after about a week of inactivity, and Supabase deprovisions DNS for paused projects, so a paused project looks exactly like a deleted one from the outside. If it says "Project is paused", click **Resume project** and wait about a minute. DNS returns, data is untouched, and no redeploy is needed. This took the site down on 2026-08-18 and cost a day of debugging before anyone opened the dashboard. Only if the project genuinely is not in the dashboard is the cause a bad `NEXT_PUBLIC_SUPABASE_URL` on Vercel (mistyped ref, or a deleted project). Read the hostname off the error page and compare it character-for-character with **Project Settings** → **API** → Project URL in Supabase. Fix the Vercel env var, then **redeploy** (env changes don't apply to existing builds). Verify with `/api/health`.
- **`redirect_uri_mismatch` from Google**: the Authorized redirect URI in Google Cloud must be `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`, not your own domain. See Step 3.
- **`Unsupported provider: provider is not enabled`**: the Google provider is toggled off in Supabase. See Step 3.
- **Magic link redirects to localhost in production**: Step 9 was skipped. Add prod URLs to Supabase auth config.
- **Sign-in works but `/planner` redirects back to sign-in**: cookie not being set. Usually a `Site URL` mismatch in Supabase. Check Step 3 + Step 9.
- **`/api/health` returns `supabase:false` in production**: read `supabaseDetail` in the response. `Auth endpoint returned 521` means the project is paused or still restoring. Otherwise the env vars are not set on Vercel, Step 7 #3.
- **Magic link lands on the homepage instead of signing you in**: the Redirect URLs allow list is empty or missing the callback, so Supabase falls back to Site URL and the code exchange never runs. Add `https://fuelmyathlete.com/auth/callback`, the `www` variant, and `http://localhost:3000/auth/callback` under **Authentication** → **URL Configuration**.
- **Meals don't load**: seed migration didn't run. Step 2 #3.
- **`Row-level security blocking` errors in console**: RLS migration didn't run. Step 2 #2.

## Phase 1B-b (next iteration, not blocking launch)

- Profile sync: profile is currently saved to both Supabase AND localStorage. When user switches devices, the Supabase copy is the source of truth on first load. Edge case: localStorage data created BEFORE first sign-in isn't migrated; user has to re-enter profile after signing in for the first time. Low priority since users typically onboard once.
- Hydration log sync: currently localStorage only. Phase 2 will sync to `hydration_logs` table.
- Energy/recovery log: Phase 3.
