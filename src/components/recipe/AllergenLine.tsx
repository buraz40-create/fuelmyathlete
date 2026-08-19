import { Warning } from "@phosphor-icons/react/dist/ssr";
import { ALLERGEN_LABEL } from "@/data/allergens";
import type { Allergen } from "@/types/domain";

interface AllergenLineProps {
  allergens: Allergen[];
}

export function AllergenLine({ allergens }: AllergenLineProps) {
  if (allergens.length === 0) return null;

  return (
    <aside
      aria-labelledby="allergen-title"
      className="rounded-2xl border border-border bg-muted/30 px-4 py-3"
    >
      <h3
        id="allergen-title"
        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
      >
        <Warning size={14} weight="duotone" aria-hidden className="text-primary" />
        Contains
      </h3>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {allergens.map((a) => (
          <li
            key={a}
            className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-ink"
          >
            {ALLERGEN_LABEL[a]}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
        Based on the ingredients listed. Brands differ and kitchens share surfaces, so check
        packaging if you are managing an allergy.
      </p>
    </aside>
  );
}
