'use client';

import { useEffect, useRef, useState } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// Import các components tabs
import Tab1Gallery from '@/components/tabs/Tab1Gallery';
import Tab2Journey from '@/components/tabs/Tab2Journey';
import Tab3Cinema from '@/components/tabs/Tab3Cinema';
import Tab4Wishes from '@/components/tabs/Tab4Wishes';

// Import các components models 
import CameraController from '@/components/models/CameraController';

// Import các components ocean
import Fish from '@/components/ocean/Fish';
import Jellyfish from '@/components/ocean/Jellyfish';
import Starfish from '@/components/ocean/Starfish';
import Crab from '@/components/ocean/Crab';
import Coral from '@/components/ocean/Coral';
import Bubbles from '@/components/ocean/Bubbles';
import Ripples from '@/components/ocean/Ripples';
import OceanCreatures from '@/components/ocean/OceanCreatures';

// Import các components ui
import LandingScreen from '@/components/ui/LandingScreen';
import ImagePopup from '@/components/ui/ImagePopup';
import SurpriseScreen from '@/components/ui/SurpriseScreen';
import TabNavigation from '@/components/ui/TabNavigation';

// === GIAO DIỆN CHÍNH ===
export default function Home() {
  const [isLanding, setIsLanding] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Bong bóng dâng lên nhộn nhịp xuyên suốt
      gsap.to('.bubble', { y: "-120vh", opacity: 0, duration: 6, repeat: -1, stagger: 0.3 }

      );

      // 2. VỪA VÀO LINK: Toàn bộ trang web giật từ trên cao rơi rớt xuống nước
      gsap.fromTo(pageRef.current,
        { y: "-100vh" },
        { y: "0", duration: 1.5, ease: "power3.inOut" }
      );

      // 3. VỪA CHẠM NƯỚC: Tỏa 5 lớp sóng liên tiếp lan rộng ra
      gsap.fromTo('.ripple',
        { width: 0, height: 0, opacity: 1, borderWidth: "15px" },
        { width: "250vw", height: "250vw", borderWidth: "1px", opacity: 0, duration: 3, stagger: 0.15, ease: "power2.out", delay: 1.0 }
      );

      // 4. VỪA TỎA SÓNG XONG: Cá và sinh vật biển từ 2 bên rìa lao nhanh ra rồi đứng nhấp nhô
      gsap.fromTo('.creature', {
        x: (index, target) => parseFloat(target.style.left) < 50 ? -1500 : 1500,
        opacity: 0
      }, {
        x: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 1.3,
        onComplete: () => {
          // Lao ra vị trí xong thì chốt chặn đứng yên tại chỗ và nhấp nhô nhẹ
          gsap.to('.creature', {
            y: "+=15", rotation: "random(-4, 4)", duration: "random(2, 4)", yoyo: true, repeat: -1, ease: "sine.inOut",
          });
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleNextTab = () => setActiveTab((prev) => (prev + 1) % 4);
  const handlePrevTab = () => setActiveTab((prev) => (prev === 0 ? 3 : prev - 1));

  return (
    <main
      ref={pageRef}
      className="ocean-page relative w-full h-screen overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 0%, #a1eeff 0%, #0c5c9e 35%, #021428 100%)' }}
    >

      {/* --- LỚP 1: BACKGROUND ĐẠI DƯƠNG TĨNH --- */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen">

        {/* Hiệu ứng bong bóng */}
        <Bubbles />

        {/* Hiệu ứng 5 gợn sóng lan tỏa liên tiếp khi rơi chạm nước */}
        <Ripples />

        <OceanCreatures />

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
      <LandingScreen isLanding={isLanding} setIsLanding={setIsLanding} />

      {/* --- LỚP 4: GIAO DIỆN HTML CHO 4 TABS --- */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 text-white transition-opacity duration-1000 ${isLanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

        {/* Tab 1: Welcome (Album Ảnh) */}
        <Tab1Gallery activeTab={activeTab} setSelectedImage={setSelectedImage} />

        {/* Tab 2: Hành trình */}
        <Tab2Journey activeTab={activeTab} />

        {/* Tab 3: Rạp chiếu phim (Đã khôi phục khung YouTube to) */}
        <Tab3Cinema activeTab={activeTab} showSurprise={showSurprise} setShowSurprise={setShowSurprise} />

        {/* Tab 4: Wishes (via Tab4Wishes component) */}
        <div className={`transition-all duration-1000 absolute inset-0 ${activeTab === 3 ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none z-0'}`}>
          <Tab4Wishes isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
        </div>
      </div>


      {/* --- MENU CHUYỂN TAB (Bị ẩn đi khi ở Trang Chủ) --- */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} handlePrevTab={handlePrevTab} handleNextTab={handleNextTab} isLanding={isLanding} />


      {/* DÁN CỤC POPUP VÀO ĐÂY (NẰM BÊN TRONG MAIN) */}
      <ImagePopup selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

      {/* LỚP MÀN HÌNH ĐEN CHE TOÀN BỘ WEB KHI KÍCH HOẠT QUÀ TẶNG */}
      {showSurprise && (
        <div className="surprise-bg opacity-0 fixed inset-0 z-[9999] bg-[#020a14] flex flex-col items-center justify-center overflow-hidden backdrop-blur-3xl">

          <button
            onClick={() => setShowSurprise(false)}
            className="absolute top-6 left-6 z-50 px-5 py-2.5 bg-white/10 backdrop-blur-md border-2 border-[#64d9ff]/50 rounded-full text-[#64d9ff] font-bold hover:bg-[#64d9ff] hover:text-black hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(100,217,255,0.3)]"
          >
            ◀ Quay Lại Rạp
          </button>

          {/* BƯỚC 1: RADAR QUÉT (Concept Bảo vật) */}
          <div className="step-1 absolute flex flex-col items-center px-4 w-full">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#ff99c4] border-t-transparent animate-spin mb-8 shadow-[0_0_30px_#ff99c4]"></div>
            <p className="text-[#64d9ff] text-xl md:text-3xl font-mono animate-pulse tracking-widest text-center leading-relaxed">
              🚨 BÁO ĐỘNG TỪ ĐÁY BIỂN 🚨<br /><br />
              <span className="text-white">Phát hiện một "bảo vật" siêu cấp đáng yêu<br />đang ngồi ngay trước màn hình...</span>
            </p>
          </div>

          {/* BƯỚC 2: BÙNG NỔ LỜI KÊU GỌI (Concept Thủy tề) */}
          <SurpriseScreen showSurprise={showSurprise} setShowSurprise={setShowSurprise} />
        </div>
      )}

    </main>

  );
}