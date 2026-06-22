import React from 'react';

export default function Shell({ className = '', style = {} }) {
  return (
    <div className={className} style={style} aria-hidden>
      <svg viewBox="0 0 80 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="sgrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#ffd1dc" />
            <stop offset="100%" stopColor="#ff9fb4" />
          </linearGradient>
        </defs>
        <g>
          <path d="M40 60 C20 60 12 44 12 36 C12 24 24 20 40 20 C56 20 68 24 68 36 C68 44 60 60 40 60 Z" fill="url(#sgrad)" />
          <path d="M16 42 Q40 18 64 42" stroke="#ff9fb4" strokeWidth="2" fill="none" opacity="0.9" />
          <path d="M22 48 Q40 30 58 48" stroke="#fff" strokeWidth="1" fill="none" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
}
