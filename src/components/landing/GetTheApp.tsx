import Image from "next/image";
import { DeviceMobile, WifiSlash, BellRinging } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { PLAY_STORE_URL, PLAY_LISTING_LIVE } from "@/lib/app-store";

/**
 * The Android app, offered without pretending it is a different product.
 *
 * It is the same planner in a shell around this site, one account and one plan, so the honest
 * pitch is the three things a phone gives you that a browser tab does not: an icon, a grocery
 * list that survives a bad signal in the shop, and reminders once those exist. Overselling it
 * as a separate app would be a promise the next screen breaks.
 *
 * Renders nothing until the listing is actually live. See src/lib/app-store.ts.
 */
export function GetTheApp() {
  if (!PLAY_LISTING_LIVE) return null;

  return (
    <section
      aria-labelledby="get-the-app-title"
      className="mx-auto w-full max-w-3xl px-4 pb-4 md:px-8"
    >
      <Reveal className="rounded-3xl border border-border bg-surface px-6 py-10 text-center shadow-sm md:px-12 md:py-12">
        <DeviceMobile size={28} weight="duotone" aria-hidden className="mx-auto text-primary" />

        <h2 id="get-the-app-title" className="mt-3 text-2xl md:text-3xl">
          Or put it on the phone
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          The Android app is this same planner, with the same plan and the same account. Free, and
          no ads there either.
        </p>

        <ul className="mx-auto mt-6 flex max-w-md flex-col gap-3 text-left text-sm text-ink/90">
          <li className="flex items-start gap-2.5">
            <DeviceMobile size={18} weight="duotone" aria-hidden className="mt-0.5 shrink-0 text-primary" />
            An icon on the home screen, so it opens like anything else on the phone
          </li>
          <li className="flex items-start gap-2.5">
            <WifiSlash size={18} weight="duotone" aria-hidden className="mt-0.5 shrink-0 text-primary" />
            The grocery list still opens on one bar of signal in the shop
          </li>
          <li className="flex items-start gap-2.5">
            <BellRinging size={18} weight="duotone" aria-hidden className="mt-0.5 shrink-0 text-primary" />
            Reminders can reach the phone, once you have an athlete set up
          </li>
        </ul>

        {/* Google's own badge rather than a button of our own.
            It is the control people already recognise as "this installs from the store", and
            Google's brand guidelines require the artwork be used unmodified, so it is served
            exactly as downloaded. The file is self hosted instead of hotlinked from Google:
            their CDN path has changed before, and a broken image is a worse call to action
            than no image. The built in transparent margin is the badge's required clear
            space, which is why the frame below looks generously padded. */}
        <a
          href={PLAY_STORE_URL}
          className="mt-6 inline-block transition hover:-translate-y-0.5"
        >
          <Image
            src="/images/google-play-badge.png"
            alt="Get it on Google Play"
            width={646}
            height={250}
            className="h-[60px] w-auto md:h-[68px]"
            unoptimized
          />
        </a>

        <p className="mt-3 text-xs text-muted-foreground">
          Android only for now. On an iPhone, use Share then Add to Home Screen and it behaves the
          same way.
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground/80">
          Google Play and the Google Play logo are trademarks of Google LLC.
        </p>
      </Reveal>
    </section>
  );
}
