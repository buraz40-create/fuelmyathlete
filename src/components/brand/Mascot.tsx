interface MascotProps {
  size?: number;
  className?: string;
  expression?: "happy" | "cheer" | "wink";
}

/**
 * The character, in the site's own colours.
 *
 * It used to be drawn entirely in ink on white, with only the cheeks carrying any colour, so on
 * a page of warm greens and soft food tints it read as clip art dropped in from somewhere else.
 *
 * The four petals are the four meal slots, in the same tints the planner and the recipe cards
 * use for breakfast, lunch, snack and dinner. That is not decoration: this mark sits on screens
 * where those four colours already mean something, so borrowing them makes the character part
 * of the system rather than a picture of one.
 *
 * The tints are pale by design, which is right behind a meal name and wrong for a shape that
 * has to hold its own outline, so each petal keeps an ink stroke. The face stays ink for the
 * same reason: it is the part that has to survive being rendered at 56px on a phone.
 */
const PETALS = [
  // top, then left, right, bottom, going clockwise from the crown
  { d: "M60 22 L72 36 L66 52 L54 52 L48 36 Z", fill: "#d2e8c4" },
  { d: "M22 56 L36 50 L48 56 L44 70 L28 72 Z", fill: "#fbe6c5" },
  { d: "M98 56 L84 50 L72 56 L76 70 L92 72 Z", fill: "#fad4bd" },
  { d: "M40 86 L52 78 L68 78 L80 86 L72 100 L48 100 Z", fill: "#e7dbf2" },
];

export function Mascot({ size = 96, className, expression = "happy" }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label="FuelMyAthlete mascot"
      className={className}
    >
      {/* A warm ground rather than pure white, so the mark sits on the page instead of
          punching a hole in it. */}
      <circle cx="60" cy="60" r="48" fill="#fdfcfa" stroke="#1F2422" strokeWidth="3" />

      {PETALS.map((petal) => (
        <path
          key={petal.d}
          d={petal.d}
          fill={petal.fill}
          stroke="#1F2422"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}

      {/*
        The face sits on top of the petals rather than between them.

        Drawn smaller, this read as a face with four loose shapes floating around it: the petals
        did not touch anything and the mark fell apart. The original held together because every
        shape was the same ink and overlapped into one silhouette. Tucking their inner tips
        behind a face this size gets that back while keeping the colour.
      */}
      <circle cx="60" cy="64" r="21" fill="#e3eed3" stroke="#1F2422" strokeWidth="2" />

      <circle cx="52" cy="60" r="3.5" fill="#FFFFFF" />
      <circle cx="68" cy="60" r="3.5" fill="#FFFFFF" />
      <circle cx="52" cy="60" r="2" fill="#1F2422" />
      {expression === "wink" ? (
        <path
          d="M64 60 Q68 58 72 60"
          stroke="#1F2422"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <circle cx="68" cy="60" r="2" fill="#1F2422" />
      )}

      <ellipse cx="46" cy="69" rx="3.5" ry="2" fill="#FF8B7B" opacity="0.5" />
      <ellipse cx="74" cy="69" rx="3.5" ry="2" fill="#FF8B7B" opacity="0.5" />

      {expression === "happy" && (
        <path
          d="M54 68 Q60 75 66 68"
          stroke="#1F2422"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {expression === "cheer" && <path d="M53 68 Q60 79 67 68 Q60 73 53 68 Z" fill="#1F2422" />}
      {expression === "wink" && (
        <path
          d="M54 68 Q59 74 64 70"
          stroke="#1F2422"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}
