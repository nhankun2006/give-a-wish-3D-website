import React from 'react';

export default function UnderwaterBackground() {
  const fishItems = [
    { left: '5%', top: '20%', cls: 'fish--small swim-right t-fast', delay: 0 },
    { left: '20%', top: '38%', cls: 'fish--large swim-left t-medium', delay: 1.2 },
    { left: '60%', top: '12%', cls: 'fish--small swim-right t-medium', delay: 0.6 },
    { left: '75%', top: '48%', cls: 'fish--small swim-left t-slow', delay: 2.4 },
  ];

  const bubbles = [
    { left: '12%', size: 8, dur: 6, delay: 0 },
    { left: '50%', size: 10, dur: 8, delay: 1 },
    { left: '84%', size: 6, dur: 5, delay: 0.4 },
  ];

  return (
    <div className="underwater-bg" style={{ zIndex: 1 }}>
      {/* Fish */}
      {fishItems.map((f, i) => (
        <div
          key={i}
          className={`fish ${f.cls}`}
          style={{ left: f.left, top: f.top, animationDelay: `${f.delay}s` }}
        >
          <svg viewBox="0 0 120 60" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
            <defs>
              <linearGradient id={`g${i}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#00bfff" />
                <stop offset="100%" stopColor="#ff69b4" />
              </linearGradient>
            </defs>
            <g>
              <ellipse cx="60" cy="30" rx="36" ry="18" fill={`url(#g${i})`} />
              <polygon points="12,30 0,20 0,40" fill="#ffb6c1" opacity="0.9" />
              <circle cx="84" cy="22" r="3" fill="#021428" />
            </g>
          </svg>
        </div>
      ))}

      {/* Corals (left and right) */}
      <div className="coral" style={{ left: '4%' }}>
        <svg viewBox="0 0 160 120" width="100%" height="100%">
          <g fill="#ff69b4">
            <ellipse cx="30" cy="90" rx="18" ry="28" />
            <ellipse cx="60" cy="70" rx="14" ry="24" />
            <ellipse cx="40" cy="60" rx="10" ry="18" />
          </g>
        </svg>
      </div>

      <div className="coral" style={{ right: '6%', left: 'auto', transform: 'scaleX(-1)' }}>
        <svg viewBox="0 0 160 120" width="100%" height="100%">
          <g fill="#8be4ff">
            <ellipse cx="30" cy="90" rx="18" ry="28" />
            <ellipse cx="60" cy="70" rx="14" ry="24" />
            <ellipse cx="40" cy="60" rx="10" ry="18" />
          </g>
        </svg>
      </div>

      {/* Bubbles */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{ left: b.left, width: b.size, height: b.size, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
  );
}
