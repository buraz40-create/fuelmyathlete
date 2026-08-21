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
| [recipe/[slug]/page.tsx](src/app/recipe/[slug]/page.tsx) | 39 static recipe pages |
| [guides/page.tsx](src/app/guides/page.tsx), [guides/[slug]/page.tsx](src/app/guides/[slug]/page.tsx) | 8 SEO guide pages |
| [methodology/page.tsx](src/app/methodology/page.tsx) | `/methodology` |
| [settings/page.tsx](src/app/settings/page.tsx) | `/settings` |
| [sign-in/page.tsx](src/app/sign-in/page.tsx) | `/sign-in` |
| [auth/callback/route.ts](src/app/auth/callback/route.ts) | OAuth + magic link exchange |
| [auth/reset-password/page.tsx](src/app/auth/reset-password/page.tsx) | password reset |
| [import/page.tsx](src/app/import/page.tsx) + [ImportClient.tsx](src/app/import/ImportClient.tsx) | `/import` add your own recipe |
| [api/health/route.ts](src/app/api/health/route.ts) | health check |
| [api/import/url/route.ts](src/app/api/import/url/route.ts) | reads schema.org JSON-LD off a recipe URL |
| [sitemap.ts](src/app/sitemap.ts), [robots.ts](src/app/robots.ts), [opengraph-image.tsx](src/app/opengraph-image.tsx), [twitter-image.tsx](src/app/twitter-image.tsx) | SEO |

Most routes have a sibling `layout.tsx` holding per-page metadata. SEO surface: sitemap, robots, per-page metadata, JSON-LD schema, and `llms.txt`. The schema was written long before it worked: until 2026-08-19 every block was wrapped in `next/script`, so it was injected after hydration and never appeared in the server HTML. If you add schema anywhere, use a plain `script` tag and confirm it with `curl`, not with a browser devtools inspector, which shows the hydrated DOM and will happily lie to you.

### Data, `src/data/`

Content lives here as typed TS, not in the database. The Supabase tables mirror it.

- [meals.ts](src/data/meals.ts) - meal catalog, `MEALS_BY_SLOT`, `pexels(id)` photo helper
- [recipes.ts](src/data/recipes.ts) - largest data file, 39 recipes. Breakfast 12, lunch 10, dinner 10, snack 7. Every meal in meals.ts has a recipe; if you add a meal, add its recipe in the same change.
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

## 6b. Recipe import

Added 2026-08-20. Lets a parent add their own recipe by pasting text or a link. Four rules
shape every file in it, and none of them are stylistic.

**It never invents a number.** This is the safety property, not a nicety. The competitor
failure mode documented in App Store reviews is not a missed ingredient, it is a substituted
recipe: one Flavorish review is titled "Literally makes up recipes", and an independent test
had three of four apps drop the step where you add the potatoes. So parsing is rules, never a
model. Rules can fail to parse; they cannot hallucinate. Anything the source did not state
stays `null`, the review screen asks for it, and the save button is disabled until it is
filled in.

**A wrong match is worse than no match.** An unmatched ingredient can be recovered by the
parent; a confidently wrong one puts the wrong food in the cart. Real bugs of this kind, all
caught by the review screen on real imports and all now regression-tested: "freshly cracked
pepper" matching Whole-grain crackers, "gochujang" matching Frozen mango chunks, chicken
thighs aliased to chicken breast, and a stated "5 chicken thighs" rendered as "5 lb" because
the catalog's unit was adopted when the source gave none.

**Imports are device-local, and that is a legal decision rather than a shortcut.** Ingredient
lists, amounts, times and yields are facts and are not copyrightable. A blogger's prose is,
and photographs are the largest exposure of the three, with an industrialised enforcement
business behind them. So we store the parent's structured facts on the parent's own device,
never a copy of anyone's prose or photograph, and always the source URL, displayed. Nothing
reaches our servers, which is why DMCA 512(c) has nothing to operate on. **If imports ever
sync or become shareable, that changes and a designated agent must be registered first.**

**The catalog is resolved, not static.** `MEALS_BY_SLUG` used to be imported directly at seven
call sites, each treating an unknown slug as nothing, so an imported recipe was invisible to
the planner and absent from the grocery list. Everything now goes through
[src/lib/catalog](src/lib/catalog/index.ts), which merges the curated catalog with the
parent's imports. If you add a call site that resolves a meal or ingredient slug, use the
resolver. `SampleWeek` is the deliberate exception: it is marketing and shows a fixed week.

