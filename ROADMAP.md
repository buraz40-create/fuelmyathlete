# Roadmap: now to mid-November 2026

Written 2026-08-19 from a seven-agent research pass (competitors, SEO and content, product and UX, app strategy, marketing, recipe catalog, plus a program manager who adjudicated the conflicts between them). Read [HANDOFF.md](HANDOFF.md) first for orientation. This file is the plan; HANDOFF.md is the map.

**The call:** fix what is unsafe, stop the planner from erasing itself every Saturday, ship one 30-second front door, then spend six weeks not writing code and talking to fifteen families.

Every report that fed this was individually good and collectively over-scoped, because each assumed it owned the calendar. There is one calendar. It holds 5 to 8 hours a week, mostly after 9pm, with tournament weekends deleted. Roughly 60 to 100 hours exist between now and mid-November. Everything below fits in that. Everything in the rejected list did not.

---

## 0. Constraint added 2026-08-19: no testing with Elvis's team

Haris has ruled out recruiting his son's team. That is a hard constraint, not a preference, and it removes the distribution model this plan was built around.

What it deletes: the two-week concierge test in section 7, the first-fifteen-families choreography in section 6, the team manager and club director path, and Gate 2 and Gate 3 as originally written (both were defined by families and coaches who now will not be asked).

What it changes: search and AI citation become the only way a stranger ever finds this. The content freeze in section 8 was correct when a warm social channel existed to carry the product. Without one, content is no longer a deferred luxury, it is the acquisition channel, and the tier 1 pieces in the research (hydration, hyponatremia, post-game recovery, tournament and between-games fueling, after-school snack) move up rather than down.

What survives unchanged: everything in Gate 0a and 0b, every item in Gate 1 that makes the product work for the household actually using it, and the single metric. W2 retention still measures whether a family who plans comes back, it just gets measured on organic arrivals instead of teammates.

Open question for the next working session, and it is worth answering deliberately rather than drifting: is the goal now (a) a genuinely good tool for one family, built without growth pressure, or (b) a product that grows through search, which implies sustained writing. Those want different work. Until it is answered, build the things true under both, which is what Gate 1 already is.

## 1. The goal and the number

**90 days, as originally written and now superseded by section 0:** ten of the roughly fifteen families on Elvis's team build a plan and come back the following week. This is no longer the goal, because the team is not being approached. Kept here so the reasoning below stays legible.

**One year:** three teams beyond Elvis's are using it, and at least one arrived without Haris recruiting it. The second clause is the real test. If every team needs a personal pitch, the unit of growth is Haris's evenings and the ceiling is about four teams forever.

**The single metric: W2 plan retention.** Of families who build a plan in a given week, the share who build or edit one the next week. Target 60% on a base of at least ten families. Ten real families beats ten thousand pageviews.

**Supporting signals:** grocery list opened on a phone between Friday evening and Sunday evening (the proxy for actually using it at the store), plans built with no Haris involvement in the same 24 hours, landing to first completed plan under 5 minutes, unprompted forwards counted by hand, and `/api/health` uptime.

**Ignore:** pageviews, sessions, impressions, keyword rankings, signups, recipe and guide counts, social followers, AI citation counts. The test for any proposed metric: if this tripled overnight, would Elvis's teammates eat better?

---

## 2. Constraints that reject rather than discount

- **C1 Time.** 5 to 8 hours a week in fragments. Work that cannot ship in one sitting does not ship.
- **C2 Budget.** Roughly $50 to $75 across these 90 days. No ads, no contractors, no SaaS.
- **C3 Pediatric safety.** The hard ceiling and the moat. No weight targets, no body composition, no supplements for minors, no tracked metric added to the kid view without asking first. One credible accusation of harmful advice to a child ends this.
- **C4 Free-tier infrastructure.** Already caused a full auth outage. Local-first is the mitigation and it only works if nothing new is gated behind auth.
- **C5 The audience.** About 90 seconds of attention, on a phone, in a parking lot. They do not want a planner, they want an answer. A blank 28-slot grid is work, and work is the enemy.

---

## 3. What the research verified in the code

These were checked against the repo directly, not asserted.

