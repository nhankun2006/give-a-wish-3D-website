import React, { useMemo } from 'react';
import Fish from './Fish';
import Crab from './Crab';
import Shrimp from './Shrimp';
import Shell from './Shell';

function randomStyle(left, top, size, duration, delay) {
  return {
    left,
    top,
    width: size,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  };
}

function randomParticle() {
  const left = `${Math.random() * 100}%`;
  const size = `${Math.random() * 6 + 3}px`;
  const delay = `${Math.random() * 3}s`;
  const duration = `${Math.random() * 12 + 8}s`;
  return { left, size, delay, duration, top: `${Math.random() * 70 + 10}%` };
}

export default function OceanScene() {
  const fishes = [
    randomStyle('5%', '18%', '90px', 12, 0),
    randomStyle('22%', '36%', '140px', 18, 2),
    randomStyle('60%', '10%', '80px', 14, 1),
    randomStyle('78%', '46%', '64px', 20, 3)
  ];

  const plankton = useMemo(() => Array.from({ length: 14 }, randomParticle), []);

  return (
    <div style={{position: 'relative', minHeight: '100vh'}}>
      {/* caustics / water ripples overlay */}
      <div className="light-beam" style={{mixBlendMode: 'overlay', opacity: 0.18}}>
        <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
          <filter id="noiseFilter">
            <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="t" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <g filter="url(#noiseFilter)" fill="#8be4ff">
            <ellipse cx="600" cy="120" rx="320" ry="80" opacity="0.12" />
            <ellipse cx="360" cy="80" rx="220" ry="60" opacity="0.08" />
            <ellipse cx="920" cy="140" rx="260" ry="68" opacity="0.06" />
          </g>
        </svg>
      </div>

      {/* drifting plankton particles */}
      {plankton.map((item, index) => (
        <div
          key={index}
          className="plankton"
          style={{ left: item.left, top: item.top, width: item.size, height: item.size, animationDuration: item.duration, animationDelay: item.delay }}
        />
      ))}

      {/* fish */}
      {fishes.map((s, i) => (
        <Fish
          key={i}
          className={`fish ${i % 2 === 0 ? 'swim-right' : 'swim-left'} t-medium`}
          style={{left: s.left, top: s.top, width: s.width, animationDuration: `${12 + i*3}s`, animationDelay: `${s.animationDelay}`}}
          flip={i % 2 === 1}
          sway={{ amplitude: 8, speed: 0.5, phase: i }}
        />
      ))}

      {/* shrimp */}
      <Shrimp className="shrimp swim-right t-fast" style={{left: '12%', top: '70%', width: '84px', animationDuration: '10s', animationDelay: '0s'}} sway={{ amplitude: 4, speed: 0.9 }} />
      <Shrimp className="shrimp swim-left t-medium" flip style={{left: '72%', top: '78%', width: '96px', animationDuration: '14s', animationDelay: '1.2s'}} sway={{ amplitude: 4, speed: 1.1 }} />

      {/* seabed elements */}
      <div className="seabed"/>

      <Shell className="shell" style={{left: '18%'}} />
      <Crab className="crab" style={{left: '32%'}} sway={{ amplitude: 2.5, speed: 0.5 }} />
      <Shell className="shell" style={{right: '14%', left: 'auto'}} />

      {/* many small bubbles decorative */}
      <div aria-hidden>
        <div className="bubble" style={{left: '10%', bottom: '26%', animationDuration: '6s'}} />
        <div className="bubble t-delay-1" style={{left: '45%', bottom: '30%', animationDuration: '8s'}} />
        <div className="bubble t-delay-2" style={{left: '80%', bottom: '28%', animationDuration: '7s'}} />
      </div>
    </div>
  );
}
