export function GuideAnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <aside
      role="note"
      aria-label="Short answer"
      className="guide-answer mt-6 rounded-3xl border border-primary/20 bg-primary-soft/50 p-5 text-base leading-relaxed text-ink md:p-6 md:text-[17px]"
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-primary">
        Short answer
      </p>
      <p>{children}</p>
    </aside>
  );
}