| Finding | Evidence |
|---|---|
| Calories rendered to children | `shouldShowCalories()` existed at [cohort.ts:9](src/lib/player/cohort.ts) with zero call sites, while `NutritionCard` printed kcal as a headline on every recipe page. **Fixed 2026-08-19.** |
| Hydration logging had no ceiling | `increment()` in [useHydration.ts](src/hooks/useHydration.ts) was unbounded. The 100oz cap applied only to the goal. **Fixed 2026-08-19.** |
| Hot weather permanently on | `hydrationFor` and `ozGoalForDay` both defaulted `hotWeather = true` and every caller took the default. Match day plus the silent default put an 11-year-old at 97oz against the 100oz cap. **Fixed 2026-08-19.** |
| No week navigation | `shiftWeek` ([isoWeek.ts:30](src/lib/planner/isoWeek.ts)) is never imported, `setWeekStart` is returned from [useMealPlan.ts:129](src/hooks/useMealPlan.ts) and never consumed. At midnight Saturday a built week becomes 28 empty slots with no history. **Open, and it is item 10.** |
| Match-day lunch is zero | No meal is both `slot: "lunch"` and suitable for `match`. The picker's recommended section is empty on the marquee use case. **Open, item 15.** |
| Remote always wins on load | [useMealPlan.ts:28](src/hooks/useMealPlan.ts) does `if (remote) setPlan(remote)` with no timestamp check, and `meal_plans.updated_at` is never written. **Open, Gate 2.** |
| Grocery saves rewrite everything | [storage-supabase.ts:134](src/lib/planner/storage-supabase.ts) deletes all 28 entries then re-inserts, per checkbox tap, no transaction. **Open, item 12.** |
| Content aimed at the wrong reader | Six of eight guides target adult gym keywords owned by Healthline and UCLA Health. Only `pre-game-meal-for-kids` and `what-to-eat-before-a-soccer-game` match the product. |
| Linking is one-directional | Guides link down to recipes; no recipe page or planner surface links back. Three quarters of the URL surface passes zero equity to the pages meant to rank. **Open, item 18.** |
| Positioning is too broad | [Hero.tsx:62](src/components/landing/Hero.tsx) and [opengraph-image.tsx:64](src/app/opengraph-image.tsx) said "from soccer kids to adult lifters." **Open, item 7.** |

---

## 4. Gates

Nothing below a gate is worth an hour until the gate above it passes. The most likely failure mode for this project is working on Gate 3 while Gate 0 is open.

- **Gate 0a. Safety.** Done 2026-08-19.
- **Gate 0b. It cannot vanish and it does not lie.** Done 2026-08-19 except sign-in, which needs Haris's inbox, and the two GitHub secrets the keep-warm workflow needs.
- **Gate 1. The week survives Saturday.** Week navigation, copy-last-week, plan repair, grocery rounding, upsert saves, onboarding trimmed, allergens, match-day lunches, hidden meals, weekly schedule: all done 2026-08-19. `/game-day` and the shareable card are deferred, since both existed to serve the team wedge that section 0 removed.
- **Gate 2 and 3, as originally written, are void.** They were defined by teammate families and a team manager who will not be approached. What replaces them is not yet decided, see section 0.
- **Gate 4. One team arrives that Haris did not recruit.** Still the honest test of whether this grows at all, and now it would have to come through search.

---

## 4b. Status, end of 2026-08-19

Shipped today, in order: the three safety fixes; week navigation and copy-last-week; plan repair instead of discard; grocery quantities that read as real amounts plus a pantry-check group; upsert saves replacing delete-then-insert; weight dropped from onboarding for under-13s; error, 404 and loading pages; narrowed positioning; the keep-warm workflow; three match-day lunches and three whole-food snacks; allergen disclosure derived from ingredients; the youth hydration guide; a guide-date bug that had every page showing a day early; `/today`; per-meal hiding so auto-fill stopped serving oatmeal; and the weekly schedule.

Still open and needing Haris specifically: verify email sign-in end to end on production, and add SUPABASE_URL and SUPABASE_ANON_KEY as repository secrets so the keep-warm workflow can run.

Still open and buildable: post-game recovery guide, recipe-to-guide backlinks plus llms.txt and the crawler check, hydration history, profile remote sync and the localStorage-to-account migration, per-entry merge for two parents editing one plan, PWA shell.

## 5. The work, in order

### Gate 0a: safety (done)

1. Calorie gate wired through the existing `shouldShowCalories`. Youth view shows protein grams and cites AAP.
2. Hydration logging capped at the cohort ceiling, with an honest message rather than a silent clamp.
3. `hotWeather` defaults to `false`; `HydrationBanner` passes `true` explicitly because it is the heat alert.

### Gate 0b: survivability (about 10 hours)

