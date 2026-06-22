'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// === CÁC COMPONENT SINH VẬT BIỂN ===
const bubbles = [
  { left: '10%', size: 12, delay: 0, duration: 8 },
  { left: '20%', size: 18, delay: 2.1, duration: 9 },
  { left: '30%', size: 10, delay: 1.2, duration: 7 },
  { left: '54%', size: 14, delay: 0.9, duration: 10 },
  { left: '78%', size: 16, delay: 3.4, duration: 11 },
  { left: '88%', size: 10, delay: 1.7, duration: 8.5 },
];

const creatures = [
  // Đàn cá
  { type: 'fish', left: '12%', top: '20%', size: '120px', variant: 'blue' },
  { type: 'fish', left: '68%', top: '15%', size: '96px', variant: 'pink' },
  { type: 'fish', left: '35%', top: '65%', size: '85px', variant: 'blue' },
  { type: 'fish', left: '85%', top: '50%', size: '105px', variant: 'pink' },
  { type: 'fish', left: '5%', top: '75%', size: '70px', variant: 'pink' },
  
  // Sứa biển
  { type: 'jellyfish', left: '15%', top: '40%', size: '100px' },
  { type: 'jellyfish', left: '90%', top: '25%', size: '80px' },
  { type: 'jellyfish', left: '50%', top: '1%', size: '120px' },
  
  // Sao biển & Cua (Nằm ở đáy)
  { type: 'starfish', left: '15%', top: '85%', size: '60px' },
  { type: 'starfish', left: '75%', top: '82%', size: '70px' },
  { type: 'crab', left: '30%', top: '88%', size: '65px' },
  { type: 'crab', left: '60%', top: '86%', size: '55px' },
];

