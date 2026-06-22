import React from 'react';
import useSway from './hooks/useSway';

export default function Crab({ className = '', style = {}, sway = {} }) {
  const defaultSway = { amplitude: 2.5, speed: 0.5, phase: Math.random() * Math.PI * 2 };
  const swayStyle = useSway({ ...defaultSway, ...sway });

  return (
    <div className={className} style={{ ...style, ...swayStyle }} aria-hidden>
      <svg viewBox="0 0 140 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cgrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#ff3b5c" />
          </linearGradient>
        </defs>
        <g>
          <ellipse cx="70" cy="54" rx="44" ry="24" fill="url(#cgrad)" />
          {/* body texture */}
          <path d="M40 52 C45 42 55 38 70 38 C85 38 95 44 100 52" stroke="#ff9a9a" strokeWidth="2" opacity="0.4" fill="none" />
          <path d="M36 60 C48 54 60 52 74 52 C90 52 100 56 108 62" stroke="#ffb3b3" strokeWidth="2" opacity="0.25" fill="none" />

          {/* eyes */}
          <rect x="50" y="28" width="8" height="18" rx="4" fill="#fff" />
          <rect x="82" y="28" width="8" height="18" rx="4" fill="#fff" />
          <circle cx="54" cy="36" r="3" fill="#1b1b1b" />
          <circle cx="86" cy="36" r="3" fill="#1b1b1b" />

          {/* claws */}
          <path d="M18 56 C6 48 10 74 28 70 C36 68 44 62 36 56 Z" fill="#ff7b7b" />
          <path d="M122 56 C134 48 130 74 112 70 C104 68 96 62 104 56 Z" fill="#ff7b7b" />
          <path d="M24 58 C28 52 34 52 38 56" fill="#ffb8bf" opacity="0.55" />
          <path d="M116 58 C112 52 106 52 102 56" fill="#ffb8bf" opacity="0.55" />

          {/* legs */}
          <path d="M46 68 L34 84" stroke="#b33" strokeWidth="4" strokeLinecap="round" />
          <path d="M58 72 L48 88" stroke="#b33" strokeWidth="4" strokeLinecap="round" />
          <path d="M94 68 L106 84" stroke="#b33" strokeWidth="4" strokeLinecap="round" />
          <path d="M82 72 L92 88" stroke="#b33" strokeWidth="4" strokeLinecap="round" />
          <path d="M70 74 L70 90" stroke="#b33" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
