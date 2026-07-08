'use client';
import { useState, useEffect } from 'react';
import gsap from 'gsap';

function SvgDefs() {
  return (
    <svg width="0" height="0"
      style={{ position:'absolute', overflow:'hidden', pointerEvents:'none' }}
      aria-hidden="true">
      <defs>
        <linearGradient id="rg-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f8e070"/>
          <stop offset="30%"  stopColor="#e0a820"/>
          <stop offset="68%"  stopColor="#9a6010"/>
          <stop offset="100%" stopColor="#4a2408"/>
        </linearGradient>
        <linearGradient id="rg-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f5d060"/>
          <stop offset="42%"  stopColor="#d99c20"/>
          <stop offset="100%" stopColor="#3e1c04"/>
        </linearGradient>
        <radialGradient id="rg-hole" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#190900"/>
          <stop offset="100%" stopColor="#0a0300"/>
        </radialGradient>
        <linearGradient id="ch-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7a4225"/>
          <stop offset="42%"  stopColor="#3e200c"/>
          <stop offset="100%" stopColor="#180a02"/>
        </linearGradient>
        <linearGradient id="ch-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#9a562e"/>
          <stop offset="55%"  stopColor="#4e2c12"/>
          <stop offset="100%" stopColor="#2c1608"/>
        </linearGradient>
        <linearGradient id="ch-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#dfa020"/>
          <stop offset="45%"  stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#8c3e0a"/>
        </linearGradient>
        <linearGradient id="ch-lock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fef08a"/>
          <stop offset="48%"  stopColor="#f59e0b"/>
          <stop offset="100%" stopColor="#92400e"/>
        </linearGradient>
        <filter id="link-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0.4" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>
    </svg>
  );
}

function FaceRing({ cx, cy, ox = 9, oy = 5 }) {
  const ix = ox * 0.57, iy = oy * 0.52;
  const op = `M${-ox},0 a${ox},${oy} 0 1,0 ${ox*2},0 a${ox},${oy} 0 1,0 ${-ox*2},0`;
  const ip = `M${-ix},0 a${ix},${iy} 0 1,0 ${ix*2},0 a${ix},${iy} 0 1,0 ${-ix*2},0`;
  return (
    <g transform={`translate(${cx},${cy})`} filter="url(#link-shadow)">
      <path fillRule="evenodd" d={`${op} ${ip}`} fill="url(#rg-top)"/>
      <ellipse cx={0} cy={0} rx={ix} ry={iy} fill="url(#rg-hole)"/>
      <path fillRule="evenodd"
        d={`M${-ox},0 a${ox},${oy*0.45} 0 1,0 ${ox*2},0 a${ox},${oy*0.45} 0 1,0 ${-ox*2},0
            M${-ix},0 a${ix},${iy*0.45} 0 1,0 ${ix*2},0 a${ix},${iy*0.45} 0 1,0 ${-ix*2},0`}
        fill="rgba(255,255,255,0.12)"/>
      <ellipse cx={-1} cy={-oy*0.7} rx={ox*0.55} ry={oy*0.22} fill="rgba(255,255,255,0.50)"/>
      <ellipse cx={-ox*0.55} cy={-oy*0.52} rx={1.6} ry={0.85} fill="rgba(255,255,255,0.92)"/>
      <ellipse cx={0.5} cy={oy*0.62} rx={ox*0.72} ry={oy*0.28} fill="rgba(0,0,0,0.28)"/>
    </g>
  );
}

function EdgeBar({ cx, cy, w = 10, h = 4.2 }) {
  const r = h * 0.48;
  const x = cx - w/2, y = cy - h/2;
  return (
    <g filter="url(#link-shadow)">
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#28120A"/>
      <rect x={x} y={y} width={w} height={h*0.78} rx={r} fill="url(#rg-top)"/>
      <rect x={x+2} y={y+0.5} width={w*0.55} height={1.1} rx={0.55} fill="rgba(255,255,255,0.50)"/>
      <rect x={cx-1.1} y={y+0.7} width={2.2} height={h-1.4} rx={1.1} fill="rgba(0,0,0,0.52)"/>
    </g>
  );
}

function HorizChain({ width }) {
  const STEP = 10;
  const count = Math.round(width / STEP);
  const start = -(count * STEP) / 2 + STEP / 2;

  return (
    <svg
      viewBox={`${-width/2} -9 ${width} 18`}
      width={width} height={18}
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: count }, (_, i) => {
        const cx = start + i * STEP;
        return i % 2 === 0
          ? <EdgeBar  key={i} cx={cx} cy={0} />
          : <FaceRing key={i} cx={cx} cy={0} ox={4.5} oy={7.5} />;
      })}
      <FaceRing cx={start - STEP} cy={0} ox={4} oy={6} />
      <FaceRing cx={-start + STEP} cy={0} ox={4} oy={6} />
    </svg>
  );
}

