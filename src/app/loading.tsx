// Skeleton rather than a spinner, so a slow connection shows the shape of the page instead
// of a blank screen followed by a jump.
export default function Loading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading"
      className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8"
    >
      <span className="sr-only">Loading</span>
      <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
      <div className="mt-3 h-8 w-2/3 animate-pulse rounded-2xl bg-muted md:w-1/2" />
      <div className="mt-3 h-3 w-full max-w-prose animate-pulse rounded-full bg-muted" />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-3xl border border-border bg-muted/40" />
        ))}
      </div>
    </section>
  );
}