**The preps-ahead label.** `Recipe.prepAhead` marks the dishes worth cooking once for the week:
what one session yields, fridge days, freezer days, how to reheat. Sixteen recipes carry it, it
shows as a badge on the card and a panel on the recipe page. `keepsDays` is a food-safety number
rather than a serving suggestion, so keep it inside USDA's 3 to 4 days for cooked leftovers.

**Adding an ingredient means editing two files.** A new entry in
[ingredients.ts](src/data/ingredients.ts) must also be mapped in
[allergens.ts](src/data/allergens.ts) if it carries one. An unmapped grain or dairy item makes
the allergen line silently under-report, which reads as "no allergens" on food that has one.
That is the single most dangerous edit in this repo.

Files: [parse.ts](src/lib/import/parse.ts) (text to structure), [match.ts](src/lib/import/match.ts)
(name to catalog slug), [jsonld.ts](src/lib/import/jsonld.ts) (schema.org extraction),
[storage.ts](src/lib/import/storage.ts) (device-local store),
[useCustomMeals.ts](src/hooks/useCustomMeals.ts), [YourRecipes.tsx](src/components/recipe/YourRecipes.tsx).

**URL import works on about half of real sites, measured not assumed.** Budget Bytes, King
Arthur, Tasty, RecipeTin Eats, BBC Good Food and Food.com succeed. AllRecipes, Serious Eats
and Simply Recipes refuse: all Dotdash Meredith, one anti-bot stack. `curl` succeeds on those
same URLs where the server's `fetch` gets a 403, so it is TLS fingerprinting rather than IP
reputation and it will not improve by retrying. Every failure falls back to the paste box.
Re-measured against production on 2026-08-20, and the datacenter-IP worry did not
materialise: all six sites that work locally also work from the Vercel function. AllRecipes
and Serious Eats fail from both, returning 402 from Vercel where they return 403 locally.
Same block, different response from their bot vendor. There is no reason to expect this path
to behave worse in production than in development.

**Not lawful, do not build:** transcript extraction from YouTube, TikTok or Instagram videos
the user does not own. `captions.download` requires edit permission on the video, TikTok's
Display API returns only the authorising user's own videos, and the scraper libraries that
route around this are blocked on cloud IPs and are the conduct in the live DMCA 1201 suits.
Social URLs are refused with a message pointing at the paste box.

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

Gates 0a, 0b and 1 shipped 2026-08-19, plus most of Gate 2. See ROADMAP.md section 4b for the full list. The pediatric safety fixes were: the calorie gate is wired through the existing `shouldShowCalories` so the youth view shows protein and cites AAP, hydration logging is capped at the cohort ceiling instead of being unbounded, and `hotWeather` no longer defaults to true (it was silently adding 10% to every goal year round, putting an 11-year-old at 97oz against the 100oz cap on match days).

New surfaces since the handoff was written: `/today` (kid view), `/offline`, `/icons/[size]` (generated PWA icons), `/manifest.webmanifest`, `/llms.txt`, and two new guides. New device-local preferences live in `src/lib/player/preferences.ts` (hidden meals) and `src/lib/player/schedule.ts` (recurring week); both are deliberately off the profile because the profile round-trips through Supabase and `players` has no columns for them.

**Do not put a `loading.tsx` at the app root.** One was added and reverted on 2026-08-19. It wraps every route in a Suspense boundary, and on this app statically prerendered routes (`/recipe/[slug]`, `/guides/[slug]`, `/recipes`, `/guides`) then never hydrated: no client component ran, so the calorie gate silently served its youth fallback to everyone and nothing interactive worked. Dynamic routes like `/planner` were fine, which is exactly why it went unnoticed. Route-segment loading files are fine; there is one at `src/app/planner/loading.tsx`.

**Animate position, never visibility.** Five instances so far: guide reveals that held prose
at opacity 0, FAQ answers unmounted while collapsed, the whole recipe grid fading in with a
per-card delay of `i * 0.04`, and on 2026-08-20 the landing page itself, where the H1,
subheading, call to action and calculator all started at opacity 0 on the one route Google
indexes and every first-time visitor lands on. With 24 recipe cards the last one did not start
for nearly a second, and an interrupted run left the list stuck translucent, which a real
visitor reported as "the images are not there". These routes are statically prerendered, so
content that is invisible until an animation finishes is sometimes just invisible. Slide it,
do not fade it.

