interface MascotProps {
  size?: number;
  className?: string;
  expression?: "happy" | "cheer" | "wink";
}

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
      <circle cx="60" cy="60" r="48" fill="#FFFFFF" stroke="#1F2422" strokeWidth="3" />

      <path
        d="M60 22 L72 36 L66 52 L54 52 L48 36 Z"
        fill="#1F2422"
        opacity="0.92"
      />
      <path
        d="M22 56 L36 50 L48 56 L44 70 L28 72 Z"
        fill="#1F2422"
        opacity="0.92"
      />
      <path
        d="M98 56 L84 50 L72 56 L76 70 L92 72 Z"
        fill="#1F2422"
        opacity="0.92"
      />
      <path
        d="M40 86 L52 78 L68 78 L80 86 L72 100 L48 100 Z"
        fill="#1F2422"
        opacity="0.92"
      />

      <circle cx="48" cy="62" r="3.5" fill="#FFFFFF" />
      <circle cx="72" cy="62" r="3.5" fill="#FFFFFF" />
      <circle cx="48" cy="62" r="2" fill="#1F2422" />
      {expression === "wink" ? (
        <path d="M68 62 Q72 60 76 62" stroke="#1F2422" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ) : (
        <circle cx="72" cy="62" r="2" fill="#1F2422" />
      )}

      <ellipse cx="42" cy="72" rx="4" ry="2" fill="#FF8B7B" opacity="0.55" />
      <ellipse cx="78" cy="72" rx="4" ry="2" fill="#FF8B7B" opacity="0.55" />

      {expression === "happy" && (
        <path d="M52 70 Q60 78 68 70" stroke="#1F2422" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}
      {expression === "cheer" && (
        <path d="M50 70 Q60 84 70 70 Q60 76 50 70 Z" fill="#1F2422" />
      )}
      {expression === "wink" && (
        <path d="M52 70 Q58 76 64 72" stroke="#1F2422" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
}
