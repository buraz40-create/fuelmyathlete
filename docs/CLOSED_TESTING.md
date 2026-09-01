# Closed testing: everything needed to hire and run 12 testers

Google will not let this app into production until a closed test has run with **at least 12
testers opted in continuously for 14 days**. It is per app, not per account: TideChartsPro
already being live does nothing for this one. Verified against the console, which currently
reads "0 testers currently opted-in".

## What is already done

| Thing | State |
| --- | --- |
| Closed testing track | Created, "Closed testing - Alpha" |
| Countries | 177 targeted, so a tester anywhere can install |
| Release | Draft, version 1 (1.0), same signed bundle as internal testing |
| Release notes | Written |
| Testers | **Not set. This is what the Fiverr order is for.** |
| Send to Google for review | Not done, and blocked until the app content declarations are finished |

## Buy 16, not 12

Twelve is the floor, and the count is of people **currently opted in**. If someone uninstalls or
leaves the programme on day 9 and drops the count to 11, the 14 days does not continue from
where it was. Buying 16 to 20 gives room for people who disappear.

The clock starts when the twelfth person has actually installed, not when the order is placed.

## What to collect from each tester

One thing only: **the Gmail address of the Google account on the phone they will use.**

Not their Fiverr handle, not a work email that is not a Google account. If the address is not the
account signed into Play on that device, the opt-in link will not work for them and it is the
single most common way these orders go wrong.

## The brief to paste into the order

> I need Android testers for a closed test on Google Play. It runs for 14 days and you must keep
> the app installed for the whole period.
>
> What I need from you before we start: the Gmail address of the Google account on the Android
> phone you will use. It has to be the account you are signed into the Play Store with.
>
> Once I add you, I will send an opt-in link. Steps:
> 1. Open the link on the phone, signed in with that Gmail address.
> 2. Tap "Become a tester", then "Download it on Google Play".
> 3. Install the app and open it.
> 4. Leave it installed for the full 14 days. Do not uninstall.
>
> The app is FuelMyAthlete, a weekly meal planner for young athletes. Please spend a few minutes
> in it: set up an athlete profile, plan some meals for the week, and open the grocery list.
>
> Short written feedback is welcome and useful: anything confusing, anything that looks broken,
> anything that did not work on your device. One paragraph is plenty.
>
> Please do not install and immediately uninstall. Google counts testers who stay opted in, and
> the test fails if the number drops below twelve at any point.

## A risk worth knowing before spending money

Google's stated expectation is that testers are real people giving genuine feedback, and the
production access application asks questions about how the test went. Bought testers who install
and never open the app are the pattern Google looks for, and a rejected application costs weeks
rather than money.

This is not a reason to avoid Fiverr, and plenty of small developers get through this way. It is
a reason to ask for actual written feedback, to make sure people open the app rather than just
installing it, and to keep whatever they send. That feedback is what the application asks about.

## Once the addresses are in hand

1. Play Console, FuelMyAthlete, Testing, Closed testing, Manage track, Testers tab
2. Create an email list, paste all the addresses in one go, save
3. Play shows the opt-in link on that tab. Send it to the testers.
4. Watch the count on the dashboard under Production: it reads "N testers currently opted-in"
5. When it reaches 12, the 14 days begins

The remaining app content declarations still have to be finished before the release can be sent
to Google for review, and that review has to complete before anyone can install. Start the
recruiting in parallel: the paperwork is not the long pole, the 14 days is.
