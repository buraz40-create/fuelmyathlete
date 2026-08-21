# What needs Haris

Everything else is unblocked. This is the list of things I cannot do myself, either because
they need your accounts and your money, or because they are your call to make rather than mine.

Ordered by what it costs you against what it unlocks. Last updated 2026-08-20.

---

## 1. Tidy the Supabase URL in Vercel

**2 minutes, free. Do this one whenever you next have the dashboard open.**

`NEXT_PUBLIC_SUPABASE_URL` was pasted with a trailing newline, so the deployed value is
literally `https://dtwsyyaalgjiswntpekk.supabase.co\n`.

Nothing is broken today. `new URL()` normalises the whitespace away, and I have made
[config.ts](src/lib/supabase/config.ts) trim its env vars so no future consumer inherits it.
But it only ever survived because every consumer happens to route through URL parsing. The
first one that concatenates it into a header, a redirect, or an allow-list comparison fails,
and it fails looking like an auth bug rather than a stray character.

Vercel, project settings, environment variables, re-paste it without the newline, redeploy.

---

## 2. Decide whether imported recipes should sync between devices

**No cost. A decision, not a task. This one blocks real work.**

Right now a recipe you type in lives on that device only. Plan it, open the planner on your
phone, and that slot is empty. The planner says so with a "Yours, this device only" marker, so
it is honest, but it is a limitation rather than a design.

Making it sync is maybe 6 to 8 hours of my time: a `custom_meal_slug` column on
`meal_plan_entries`, a `custom_recipes` table, and the storage pair behind
`isSupabaseConfigured`. The migration is already sketched in the research.

**But it is coupled to item 3, and that is the actual decision.** The moment imported recipes
leave the device you are hosting user-submitted content, and the legal position changes.

- **Say no** and imports stay device-local, private, and legally uninteresting. Cheapest and
  safest. The cost is that a parent's own recipes do not follow them to a second device.
- **Say yes** and you get proper sync, and you must do item 3 first.

My recommendation: **no for now.** Nobody but you is importing recipes yet. Revisit it when a
second real user asks, and do item 3 in the same week.

---

## 3. Register a DMCA designated agent (only if item 2 is yes)

**About $6, roughly 15 minutes, at https://dmca.copyright.gov**

Only needed if imported recipes ever sync, become shareable, or otherwise land on your servers.

While everything is device-local there is nothing hosted for anyone to complain about, which
is a better position than having a safe harbour. Once you host user-submitted content, DMCA
512(c) is the thing standing between you and direct liability for whatever a user clipped, and
**registration is a precondition. Without it you do not get the safe harbour at all.**

It also needs the agent's contact details published on the site, and renewing periodically.

---

## 4. YouTube Data API key

**Free, about 10 minutes, at https://console.cloud.google.com**

Unlocks "paste a YouTube link" on the import page. Recipe creators put the ingredient list in
the video description because their own audience asks for it, and `videos.list` returns that
description for 1 unit against a 10,000 unit daily quota. Effectively unlimited for this.

Create a project, enable YouTube Data API v3, create an API key, and put it in Vercel as
`YOUTUBE_API_KEY`. Tell me and I will build the parsing.

**What this does not unlock, and cannot:** the spoken words. `captions.download` requires
OAuth *and* edit permission on the video, so there is no lawful path to a transcript for a
video you do not own. Description only.

---

## 5. An AI key, if you want screenshot import

**Roughly $0.001 to $0.005 per image. Realistically a few dollars a month.**

The only import path that cannot work without a paid key. A photo of a cookbook page or a
screenshot of a Reel goes to a vision model and comes back as structured recipe fields.

Gemini Flash-Lite or GPT-nano tier is plenty; this is extraction against a fixed schema, not
reasoning. Put it in Vercel as `IMPORT_AI_KEY` plus `IMPORT_AI_MODEL` and I will wire it,
including hiding the screenshot tab entirely when no key is set so nobody sees a dead control.

**Do not use a free tier for this.** Free-tier content is generally used to improve the
provider's products, and uploading a family's photos into a training corpus to save a fraction
of a cent is not a trade worth making on a children's app.

---

## 6. Supabase Pro, eventually

**$25/month**

The free tier pauses a project after about a week of inactivity, and a paused project has its
DNS deprovisioned, which took sign-in down site-wide on 2026-08-18.

The keep-warm workflow now runs every two days and is verified working, but it is a bridge and
not a fix: scheduled workflows on free repos get delayed under load and are disabled
automatically after long repo inactivity, which looks exactly like a busy stretch with no
commits.

Not urgent while you are the only user. It becomes urgent the day you tell someone else to
sign up.

---

## Not on this list any more

These were blocked on you and are now done:

- **GitHub secrets for the keep-warm workflow.** Set, and a manual run passed.
- **Verifying sign-in end to end.** It worked all along. What did not work was everything
  behind it, because the account had no family row. Fixed and verified: a planner load now
  provisions it, and a day-type change wrote 1 plan and 28 entries.
- **Whether URL import survives on Vercel.** It does. All six sites that work locally work
  from production.

## Image credits, and what they cost

Done: all 64 recipes have a photograph. The last three were generated on 2026-08-20 after you
topped up.

Worth knowing for next time, because half a month of credits went on images today:

- The plan grants **200 credits on the 8th of each month**, and the reset **wipes whatever is
  left over** rather than rolling it forward. It took 149 credits back in July and 35.5 in
  August. There is no saving them up, so spending near the end of a cycle is free money and
  hoarding is not.
- Model prices differ far more than the output does. **Recraft V4.1 is 1.25 credits, Nano Banana
  Pro is 2, GPT Image 2.0 is 7.** The July batch got 18 images for 22.5 credits on Recraft; a
  comparable batch on GPT Image would have been 126.
- One-time top-up credits expire after 90 days, so the ones you just bought are good until about
  2026-11-18.

If you want a bigger image pass, a consistent set across the guides or an Open Graph share card,
say so and I will do it in one batch on the cheaper model rather than a few at a time.

## Run two migrations, and then check a second device

Both are pasted into the Supabase SQL Editor. Neither breaks anything by waiting: the client
handles the column or table being absent, warns once in the console naming the migration, and
leaves the device's copy alone.

1. `supabase/migrations/0003_player_preferences.sql` adds one jsonb column to `players`, for
   hidden meals and the recurring weekly schedule.
2. `supabase/migrations/0004_meal_ratings.sql` adds a `meal_ratings` table, one row per meal
   per player. This one matters more than it sounds: auto-fill only offers meals rated three or
   better, so without it a second device plans the week from our guesses rather than from what
   Elvis will actually eat, and you would have to teach it all over again.

Hydration history needed no migration at all. `hydration_logs` has been in the schema since the
first migration and nothing had ever written to it.

Once both are applied, the check is the same in each case: do it on the laptop, then open the
phone. Hide a meal, rate a meal, log a few cups of water. That is the path I cannot test myself,
because it needs your account.
