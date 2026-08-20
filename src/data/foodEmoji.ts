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

// A handful of recipes have no photograph, because the honest stock libraries had nothing that
// matched their ingredients and we would rather show no picture than the wrong food. Those cards
// used to fall through to a single plate-and-cutlery emoji on a flat colour, which reads as a
// broken image rather than a decision.
//
// These are the ingredients each of those recipes actually calls for. Showing two or three of
// them, arranged deliberately, says "this is the food" instead of "the picture failed to load".
export const FOOD_EMOJI_CLUSTER: Record<string, readonly string[]> = {
  "apple-nachos": ["🍎", "🥜", "🍫"],
  "cheese-fruit-plate": ["🧀", "🍎"],
  "cheese-quesadilla-snack": ["🫓", "🧀"],
};

export function emojiForSlug(slug?: string): string {
  if (!slug) return "🍽️";
  const cluster = slug ? FOOD_EMOJI_CLUSTER[slug] : undefined;
  return FOOD_EMOJI[slug!] ?? cluster?.[0] ?? "🍽️";
}

export function emojiClusterForSlug(slug?: string): readonly string[] {
  if (!slug) return [];
  return FOOD_EMOJI_CLUSTER[slug] ?? [];
}