function Fish({ style, variant }) {
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

function Jellyfish({ style }) {
  return (
    <div className="creature" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 100 120" width="100%" height="100%">
        {/* Thân sứa */}
        <path d="M10 60 C10 10 90 10 90 60 Q80 70 70 60 Q60 70 50 60 Q40 70 30 60 Q20 70 10 60 Z" fill="#ffb3d6" opacity="0.8" />
        {/* Xúc tu */}
        <path d="M30 60 Q20 90 35 110 M50 60 Q50 90 50 115 M70 60 Q80 90 65 110" stroke="#64d9ff" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Starfish({ style }) {
  return (
    <div className="creature" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Thân sao biển */}
        <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="#ff8db8" />
        {/* Mắt và miệng cười */}
        <circle cx="40" cy="45" r="3" fill="#021428" />
        <circle cx="60" cy="45" r="3" fill="#021428" />
        <path d="M45 55 Q50 60 55 55" stroke="#021428" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Crab({ style }) {
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

function Coral({ style }) {
  return (
    <div className="decor decor-coral" style={{ position: 'absolute', ...style }}>
      <svg viewBox="0 0 160 140" width="100%" height="100%">
        <path d="M20 120 Q22 70 40 54 Q55 40 54 18 Q66 16 68 36 Q82 56 76 78 Q90 96 92 120 Z" fill="#ff8db8" />
        <path d="M70 120 Q72 76 84 60 Q96 46 98 24 Q110 22 112 42 Q126 64 118 86 Q132 104 134 128 Z" fill="#ffbad8" />
      </svg>
    </div>
  );
}

// === CAMERA 360 CONTROLLER ===
function CameraController({ activeTab }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    const targetRotation = activeTab * (Math.PI / 2);
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <perspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <mesh position={[0, 0, -4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ff99c4" emissive="#64d9ff" emissiveIntensity={0.2} wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

// === GIAO DIỆN CHÍNH ===
export default function Home() {
  const [isLanding, setIsLanding] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showSurprise, setShowSurprise] = useState(false);
  
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bong bóng nước nổi lên
      gsap.to('.bubble', { yPercent: -120, opacity: 0, duration: 10, repeat: -1, stagger: 1.2 });
      
      // NÂNG CẤP: Sinh vật biển trôi nổi mượt và tự nhiên hơn
      gsap.to('.creature', {
        y: "random(-25, 25)",       // Nhấp nhô lên xuống ngẫu nhiên xa hơn
        x: "random(-15, 15)",       // Trôi nhẹ sang trái phải
        rotation: "random(-8, 8)",  // Lắc lư nghiêng qua lại chút xíu cho cute
        duration: "random(5, 8)",   // Mỗi con bơi một tốc độ khác nhau (5-8 giây)
        yoyo: true,                 // Bơi đi rồi bơi về
        repeat: -1,                 // Lặp lại vô tận
        repeatRefresh: true,        // Tự động tạo hướng bơi mới sau mỗi lần lặp
        ease: "sine.inOut",         // Hiệu ứng mượt, trớn nước êm ái
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleNextTab = () => setActiveTab((prev) => (prev + 1) % 4);
  const handlePrevTab = () => setActiveTab((prev) => (prev === 0 ? 3 : prev - 1));

  const checkPasscode = (e) => {
    e.preventDefault();
    if (passcode === '1007') {
      setIsUnlocked(true);
    } else {
      alert('Mật khẩu không đúng! Gợi ý: Ngày sinh nhật (1007)');
    }
  };

  return (
    <main 
  ref={pageRef} 
  className="ocean-page relative w-full h-screen overflow-hidden"
  style={{ background: 'radial-gradient(circle at 50% 0%, #a1eeff 0%, #0c5c9e 35%, #021428 100%)' }}
>
      
      {/* --- LỚP 1: BACKGROUND ĐẠI DƯƠNG TĨNH --- */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen">
        {bubbles.map((b, i) => (
          <div key={i} className="bubble absolute bg-white/30 rounded-full shadow-[0_0_10px_#64d9ff]" 
               style={{ left: b.left, width: b.size, height: b.size, bottom: '-10%' }} />
        ))}
        {creatures.map((item, i) => {
          if (item.type === 'fish') return <Fish key={i} style={{ left: item.left, top: item.top, width: item.size }} variant={item.variant} />;
          if (item.type === 'jellyfish') return <Jellyfish key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
          if (item.type === 'starfish') return <Starfish key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
          if (item.type === 'crab') return <Crab key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
          return null; 
        })}
        <Coral style={{ left: '5%', bottom: '3%', width: '130px' }} />
        <Coral style={{ right: '8%', bottom: '1%', width: '150px' }} />
      </div>

      {/* --- LỚP 2: KHÔNG GIAN 3D XOAY 360 --- */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isLanding ? 'opacity-0' : 'opacity-100'}`}>
        <Canvas>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 2]} intensity={0.6} color="#ff99c4" />
          <directionalLight position={[-3, -5, -2]} intensity={0.4} color="#64d9ff" />
          <CameraController activeTab={activeTab} />
        </Canvas>
      </div>

      {/* --- NÚT NỔI LÊN MẶT NƯỚC (QUAY LẠI TRANG CHỦ) --- */}
      <button 
        onClick={() => {
          setIsLanding(true);
          setActiveTab(0); // Đưa về Tab 1 để lần lặn sau bắt đầu từ đầu
        }}
        className={`absolute top-6 left-6 z-50 px-5 py-2.5 bg-black/40 backdrop-blur-md border border-[#ff99c4]/50 rounded-full text-[#ff99c4] font-bold hover:bg-[#ff99c4] hover:text-black hover:scale-105 transition-all duration-500 flex items-center gap-2 shadow-[0_0_15px_rgba(255,153,196,0.3)] ${isLanding ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}
      >
        <span className="text-xl">🌊</span> Nổi Lên Mặt Nước
      </button>

      {/* --- LỚP 3: MÀN HÌNH CHỜ (TRANG CHỦ - LANDING PAGE) --- */}
      <div className={`absolute inset-0 z-40 flex flex-col items-center justify-center transition-all duration-[1500ms] ${isLanding ? 'opacity-100 scale-100' : 'opacity-0 scale-150 pointer-events-none'}`}>
        <h1 className="text-5xl md:text-7xl font-bold text-[#ff99c4] drop-shadow-[0_0_30px_rgba(255,153,196,0.8)] mb-4 text-center tracking-wide">
          Đại Dương Bất Ngờ
        </h1>
        <p className="text-xl md:text-2xl text-[#64d9ff] font-bold mb-16 drop-shadow-md text-center">
          Chào mừng đến với thế giới của Tam Triều Dâng
        </p>
        
        {/* Nút Ngọc Trai Kích Hoạt */}
        <button 
          onClick={() => setIsLanding(false)} 
          className="relative group flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm shadow-[0_0_40px_rgba(100,217,255,0.3)] hover:shadow-[0_0_60px_rgba(255,153,196,0.6)] transition-all duration-500 hover:scale-110"
        >
          <div className="absolute inset-0 rounded-full border-[3px] border-[#ff99c4]/50 group-hover:border-[#64d9ff] animate-ping opacity-30"></div>
          <div className="text-center">
            <span className="block text-4xl mb-2">🌊</span>
            <span className="text-white font-bold tracking-widest text-sm uppercase text-[#64d9ff] group-hover:text-[#ff99c4] transition-colors drop-shadow-md">
              Lặn Xuống
            </span>
          </div>
        </button>
      </div>

      {/* --- LỚP 4: GIAO DIỆN HTML CHO 4 TABS --- */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 text-white transition-opacity duration-1000 ${isLanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Tab 1: Welcome (Album Ảnh) */}
        <div className={`transition-all duration-1000 absolute w-full max-w-4xl ${activeTab === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          <div className="bg-[#0a192f]/50 backdrop-blur-md p-8 rounded-[2rem] border-2 border-[#ff99c4]/60 text-center w-full shadow-[0_0_30px_rgba(255,153,196,0.3)] mx-auto">
            <h1 className="text-4xl font-bold text-[#ff99c4] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Góc Nhỏ Của Dâng</h1>
            <p className="text-lg text-[#64d9ff] font-medium mb-8">Những mảnh ghép kỷ niệm lấp lánh dưới đáy đại dương.</p>
            
            {/* Khung chứa các hình ảnh */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {/* Hình Đại Diện Chính */}
              <div className="md:col-span-3 flex justify-center mb-2">
                <div className="w-40 h-40 bg-gradient-to-tr from-[#64d9ff]/30 to-[#ff99c4]/30 rounded-full flex items-center justify-center border-4 border-[#ff99c4] shadow-[0_0_20px_#ff99c4] hover:scale-105 transition-transform overflow-hidden">
                  <span className="text-[#ff99c4] font-semibold text-sm">[Ảnh Chính]</span>
                </div>
              </div>

              {/* 3 Khung hình nhỏ phụ */}
              <div className="aspect-[4/3] bg-white/10 rounded-xl border border-[#64d9ff]/50 flex items-center justify-center hover:scale-105 hover:border-[#ff99c4] transition-all cursor-pointer shadow-md overflow-hidden group">
                 <span className="text-[#64d9ff] text-sm font-medium group-hover:scale-110 transition-transform">[Hình 1]</span>
              </div>
              <div className="aspect-[4/3] bg-white/10 rounded-xl border border-[#64d9ff]/50 flex items-center justify-center hover:scale-105 hover:border-[#ff99c4] transition-all cursor-pointer shadow-md overflow-hidden group">
                 <span className="text-[#64d9ff] text-sm font-medium group-hover:scale-110 transition-transform">[Hình 2]</span>
              </div>
              <div className="aspect-[4/3] bg-white/10 rounded-xl border border-[#64d9ff]/50 flex items-center justify-center hover:scale-105 hover:border-[#ff99c4] transition-all cursor-pointer shadow-md overflow-hidden group">
                 <span className="text-[#64d9ff] text-sm font-medium group-hover:scale-110 transition-transform">[Hình 3]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 2: Hành trình */}
        <div className={`transition-all duration-1000 absolute ${activeTab === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#ff99c4] mb-8 drop-shadow-md">Hành Trình Sự Nghiệp</h2>
            <div className="flex gap-6 justify-center">
              {[2015, 2018, 2021, 2024].map((year) => (
                <div key={year} className="w-32 h-32 rounded-full bg-gradient-to-b from-[#64d9ff]/20 to-[#ff99c4]/20 border-2 border-[#64d9ff] backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:border-[#ff99c4] transition-all cursor-pointer shadow-[0_0_20px_rgba(100,217,255,0.4)]">
                  <p className="font-bold text-2xl text-white drop-shadow-lg">{year}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[#64d9ff] font-medium">(Bấm vào các bong bóng để xem chi tiết)</p>
          </div>
        </div>

        {/* Tab 3: Rạp chiếu phim */}
        <div className={`transition-all duration-1000 absolute ${activeTab === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
          <div className="bg-[#0a192f]/60 backdrop-blur-xl p-6 rounded-3xl border-2 border-[#64d9ff]/50 flex flex-col items-center shadow-[0_0_30px_rgba(100,217,255,0.2)]">
            <h2 className="text-2xl font-bold text-[#64d9ff] mb-4">Rạp Chiếu Phim Đại Dương</h2>
            <div className="w-[600px] h-[340px] bg-black/80 rounded-xl flex items-center justify-center mb-6 border border-[#ff99c4]/30">
               <span className="text-[#ff99c4]/70 font-semibold">[Video Lời Chúc]</span>
            </div>
            {!showSurprise ? (
              <button onClick={() => setShowSurprise(true)} className="px-8 py-3 bg-gradient-to-r from-[#64d9ff] to-[#ff99c4] text-black rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,153,196,0.5)]">
                Mở Quà Bất Ngờ! 🎁
              </button>
            ) : (
              <div className="animate-bounce text-2xl text-[#ff99c4] font-bold drop-shadow-[0_0_10px_rgba(255,153,196,0.8)]">
                🎉 Quà từ Fan! 🎉
              </div>
            )}
          </div>
        </div>

        {/* Tab 4: Passcode */}
        <div className={`transition-all duration-1000 absolute ${activeTab === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {!isUnlocked ? (
            <form onSubmit={checkPasscode} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border-2 border-[#ff99c4]/50 text-center shadow-[0_0_20px_rgba(255,153,196,0.2)]">
              <h2 className="text-2xl font-bold text-[#64d9ff] mb-4 drop-shadow-sm">Khu Vực Dành Riêng Cho Fan</h2>
              <p className="mb-6 text-white font-medium">Nhập mật khẩu để xem thư</p>
              <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Nhập Passcode..." className="px-4 py-3 rounded-xl bg-black/40 border-2 border-[#64d9ff]/50 text-[#ff99c4] focus:border-[#ff99c4] font-bold text-center outline-none mb-6 block w-full transition-colors" />
              <button type="submit" className="px-6 py-3 bg-gradient-to-r from-[#64d9ff] to-[#ff99c4] text-black font-bold rounded-xl w-full hover:scale-105 transition-transform">
                Mở Khóa 🔓
              </button>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border-2 border-[#64d9ff]/50 w-[500px] shadow-[0_0_30px_rgba(100,217,255,0.2)]">
              <h2 className="text-2xl font-bold text-[#64d9ff] mb-6 text-center drop-shadow-sm">Lời Chúc Tới Dâng</h2>
              <textarea placeholder="Viết lời chúc của bạn..." className="w-full p-4 rounded-xl bg-black/40 border-2 border-[#ff99c4]/40 text-white focus:border-[#64d9ff] outline-none mb-4 transition-colors" rows="3" />
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff99c4] to-[#64d9ff] text-black font-bold rounded-xl w-full hover:scale-105 transition-transform">Gửi Lời Chúc 💌</button>
            </div>
          )}
        </div>
      </div>

      {/* --- MENU CHUYỂN TAB (Bị ẩn đi khi ở Trang Chủ) --- */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-[#ff99c4]/30 shadow-lg transition-all duration-1000 ${isLanding ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <button onClick={handlePrevTab} className="text-[#64d9ff] hover:text-[#ff99c4] hover:scale-125 transition-all px-2 font-bold">◀</button>
        {[0, 1, 2, 3].map((tabIndex) => (
          <button 
            key={tabIndex}
            onClick={() => setActiveTab(tabIndex)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTab === tabIndex ? 'bg-[#ff99c4] scale-150 shadow-[0_0_12px_#ff99c4]' : 'bg-[#64d9ff]/40 hover:bg-[#64d9ff]'}`}
          />
        ))}
        <button onClick={handleNextTab} className="text-[#64d9ff] hover:text-[#ff99c4] hover:scale-125 transition-all px-2 font-bold">▶</button>
      </div>

    </main>
  );
}