This is now enforced rather than remembered. `src/components/__tests__/no-opacity-reveals.test.ts`
walks every `.tsx` under `src/components` and `src/app` and fails on `initial` props that start
at opacity 0, and it found the fifth instance the first time it ran. Two exemptions, both
structural rather than a list of blessed filenames: children of `<AnimatePresence initial={false}>`
skip their entry animation on mount so they are painted immediately, and anything whose
`animate` target is below opacity 1 is a background wash rather than something meant to be read.
The landing page water cups are the first case, the Hero gradient blobs are the second. The
guard was checked by reintroducing the Reveal bug and confirming it failed with the right file
and line.

**The service worker must not outlive a correction.** `public/sw.js` is hand written, is never
type checked, and is the one thing here that can keep showing a visitor something already fixed.
It used to serve everything except navigations cache first, on the stated grounds that "Next
fingerprints them and a hit is always correct". That is true of `/_next/static`, and of nothing
else. The 47 recipe photographs in `public/images/recipes` have stable filenames, so replacing
the picture behind `turkey-tacos.jpg` would never have reached anyone who already loaded the
wrong one, permanently, and wrong photographs have been reported twice already.

Now: `/_next/static` stays cache first because a fingerprinted hit genuinely cannot be stale,
everything else is stale while revalidate, the runtime cache is capped at 80 entries and evicted
oldest first, and a failed `cache.put` no longer rejects into nothing. `VERSION` went to `v2`,
and `activate` already deletes caches that do not match, so returning visitors drop the old one.

It is covered by `src/lib/__tests__/service-worker.test.ts`, which loads the real `sw.js` into a
`node:vm` sandbox with a mock Cache API and drives its fetch handler, rather than testing a copy
of the logic. Three of its five tests fail against the previous worker, which is the point. Note
that the worker does not register outside production, so a dev server tells you nothing about it.

**A radiogroup promises arrow keys.** Nine of them shipped without any: the star rating, the
serving presets, the day-type chips in three places, both import pickers, the recipes filter and
the sign-in tabs. Each put a tab stop on every option and listened for no keys, so a keyboard
user tabbed through five stars one at a time and still could not move the selection. With a
mouse they all looked finished, which is why it went unnoticed. The day tabs in `DayPicker` had
the same bug and were fixed earlier, alone.

The shared behaviour now lives in `src/hooks/useRovingGroup.ts`: a roving tabindex so the group
is one tab stop, and arrows that move the selection and take focus with them. Focus has to
follow, or the next arrow press lands on an element the user has already left. Wrapping is the
default and is right for a ring of choices; the star rating passes `wrap: false`, because going
left from one star should stop rather than jump to five.

`WeeklyScheduleEditor` needed one row extracted into `ScheduleRow`, since its seven radiogroups
are a map and a hook cannot be called in a loop.

Enforced by `src/components/__tests__/radiogroup-keyboard.test.ts`, which fails on any
`role="radiogroup"` or `role="tablist"` with no `onKeyDown`, and any `role="radio"` or
`role="tab"` with no `tabIndex`. It found seven of the nine on its first run.

**Meal exclusions and the weekly schedule sync now, through `players.preferences`.** Both were
device-local, so a parent who set the week up on a laptop opened the phone to the default
pattern and watched auto-fill serve the meals they had told it to stop serving. They deliberately
do not hang off the profile: the profile round-trips through Supabase and the two would overwrite
each other.

`preferences-merge.ts` holds the only decision that can lose a parent's settings, and holds it
with no imports so the test runner can load it. Whole-record last-write-wins, biased hard toward
the device: remote must be present, timestamped, readable and strictly newer to win. Two orderings
in there were wrong first time and both are now tests. An unreadable remote timestamp has to be
rejected before anything consults it, or a device with no stamp of its own accepts garbage and
clears the list. And a device with no stamp but real settings on it is not a blank device, it is
somebody who set exclusions before the stamp existed; treating that as blank would delete the
settings of everyone who was already here. Those users get adopted and pushed up once.

`preferences-clock.ts` is a separate module purely to avoid a cycle, since both stores write it
and the sync layer reads it. Exclusions are now observable through `useSyncExternalStore`, the
same shape as ratings, so a copy arriving from another device updates the planner instead of
waiting for a reload.