function TreasureChest({ lidOpen }) {
  return (
    <svg viewBox="0 0 132 108" width="132" height="108" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="66" cy="52" rx="42" ry="4" fill="#fde68a" opacity="0.14"
        style={{ animation:'glow-pulse 2s ease-in-out infinite' }}/>
      {/* BODY */}
      <rect x="7" y="50" width="118" height="56" rx="9"
        fill="url(#ch-body)" stroke="#060201" strokeWidth="1.5"/>
      {[64,72,80,88,96].map((y,i) => (
        <path key={i} d={`M11 ${y} Q66 ${y-3} 121 ${y}`}
          stroke="rgba(0,0,0,.28)" strokeWidth=".85" fill="none"/>
      ))}
      {[18,107].map((x,i) => (
        <rect key={i} x={x} y="50" width="8" height="56" rx="2.5"
          fill="url(#ch-band)" stroke="rgba(0,0,0,.4)" strokeWidth=".5"/>
      ))}
      <rect x="7" y="69" width="118" height="7.5" rx="2" fill="url(#ch-band)"/>
      {[23,40,58,74,92,110].map((x,i) => (
        <g key={i} transform={`translate(${x},72.75)`}>
          <circle r="3.2" fill="#fde68a" stroke="#92400e" strokeWidth=".7"/>
          <ellipse cx={-.9} cy={-.9} rx={1.1} ry={.65} fill="rgba(255,255,255,.7)"/>
        </g>
      ))}
      {[[23,56],[110,56],[23,99],[110,99]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <circle r="2.8" fill="#fbbf24" stroke="#92400e" strokeWidth=".5"/>
          <ellipse cx={-.7} cy={-.7} rx={.9} ry={.55} fill="rgba(255,255,255,.65)"/>
        </g>
      ))}
      {/* LID */}
      <g style={lidOpen
        ? { animation:'lid-open .6s cubic-bezier(.4,0,.2,1) forwards', transformOrigin:'66px 50px' }
        : {}}>
        <rect x="7" y="20" width="118" height="34" rx="6"
          fill="url(#ch-lid)" stroke="#060201" strokeWidth="1.5"/>
        <ellipse cx="66" cy="20" rx="59" ry="13"
          fill="url(#ch-lid)" stroke="#060201" strokeWidth="1.5"/>
        {[27,34,41].map((y,i) => (
          <path key={i} d={`M11 ${y} Q66 ${y-2} 121 ${y}`}
            stroke="rgba(0,0,0,.22)" strokeWidth=".85" fill="none"/>
        ))}
        {[18,107].map((x,i) => (
          <rect key={i} x={x} y="8" width="8" height="46" rx="2.5" fill="url(#ch-band)"/>
        ))}
        <rect x="7" y="38" width="118" height="7" rx="2" fill="url(#ch-band)"/>
        {[23,40,58,74,92,110].map((x,i) => (
          <g key={i} transform={`translate(${x},41.5)`}>
            <circle r="2.8" fill="#fde68a" stroke="#92400e" strokeWidth=".5"/>
            <ellipse cx={-.7} cy={-.7} rx={.9} ry={.55} fill="rgba(255,255,255,.65)"/>
          </g>
        ))}
        <ellipse cx="50" cy="15" rx="30" ry="7" fill="rgba(255,255,255,.11)"/>
        <rect x="7" y="49" width="118" height="3" rx="1.5" fill="#fde68a" opacity=".36"
          style={{ filter:'blur(2.5px)', animation:'glow-pulse 2s ease-in-out infinite' }}/>
      </g>
      {/* LOCK */}
      <g transform="translate(54,40)">
        <rect x="5" y="0" width="13" height="14" rx="6.5"
          stroke="#fde68a" strokeWidth="3" fill="none"
          style={{ filter:'drop-shadow(0 0 4px rgba(251,191,36,.65))' }}/>
        <rect x="0" y="11" width="23" height="16" rx="5"
          fill="url(#ch-lock)" stroke="rgba(0,0,0,.35)" strokeWidth=".5"
          style={{ filter:'drop-shadow(0 4px 6px rgba(0,0,0,.75))' }}/>
        <circle cx="11.5" cy="19" r="3.2" fill="#140800"/>
        <rect x="10.2" y="19" width="2.6" height="5" rx="1.3" fill="#140800"/>
        <ellipse cx="5" cy="13" rx="3.5" ry="1.5" fill="rgba(255,255,255,.38)"/>
      </g>
    </svg>
  );
}

function Particle({ color, top, left, dx, delay, size = 4 }) {
  return (
    <div className="absolute rounded-full pointer-events-none"
      style={{ width:size, height:size, top, left,
        background:color, '--dx':dx,
        animation:`float-up 1.7s ${delay}s ease-out infinite`,
        boxShadow:`0 0 5px ${color}` }}/>
  );
}

