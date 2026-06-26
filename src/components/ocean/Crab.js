'use client';

export default function Crab({ style }) {
  return (
    <div className="creature" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Thân cua */}
        <ellipse cx="50" cy="50" rx="30" ry="20" fill="#ff70a6" />
        {/* Càng cua */}
        <path d="M25 40 Q10 20 20 10 M75 40 Q90 20 80 10" stroke="#ff70a6" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="20" cy="10" r="5" fill="#ff70a6" />
        <circle cx="80" cy="10" r="5" fill="#ff70a6" />
        {/* Mắt cua */}
        <circle cx="40" cy="45" r="3" fill="#021428" />
        <circle cx="60" cy="45" r="3" fill="#021428" />
      </svg>
    </div>
  );
}