"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Trash, DownloadSimple, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { FoodImage } from "@/components/food/FoodImage";
import { useCustomMeals } from "@/hooks/useCustomMeals";
import { importedRecipes } from "@/lib/import/storage";
import { resolveIngredient } from "@/lib/catalog";

// Somewhere to see and delete what you have imported.
//
// Without this the app can create a recipe it can never show you again, which is how a store
// quietly fills up with things you cannot inspect or remove. The export button matters for a
// blunter reason: this lives in localStorage, browsers clear that without asking, and a recipe
// someone typed in by hand is not something we can re-derive.

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

export function YourRecipes() {
  const { imports, catalog, remove } = useCustomMeals();
  const [confirming, setConfirming] = useState<string | null>(null);
  const reduced = useReducedMotion();

  function exportAll() {
    const blob = new Blob([importedRecipes.exportAll()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fuelmyathlete-recipes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!imports.length) return null;

  return (
    <section aria-labelledby="your-recipes-title" className="mb-10">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="your-recipes-title" className="text-xl font-semibold text-ink">
            Your recipes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Saved on this device only. They do not sync, so clearing your browser data would
            remove them.
          </p>
        </div>
        <button
          type="button"
          onClick={exportAll}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-ink transition hover:border-primary/40 hover:text-primary"
        >
          <DownloadSimple size={13} weight="bold" aria-hidden />
          Export a backup
        </button>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {imports.map((rec) => {
            const isConfirming = confirming === rec.id;
            return (
              <motion.li
                key={rec.id}
                layout={!reduced}
                initial={false}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                className="flex gap-3 rounded-2xl border border-border bg-surface p-3"
              >
                <FoodImage
                  slug={rec.name}
                  slot={rec.slot}
                  aspect="aspect-square"
                  emojiSize="text-2xl"
                  rounded="rounded-xl"
                  className="h-16 w-16 flex-shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-ink">{rec.name}</h3>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {rec.slot}
                    {rec.servings ? ` · serves ${rec.servings}` : ""}
                    {` · ${rec.ingredients.length} ingredients`}
                  </p>

                  {/* Attribution is the whole basis for doing this at all, so it is shown
                      rather than merely stored. */}
                  {rec.source.url && (
                    <a
                      href={rec.source.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-primary transition hover:underline"
                    >
                      {hostOf(rec.source.url)}
                      <ArrowSquareOut size={10} weight="bold" aria-hidden />
                    </a>
                  )}

                  <p className="mt-1 truncate text-[11px] text-muted-foreground">
                    {rec.ingredients
                      .map((i) => resolveIngredient(i.ingredientSlug, catalog)?.name ?? "?")
                      .join(", ")}
                  </p>

                  {isConfirming ? (
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-ink">Delete for good?</span>
                      <button
                        type="button"
                        onClick={() => {
                          remove(rec.id);
                          setConfirming(null);
                        }}
                        className="rounded-full bg-danger px-2.5 py-1 font-medium text-white transition hover:opacity-90"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirming(null)}
                        className="rounded-full border border-border px-2.5 py-1 font-medium text-muted-foreground transition hover:text-ink"
                      >
                        Keep it
                      </button>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirming(rec.id)}
                      aria-label={`Delete ${rec.name}`}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition hover:text-danger"
                    >
                      <Trash size={11} weight="bold" aria-hidden />
                      Delete
                    </button>
                  )}
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </section>
  );
}