export default function SecretLockUI({ setShowSurprise, isLocked, setIsLocked }) {
  const [password,  setPassword]  = useState('');
  const [error,     setError]     = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [lidOpen,   setLidOpen]   = useState(false);
  const [chainsOff, setChainsOff] = useState(false);
  // Lắng nghe sự kiện từ component cha, nếu bị khóa lại (isLocked = true) thì tự reset rương
  useEffect(() => {
    if (isLocked) {
      setLidOpen(false);
      setChainsOff(false);
      setPanelOpen(false);
      setPassword('');
    }
  }, [isLocked]);
  const correctPassword = 'tamtrieu';

  // Bấm vào để đóng rương lại như ban đầu
  const togglePanel = () => {
    if (!lidOpen) {
      setPanelOpen(v => !v);
      setError(false);
    }
  };

  const handleUnlock = () => {
    if (password.toLowerCase() === correctPassword) {
      setChainsOff(true);
      setTimeout(() => setLidOpen(true), 550);
      setTimeout(() => {
        setIsLocked(false); // Báo cho cha biết rương ĐÃ MỞ
        setShowSurprise(true);
        setTimeout(() => {
          gsap.timeline()
            .fromTo('.surprise-bg', { opacity:0 }, { opacity:1, duration:1 })
            .fromTo('.step-1', { opacity:0, scale:.8 }, { opacity:1, scale:1, duration:1 })
            .to('.step-1', { opacity:0, duration:.5, delay:3.5 })
            .fromTo('.step-2', { opacity:0, scale:.2 }, { opacity:1, scale:1, duration:1.5, ease:'elastic.out(1,.3)' });
        }, 150);
      }, 1700);
    } else {
      // (Giữ nguyên logic sai pass...)
      setError(true);
      setPassword('');
      gsap.to('.chest-btn', { x:-9, duration:.07, repeat:7, yoyo:true, ease:'power2.inOut' });
      setTimeout(() => setError(false), 2500);
    }
  };

  const chainStyle = (delay = 0) => chainsOff
    ? { animation: `chain-drop .7s ${delay}s cubic-bezier(.4,0,1,1) forwards` }
    : {};

  return (
    <>
      <SvgDefs />

      <div className="absolute -bottom-0 -right-55 z-50 flex flex-col-reverse items-center">

        {/* CHEST BUTTON */}
        <button
          onClick={isLocked ? undefined : togglePanel}
          className="chest-btn group relative flex flex-col items-center focus:outline-none"
          style={{ cursor: isLocked ? 'not-allowed' : 'pointer', opacity: isLocked ? 0.65 : 1, transition: 'opacity 0.5s' }}
          title={isLocked ? 'Mở lúc 0h ngày 10/7' : lidOpen ? 'Đóng Rương Lại' : 'Kho Báu Bí Mật'}
          suppressHydrationWarning
        >
          {/* Ambient halo */}
          <div className="absolute pointer-events-none"
            style={{
              inset:'-12px', borderRadius:'50%',
              background:'radial-gradient(ellipse at 50% 60%,rgba(251,191,36,.3) 0%,rgba(139,92,246,.12) 55%,transparent 76%)',
              filter:'blur(12px)',
              animation:'glow-pulse 3s ease-in-out infinite',
            }}/>
          {/* God rays */}
          {[0,45,90,135,180,225,270,315].map((deg,i) => (
            <div key={i} className="absolute pointer-events-none"
              style={{
                width:1.5, height:20,
                bottom:'58%', left:'50%',
                transformOrigin:'bottom center',
                transform:`rotate(${deg}deg) translateX(-50%)`,
                background:'linear-gradient(to top,rgba(253,230,138,.4),transparent)',
                animation:`glow-pulse 2.8s ${i*.3}s ease-in-out infinite`,
              }}/>
          ))}

          {/* Chest + Chains container */}
          <div className="relative" style={{ width:132, animation:'bob 3.8s ease-in-out infinite' }}>
            <TreasureChest lidOpen={lidOpen}/>
            {/* CHAIN 1 */}
            <div className="absolute pointer-events-none" style={{ top:32, left:0, ...chainStyle(0) }}>
              <HorizChain width={132}/>
            </div>
            {/* CHAIN 2 */}
            <div className="absolute pointer-events-none" style={{ top:70, left:0, ...chainStyle(0.1) }}>
              <HorizChain width={132}/>
            </div>
            {/* Light burst */}
            {lidOpen && (
              <div className="absolute pointer-events-none" style={{ left:42, top:0, width:56, height:90 }}>
                <div style={{
                  width:'100%', height:'100%',
                  background:'linear-gradient(to top,#fde68a,rgba(251,191,36,.4),transparent)',
                  borderRadius:'50%',
                  filter:'blur(12px)',
                  animation:'light-burst 1.1s .45s ease-out forwards',
                  opacity:0,
                }}/>
              </div>
            )}
          </div>

          {/* Gold dust */}
          <div className="absolute inset-0 pointer-events-none">
            <Particle color="#fde68a" top="14px" left="8px"   dx="-16px" delay={0}    size={4}/>
            <Particle color="#fbbf24" top="28px" left="118px" dx="13px"  delay={0.55} size={5}/>
            <Particle color="#a78bfa" top="6px"  left="64px"  dx="-9px"  delay={1.1}  size={3}/>
            <Particle color="#fb7185" top="46px" left="5px"   dx="11px"  delay={1.6}  size={4}/>
          </div>

        </button>
      </div>
    </>
  );
}