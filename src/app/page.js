'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// === CÁC COMPONENT SINH VẬT BIỂN ===
const bubbles = [
  { left: '10%', size: 12 }, { left: '20%', size: 18 }, { left: '30%', size: 10 },
  { left: '54%', size: 14 }, { left: '78%', size: 16 }, { left: '88%', size: 10 },
];

const creatures = [
  { type: 'fish', left: '12%', top: '20%', size: '120px', variant: 'blue' },
  { type: 'fish', left: '68%', top: '15%', size: '96px', variant: 'pink' },
  { type: 'fish', left: '35%', top: '65%', size: '85px', variant: 'blue' },
  { type: 'fish', left: '85%', top: '50%', size: '105px', variant: 'pink' },
  { type: 'jellyfish', left: '25%', top: '40%', size: '100px' },
  { type: 'jellyfish', left: '78%', top: '25%', size: '80px' },
  { type: 'jellyfish', left: '50%', top: '20%', size: '120px' },
  { type: 'starfish', left: '15%', top: '85%', size: '60px' },
  { type: 'starfish', left: '75%', top: '82%', size: '70px' },
  { type: 'crab', left: '30%', top: '88%', size: '65px' },
  { type: 'crab', left: '60%', top: '86%', size: '55px' },
];

function Fish({ style, variant }) {
  const gradient = variant === 'pink' ? ['#ff8db8', '#ffb3d6'] : ['#64d9ff', '#4ae7ff'];
  return (
    <div className="creature" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 140 80" width="100%" height="100%">
        <defs><linearGradient id={`fishGrad${variant}`}><stop offset="0%" stopColor={gradient[0]} /><stop offset="100%" stopColor={gradient[1]} /></linearGradient></defs>
        <path d="M18 36 C34 16 90 14 116 32 C92 50 34 48 18 36 Z" fill={`url(#fishGrad${variant})`} /><path d="M112 30 L132 18 L130 38 Z" fill="#ffd3e8" /><circle cx="38" cy="28" r="4" fill="#021428" />
      </svg>
    </div>
  );
}

