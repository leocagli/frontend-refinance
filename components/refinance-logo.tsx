import Image from 'next/image';

interface ReFinanceLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function ReFinanceLogo({ size = 32, showText = true, className = '' }: ReFinanceLogoProps) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/refinance-logo.png"
        alt="ReFinance logo"
        width={size}
        height={size}
        className="shrink-0 object-contain"
        priority
      />
      {showText && (
        <span
          className="font-extrabold tracking-tight"
          style={{
            fontSize: size * 0.65,
            color: 'hsl(221 56% 28%)',
            fontFamily: '"Plus Jakarta Sans", "Geist", sans-serif',
          }}
        >
          Re<span style={{ color: 'hsl(221 40% 14%)' }}>Finance</span>
        </span>
      )}
    </span>
  );
}
