'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

function CameraController({ activeTab }) {
  const groupRef = useRef();
  useFrame((state) => {
    const targetRotation = activeTab * (Math.PI / 2);
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05);
    }
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

  const handleNextTab = () => setActiveTab((prev) => (prev + 1) % 4);
  const handlePrevTab = () => setActiveTab((prev) => (prev === 0 ? 3 : prev - 1));

  const checkPasscode = (e) => {
    e.preventDefault();
    if (passcode === '1007') setIsUnlocked(true);
    else alert('Mật khẩu không đúng! Gợi ý: Ngày sinh nhật (1007)');
  };

  return (
    <main ref={pageRef} className="ocean-page relative w-full h-screen overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 0%, #a1eeff 0%, #0c5c9e 35%, #021428 100%)' }}>
      
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