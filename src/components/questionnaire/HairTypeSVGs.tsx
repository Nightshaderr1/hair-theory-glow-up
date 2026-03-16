import React from "react";

interface SVGProps {
  className?: string;
}

// Hair type pattern SVGs
export const StraightHairSVG: React.FC<SVGProps & { variant?: 'A' | 'B' | 'C' }> = ({ className, variant = 'A' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === 'A' && (
      <>
        <line x1="16" y1="8" x2="16" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="8" x2="32" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
    {variant === 'B' && (
      <>
        <line x1="14" y1="8" x2="14" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="8" x2="34" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    {variant === 'C' && (
      <>
        <line x1="12" y1="8" x2="12" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="8" x2="36" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </>
    )}
  </svg>
);

export const WavyHairSVG: React.FC<SVGProps & { variant?: 'A' | 'B' | 'C' }> = ({ className, variant = 'A' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === 'A' && (
      <>
        <path d="M16 8 C16 16, 20 16, 20 24 C20 32, 16 32, 16 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M28 8 C28 16, 32 16, 32 24 C32 32, 28 32, 28 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </>
    )}
    {variant === 'B' && (
      <>
        <path d="M14 8 C14 14, 22 14, 22 20 C22 26, 14 26, 14 32 C14 38, 22 38, 22 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M28 8 C28 14, 36 14, 36 20 C36 26, 28 26, 28 32 C28 38, 36 38, 36 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </>
    )}
    {variant === 'C' && (
      <>
        <path d="M12 6 C12 10, 22 10, 22 16 C22 22, 12 22, 12 28 C12 34, 22 34, 22 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M26 6 C26 10, 36 10, 36 16 C36 22, 26 22, 26 28 C26 34, 36 34, 36 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </>
    )}
  </svg>
);

export const CurlyHairSVG: React.FC<SVGProps & { variant?: 'A' | 'B' | 'C' }> = ({ className, variant = 'A' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === 'A' && (
      <path d="M18 6 C26 8, 26 14, 18 16 C10 18, 10 24, 18 26 C26 28, 26 34, 18 36 C10 38, 14 42, 18 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    )}
    {variant === 'B' && (
      <path d="M20 4 C30 6, 28 12, 20 14 C12 16, 14 22, 20 24 C28 26, 26 32, 20 34 C12 36, 14 42, 20 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    )}
    {variant === 'C' && (
      <path d="M22 4 C32 4, 30 8, 22 10 C14 12, 16 16, 22 18 C30 20, 28 24, 22 26 C14 28, 16 32, 22 34 C30 36, 28 40, 22 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    )}
  </svg>
);

export const VeryСurlyHairSVG: React.FC<SVGProps & { variant?: 'A' | 'B' | 'C' }> = ({ className, variant = 'A' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {variant === 'A' && (
      <path d="M20 4 C28 4, 28 8, 22 10 C16 12, 16 16, 22 18 C28 20, 28 24, 22 26 C16 28, 16 32, 22 34 C28 36, 28 40, 22 42 C16 44, 20 44, 24 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    )}
    {variant === 'B' && (
      <>
        <path d="M18 4 L24 8 L18 12 L24 16 L18 20 L24 24 L18 28 L24 32 L18 36 L24 40 L18 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    )}
    {variant === 'C' && (
      <>
        <path d="M16 4 L22 6 L16 8 L22 10 L16 12 L22 14 L16 16 L22 18 L16 20 L22 22 L16 24 L22 26 L16 28 L22 30 L16 32 L22 34 L16 36 L22 38 L16 40 L22 42 L16 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    )}
  </svg>
);

// Porosity SVG icons
export const LowPorositySVG: React.FC<SVGProps> = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hair strand */}
    <rect x="16" y="4" width="16" height="40" rx="8" stroke="currentColor" strokeWidth="1.5" fill="hsl(var(--muted))" />
    {/* Water droplet sitting on top */}
    <path d="M24 2 C24 2, 20 8, 20 11 C20 13.5, 21.8 15, 24 15 C26.2 15, 28 13.5, 28 11 C28 8, 24 2, 24 2Z" fill="hsl(var(--primary))" opacity="0.6" />
    {/* Arrows bouncing off */}
    <path d="M12 18 L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 16 L12 18 L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M36 18 L32 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36 16 L36 18 L34 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MediumPorositySVG: React.FC<SVGProps> = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hair strand */}
    <rect x="16" y="4" width="16" height="40" rx="8" stroke="currentColor" strokeWidth="1.5" fill="hsl(var(--muted))" />
    {/* Water droplet entering */}
    <path d="M24 10 C24 10, 21 14, 21 16 C21 17.6, 22.3 19, 24 19 C25.7 19, 27 17.6, 27 16 C27 14, 24 10, 24 10Z" fill="hsl(var(--primary))" opacity="0.5" />
    {/* Arrow going in */}
    <path d="M24 2 L24 9" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 7 L24 9 L26 7" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Inner moisture */}
    <circle cx="24" cy="28" r="3" fill="hsl(var(--primary))" opacity="0.3" />
  </svg>
);

export const HighPorositySVG: React.FC<SVGProps> = ({ className }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hair strand with gaps */}
    <rect x="16" y="4" width="16" height="40" rx="8" stroke="currentColor" strokeWidth="1.5" fill="hsl(var(--muted))" strokeDasharray="4 2" />
    {/* Arrows going through both ways */}
    <path d="M10 16 L20 20" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M28 20 L38 16" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 30 L20 26" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M28 26 L38 30" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
    {/* Empty inside indicator */}
    <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.4" />
  </svg>
);

// Slip and slide test illustration
export const SlipTestSVG: React.FC<SVGProps> = ({ className }) => (
  <svg viewBox="0 0 200 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hair strand */}
    <line x1="30" y1="50" x2="170" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
    {/* Fingers */}
    <ellipse cx="110" cy="42" rx="12" ry="8" fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="110" cy="58" rx="12" ry="8" fill="hsl(var(--muted))" stroke="currentColor" strokeWidth="1.5" />
    {/* Direction arrow */}
    <path d="M70 35 L120 35" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
    <path d="M110 30 L120 35 L110 40" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Labels */}
    <text x="170" y="45" fontSize="10" fill="currentColor" textAnchor="end">Rădăcină</text>
    <text x="30" y="45" fontSize="10" fill="currentColor">Vârf</text>
    <text x="100" y="80" fontSize="9" fill="hsl(var(--primary))" textAnchor="middle">Direcția de glisare</text>
  </svg>
);
