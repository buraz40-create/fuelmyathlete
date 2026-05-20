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
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          </div>
          {step.timerSec && <StepTimer totalSec={step.timerSec} />}
        </li>
      ))}
    </ol>
  );
}
