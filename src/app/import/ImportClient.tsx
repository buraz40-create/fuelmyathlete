"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ClipboardText, Warning, CheckCircle, Trash, Question } from "@phosphor-icons/react/dist/ssr";
import { parseRecipeText, type ParsedIngredient } from "@/lib/import/parse";
import { matchIngredient, customIngredient } from "@/lib/import/match";
import { importedRecipes, newImportId, type ImportedRecipe } from "@/lib/import/storage";
import { cn } from "@/lib/utils";
import type { DayType, Ingredient, IngredientCategory, IngredientUnit, MealSlot } from "@/types/domain";

// The review screen is the product, not the parser.
//
// Every AI import tool on the market optimises for the magic moment: paste, and a finished
// recipe appears. Their reviews are full of what that costs, and it is not missing
// ingredients, it is substituted ones. So this screen refuses to be magic. It shows what it
// read, what it matched, and what it does not know, and it will not save a recipe with an
// amount nobody has supplied.

const SLOTS: { key: MealSlot; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "snack", label: "Snack" },
  { key: "dinner", label: "Dinner" },
];

const CATEGORIES: IngredientCategory[] = [
  "produce", "protein", "dairy", "pantry", "frozen", "bakery", "beverages",
];

const UNITS: IngredientUnit[] = ["each", "cup", "tbsp", "tsp", "oz", "lb"];

const ALL_DAYS: DayType[] = ["school", "training", "match", "rest"];

/** One ingredient as the parent is reviewing it, before it is committed. */
interface ReviewRow {
  parsed: ParsedIngredient;
  /** Catalog match, or null when the parent has to describe it themselves. */
  match: Ingredient | null;
  alternatives: Ingredient[];
  confidence: "strong" | "likely" | "none";
  /** Filled in by the parent when the source did not state an amount. */
  quantity: number | null;
  /** For an unmatched item the parent tells us the aisle and the unit. */
  category: IngredientCategory;
  unit: IngredientUnit;
  include: boolean;
}

function guessCategory(name: string): IngredientCategory {
  const n = name.toLowerCase();
  if (/milk|yogurt|cheese|butter|cream/.test(n)) return "dairy";
  if (/chicken|beef|turkey|pork|fish|salmon|egg|tofu|bean/.test(n)) return "protein";
  if (/frozen/.test(n)) return "frozen";
  if (/bread|tortilla|bun|muffin|bagel/.test(n)) return "bakery";
  if (/juice|water|drink|milk/.test(n)) return "beverages";
  if (/oil|sauce|spice|salt|pepper|flour|sugar|vinegar|powder|tahini|paste|nut butter|honey|syrup|stock|broth|rice|pasta|noodle|bean|lentil|can|jar/.test(n))
    return "pantry";
  return "produce";
}