function Jellyfish({ style }) {
  return (
    <div className="creature" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 100 120" width="100%" height="100%">
        <path d="M10 60 C10 10 90 10 90 60 Q80 70 70 60 Q60 70 50 60 Q40 70 30 60 Q20 70 10 60 Z" fill="#ffb3d6" opacity="0.8" />
        <path d="M30 60 Q20 90 35 110 M50 60 Q50 90 50 115 M70 60 Q80 90 65 110" stroke="#a1eeff" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Starfish({ style }) {
  return (
    <div className="creature" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="#ff8db8" />
        <circle cx="40" cy="45" r="3" fill="#021428" /><circle cx="60" cy="45" r="3" fill="#021428" />
        <path d="M45 55 Q50 60 55 55" stroke="#021428" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Crab({ style }) {
  return (
    <div className="creature" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <ellipse cx="50" cy="50" rx="30" ry="20" fill="#ff70a6" />
        <path d="M25 40 Q10 20 20 10 M75 40 Q90 20 80 10" stroke="#ff70a6" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="20" cy="10" r="5" fill="#ff70a6" /><circle cx="80" cy="10" r="5" fill="#ff70a6" />
        <circle cx="40" cy="45" r="3" fill="#021428" /><circle cx="60" cy="45" r="3" fill="#021428" />
      </svg>
    </div>
  );
}

function CameraController({ activeTab }) {
  const groupRef = useRef();
  useFrame((state) => {
    const targetRotation = activeTab * (Math.PI / 2);
    if (groupRef.current) groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05);
  });
  return (
    <group ref={groupRef}>
      <perspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <mesh position={[0, 0, -4]}><sphereGeometry args={[1, 32, 32]} /><meshStandardMaterial color="#ff99c4" emissive="#64d9ff" emissiveIntensity={0.2} wireframe opacity={0.3} transparent /></mesh>
    </group>
  );
}

export default function Home() {
  const [isLanding, setIsLanding] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showSurprise, setShowSurprise] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.bubble', { yPercent: -120, opacity: 0, duration: 10, repeat: -1, stagger: 1.2 });
      gsap.to('.creature', { y: "random(-25, 25)", x: "random(-15, 15)", rotation: "random(-8, 8)", duration: "random(5, 8)", yoyo: true, repeat: -1, repeatRefresh: true, ease: "sine.inOut" });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleNextTab = () => setActiveTab((prev) => (prev + 1) % 4);
  const handlePrevTab = () => setActiveTab((prev) => (prev === 0 ? 3 : prev - 1));

  const checkPasscode = (e) => {
    e.preventDefault();
    if (passcode === '1007') setIsUnlocked(true);
    else alert('Mật khẩu không đúng! Gợi ý: Ngày sinh nhật (1007)');
  };

  return (
    <main ref={pageRef} className="ocean-page relative w-full h-screen overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 0%, #a1eeff 0%, #0c5c9e 35%, #021428 100%)' }}>
      
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen">
        {bubbles.map((b, i) => (<div key={i} className="bubble absolute bg-white/30 rounded-full shadow-[0_0_10px_#a1eeff]" style={{ left: b.left, width: b.size, height: b.size, bottom: '-10%' }} />))}
        {creatures.map((item, i) => {
          if (item.type === 'fish') return <Fish key={i} style={{ left: item.left, top: item.top, width: item.size }} variant={item.variant} />;
          if (item.type === 'jellyfish') return <Jellyfish key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
          if (item.type === 'starfish') return <Starfish key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
          if (item.type === 'crab') return <Crab key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
          return null; 
        })}
      </div>

      <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isLanding ? 'opacity-0' : 'opacity-100'}`}>
        <Canvas><ambientLight intensity={0.7} /><directionalLight position={[3, 5, 2]} intensity={0.6} color="#ff99c4" /><directionalLight position={[-3, -5, -2]} intensity={0.4} color="#64d9ff" /><CameraController activeTab={activeTab} /></Canvas>
      </div>

      <button onClick={() => { setIsLanding(true); setActiveTab(0); }} className={`absolute top-6 left-6 z-50 px-5 py-2.5 bg-black/40 backdrop-blur-md border border-[#ff99c4]/50 rounded-full text-[#ff99c4] font-bold hover:bg-[#ff99c4] hover:text-black hover:scale-105 transition-all flex items-center gap-2 ${isLanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="text-xl">🌊</span> Nổi Lên Mặt Nước
      </button>

      <div className={`absolute inset-0 z-40 flex flex-col items-center justify-center transition-all duration-[1500ms] ${isLanding ? 'opacity-100 scale-100' : 'opacity-0 scale-150 pointer-events-none'}`}>
        <h1 className="text-5xl md:text-7xl font-bold text-[#a1eeff] drop-shadow-[0_0_30px_rgba(161,238,255,0.8)] mb-4 text-center">Đại Dương Bất Ngờ</h1>
        <p className="text-xl md:text-2xl text-white font-bold mb-16 drop-shadow-md text-center">Chào mừng đến với thế giới của Tam Triều Dâng</p>
        <button onClick={() => setIsLanding(false)} className="relative group flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm shadow-[0_0_40px_rgba(161,238,255,0.3)] hover:scale-110 transition-all duration-500">
          <div className="absolute inset-0 rounded-full border-[3px] border-[#a1eeff]/50 animate-ping opacity-30"></div>
          <div className="text-center"><span className="block text-4xl mb-2">🌊</span><span className="text-[#a1eeff] font-bold tracking-widest text-sm uppercase group-hover:text-white transition-colors">Lặn Xuống</span></div>
        </button>
      </div>

      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 text-white transition-opacity duration-1000 ${isLanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className={`transition-all duration-1000 absolute w-full max-w-4xl ${activeTab === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <div className="bg-[#021428]/50 backdrop-blur-md p-8 rounded-[2rem] border-2 border-[#a1eeff]/60 text-center mx-auto">
            <h1 className="text-4xl font-bold text-[#a1eeff] mb-2">Góc Nhỏ Của Dâng</h1>
            <p className="text-lg text-white mb-8">Những mảnh ghép kỷ niệm lấp lánh dưới đáy đại dương.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="md:col-span-3 flex justify-center mb-2"><div className="w-40 h-40 bg-gradient-to-tr from-[#64d9ff]/30 to-[#ff99c4]/30 rounded-full flex items-center justify-center border-4 border-[#a1eeff] shadow-lg"><span className="text-[#a1eeff]">[Ảnh Chính]</span></div></div>
              <div className="aspect-[4/3] bg-white/10 rounded-xl border border-[#a1eeff]/50 flex items-center justify-center cursor-pointer"><span>[Hình 1]</span></div>
              <div className="aspect-[4/3] bg-white/10 rounded-xl border border-[#a1eeff]/50 flex items-center justify-center cursor-pointer"><span>[Hình 2]</span></div>
              <div className="aspect-[4/3] bg-white/10 rounded-xl border border-[#a1eeff]/50 flex items-center justify-center cursor-pointer"><span>[Hình 3]</span></div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 absolute ${activeTab === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
          <div className="text-center"><h2 className="text-3xl font-bold text-[#a1eeff] mb-8">Hành Trình Sự Nghiệp</h2><div className="flex gap-6 justify-center">{[2015, 2018, 2021, 2024].map((year) => (<div key={year} className="w-32 h-32 rounded-full border-2 border-[#a1eeff] backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all cursor-pointer"><p className="font-bold text-2xl">{year}</p></div>))}</div></div>
        </div>

        <div className={`transition-all duration-1000 absolute ${activeTab === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          <div className="bg-[#021428]/60 backdrop-blur-xl p-6 rounded-3xl border-2 border-[#a1eeff]/50 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#a1eeff] mb-4">Rạp Chiếu Phim Đại Dương</h2>
            <div className="w-[600px] h-[340px] bg-black/80 rounded-xl flex items-center justify-center mb-6"><span>[Video Lời Chúc]</span></div>
            <button onClick={() => setShowSurprise(true)} className="px-8 py-3 bg-[#a1eeff] text-black rounded-full font-bold">Mở Quà Bất Ngờ! 🎁</button>
          </div>
        </div>

        <div className={`transition-all duration-1000 absolute ${activeTab === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {!isUnlocked ? (
            <form onSubmit={checkPasscode} className="bg-[#021428]/60 backdrop-blur-md p-8 rounded-3xl border-2 border-[#a1eeff]/50 text-center"><h2 className="text-2xl font-bold text-[#a1eeff] mb-4">Khu Vực Cho Fan</h2><input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Nhập Passcode..." className="px-4 py-3 rounded-xl bg-black/40 border border-[#a1eeff] text-white text-center mb-6 block w-full" /><button type="submit" className="px-6 py-3 bg-[#a1eeff] text-black font-bold rounded-xl w-full">Mở Khóa 🔓</button></form>
          ) : (
             <div className="bg-[#021428]/60 backdrop-blur-md p-8 rounded-3xl border-2 border-[#a1eeff]/50 w-[500px]"><h2 className="text-2xl font-bold text-[#a1eeff] mb-6 text-center">Lời Chúc Tới Dâng</h2><textarea placeholder="Viết lời chúc..." className="w-full p-4 rounded-xl bg-black/40 border border-[#a1eeff] text-white mb-4" rows="3" /><button className="px-6 py-3 bg-[#a1eeff] text-black font-bold rounded-xl w-full">Gửi Lời Chúc 💌</button></div>
          )}
        </div>
      </div>

      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-[#a1eeff]/30 transition-all ${isLanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button onClick={handlePrevTab} className="text-[#a1eeff] px-2 font-bold">◀</button>
        {[0, 1, 2, 3].map((tabIndex) => (<button key={tabIndex} onClick={() => setActiveTab(tabIndex)} className={`w-3 h-3 rounded-full transition-all ${activeTab === tabIndex ? 'bg-white scale-150' : 'bg-[#a1eeff]/40'}`} />))}
        <button onClick={handleNextTab} className="text-[#a1eeff] px-2 font-bold">▶</button>
      </div>

    </main>
  );
}