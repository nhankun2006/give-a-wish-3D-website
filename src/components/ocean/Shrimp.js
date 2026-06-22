import React from 'react';
import useSway from './hooks/useSway';

export default function Shrimp({ className = '', style = {}, flip = false, sway = {} }) {
  const defaultSway = { amplitude: 4, speed: 0.9, phase: Math.random() * Math.PI * 2 };
  const swayStyle = useSway({ ...defaultSway, ...sway });

  return (
    <div className={className} style={{ ...style, ...swayStyle }} aria-hidden>
      <svg viewBox="0 0 180 48" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <g transform={flip ? 'scale(-1,1) translate(-180,0)' : undefined}>
          {/* segmented body */}
          <path d="M8 24 C30 6 60 6 86 12 C110 18 132 26 156 18 C168 14 174 26 174 26" stroke="#ffb6c1" strokeWidth="6" fill="none" strokeLinecap="round" />
          <g fill="#ffd0d0">
            <ellipse cx="22" cy="24" rx="10" ry="6" />
            <ellipse cx="46" cy="20" rx="12" ry="6" />
            <ellipse cx="74" cy="22" rx="12" ry="6" />
            <ellipse cx="104" cy="24" rx="12" ry="6" />
            <ellipse cx="134" cy="20" rx="12" ry="6" />
          </g>
          <circle cx="18" cy="22" r="3" fill="#021428" />
        </g>
      </svg>
    </div>
  );
}
