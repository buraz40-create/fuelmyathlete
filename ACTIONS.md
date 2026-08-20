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

## Three recipes need generated photographs, and the account is 3 credits short

`apple-nachos`, `cheese-fruit-plate` and `cheese-quesadilla-snack`. I searched the free stock
libraries hard for these, several phrasings each and two pages deep, and there is nothing honest:

- **apple nachos**: apple tart, apple juice, apples on a tree, a child eating a whole apple.
  Nothing that is sliced apple with a nut butter drizzle.
- **cheese and fruit plate**: every cheeseboard is buried in crackers and crostini, and this
  recipe exists specifically to replace the cracker plate. Using one would argue with the recipe
  printed beside it.
- **cheese quesadilla**: the recipe calls for a whole-grain tortilla. The best cheese-pull
  photograph turned out, zoomed in, to be a white flour tortilla with ham inside and a fried
  tortilla chip on top. Wrong twice over.

Generating them is the fix, the way the other 22 were done. **It costs 1.25 credits per image and
the account currently holds 1 credit**, with no free-trial allowance. Three images need about 4
credits, so nothing can be generated until you top up. Once you have, it is ten minutes of work.

In the meantime those three cards no longer show the generic plate-and-cutlery icon. They show
their own ingredients instead, so the card looks like a decision rather than a broken image.

## One photograph is close but not exact

`stirfry-chicken-rice` is "chicken + rice + edamame" and its picture shows chicken, rice and
mushrooms with greens. No edamame. I looked; the only true edamame photographs on the free
libraries are bare pods, which would misrepresent a chicken and rice dish just as badly. The
hibachi recipe did find a proper edamame plate, which is why that one is right. Same fix, same
question about credits.


## A cracker recipe is still on the site

`cheese-crackers`, "String cheese + whole-grain crackers", is still a snack in both `meals.ts`
and `recipes.ts`. You have been clear that cracker plates are not what this site is for, and I
just rejected a cheeseboard photograph specifically because it had crackers in it. Those two
positions do not sit together.

I have not touched the recipe, because removing food from the plan is your call and it is a
whole-grain cracker rather than a beige snack aisle one. Tell me to cut it, or tell me it stays
and I will stop treating crackers as disqualifying when I pick photographs.
