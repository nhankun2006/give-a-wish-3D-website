'use client';

export default function Fish({ style, variant }) {
  const gradient = variant === 'pink' ? ['#ff8db8', '#ffb3d6'] : ['#64d9ff', '#4ae7ff'];
  return (
    <div className="creature creature-fish" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 140 80" width="100%" height="100%">
        <defs>
          <linearGradient id={`fishGrad${variant}`}>
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>
        <path d="M18 36 C34 16 90 14 116 32 C92 50 34 48 18 36 Z" fill={`url(#fishGrad${variant})`} />
        <path d="M112 30 L132 18 L130 38 Z" fill="#ffd3e8" />
        <circle cx="38" cy="28" r="4" fill="#021428" />
      </svg>
    </div>
  );
}