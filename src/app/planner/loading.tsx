// Scoped to the planner segment, deliberately not the app root.
//
// A loading.tsx at the root wraps every route in a Suspense boundary, and on this app that
// stopped statically prerendered pages from hydrating at all: no client components ran on any
// recipe or guide page, so the calorie gate silently fell back to its youth view for everyone
// and nothing interactive worked. It looked fine, which is what made it dangerous.
//
// Skeleton rather than a spinner, so a slow connection shows the shape of the page instead of
// a blank screen followed by a jump.
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
