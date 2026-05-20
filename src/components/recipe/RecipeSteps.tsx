import { Warning } from "@phosphor-icons/react/dist/ssr";
import { StepTimer } from "./StepTimer";
import type { Recipe } from "@/types/domain";

export function RecipeSteps({ recipe }: { recipe: Recipe }) {
  return (
    <ol className="flex flex-col gap-4">
      {recipe.steps.map((step) => (
        <li
          key={step.order}
          className="rounded-3xl border border-border bg-surface p-5 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
              {step.order}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </div>

          {step.timerSec && <StepTimer totalSec={step.timerSec} />}

          {step.mistake && (
            <aside
              role="note"
              aria-label="Common mistake"
              className="mt-3 flex items-start gap-2.5 rounded-2xl border border-warning/40 bg-warning/10 p-3"
            >
              <Warning
                size={18}
                weight="duotone"
                aria-hidden
                className="mt-0.5 flex-shrink-0 text-warning"
              />
              <p className="text-xs leading-relaxed text-ink/80">
                <strong className="text-ink">Common mistake: </strong>
                {step.mistake}
              </p>
            </aside>
          )}
        </li>
      ))}
    </ol>
  );
}
