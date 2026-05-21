import type { GuideFaqItem } from "@/types/domain";

export function GuideFAQ({ items }: { items: GuideFaqItem[] }) {
  return (
    <section
      aria-labelledby="faq-title"
      id="faq"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm md:p-7"
    >
      <h2 id="faq-title" className="text-2xl font-semibold text-ink">
        Frequently asked questions
      </h2>
      <dl className="mt-5 flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <dt className="text-base font-semibold text-ink">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
