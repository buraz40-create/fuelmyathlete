interface WaterCupProps {
  filled: boolean;
  size?: number;
  className?: string;
}

export function WaterCup({ filled, size = 32, className }: WaterCupProps) {
  const clipId = `cup-clip-${filled ? "f" : "e"}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M10 7 L30 7 L27.5 33 Q27 35 25 35 L15 35 Q13 35 12.5 33 Z" />
        </clipPath>
      </defs>

      <path
        d="M10 7 L30 7 L27.5 33 Q27 35 25 35 L15 35 Q13 35 12.5 33 Z"
        fill="#FFFFFF"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {filled && (
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="0"
            y="13"
            width="40"
            height="22"
            fill="var(--day-rest)"
            opacity="0.95"
          />
          <path
            d="M0 14 Q10 11 20 14 Q30 17 40 14 L40 19 L0 19 Z"
            fill="#FFFFFF"
            opacity="0.4"
          />
        </g>
      )}

      <path
        d="M13 10 L27 10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
