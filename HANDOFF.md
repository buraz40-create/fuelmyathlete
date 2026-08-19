# Handoff: FuelMyAthlete.com

Orientation for a new Claude Code session on this machine. Everything below is a real path in this repo. Read this before searching.

**What to work on is in [ROADMAP.md](ROADMAP.md).** This file is the map, that one is the plan.

Last updated: 2026-08-19

---

## 1. What this is

Youth sports nutrition meal planner. A player picks meals per day from a curated catalog, which generates a grocery list and day-type-aware portions (school / training / match / rest).

Built for Elvis, an 11-year-old competitive soccer player in Florida. Intended growth path: his family, then his team of roughly 15 families, then other youth leagues. Do not make schema or design decisions that assume a single family.

Live at https://fuelmyathlete.com on Vercel.

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6, App Router |
| UI | React 19.2.4, TypeScript 5, Tailwind 4 |
| Components | shadcn/ui on `@base-ui/react`, `src/components/ui/` |
| Icons | Phosphor, `@phosphor-icons/react/dist/ssr`, `weight="duotone"` |
| Animation | `motion` v12 |
| Backend | Supabase (Postgres + auth + RLS) |
| Hosting | Vercel, project `fuelmyathlete.com`, region iad1 |

**Read `node_modules/next/dist/docs/` before writing Next.js code.** Next 16 has breaking changes from older training data. This is enforced by [AGENTS.md](AGENTS.md).

Commands: `npm run dev`, `npm run build`, `npm run lint`, `npx tsc --noEmit`.

## 3. Resolved blocker: the project was paused, not missing

**Fixed 2026-08-19. Sign-in works in production again.**

The earlier diagnosis in this file was wrong and is preserved here so nobody repeats it. It read the NXDOMAIN on `dtwsyyaalgjiswntpekk.supabase.co` as proof the project had been deleted, and concluded a fresh Supabase project was needed.

The real cause: **Supabase deprovisions DNS for paused free-tier projects.** The project existed the whole time, sitting paused in the `buraz` org. Free projects pause after roughly a week of inactivity, which this one hit. NXDOMAIN on a `*.supabase.co` host is a symptom of a paused project far more often than a deleted one, so check the dashboard before concluding anything from DNS.

The fix was one click on **Resume project**. DNS came back within about a minute (Status 3 to Status 0, A records at `104.18.38.10`), and `/api/health` went green at 15:21 local. No new project, no migrations rerun, no env var change, no redeploy. `NEXT_PUBLIC_SUPABASE_URL` in Vercel was correct all along.

Verified after the restore, via the SQL Editor:

| Check | Result |
|---|---|
| Public tables | 13 |
| RLS policies | 13 |
| `meals` rows | 17 |
| `ingredients` rows | 46 |
| `auth.users` rows | 1 |

Also fixed during the same session, both of which were genuinely missing: the Redirect URLs allow list was **empty**, so magic links would have fallen back to Site URL and landed on the homepage instead of `/auth/callback`, skipping the code exchange. Added apex, www, and localhost callbacks. Site URL was already `https://fuelmyathlete.com`, and the Email provider was already enabled with confirmations on.

**This will happen again.** Free projects keep pausing after about a week idle. Two ways out: keep the project warm with real traffic, or move to Pro at $20/mo. Worth deciding before Elvis's team starts using it, because a paused project takes the whole site's auth down and only Haris can resume it.

Google OAuth was deliberately deferred until email sign-in works. Its setup is documented in [DEPLOY.md](DEPLOY.md). The critical detail: the Authorized redirect URI in Google Cloud must be `https://YOUR-REF.supabase.co/auth/v1/callback`, **not** `fuelmyathlete.com/auth/callback`.

Other cost constraint: Vercel Hobby is personal and non-commercial, so monetizing later means $20/mo Pro there too.

## 4. Recent changes, committed

Shipped in `6ce2307` on 2026-08-19, pushed to `main`. All four were written while chasing the outage, and all four still earn their place now that the cause is known:

- [src/app/api/health/route.ts](src/app/api/health/route.ts) - previously reported `supabase: true` whenever the env vars were merely non-empty, which is why a dead host went unnoticed. Now actually fetches `/auth/v1/health` and returns 503 with a `supabaseDetail` message.
- [src/app/sign-in/page.tsx](src/app/sign-in/page.tsx) - the page never read the `?error=` param that the auth callback redirects failures to, so every failure showed a blank form. Added `describeAuthError` plus a mount effect that surfaces the message and strips the param.
- [src/lib/supabase/middleware.ts](src/lib/supabase/middleware.ts) - `auth.getUser()` ran unbounded on every request, so an unreachable or paused project stalled every page load. Now capped at 2s via `Promise.race` and serves signed-out.
- [DEPLOY.md](DEPLOY.md) - added the missing Google OAuth section and troubleshooting for NXDOMAIN, `redirect_uri_mismatch`, and `provider is not enabled`.

Typecheck and build both pass. The health route is the one that matters long term: it is now the thing that will tell you the project has paused again, instead of reporting green while auth is dead.

## 5. Architecture

### Local-first with remote mirror

This is the single most important pattern. **Auth is optional and no route is gated.** See the comment at [src/lib/supabase/middleware.ts:5-7](src/lib/supabase/middleware.ts#L5-L7). The whole app works in localStorage-only mode when Supabase is unconfigured. Signing in only adds cross-device sync.

Every persistence concern is a pair, chosen at runtime by `isSupabaseConfigured`:

| Concern | Local | Remote | Hook |
|---|---|---|---|
| Meal plan | [src/lib/planner/storage.ts](src/lib/planner/storage.ts) | [src/lib/planner/storage-supabase.ts](src/lib/planner/storage-supabase.ts) | [src/hooks/useMealPlan.ts](src/hooks/useMealPlan.ts) |
| Player profile | [src/lib/player/profile.ts](src/lib/player/profile.ts) | [src/lib/player/profile-supabase.ts](src/lib/player/profile-supabase.ts) | [src/hooks/usePlayerProfile.ts](src/hooks/usePlayerProfile.ts) |
| Hydration | localStorage only | not built yet | [src/hooks/useHydration.ts](src/hooks/useHydration.ts) |
| Grocery checks | inside plan | `grocery_check_state` | [src/hooks/useGroceryList.ts](src/hooks/useGroceryList.ts) |

`useMealPlan` hydrates from local first for instant UI, then lets remote overwrite. Saves are debounced 250ms. Plan state is shared through [src/components/planner/PlanProvider.tsx](src/components/planner/PlanProvider.tsx) via a `usePlan()` context, not prop drilling.

### Supabase client layer

- [src/lib/supabase/config.ts](src/lib/supabase/config.ts) - env vars and `isSupabaseConfigured`
- [src/lib/supabase/client.ts](src/lib/supabase/client.ts) - browser client, returns `null` when unconfigured
- [src/lib/supabase/server.ts](src/lib/supabase/server.ts) - server client
- [src/lib/supabase/middleware.ts](src/lib/supabase/middleware.ts) - cookie refresh, never redirects
- [middleware.ts](middleware.ts) - root, delegates to the above
- [src/lib/auth.ts](src/lib/auth.ts) - `getCurrentUser()`
- [src/hooks/useAuthUser.ts](src/hooks/useAuthUser.ts) - client-side user

Every accessor returns `null` rather than throwing when unconfigured. Preserve that.

### Types

All domain types live in [src/types/domain.ts](src/types/domain.ts): `MealSlot`, `DayType`, `PlayerProfile`, `MealPlan`, `IngredientCategory`. A plan always has exactly 28 entries (7 days x 4 slots); [src/lib/planner/storage.ts](src/lib/planner/storage.ts) discards anything else as corrupt.

## 6. File map

### Routes, `src/app/`

| Path | Route |
|---|---|
| [page.tsx](src/app/page.tsx) | `/` landing |
| [onboarding/page.tsx](src/app/onboarding/page.tsx) | `/onboarding` |
| [planner/page.tsx](src/app/planner/page.tsx) | `/planner` main app |
| [planner/week/page.tsx](src/app/planner/week/page.tsx) | `/planner/week` |
| [planner/grocery/page.tsx](src/app/planner/grocery/page.tsx) | `/planner/grocery` |
| [recipes/page.tsx](src/app/recipes/page.tsx) + [RecipesClient.tsx](src/app/recipes/RecipesClient.tsx) | `/recipes` |
| [recipe/[slug]/page.tsx](src/app/recipe/[slug]/page.tsx) | 24 static recipe pages |
| [guides/page.tsx](src/app/guides/page.tsx), [guides/[slug]/page.tsx](src/app/guides/[slug]/page.tsx) | 8 SEO guide pages |
| [methodology/page.tsx](src/app/methodology/page.tsx) | `/methodology` |
| [settings/page.tsx](src/app/settings/page.tsx) | `/settings` |
| [sign-in/page.tsx](src/app/sign-in/page.tsx) | `/sign-in` |
| [auth/callback/route.ts](src/app/auth/callback/route.ts) | OAuth + magic link exchange |
| [auth/reset-password/page.tsx](src/app/auth/reset-password/page.tsx) | password reset |
| [api/health/route.ts](src/app/api/health/route.ts) | health check |
| [sitemap.ts](src/app/sitemap.ts), [robots.ts](src/app/robots.ts), [opengraph-image.tsx](src/app/opengraph-image.tsx), [twitter-image.tsx](src/app/twitter-image.tsx) | SEO |

Most routes have a sibling `layout.tsx` holding per-page metadata. SEO work is done: sitemap, robots, per-page metadata, JSON-LD schema.

### Data, `src/data/`

Content lives here as typed TS, not in the database. The Supabase tables mirror it.

- [meals.ts](src/data/meals.ts) - meal catalog, `MEALS_BY_SLOT`, `pexels(id)` photo helper
- [recipes.ts](src/data/recipes.ts) - largest data file, 24 recipes
- [ingredients.ts](src/data/ingredients.ts), [calories.ts](src/data/calories.ts), [macros.ts](src/data/macros.ts)
- [hydration.ts](src/data/hydration.ts) - **safety-critical, see section 7**
- [dayTypes.ts](src/data/dayTypes.ts), [nutritionCards.ts](src/data/nutritionCards.ts), [citations.ts](src/data/citations.ts), [foodEmoji.ts](src/data/foodEmoji.ts)
- [guides/](src/data/guides/) - 8 guide TSX files plus [index.ts](src/data/guides/index.ts)

### Components, `src/components/`

`ui/` shadcn primitives (11) · `planner/` app surface (14) · `landing/` marketing (13) · `recipe/` (6) · `guide/` (7) · `layout/` shells and nav (5) · `brand/` [Logo](src/components/brand/Logo.tsx) and [Mascot](src/components/brand/Mascot.tsx) · `auth/` [UserMenu](src/components/auth/UserMenu.tsx) · `food/` [FoodImage](src/components/food/FoodImage.tsx) · [IconProvider.tsx](src/components/IconProvider.tsx)

### Database, `supabase/`

- [migrations/0001_init_schema.sql](supabase/migrations/0001_init_schema.sql) - 13 tables: `teams`, `families`, `players`, `meals`, `ingredients`, `meal_ingredients`, `recipes`, `recipe_steps`, `meal_plans`, `meal_plan_entries`, `grocery_check_state`, `hydration_logs`, `energy_logs`. Includes an auto-bootstrap trigger on signup.
- [migrations/0002_rls_policies.sql](supabase/migrations/0002_rls_policies.sql) - 13 policies. Required before any signup.
- [seed-meals.sql](supabase/seed-meals.sql) - 64 rows.

### Scripts, `scripts/`

- [run-migrations.mjs](scripts/run-migrations.mjs) - runs all three SQL files. `node scripts/run-migrations.mjs "<connection-string>"`
- [verify-db.mjs](scripts/verify-db.mjs) - lists public tables and row counts. Use to confirm a migration worked.
- [curate-photos.mjs](scripts/curate-photos.mjs), [recurate-weak.mjs](scripts/recurate-weak.mjs), [apply-photo-curation.mjs](scripts/apply-photo-curation.mjs), [photo-curation-results.json](scripts/photo-curation-results.json) - Pexels photo tooling

Never paste the database password into chat. It gets written to the session transcript on disk. Prefer the Supabase SQL Editor.

## 7. Hard constraints

These came from Haris directly and are not negotiable. Also stored in `C:\Users\buraz\.claude\projects\d--fuelmyathlete-com\memory\`.

**Pediatric safety.** Built for an 11-year-old. Anything medical-adjacent must respect pediatric guidelines and cite the source org in the UI (AAP, NATA, USDA). Current values in [src/data/hydration.ts](src/data/hydration.ts): 64 oz/day baseline, +16 oz practice, +24 oz match, +10% hot weather (**not** 25%, it compounds dangerously), **absolute cap 100 oz/day**. Children are more vulnerable to hyponatremia than adults. Calories and macros are hidden from the kid view per AAP guidance on calorie counting in pre-teens; show protein grams and hydration instead. Ask before adding any new tracked metric to the kid view.

**No em-dashes.** Not in UI copy, code comments, docs, or chat replies. Haris considers them an AI writing tell. Use a comma, period, colon, or parens. En-dashes in number ranges are fine.

**Food rules.** No crackers as a meal base, no cracker-plate lunches. No processed soy: no tofu, soy milk, or soy protein. Whole foods only. Whole edamame and low-sodium soy sauce are already accepted. For vegetarian protein use eggs, Greek yogurt, cottage cheese, cheese, beans, lentils. Elvis hates oatmeal, so never put it in his breakfast options. Note the SEO guides about oatmeal are deliberate keyword plays, not recommendations for him. Hibachi with chicken **breast** is his favorite and is central to the school-lunch system.

**Code style.** Make it ours. Never copy class names, IDs, or section structure from a reference site, translate the principles instead. Semantic HTML over div soup. Cap utility classes around 6 per element, extract a component past that. One H1 per page. ARIA on every interactive primitive. `next/font` and `next/image` always. Real Next.js routes, never `#anchor` navigation. Default to no comments, add them only when the *why* is non-obvious. Design tokens live in [src/app/globals.css](src/app/globals.css), a single file change restyles the whole app.

**Design.** Nutrio-inspired. Olive-lime primary `#6B9148`, warm-white background `#F5F4F1`, white cards, pastel meal slots, rounded pill nav. Single font, Bricolage Grotesque, with opsz and wdth axes. Do not reintroduce Plus Jakarta Sans or Fraunces, both were rejected as "AI default". Icons stay Phosphor duotone, not Lucide, except inside shadcn primitives. No inline emoji in meal slots, they render as broken boxes on Windows.

## 8. Working with Haris

Florida-based parent, business-minded, not a deeply experienced developer. Comfortable in VS Code and running terminal commands, uses Claude Code for implementation. Frame recommendations as "what pros use now" versus legacy. Lead with the recommended option and its tradeoff rather than surveying everything. Connect technical decisions back to what they enable for Elvis or his team. Pair design questions with concrete visual references.

He also runs calculatorsandmore.com on the same stack.

## 9. Next steps

Superseded by [ROADMAP.md](ROADMAP.md), which is gate-ordered and has kill criteria. Short version of what is already done and what is next:

Gate 0a (pediatric safety) shipped 2026-08-19: the calorie gate is wired through the existing `shouldShowCalories` so the youth view shows protein and cites AAP, hydration logging is capped at the cohort ceiling instead of being unbounded, and `hotWeather` no longer defaults to true (it was silently adding 10% to every goal year round, putting an 11-year-old at 97oz against the 100oz cap on match days).

Next: Gate 0b in ROADMAP.md section 5, starting with the keep-warm cron and making `storage.ts` pad rather than discard plans.

### Original next steps, kept for context

1. **Test email sign-in end to end on production.** Everything below it is unverified until a real magic link completes. Only Haris can do this, it needs his inbox.
2. Decide how to stop the free-tier pause from recurring, section 3. This is a product decision, not a technical one.
3. Add Google OAuth per [DEPLOY.md](DEPLOY.md), now that email works.
4. If sign-in fails at the callback, check the `?error=` message the sign-in page now surfaces before touching anything else. That page tells you the real reason now.

Whenever `*.supabase.co` stops resolving again: open the dashboard first. Paused, not deleted, is the overwhelmingly likely answer.

Not yet built: hydration log sync to `hydration_logs` (Phase 2), energy/recovery log (Phase 3), parent-mode calorie view. Known gap: localStorage data created before a user's first sign-in is not migrated to their account.