export function ImportClient() {
  const [text, setText] = useState("");
  const [stage, setStage] = useState<"paste" | "review">("paste");
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [name, setName] = useState("");
  const [slot, setSlot] = useState<MealSlot>("dinner");
  const [steps, setSteps] = useState<string[]>([]);
  const [servings, setServings] = useState<number | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const reduced = useReducedMotion();

  const parsed = useMemo(() => (text.trim() ? parseRecipeText(text) : null), [text]);

  function beginReview() {
    if (!parsed) return;
    setName(parsed.title ?? "");
    setSteps(parsed.steps);
    setServings(parsed.servings);
    setRows(
      parsed.ingredients
        .filter((i) => !i.isHeader)
        .map((p) => {
          const m = matchIngredient(p.name);
          return {
            parsed: p,
            match: m.ingredient ?? null,
            alternatives: m.alternatives,
            confidence: m.confidence,
            quantity: p.quantity,
            category: guessCategory(p.name),
            unit: p.unit ?? m.ingredient?.unit ?? "each",
            include: true,
          };
        })
    );
    setStage("review");
  }

  const included = rows.filter((r) => r.include);
  const missingAmounts = included.filter((r) => r.quantity === null);
  const unnamed = included.filter((r) => !r.match && !r.parsed.name.trim());
  const canSave = name.trim().length > 0 && included.length > 0 && missingAmounts.length === 0 && unnamed.length === 0;

  function update(index: number, patch: Partial<ReviewRow>) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }

  function save() {
    const id = newImportId();
    const customs: Ingredient[] = [];

    const ingredients = included.map((r) => {
      if (r.match) {
        return { ingredientSlug: r.match.slug, quantity: r.quantity, raw: r.parsed.raw };
      }
      const custom = customIngredient(r.parsed.name, r.category, r.unit, newImportId());
      customs.push(custom);
      return { ingredientSlug: custom.slug, quantity: r.quantity, raw: r.parsed.raw };
    });

    const record: ImportedRecipe = {
      version: 1,
      id,
      name: name.trim(),
      slot,
      suitableFor: ALL_DAYS,
      servings,
      totalMinutes: parsed?.totalMinutes ?? null,
      ingredients,
      steps,
      customIngredients: customs,
      source: {
        kind: "text",
        url: sourceUrl.trim() || undefined,
        importedAt: new Date().toISOString(),
      },
      unresolved: [],
    };

    const ok = importedRecipes.save(record);
    if (ok) {
      setSaved(record.name);
      setSaveFailed(false);
    } else {
      setSaveFailed(true);
    }
  }

  function startOver() {
    setText("");
    setRows([]);
    setName("");
    setSteps([]);
    setServings(null);
    setSourceUrl("");
    setSaved(null);
    setSaveFailed(false);
    setStage("paste");
  }

  return (
    <section
      aria-labelledby="import-title"
      className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 md:py-12"
    >
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Your recipes
        </p>
        <h1 id="import-title" className="mt-2">
          Add a recipe
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Paste a recipe from anywhere and we will sort it into ingredients and steps you can
          plan and shop from. We will not invent anything: whatever the recipe did not say, we
          ask you for it rather than guessing.
        </p>
      </header>

      {saved ? (
        <div className="rounded-3xl border border-border bg-surface p-6 text-center shadow-sm">
          <CheckCircle size={32} weight="duotone" aria-hidden className="mx-auto text-primary" />
          <h2 className="mt-3 text-xl">Saved {saved}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            It is stored on this device only. It does not sync yet, and clearing your browser
            data would remove it.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={startOver}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Add another
            </button>
            <Link
              href="/recipes"
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-ink transition hover:border-primary/40"
            >
              Back to recipes
            </Link>
          </div>
        </div>
      ) : stage === "paste" ? (
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <ClipboardText size={16} weight="duotone" aria-hidden className="text-primary" />
              Paste the recipe
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={14}
              placeholder={
                "Hibachi chicken and rice\nServes 4\n\nIngredients\n2 lb chicken breast\n1 cup jasmine rice\n2 tbsp low sodium soy sauce\n\nInstructions\n1. Heat the griddle until a drop of water skitters across it."
              }
              className="mt-2 w-full rounded-2xl border border-border bg-surface p-4 font-mono text-sm leading-relaxed text-ink placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink">Where it came from (optional)</span>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://"
              className="mt-2 w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none"
            />
            <span className="mt-1.5 block text-xs text-muted-foreground">
              Saved with the recipe and shown alongside it, so the person who wrote it keeps
              the credit.
            </span>
          </label>

          {parsed && (
            <p className="text-sm text-muted-foreground">
              Reading {parsed.ingredients.filter((i) => !i.isHeader).length} ingredients and{" "}
              {parsed.steps.length} steps.
            </p>
          )}

          <div>
            <button
              type="button"
              onClick={beginReview}
              disabled={!parsed || parsed.ingredients.length === 0}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check what we read
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6">
            <label className="block">
              <span className="text-sm font-medium text-ink">Recipe name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name this recipe"
                className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-ink focus:border-primary focus:outline-none"
              />
            </label>

            <div role="radiogroup" aria-label="Meal slot" className="mt-4 flex flex-wrap gap-1.5">
              {SLOTS.map((s) => {
                const active = slot === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSlot(s.key)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                      active
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:text-ink"
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {missingAmounts.length > 0 && (
            <p
              role="note"
              className="flex items-start gap-2 rounded-2xl border border-day-match/60 bg-day-match/20 px-4 py-3 text-sm text-ink"
            >
              <Warning size={16} weight="duotone" aria-hidden className="mt-0.5 flex-shrink-0" />
              <span>
                {missingAmounts.length === 1
                  ? "One ingredient has no amount"
                  : `${missingAmounts.length} ingredients have no amount`}
                . The recipe never said, and we will not guess, because a made-up number ends up
                on your shopping list. Fill them in or leave them out.
              </span>
            </p>
          )}

          <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6">
            <h2 className="text-lg font-semibold text-ink">Ingredients</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              We show the line as written underneath, so you can always check our reading.
            </p>

            <ul className="mt-4 flex flex-col divide-y divide-border">
              <AnimatePresence initial={false}>
                {rows.map((row, i) => (
                  <motion.li
                    key={`${row.parsed.raw}-${i}`}
                    layout={!reduced}
                    initial={false}
                    exit={{ opacity: 0 }}
                    className={cn("py-3", !row.include && "opacity-40")}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        step="0.25"
                        inputMode="decimal"
                        value={row.quantity ?? ""}
                        placeholder="?"
                        aria-label={`Amount of ${row.parsed.name}`}
                        onChange={(e) =>
                          update(i, {
                            quantity: e.target.value === "" ? null : Number(e.target.value),
                          })
                        }
                        className={cn(
                          "w-20 rounded-xl border bg-background px-2.5 py-1.5 text-sm tabular-nums text-ink focus:outline-none",
                          row.quantity === null
                            ? "border-day-match focus:border-day-match"
                            : "border-border focus:border-primary"
                        )}
                      />

                      <select
                        value={row.unit}
                        aria-label={`Unit for ${row.parsed.name}`}
                        onChange={(e) => update(i, { unit: e.target.value as IngredientUnit })}
                        className="rounded-xl border border-border bg-background px-2 py-1.5 text-sm text-ink focus:border-primary focus:outline-none"
                      >
                        {UNITS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>

                      <span className="min-w-0 flex-1 text-sm font-medium text-ink">
                        {row.match ? row.match.name : row.parsed.name || "Unnamed"}
                      </span>

                      <button
                        type="button"
                        onClick={() => update(i, { include: !row.include })}
                        aria-label={row.include ? `Leave out ${row.parsed.name}` : `Put back ${row.parsed.name}`}
                        className="grid h-7 w-7 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-danger/40 hover:text-danger"
                      >
                        <Trash size={13} weight="bold" aria-hidden />
                      </button>
                    </div>

                    <p className="mt-1 pl-1 font-mono text-[11px] text-muted-foreground">
                      {row.parsed.raw}
                    </p>

                    {row.confidence === "likely" && row.match && (
                      <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Question size={12} weight="duotone" aria-hidden className="text-primary" />
                        Matched to {row.match.name}. Not it?
                        {row.alternatives.map((alt) => (
                          <button
                            key={alt.slug}
                            type="button"
                            onClick={() => update(i, { match: alt, confidence: "strong" })}
                            className="rounded-full bg-primary-soft px-2 py-0.5 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
                          >
                            {alt.name}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => update(i, { match: null, confidence: "none" })}
                          className="rounded-full border border-border px-2 py-0.5 transition hover:text-ink"
                        >
                          None of these
                        </button>
                      </p>
                    )}

                    {!row.match && row.include && (
                      <div className="mt-2 flex flex-wrap items-center gap-2 rounded-2xl bg-muted/40 px-3 py-2">
                        <span className="text-[11px] text-muted-foreground">
                          Not in our list. Which aisle?
                        </span>
                        <select
                          value={row.category}
                          aria-label={`Aisle for ${row.parsed.name}`}
                          onChange={(e) =>
                            update(i, { category: e.target.value as IngredientCategory })
                          }
                          className="rounded-xl border border-border bg-background px-2 py-1 text-xs text-ink focus:border-primary focus:outline-none"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {steps.length > 0 && (
            <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-6">
              <h2 className="text-lg font-semibold text-ink">Steps</h2>
              <ol className="mt-3 flex flex-col gap-2">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                      {i + 1}
                    </span>
                    <textarea
                      value={s}
                      rows={2}
                      aria-label={`Step ${i + 1}`}
                      onChange={(e) =>
                        setSteps((prev) => prev.map((p, j) => (j === i ? e.target.value : p)))
                      }
                      className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm leading-relaxed text-ink focus:border-primary focus:outline-none"
                    />
                  </li>
                ))}
              </ol>
            </div>
          )}

          {saveFailed && (
            <p
              role="alert"
              className="rounded-2xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-ink"
            >
              The save did not go through. Browser storage is full or blocked, and it is shared
              with your meal plan, so clearing space is worth doing before trying again.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={save}
              disabled={!canSave}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save this recipe
            </button>
            <button
              type="button"
              onClick={() => setStage("paste")}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink transition hover:border-primary/40"
            >
              Back to the text
            </button>
            {!canSave && (
              <span className="text-xs text-muted-foreground">
                {name.trim() ? "Fill in the missing amounts first." : "Give it a name first."}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