`usePreferencesSync` is mounted once in `PlanProvider`. It does nothing when Supabase is not
configured, which is every local run.

**Not runtime-verified:** the remote half. Local behaviour is proven in the browser, including
that hiding a meal removes it from the picker immediately and stamps the clock for the first
time. Reading and writing `players.preferences` needs migration 0003 applied and a signed-in
account, and the code degrades quietly if the column is missing: it warns once, naming the
migration, and leaves the device's copy alone.

**No blur placeholder on a transparent image.**  builds its hint by
shrinking the source to a few pixels. Where the source is transparent the RGB underneath is
usually black, and that black survives while the alpha is flattened as the thumbnail is
stretched and blurred behind the real image. On the logo that was an 8x4 bitmap averaging
(20, 15, 4) with pure black corners, blown up across the header on every page, and it was
reported as the logo loading slowly with a dark flash. It was never slow: 7 KB of webp in about
100ms, already preloaded by . It was loading behind a black box. Removed, so the
space is reserved by width and height and the logo simply appears. Guarded by
, which also asserts the asset still has an
alpha channel so the rule can be revisited rather than cargo-culted if the logo is ever
replaced.

**Hydration history syncs now, and needed no migration.** `hydration_logs` has been in the
schema since `0001`, with its unique constraint on (player_id, logged_date), its index and an
RLS policy scoping it to the signed-in parent's own players. Nothing had ever written a row to
it. Every cup a parent logged sat in localStorage on one device: empty history on a new phone,
gone with a cleared browser, and a fully built table sitting unused.

`hydration-merge.ts` holds the rule, import-free so the test runner can load it. The higher
count wins for any given date. Water is logged a cup at a time on whichever device is in the
room, so the realistic conflict is one device having the day and the other having nothing, not
two devices disagreeing about the same afternoon; taking the higher number never loses a logged
cup. The accepted cost is a correction: tapping minus after a sync can see the higher number
come back. That needs two devices, a correction and a sync in between, and doing better needs a
timestamp per day per device, which is a lot of machinery for a counter that resets at midnight.

The cap is re-applied during the merge rather than trusted. Both sides clamp when they write,
but caps are per cohort and a profile can change, so a number logged under a teen's allowance
must not survive into a child's. The comparison for what to write back uses the raw stored
values, not the clamped ones: comparing clamped values agrees that both sides already hold the
cap and writes nothing, leaving a row on the server still above it. A test covers that, because
the first version had exactly that hole.

**Not runtime-verified:** the remote half, same as preferences. Local behaviour is proven in the
browser and the sync is a complete no-op when Supabase is unconfigured.

**Every recipe and guide has its own share card.** Until now the whole site shared one image,
so a recipe forwarded into a team group chat showed a generic brand card. 
under  and  generates one per page.

Two things to know before touching them. The recipe card runs on the **nodejs** runtime, not
edge, so it can read the photograph straight off disk: fetching it over HTTP would make the card
depend on the site being reachable at the moment it is generated, which during a build it is
not. And a route that uses  cannot also declare , which
is what the guide card tried first.

The recipe page used to set  explicitly, and that silently overrides the
generated card. It is removed, with a comment saying why: the photographs are square at 800x800,
a link preview wants 1200x630, so a square image is cropped to a band across the middle of the
dish and carries no words at all.

**Checking hydration quickly:** load a static page and look for the sign-in control in the header. `UserMenu` renders a bare placeholder span until `useAuthUser` resolves, so a header with no "Sign in" and no user menu means the client never took over.

**Sync is proven now, and what proving it found.** There is still no `.env.local`, so local
development runs with `isSupabaseConfigured` false in localStorage-only mode. The remote paths
were exercised against production on 2026-08-20, and the previous note that they were "reviewed,
not proven" was hiding a real bug.

Sign-in had always worked. Everything behind it never had. Production reported **1 user, 0
families, 0 players, 0 plans, 0 entries.** A trigger on `auth.users` creates a family and a
player at signup, and it exists, but the account was created 2026-05-20, before the migration
that added it. No family means no player; no player means `loadPlanRemote` returns null and
`savePlanRemote` returns early, and the profile save bailed at the same check. Sign-in
succeeded, the UI said nothing, and every write went to the device only.

