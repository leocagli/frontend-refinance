interface ReFinanceLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function ReFinanceLogo({ size = 32, showText = true, className = '' }: ReFinanceLogoProps) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Top-right arc with arrowhead */}
        <path
          d="M18 50 A32 32 0 0 1 82 50"
          stroke="hsl(221 56% 28%)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="85,36 70,38 78,52" fill="hsl(221 56% 28%)" />
        {/* Bottom-left arc with arrowhead */}
        <path
          d="M82 50 A32 32 0 0 1 18 50"
          stroke="hsl(221 56% 28%)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="15,64 30,62 22,48" fill="hsl(221 56% 28%)" />
        {/* 4-point star */}
        <path
          d="M50 30 L53.5 46.5 L70 50 L53.5 53.5 L50 70 L46.5 53.5 L30 50 L46.5 46.5 Z"
          fill="hsl(221 56% 28%)"
        />
      </svg>
      {showText && (
        <span
          className="font-extrabold tracking-tight"
          style={{ color: 'hsl(221 56% 28%)', fontSize: size * 0.65 }}
        >
          Re<span style={{ color: 'hsl(220 15% 10%)' }}>Finance</span>
        </span>
      )}
    </span>
  );
}