4. **Keep-warm cron.** GitHub Actions, every 2 days, performing an authenticated read against a table rather than an unauthenticated ping, failing loudly so the failure email is the early warning. Treat as a bridge, not a solution: scheduled workflows get disabled after repo inactivity, which looks exactly like a tournament-heavy stretch. 1h
5. **Make `storage.ts` pad and repair instead of discarding**, plus a version field. It currently throws away any plan that is not exactly 28 entries, so the day the slot count ever changes, every user silently loses their plan. 1h
6. **`error.tsx`, `not-found.tsx`, `loading.tsx`.** A white screen at a tournament is a permanent first impression. 1h
7. **Cut "adult lifters"** and make the pediatric stance the headline rather than a footnote. 0.5h
8. **Hydration hub as a named framework at a canonical URL, plus the hyponatremia page** the new cap links to. This is documentation for a live feature that computes hydration numbers for children, not marketing content. 6h
9. **Verify email sign-in end to end on production.** Needs Haris's inbox. 0.5h

### Gate 1: retention, then one door (about 37 hours)

10. **Week navigation plus copy-last-week.** Wire `shiftWeek` and `setWeekStart`. This is the highest-value non-safety item in the entire research pass, because the product currently contains a mechanical guarantee that W2 retention is near zero. 6h
11. **Round grocery quantities to purchasable units.** "Garlic cloves 9.36 each" in front of a skeptical parent in a store. 0.5h
12. **Fix `resetWeek` clearing local only, and the delete-then-insert on every checkbox tap.** 3h
13. **Cut `weightLb` from onboarding for under-13s.** `portionScale` returns exactly 1.0 and the hydration baseline is a flat 64oz, so it currently makes a parent find a bathroom scale to unlock a number that changes nothing. It is also the most sensitive field a coach must never see. 1h
14. **`allergens` field plus a visible allergen line on recipe pages.** The existing hibachi recipe contains sesame oil and sesame is now a top-9 US allergen. 2h
15. **6 to 8 targeted meals**, not 40. Fill the zero match-day lunch and add non-oat match-day breakfasts (3 of 10 breakfasts are rolled oats and unusable for Elvis, leaving about 4 real match-day options of which 2 are smoothies). 4h
16. **`/game-day`: one screen, no signup, no onboarding, no profile.** 10h
17. **Shareable card image** via the existing `ImageResponse` pattern from `opengraph-image.tsx`. Links die in group chats, images get forwarded. 3h
18. **Recipe-to-guide backlinks, `llms.txt`, crawler check, oatmeal consolidation, soccer guide age-qualified.** Compounds 32 existing pages, produces no new content. 3h
19. **Post-game recovery guide.** The only new piece that pays three times: the Saturday answer, the catalog scenario, a winnable SERP. 5h

### Gate 2 (not before three families repeat)

`/today` kid view. PWA manifest, install prompt, and the iOS Add to Home Screen walkthrough. Profile remote sync (an anonymous-then-signed-in parent is bounced back to onboarding on a second device). localStorage-to-account migration. Per-entry upsert and `updated_at` merge for two parents editing one plan. Hydration history, without streaks.

### Gate 3 (not before the team manager distributes it)

Team schema and RLS, the `join_team` security definer RPC (nobody can redeem an invite code today), a coach view exposing only name and has-plan-this-week and never weight, height, sex, or age. Content beyond the three pieces. RD review byline. Co-branded `/club/[slug]`. Push notifications.

### Gate 4

Monetization design, Vercel Pro, club licensing, native reconsideration, catalog expansion at scale.

---

## 6. Distribution, weeks 6 to 9

Nearly no code. This section is the plan, not a suggestion.

Use it visibly at the sideline for two weeks and say nothing. Then three one-to-one conversations, chosen deliberately: the parent whose kid cramps or fades in the second half, the team manager, and the social connector. Show the card, do not scroll, do not explain features. The framing that works is "I had no clue what to feed him either, so I built a thing for Elvis" plus "try it Friday and tell me if it is wrong." That converts them from customer to advisor.

Text on Thursday or Friday, never Monday, because the question only exists when tomorrow is a game. Ask on Saturday what the kid actually ate.

**Never post the link in the team chat yourself.** A cold link from a parent reads as self-promotion and burns the channel permanently. Around week 8 or 9, ask the team manager to post it, using words close to: "a few parents have been using this for game days, would it be weird if you dropped it in the chat before the tournament, I just do not want to be the guy pushing his own thing." Acknowledging the social risk out loud is what defuses it. The manager posts the image, with the link underneath.

Club directors are the real expansion lever and they need a co-branded page, a one-page PDF, and eventually an RD name for liability cover. League administrators follow clubs, so they are deprioritized entirely for 90 days.

