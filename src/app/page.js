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
    let timeout;
    
    const ctx = gsap.context(() => {
      // Bọc trong setTimeout 100ms để đợi các component con (Ripples, Bubbles...) render ra DOM
      timeout = setTimeout(() => {
        // Nếu pageRef chưa có thì dừng luôn để tránh lỗi rỗng
        if (!pageRef.current) return;

        // 1. Bong bóng (Kiểm tra xem có class .bubble chưa)
        if (document.querySelectorAll('.bubble').length > 0) {
          gsap.to('.bubble', { y: "-120vh", opacity: 0, duration: 6, repeat: -1, stagger: 0.3 });
        }

        // 2. VỪA VÀO LINK: Thay thế hiệu ứng trượt dọc "-100vh" bằng xuất hiện tại chỗ mượt mà
        // 2. VỪA VÀO LINK: Hiệu ứng rơi tự do điện ảnh, chao đảo từ trên cao lao xuống đại dương
        // 2. VỪA VÀO LINK: Xuất hiện nhẹ nhàng, thả mình chìm dần xuống nước một cách xinh xắn
        gsap.fromTo(pageRef.current,
          { 
            y: "-15vh",           // Chỉ lùi lên cao một chút xíu thôi
            scale: 1.05,          // Hơi to ra một tẹo để tạo chiều sâu nhẹ
            opacity: 0,
            filter: "blur(8px)"   // Chỉ mờ sương sương như đang nhìn qua làn nước
          },
          { 
            y: "0", 
            scale: 1, 
            opacity: 1, 
            filter: "blur(0px)",
            duration: 3.5,        // Thời gian vẫn giữ lâu (2.5s) để cảm giác thả trôi chậm rãi
            ease: "sine.inOut",   // Hàm này giúp tốc độ chậm dần rất êm ái khi đáp xuống
            onStart: () => { document.body.style.overflow = "hidden"; }, // Tạm ẩn thanh cuộn khi bắt đầu rơi
            onComplete: () => { document.body.style.overflow = ""; }     // Trả lại bình thường khi rơi xong
          }
        );

        // 4. VỪA TỎA SÓNG XONG
        if (document.querySelectorAll('.creature').length > 0) {
          gsap.fromTo('.creature', {
            x: (index, target) => parseFloat(target.style.left) < 50 ? -1500 : 1500,
            opacity: 0
          }, {
            x: 0, 
            opacity: 1, 
            duration: 1.5, 
            stagger: 0.15, 
            ease: "power2.out", 
            delay: 1.3,
            onComplete: function() {
              const target = this.targets()[0]; 
              
              // Tạo phần tử gợn sóng động
              const ripple = document.createElement('div');
              ripple.className = 'spawn-ripple';
              ripple.style.left = target.style.left;
              ripple.style.top = target.style.top;
              ripple.style.width = target.style.width || '100px';
              ripple.style.height = target.style.width || '100px';
              
              target.parentElement.appendChild(ripple);
              setTimeout(() => ripple.remove(), 1200); // 1.2s xóa để sạch DOM

              // Bơi vào xong thì bồng bềnh
              gsap.to(target, {
                y: "+=15", 
                rotation: "random(-4, 4)", 
                duration: "random(2, 4)", 
                yoyo: true, 
                repeat: -1, 
                ease: "sine.inOut",
              });
            }
          });
        }
      }, 100); // 100ms là đủ để React gắn xong DOM
    }, pageRef);

    return () => {
      clearTimeout(timeout); // Dọn dẹp timeout nếu người dùng tắt trang nhanh
      ctx.revert();
    };
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

      <button
  onClick={() => {
    setIsLanding(true);
    setActiveTab(0);
  }}
  className={`absolute top-5 left-5 z-50 group transition-all duration-500 ${
    isLanding
      ? "opacity-0 -translate-y-10 pointer-events-none"
      : "opacity-100 translate-y-0"
  }`}
