import React from 'react';
import useSway from './hooks/useSway';

export default function Fish({ className = '', style = {}, flip = false, sway = {} }) {
  const defaultSway = { amplitude: 6, speed: 0.6, phase: Math.random() * Math.PI * 2 };
  const swayStyle = useSway({ ...defaultSway, ...sway });

  return (
    <div className={className} style={{ ...style, ...swayStyle }} aria-hidden>
      <svg viewBox="0 0 160 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="fgrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#00bfff" />
            <stop offset="55%" stopColor="#4dd2ff" />
            <stop offset="100%" stopColor="#ff7ab6" />
          </linearGradient>
          <radialGradient id="finGlow" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={flip ? 'scale(-1,1) translate(-160,0)' : undefined} filter="url(#soft)">
          {/* body */}
          <path d="M20 40 C40 22 110 18 136 34 C110 50 40 46 20 40 Z" fill="url(#fgrad)" />

          {/* fin */}
          <path className="tail" d="M80 22 C92 6 110 6 120 18 C100 20 88 26 80 22 Z" fill="url(#finGlow)" opacity="0.7" />

          {/* tail */}
          <path className="tail" d="M136 34 L152 24 L152 44 Z" fill="#ff9fb4" opacity="0.95" />

          {/* gill highlights */}
          <path d="M44 34 Q56 30 44 26" fill="#ffffff" opacity="0.08" />

          {/* eye */}
          <circle cx="46" cy="30" r="4" fill="#021428" />
          <circle cx="44" cy="28" r="1.2" fill="#fff" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}
