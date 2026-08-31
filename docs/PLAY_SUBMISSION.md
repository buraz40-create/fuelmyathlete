# Submitting to Google Play

Everything in this file that could be prepared without your Google account has been. What is
left needs you to be signed in as you, and in two cases needs you to hold a credential that
should never be in a repository or a chat transcript.

## What is ready

| Thing | Where |
| --- | --- |
| Signed-release build config | `android/app/build.gradle`, reads `android/keystore.properties` |
| Privacy policy, required by Play | https://fuelmyathlete.com/privacy |
| Store icon, 512x512 | `store/play/store-icon-512.png` |
| Feature graphic, 1024x500 | `store/play/feature-graphic-1024x500.png` |
| Phone screenshots, 5 at 1080x1920 | `store/play/screenshots/` |
| Launcher icon on the device | `android/app/src/main/res/mipmap-*` |
| Listing copy | below |
| Data safety answers | below |

Regenerate the store art with `python scripts/make-play-assets.py <dir-of-screencaps>`.

## What only you can do

**1. Create the upload key.** Once, ever. Losing it means the listing can never be updated,
only replaced by a new one with a new URL and no installs, so back up the `.jks` somewhere that
is not just this laptop.

```bash
keytool -genkeypair -v -keystore fuelmyathlete-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias fuelmyathlete
```

Put it at `D:/fuelmyathlete.com/fuelmyathlete-release.jks`, then copy
`android/keystore.properties.example` to `android/keystore.properties` and fill in the two
passwords you just chose. Both that file and `*.jks` are gitignored. Do not paste those
passwords into a chat with me; they would sit in a transcript on disk.

**2. Build the bundle.**

```bash
cd android && ./gradlew bundleRelease
```

Output lands at `android/app/build/outputs/bundle/release/app-release.aab`. Verified: this
already builds; without the keystore it just comes out unsigned, which Play rejects.

**3. Register the developer account.** https://play.google.com/console, one-time 25 USD fee,
and you have to accept the Developer Distribution Agreement yourself.

**4. Fill the console forms** using the answers below, upload the AAB and the art, and submit.

## Before you submit: this is a children's app

Do not skim this part. When you declare the target age group, this app's answer includes under
13s, and that puts it under Play's **Families policy**, which is a stricter review than a normal
app gets. Expect the review to take longer than the usual couple of days, and expect it to be
the thing that bounces the submission if anything is wrong.

Two consequences worth knowing before you start:

- **Every SDK in the app must be Families-compliant.** The only third party running in the page
  is Google Analytics, and its advertising features are now explicitly disabled
  (`allow_google_signals: false`, `allow_ad_personalization_signals: false` in
  `src/app/layout.tsx`), because Families does not permit collecting an advertising identifier
  from a child. Leave those flags alone.
- **COPPA applies to you as the operator**, not to Google. You are storing a named child's age,
  weight, height and sex. The privacy policy states that consent comes from the parent entering
  those details, and that a parent can have all of it deleted by email. If you ever add a
  feature that shares any of it outside the household, that answer changes and so does the form.

I am not a lawyer and this is not legal advice. For a product that stores children's health-
adjacent data and takes an account, it is worth an hour with one before you go public.

## Data safety form answers

These come from reading the schema in `supabase/migrations/` and the client code, not from
guessing. If you change what is collected, change this too.

**Does your app collect or share any of the required user data types?** Yes.

| Data type | Collected | Shared | Required | Purpose |
| --- | --- | --- | --- | --- |
| Name (the athlete's first name) | Yes | No | Optional | App functionality |
| Email address | Yes | No | Optional | Account management |
| Health and fitness (age, weight, height, sex, activity level) | Yes | No | Optional | App functionality, personalization |
| App interactions (page views) | Yes | No | Optional | Analytics |
| Device or other IDs (push token) | Yes | No | Optional | App functionality |

Everything is Optional because the planner works fully with no account, holding the same data in
browser storage on the device only.

- **Is all data encrypted in transit?** Yes. HTTPS throughout, and the Capacitor shell sets
  `androidScheme: "https"` with cleartext off.
- **Can users request data deletion?** Yes. `hi@fuelmyathlete.com`, stated in the policy.
- **Committed to the Play Families policy?** Yes.

## Content rating questionnaire

Category **Reference, News, or Educational**. Everything else is No: no violence, no sexual
content, no profanity, no controlled substances, no gambling, no user-to-user communication
(household invitations go to an email address you type, they are not a chat), no sharing of
location, no purchases. Expected outcome is Everyone.

## Listing copy

**App name** (30 char limit)

```
FuelMyAthlete
```

**Short description** (80 char limit)

```
Weekly meal plans, grocery lists and hydration for young athletes aged 8 to 14.
```

**Full description** (4000 char limit)

```
FuelMyAthlete plans a week of food for a young athlete, then does the arithmetic you would
otherwise do in your head at 9pm.

Pick what they will eat for each meal, and the app builds the grocery list, scales the portions
to their age and weight, and works out how much water they need on a training day versus a match
day versus a rest day.

WHAT IT DOES

- Plan a week of breakfasts, lunches, snacks and dinners, or fill the whole week in one tap
- Get a grocery list grouped by aisle, with quantities already added up
- Track hydration against pediatric guidance, with hot weather accounted for
- Read guides on pre-workout meals, recovery and match day timing, every one of them cited
- Rate meals so the ones they actually eat come back, and exclude the ones they will not touch

BUILT FOR CHILDREN, NOT SHRUNK DOWN FROM AN ADULT APP

Calorie counts are hidden from athletes under 13, following American Academy of Pediatrics
guidance. Hydration targets are capped well below the level where drinking too much water
becomes dangerous for a child. There are no supplement or caffeine recommendations. The screen
a child sees shows food and water, and no numbers to fixate on.

CITED, NOT INVENTED

Portions, timing windows and hydration figures come from the American Academy of Pediatrics, the
National Athletic Trainers' Association and the American College of Sports Medicine. The sources
are listed at fuelmyathlete.com/methodology.

NO ADS, NO UPSELL

Free. No advertising. Nothing is sold to anyone. The planner works without an account at all,
keeping everything on your device. Make an account only if you want the plan on two phones or a
second parent seeing the same week.

Built by a parent of a competitive youth soccer player.

Not medical advice. For a personalized plan, talk to a registered sports dietitian or
pediatrician.
```

**App category** Health & Fitness. **Tags** meal planning, nutrition, youth sports.

**Contact email** hi@fuelmyathlete.com

**Privacy policy URL** https://fuelmyathlete.com/privacy

## One thing to decide before release

The app loads the live site (`server.url` in `capacitor.config.ts`), so a Vercel deploy reaches
every installed copy on next launch with no store review. That is the point of the architecture.
It also means the Play listing is reviewed against whatever the site says on review day, so do
not ship a risky content change while a submission is in flight.