The fix is [src/lib/supabase/family.ts](src/lib/supabase/family.ts), which provisions the family
and player on demand rather than trusting the trigger, so the existing account repaired itself
on next load and any future account the trigger misses self-heals. RLS already allowed it:
`families_owner_all` is `for all` with check `owner_id = auth.uid()`. Verified end to end: a
planner load created the family and player, and one day-type change wrote 1 plan and 28 entries.

**The lesson worth keeping:** a signup trigger is not a guarantee. Anything that depends on a
row existing should be able to create it. And "covered by unit tests, unexercised at runtime"
was doing a lot of work in the old note; the pure logic was all correct and the feature was
still completely broken.

Two things found while proving it. The plan store and the profile store each resolved the
family independently on every call, so one planner load fired the `families` query ten times;
it is resolved once per tab now and shared. And the deployed `NEXT_PUBLIC_SUPABASE_URL` ends
with a newline from a paste, which `new URL()` normalises so nothing breaks today;
[config.ts](src/lib/supabase/config.ts) trims its env vars so no future consumer inherits it,
but the Vercel value is still worth cleaning up.

There is now a test runner: `npm test` runs `node --test` over `src/**/__tests__/*.test.ts`. 55 tests: plan merging, whose failure mode is silent data loss, and the recipe import parser, matcher and JSON-LD extractor, whose failure mode is a wrong number or a wrong food on a shopping list. Note that `node --test` resolves ESM specifiers literally: it reads neither tsconfig `paths` nor extensionless files, so a module a test imports at runtime needs a relative specifier with the `.ts` extension. `allowImportingTsExtensions` is set for exactly this reason.

Photos: 18 meal and 13 recipe images were deleted on 2026-08-20 because they showed the wrong food. They had been picked by searching Pexels and verifying only that the URL returned HTTP 200, never by looking at them, and included a bulk lentil dispenser for a green smoothie and a tray of fried taquitos for a turkey wrap. `Meal.imageUrl` is optional so `FoodImage` can render its emoji tile instead. **If you add an image, look at it.**

Anything that needs Haris rather than a session is in [ACTIONS.md](ACTIONS.md), with cost,
effort and what each one unlocks. Do not re-derive that list; update it.

**Known gaps, in the order they will bite.**

1. `smartFillWeek` in [useMealPlan.ts](src/hooks/useMealPlan.ts) auto-fills from the curated
   catalog only, so a parent's imported recipes are never chosen by auto-fill. Defensible for
   now, since auto-fill is picking from meals we vetted, but say it in the UI rather than
   leaving it a silent surprise.
2. Imported recipes do not sync. `meal_plan_entries.meal_id` is a foreign key into the curated
   `meals` table, so [storage-supabase.ts](src/lib/planner/storage-supabase.ts) writes null for
   a custom slug and the slot is empty on a second device. The migration sketch for a
   `custom_meal_slug` column is in the recipe-import research; it needs the DMCA decision below
   made first.
3. Imports are device-local, which is what keeps DMCA 512(c) irrelevant. **The moment they sync
   or become shareable you are hosting user-submitted content and need a designated agent
   registered.** Decide that deliberately rather than discovering it.
4. Image and YouTube import are not built. YouTube can legitimately read the description via
   the Data API; there is no lawful path to a transcript for a video the user does not own.
5. The Vercel `NEXT_PUBLIC_SUPABASE_URL` still has a trailing newline. Harmless now that
   config.ts trims, worth tidying.
6. Supabase free tier still pauses. The keep-warm workflow is a bridge, not a fix; its secrets
   are set and a manual run passed on 2026-08-20.

Nothing on this list is blocked on Haris any more. Sign-in is verified, sync is verified, and
the GitHub secrets are set.

### Original next steps, kept for context

1. **Test email sign-in end to end on production.** Everything below it is unverified until a real magic link completes. Only Haris can do this, it needs his inbox.
2. Decide how to stop the free-tier pause from recurring, section 3. This is a product decision, not a technical one.
3. Add Google OAuth per [DEPLOY.md](DEPLOY.md), now that email works.
4. If sign-in fails at the callback, check the `?error=` message the sign-in page now surfaces before touching anything else. That page tells you the real reason now.

Whenever `*.supabase.co` stops resolving again: open the dashboard first. Paused, not deleted, is the overwhelmingly likely answer.

Not yet built: hydration log sync to `hydration_logs` (Phase 2), energy/recovery log (Phase 3), parent-mode calorie view. Known gap: localStorage data created before a user's first sign-in is not migrated to their account.
