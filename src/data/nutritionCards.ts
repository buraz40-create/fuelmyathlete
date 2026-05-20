import type { NutritionCard } from "@/types/domain";

export const NUTRITION_CARDS: NutritionCard[] = [
  {
    slug: "whole-grain-training",
    title: "Why whole grain on training days",
    body: "White bread digests fast and crashes blood sugar mid-practice. Whole-grain bread, pasta, and rice release energy slowly so the tank doesn't empty before drills end.",
    appliesTo: ["training", "school"],
    emoji: "🌾",
  },
  {
    slug: "low-sauce-match",
    title: "Light on the sauce for match days",
    body: "Yum-yum sauce is mostly mayo. Fat slows digestion. Pre-match, half the sauce and add Greek yogurt instead. Same creamy flavor, lighter feel on the field.",
    appliesTo: ["match"],
    emoji: "🥄",
  },
  {
    slug: "fl-hydration",
    title: "Florida heat = hydrate early",
    body: "Most kids show up to practice already dehydrated from sitting in school. A water bottle at his desk during the day is a game changer. Start drinking 2 hours before practice, not 5 minutes before.",
    appliesTo: ["training", "match", "school"],
    emoji: "💧",
  },
  {
    slug: "sleep-secret",
    title: "Sleep is the secret weapon",
    body: "Growth hormone, the stuff that literally builds muscle, releases during deep sleep. Nine to ten hours a night matters more than any supplement, smoothie, or special meal.",
    appliesTo: ["school", "training", "match", "rest"],
    emoji: "😴",
  },
  {
    slug: "hibachi-sunday",
    title: "One Sunday cook, five school lunches",
    body: "Sear 2 lb of hibachi chicken once on Sunday. Portion into 5 lunch containers + 3 dinner servings. Same protein, different rice/veggie combos. Saves 30 min every weekday morning.",
    appliesTo: ["school"],
    emoji: "🍱",
  },
  {
    slug: "recovery-30",
    title: "The 30-minute recovery window",
    body: "After practice or a match, the body absorbs carbs and protein fastest in the first 30 minutes. A chocolate milk box or yogurt + berries is perfect. Quick, kid-friendly, and works better than waiting for dinner.",
    appliesTo: ["training", "match"],
    emoji: "🥛",
  },
];
