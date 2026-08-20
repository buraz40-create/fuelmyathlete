// Curated emoji per meal slug. Picked for visual clarity at large sizes.
// Used as the primary visual in recipe cards, meal slots, and recipe page heros.
// Real food photos were unreliable to curate at scale; emoji blocks are
// design-forward, consistent, and accurate.

export const FOOD_EMOJI: Record<string, string> = {
  // Breakfast
  "cereal-banana-milk": "🥣",
  "eggs-toast": "🍳",
  "berry-smoothie": "🥤",
  "english-muffin-pb": "🥯",
  "yogurt-parfait": "🍨",
  "pb-banana-power": "🥜",
  "green-machine": "🥬",
  "berry-oat-fuel": "🫐",
  "vanilla-protein-punch": "🥛",

  // Lunch
  "hibachi-chicken-bowl": "🍚",
  "turkey-wrap": "🌯",
  "chicken-pasta-broccoli": "🍝",

  // Snack
  "apple-pb": "🍎",
  "cheese-crackers": "🧀",
  "yogurt-honey-berries": "🍓",
  "banana-almonds": "🍌",
  "tropical-pre-game": "🥭",
  "chocolate-cherry-recovery": "🍫",

  // Dinner
  "chicken-rice-broccoli": "🍗",
  "salmon-sweet-potato": "🐟",
  "turkey-tacos": "🌮",
  "pasta-marinara": "🍝",
  "stirfry-chicken-rice": "🥢",

  // Hibachi recipe (signature)
  "hibachi-chicken": "🍱",
};

export function emojiForSlug(slug?: string): string {
  if (!slug) return "🍽️";
  return FOOD_EMOJI[slug] ?? "🍽️";
}
