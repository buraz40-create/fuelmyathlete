"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { importedRecipes, type ImportedRecipe } from "@/lib/import/storage";
import { buildCustomCatalog, EMPTY_CATALOG, type CustomCatalog } from "@/lib/catalog";

/**
 * The parent's imported recipes, in catalog shape.
 *
 * Reads on mount rather than during render, so the server and the first client render agree
 * and hydration does not mismatch. Until that effect runs the catalog is empty, which is the
 * correct answer on the server anyway.
 */
export function useCustomMeals(): {
  imports: ImportedRecipe[];
  catalog: CustomCatalog;
  refresh: () => void;
  remove: (id: string) => void;
} {
  const [imports, setImports] = useState<ImportedRecipe[]>([]);

  const refresh = useCallback(() => {
    setImports(importedRecipes.all());
  }, []);

  useEffect(() => {
    refresh();

    // Another tab saving an import should show up here rather than requiring a reload. The
    // storage event only fires in OTHER tabs, so this cannot loop back on our own writes.
    function onStorage(e: StorageEvent) {
      if (e.key === null || e.key === "fma:imported-recipes") refresh();
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  const remove = useCallback(
    (id: string) => {
      importedRecipes.remove(id);
      setImports(importedRecipes.all());
    },
    []
  );

  const catalog = useMemo(
    () => (imports.length ? buildCustomCatalog(imports) : EMPTY_CATALOG),
    [imports]
  );

  return { imports, catalog, refresh, remove };
}
