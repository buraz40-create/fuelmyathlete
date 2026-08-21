# The Android app

## What it is, and what it is not

A Capacitor shell around the site that already exists. The roadmap rejected React Native with
numbers: 13,474 lines with about 2,750 reusable, every route and all 61 components rewritten,
and the recipe and guide pages unable to exist there at all, which means two codebases forever.
This is the option it left open.

`capacitor.config.ts` sets `server.url` to `https://fuelmyathlete.com`, so the app loads the live
site rather than a copy bundled into the APK. That decision is the whole architecture:

- One codebase, one database, one login. Nothing to keep in sync.
- A fix pushed to Vercel reaches the app on the next launch, with no store review. For a product
  handed to one team, that is the difference between fixing something on Saturday and fixing it
  in three weeks.
- The first launch needs a connection. After that `public/sw.js` is the offline story, which is
  why it precaches the routes a parent opens away from home. Capacitor contributes one screen to
  offline: `capacitor-shell/offline.html`, shown when the site cannot be reached at all.

If offline ever has to survive a cold first launch with no signal, the answer is bundling a
static export, and that is a real project rather than a config change: `/api/health`,
`/icons/[size]`, the generated share cards and the image optimiser all assume a server.

## Building

The toolchain is already on this machine. Android Studio's bundled JDK, and the SDK at
`~/AppData/Local/Android/Sdk` with platforms 36 and 36.1.

```bash
export JAVA_HOME="/c/Program Files/Android/Android Studio/jbr"
export PATH="$JAVA_HOME/bin:$PATH"
cd android && ./gradlew assembleDebug
```

The APK lands at `android/app/build/outputs/apk/debug/app-debug.apk`, about 9.7 MB.

`android/local.properties` must use forward slashes. `sdk.dir=C:/Users/...` works;
backslashes make Gradle fail with `Invalid file path`, because `\U` and `\A` are not valid
escapes in a properties file.

## Installing it on a phone

Debug builds are signed with a debug key, which is fine for your own device and not acceptable
to the Play Store.

1. On the phone: Settings, About phone, tap Build number seven times, then Developer options,
   enable USB debugging.
2. Plug it in and accept the prompt on the phone.
3. `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`

Or copy the APK to the phone and open it, allowing installation from unknown sources when asked.

## Push notifications need a file only you can generate

The plugin is installed, the permissions are declared and the token is stored, but nothing will
register until Firebase exists:

1. Create a free Firebase project.
2. Add an Android app with the package name **`com.fuelmyathlete.app`**.
3. Download `google-services.json` and put it in `android/app/`.
4. Rebuild.

Until then, registration fails and `NativeBridge` logs a warning naming this file rather than an
opaque error. Everything else in the app works.

Also run `supabase/migrations/0007_push_tokens.sql`, which is where device tokens go.

**Nothing sends a notification yet, deliberately.** This records where a message could go and
stops there. What to send about a child's eating is easy to get wrong, and the roadmap already
rejected one such mechanism, hydration streaks, on the grounds that pushing a child to drink
more every day is incoherent alongside a logging cap that exists for hyponatremia risk. The same
caution applies here.

## The camera

Permissions are declared (`CAMERA`, `READ_MEDIA_IMAGES`, and `READ_EXTERNAL_STORAGE` capped at
API 32) and the plugin is installed, with `android.hardware.camera` marked not required so a
device without one can still install the app.

It is not yet wired to anything, and that is on purpose. The useful destination is photographing
a cookbook page and having the recipe extracted, which needs the AI key listed in ACTIONS.md.
Capturing a photo with nowhere for it to go would be a button that disappoints.

## Play Store, when you get there

- The `$25` registration fee is one-off.
- A release build needs its own signing key, and losing that key means never updating the app
  again. Back it up somewhere that is not this machine.
- Google's minimum functionality policy is sceptical of apps that are only a website in a
  wrapper. Push notifications and the camera are what make this more than that, so it is worth
  having at least push working before submitting.
- The privacy declaration has to mention the data collected. This app stores an email address, a
  child's age, and optionally a weight for teenagers. Be accurate: it is a children's product,
  and Google treats that category seriously.