>
  <div
    className="
      relative overflow-hidden
      flex items-center gap-3
      px-5 py-2.5
      rounded-full
      border-2 border-[#f7b7cf]
      bg-gradient-to-b
      from-[#d8f8ff]
      via-[#bdeff8]
      to-[#9fe1ee]
      backdrop-blur-xl
      shadow-[0_4px_20px_rgba(255,170,200,.45),inset_0_1px_2px_rgba(255,255,255,.9)]
      transition-all duration-300
      group-hover:scale-105
      group-hover:shadow-[0_0_25px_rgba(255,180,210,.8)]
    "
  >
    {/* ánh sáng mặt kính */}
    <div className="absolute inset-x-3 top-1 h-1/2 rounded-full bg-white/35 blur-md pointer-events-none" />

    {/* bong bóng */}
    <div className="absolute left-8 top-2 w-2 h-2 rounded-full bg-white/70" />
    <div className="absolute right-10 top-3 w-1.5 h-1.5 rounded-full bg-white/60" />
    <div className="absolute right-5 bottom-2 w-2 h-2 rounded-full bg-white/50" />

    {/* icon */}
    <span className="relative z-10 text-2xl group-hover:-translate-y-0.5 transition-transform">
      🐬
    </span>

    {/* text */}
    <span
      className="relative z-10 font-extrabold text-lg md:text-xl tracking-wide"
      style={{
        color: "#4d7080",
        textShadow: `
          0 1px 0 rgba(255,255,255,.95),
          0 0 6px rgba(255,255,255,.8)
        `,
      }}
    >
      Nổi Lên Mặt Nước
    </span>
  </div>
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
        <div className={`transition-all duration-1000 absolute inset-0 ${activeTab === 3 ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 pointer-events-none z-0'}`}>
          <Tab4Wishes isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
        </div>
      </div>


      {/* --- MENU CHUYỂN TAB (Bị ẩn đi khi ở Trang Chủ) --- */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} handlePrevTab={handlePrevTab} handleNextTab={handleNextTab} isLanding={isLanding} />


      {/* DÁN CỤC POPUP VÀO ĐÂY (NẰM BÊN TRONG MAIN) */}
      <ImagePopup
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        images={['IMG_0166.JPG', 'IMG_1008.JPG', 'IMG_1824.JPG', 'IMG_3536.JPG', 'IMG_3779.JPG', 'IMG_4246.JPG', 'IMG_4247.JPG', 'IMG_9281.JPG']} // Truyền mảng hình vào
      />

      {/* LỚP MÀN HÌNH CHE TOÀN BỘ WEB KHI KÍCH HOẠT QUÀ TẶNG (Concept Đại Dương Kute) */}
      {showSurprise && (
        <div 
          className="surprise-bg opacity-0 fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden backdrop-blur-3xl bg-gradient-to-b from-[#0a4669] via-[#071f3a] to-[#010a15]"
        >
          {/* ================= HỆ SINH THÁI NỀN ĐẠI DƯƠNG ================= */}
          {/* Tia sáng chiếu từ mặt nước xuống (God Rays) */}
          <div className="absolute -top-20 left-[10%] w-64 h-[120%] bg-gradient-to-b from-cyan-300/15 to-transparent rotate-[25deg] blur-3xl pointer-events-none"></div>
          <div className="absolute -top-20 right-[15%] w-80 h-[120%] bg-gradient-to-b from-pink-300/10 to-transparent -rotate-[20deg] blur-3xl pointer-events-none"></div>

          {/* Sinh vật biển mờ ảo bơi lội xa xa */}
          <div className="absolute top-[15%] right-[10%] text-6xl animate-[bounce_7s_infinite] opacity-15 blur-[2px] pointer-events-none">🪼</div>
          <div className="absolute bottom-[25%] left-[5%] text-7xl animate-[bounce_9s_infinite] opacity-10 blur-[4px] pointer-events-none scale-x-[-1]">🐟</div>
          
          {/* Rặng san hô phát sáng dưới đáy */}
          <div className="absolute -bottom-10 left-[20%] text-8xl animate-[pulse_5s_infinite] opacity-10 blur-[5px] pointer-events-none">🪸</div>
          <div className="absolute -bottom-12 right-[25%] text-9xl animate-[pulse_6s_infinite] opacity-10 blur-[6px] pointer-events-none">🌿</div>

          {/* Bong bóng lơ lửng & Cầu sáng Ambient */}
          <div className="absolute top-24 left-[15%] text-4xl animate-[bounce_4s_infinite] opacity-40 pointer-events-none drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">🫧</div>
          <div className="absolute bottom-32 right-[20%] text-5xl animate-[bounce_6s_infinite] opacity-30 pointer-events-none drop-shadow-[0_0_15px_rgba(100,217,255,0.5)]">🫧</div>
          <div className="absolute top-1/3 right-[20%] w-64 h-64 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 left-[30%] w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          {/* ================= NỘI DUNG CHÍNH ================= */}

          {/* Nút Quay Lại Vỏ Sò */}
          <button
            onClick={() => setShowSurprise(false)}
            className="absolute top-6 left-6 md:top-10 md:left-10 z-50 px-6 py-2.5 bg-cyan-900/40 backdrop-blur-md border border-cyan-300/40 rounded-full text-cyan-100 font-bold hover:bg-cyan-400/40 hover:text-white hover:scale-105 hover:shadow-[0_0_25px_rgba(100,217,255,0.5)] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <span className="text-lg leading-none -mt-0.5">🐚</span> Quay Lại Rạp
          </button>

          {/* BƯỚC 1: RADAR QUÉT (Nâng cấp thành Sonar Tình Yêu) */}
          <div className="step-1 absolute flex flex-col items-center px-4 w-full z-10">
            
            {/* Cụm Radar Sonar 3D */}
            <div className="relative flex items-center justify-center w-32 h-32 md:w-44 md:h-44 mb-10">
              {/* Sóng âm tỏa ra (Ping) */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-[ping_2.5s_infinite]"></div>
              
              {/* Vòng quét ngoài cùng (Nét đứt màu hồng) */}
              <div className="absolute inset-2 rounded-full border-[4px] border-dashed border-pink-400/80 animate-[spin_4s_linear_infinite]"></div>
              
              {/* Vòng xoay định vị bên trong (Màu cyan) */}
              <div className="absolute inset-6 rounded-full border border-cyan-200/50 animate-[spin_3s_linear_infinite_reverse]"></div>
              
              {/* Lõi bảo vật (Trái tim phát sáng chớp nháy) */}
              <div className="absolute inset-10 md:inset-12 rounded-full bg-gradient-to-br from-pink-300 via-pink-400 to-rose-500 shadow-[0_0_40px_#ff99c4,inset_0_5px_15px_rgba(255,255,255,0.7)] flex items-center justify-center animate-pulse">
                <span className="text-3xl md:text-5xl animate-[bounce_2s_infinite] drop-shadow-md">💖</span>
              </div>
            </div>

            {/* Văn bản báo động có hiệu ứng Glow */}
            <p className="text-cyan-200 text-lg md:text-2xl font-mono tracking-widest text-center leading-loose">
              <span className="animate-pulse inline-block text-pink-400 font-extrabold md:text-3xl mb-4 drop-shadow-[0_0_15px_rgba(255,153,196,0.8)]">
                🚨 BÁO ĐỘNG TỪ ĐÁY BIỂN 🚨
              </span>
              <br />
              <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Phát hiện một "bảo vật" siêu cấp đáng yêu<br />đang ngồi ngay trước màn hình... 🧜‍♀️✨
              </span>
            </p>
          </div>

          {/* BƯỚC 2: BÙNG NỔ LỜI KÊU GỌI (Concept Thủy tề) */}
          <SurpriseScreen showSurprise={showSurprise} setShowSurprise={setShowSurprise} />
          
        </div>
      )}

    </main>

  );
}