TeamSnap, SportsEngine, and Spond are containers, not channels. Target the human with posting rights, never build an integration.

---

## 7. Checkpoints and kill criteria

| When | Check | If it fails |
|---|---|---|
| Week 3 | Concierge test result (see below) | Take the branch. Do not build through a polite no. |
| Week 6 | Has any parent other than Haris used it twice? | Stop building. The problem is demand or onboarding, and neither is fixed by more features. |
| Week 10 | Four or more repeat families | Do not start Gate 3. Do not talk to a club. |
| Week 13 | One club director has seen the co-branded page | Acceptable to miss. Stretch goal, not a gate. |

**Running signal, free, check weekly:** is the grocery list ever opened on a phone at the weekend? If plans get built and the list never opens, plans are being made and abandoned, which is a failure that looks exactly like success on every other number.

### The riskiest assumption, and the two-week test

The whole product assumes parents want a **weekly meal plan**. They may not. They have fed their kid for eleven years. What they do not know is narrow and acute: what to pack for a 7am kickoff, what he eats between two tournament games, why he cramped in the second half. Those are questions, not plans.

The test costs nothing and needs no code. Before the next tournament, post in the team chat offering to send any family a personalized game-day fuel plan for their kid: night before, morning of, between games, after. No link, no mention of the site. Hand-write up to eight, twenty minutes each. Then wait and count how many come back and ask again, unprompted, before the following weekend.

- **5+ replies and 2+ unprompted repeat asks:** demand is real and game-day shaped. Proceed as written.
- **Anyone asks about the week rather than the day:** this is the only result that validates the current architecture. Weight it heavily, swap items 16 and 17 for deepening the planner.
- **Replies but zero repeats:** politeness, not demand. This is the dangerous middle result and the instinct will be to build through it. Do not. Re-run with a different framing.
- **0 to 2 replies:** this team is not the wedge. Test one more channel before changing the product.

---

## 8. Rejected, and why

| Rejected | Why |
|---|---|
| The 36-piece content plan, sport-specific pages at scale, the 7-day printable | 36 pieces is 36 weeks of the only free hours. Gate 3. Do not delete the five adult guides, but never touch them again. |
| Public pricing, $9/mo family, $199/yr team | A visible price turns a favor into a sales pitch and turns the sideline into a place people avoid Haris. That channel does not recover. No retention data means any price is a guess. Keep `teams` as the eventual billing entity; build no billing. |
| Native app, React Native | 13,474 lines with about 2,750 reusable. All 61 components and every route rewritten, and the 24 recipe pages and 8 guides cannot exist in React Native at all, so two codebases forever. Capacitor stays available as a weekend option if a parent asks twice, unprompted. |
| TeamSnap / SportsEngine / PlayMetrics integration | Containers, not channels. Competitors sync from them and that gap is accepted. |
| Hydration streaks | A mechanism whose purpose is pushing a child to drink more every day, in the same quarter the logging cap ships for hyponatremia risk. Incoherent. History is fine; streaks are not. |
| `snack2` and the 28-to-35 slot migration | The car window and the three-game Saturday are real scenarios, and `/game-day` serves both statelessly with no schema change. Pay the persisted-shape change when evidence justifies it. Item 5 makes that change safe rather than data-destroying. |
| Team RLS, coach dashboard, schedule table, multi-parent families | All correctly identified, all blocked behind a team manager who will not distribute a product three families bounced off. |
| Push notifications and pg_cron reminders | Require an installed PWA, which requires families who want it. |
| RD review byline, $150 to $300 | Spend it after a club director expresses interest. It unlocks the club tier and nothing else. |
| Instagram and social presence | A full-time job. |
| Paid acquisition, any signup wall or email gate, calorie or weight targets shown to a child, supplement content | Pre-committed rejections. |

---

## 9. Money

Free to parents for the full 90 days and almost certainly the full season. The first dollar comes from a club at $199 to $499 per season, never from a teammate's parent.

Supabase Pro is **$25/mo**, not $20. Pay it the day the first non-Haris family signs in, or the day before the team manager posts the link, whichever comes first. Not before: paying today buys reliability for a product with one user, and the same "upgrade on commitment, never on optimism" rule applies to infrastructure as to everything else. Vercel Pro is not needed in these 90 days because no money changes hands, so Hobby's non-commercial term is not breached. Infrastructure at 500 families is still only about $45/mo, so this is a pricing-model decision, never an architecture one.

---

## 10. The tiebreaker

For anything not covered here: does it make it more likely that ten families on Elvis's team are using this in November?
