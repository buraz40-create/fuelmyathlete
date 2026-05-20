import { Check } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

interface MockGroceryListProps {
  className?: string;
}

const ITEMS = [
  { cat: "Produce", items: [
    { name: "Bananas", qty: "7 each", checked: true },
    { name: "Broccoli", qty: "2 cups", checked: true },
    { name: "Baby spinach", qty: "1 cup", checked: false },
  ]},
  { cat: "Protein", items: [
    { name: "Chicken breast", qty: "2 lb", checked: true },
    { name: "Greek yogurt", qty: "2 cups", checked: false },
  ]},
  { cat: "Pantry", items: [
    { name: "Jasmine rice", qty: "4 cups", checked: false },
    { name: "Whole-grain pasta", qty: "10 oz", checked: false },
  ]},
];

export function MockGroceryList({ className }: MockGroceryListProps) {
  return (
    <article
      aria-hidden
      className={cn(
        "rounded-3xl border border-border bg-surface p-4 shadow-sm md:p-5",
        className
      )}
    >
      <header className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">Grocery list</h3>
        <span className="text-[11px] font-medium text-muted-foreground">3 / 7 checked</span>
      </header>
      <ol className="flex flex-col gap-3">
        {ITEMS.map((group) => (
          <li key={group.cat}>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group.cat}
            </p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-2 py-1.5 text-xs",
                    item.checked && "bg-success/5"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid h-4 w-4 place-items-center rounded border-2",
                        item.checked
                          ? "border-success bg-success text-white"
                          : "border-border bg-surface"
                      )}
                    >
                      {item.checked && <Check size={10} weight="bold" aria-hidden />}
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        item.checked ? "text-muted-foreground line-through" : "text-ink"
                      )}
                    >
                      {item.name}
                    </span>
                  </span>
                  <span className="text-muted-foreground">{item.qty}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </article>
  );
}
