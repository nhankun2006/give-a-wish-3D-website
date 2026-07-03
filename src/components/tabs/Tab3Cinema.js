'use client';

import gsap from 'gsap';
import { useState } from 'react';

export default function Tab3Cinema({ activeTab, showSurprise, setShowSurprise }) {
  
  const [openCurtain, setOpenCurtain] = useState(false);
  
  return (
    /* LỚP 1: NỀN FULL MÀN HÌNH - Bổ sung 'inset-0' và màu nền đại dương kẹo ngọt che kín trang chủ */
    <div
      // Thay thế className và style của LỚP 1 thành:
className={`transition-all duration-1000 absolute inset-0 flex items-center justify-center overflow-hidden ${activeTab === 2 ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none z-0'}`}
// Thay thế style của thẻ div ngoài cùng bằng đoạn này:
style={{
  background: `
    radial-gradient(circle at 18% 20%, rgba(255,255,255,.3) 0%, rgba(255,255,255,0) 25%),
    radial-gradient(circle at 80% 80%, rgba(255,240,180,.2) 0%, rgba(255,240,180,0) 30%),
    linear-gradient(
      180deg,
      #4fd1ff 0%,
      #1d7fc4 15%,
      #174a87 35%,
      #103564 55%,
      #0b2345 75%,
      #07162d 90%,
      #030913 100%
    )
  `
}}
    >

<div className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 w-36 md:w-44 pointer-events-none animate-float">
  <svg
    viewBox="0 0 320 180"
    className="w-full drop-shadow-[0_8px_20px_rgba(0,180,255,0.35)]"
  >
    <defs>
      <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>

      <linearGradient id="tower" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>

    {/* Body */}
    <rect
      x="45"
      y="65"
      width="180"
      height="55"
      rx="28"
      fill="url(#body)"
    />

    {/* Nose */}
    <ellipse
      cx="225"
      cy="92"
      rx="35"
      ry="27"
      fill="#0ea5e9"
    />

    {/* Tail */}
    <polygon
      points="45,92 18,72 18,112"
      fill="#0284c7"
    />

    {/* Tail fin */}
    <polygon
      points="20,92 0,55 10,92 0,130"
      fill="#0369a1"
    />

    {/* Top fin */}
    <polygon
      points="70,65 90,40 110,65"
      fill="#0369a1"
    />

    {/* Tower */}
    <rect
      x="105"
      y="30"
      width="35"
      height="40"
      rx="8"
      fill="url(#tower)"
    />

    {/* Periscope */}
    <path
      d="M122 30 V12 H145"
      stroke="#94a3b8"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />

    {/* Windows */}
    <circle cx="95" cy="92" r="10" fill="#dbeafe" stroke="#475569" strokeWidth="3"/>
    <circle cx="130" cy="92" r="10" fill="#dbeafe" stroke="#475569" strokeWidth="3"/>
    <circle cx="165" cy="92" r="10" fill="#dbeafe" stroke="#475569" strokeWidth="3"/>

    {/* Front light */}
    <circle cx="255" cy="92" r="6" fill="#fde68a"/>
    <ellipse
      cx="292"
      cy="92"
      rx="28"
      ry="12"
      fill="#fde68a55"
    />

    

    {/* Highlight */}
    <path
      d="M70 76 Q140 58 205 74"
      stroke="rgba(255,255,255,.45)"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
</div>



      {/* LỚP 2: NỘI DUNG - Giữ nguyên hiệu ứng scale to/nhỏ của bạn */}
      <div className={`transition-transform duration-1000 w-full max-w-5xl px-4 ${activeTab === 2 ? 'scale-100' : 'scale-110'}`}>
        <div className="
relative
bg-[#0a192f]/60
backdrop-blur-2xl
rounded-[48px]
border-[3px]
border-[#64ffda]/30
p-4 sm:p-5 md:p-8
w-[92%]
md:w-[95%]
mx-auto
shadow-[0_0_50px_rgba(100,255,218,.15)]
overflow-visible
">

{/* ================= CHI TIẾT TRANG TRÍ NỀN ĐẠI DƯƠNG (LỚP 1) ================= */}
      
      

      


      {/* ================= KẾT THÚC TRANG TRÍ NỀN ================= */}






          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

          <div
  className={`absolute top-10 -right-48 md:-right-64 z-30 flex flex-col items-center ${showSurprise ? "hidden" : ""}`}
>
            <div className="animate-bounce flex flex-col items-center mb-1">
              <span
                className="
px-4
py-2
rounded-full
bg-white/20
backdrop-blur-lg
border
border-white/30
text-white
font-bold
shadow-lg
"
              >
                Post! Em ở đây nè! 🎁
              </span>
              <span className="text-3xl drop-shadow-md mt-1">⬇️</span>
            </div>


            <button
              onClick={() => {
                setShowSurprise(true);
                setTimeout(() => {
                  const tl = gsap.timeline();
                  tl.fromTo('.surprise-bg', { opacity: 0 }, { opacity: 1, duration: 1 })
                    .fromTo('.step-1', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
                    .to('.step-1', { opacity: 0, duration: 0.5, delay: 3.5 })
                    .fromTo('.step-2', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" });
                }, 150);
              }}
              // Sửa className của div bọc nội dung (div ngay sau tấm kính mờ backdrop-blur-2xl)
// Sửa className của div bọc nút "Trạm Bí Mật":
className="
  relative
  bg-gradient-to-r from-[#ff99c4]/80 to-[#64d9ff]/80
  backdrop-blur-md
  rounded-full
  border-[3px] border-white/50
  px-8 py-4
  text-white font-black text-xl tracking-wide
  shadow-[0_10px_25px_rgba(255,153,196,0.5),inset_0_4px_10px_rgba(255,255,255,0.6)]
  overflow-visible
  hover:scale-105 transition-transform duration-300
"
            >
              Trạm Bí Mật! 🎁
            </button>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-5 md:mb-8 tracking-wide"
            style={{
              color: "#e6f1ff",
              textShadow: `
0 0 10px rgba(100,255,218,.6),
0 0 20px rgba(100,255,218,.4),
0 4px 10px rgba(0,0,0,.5)
`
            }}
          >
            Đại Dương Ánh Sáng
            <span className="inline-block animate-bounce ml-2" style={{ animationDuration: '3s' }}></span>
          </h2>

{/* Đinh tán ngọc trai phát sáng 4 góc */}
<div className="absolute top-4 left-6 flex space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#64ffda]"></span><span className="w-2.5 h-2.5 rounded-full bg-pink-300 shadow-[0_0_8px_#ffc4df]"></span></div>
<div className="absolute top-4 right-6 flex space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-pink-300 shadow-[0_0_8px_#ffc4df]"></span><span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#64ffda]"></span></div>
<div className="absolute bottom-4 left-6 flex space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#64ffda]"></span><span className="w-2.5 h-2.5 rounded-full bg-pink-300 shadow-[0_0_8px_#ffc4df]"></span></div>
<div className="absolute bottom-4 right-6 flex space-x-2"><span className="w-2.5 h-2.5 rounded-full bg-pink-300 shadow-[0_0_8px_#ffc4df]"></span><span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#64ffda]"></span></div>




          <div // Sửa className của khung bọc <iframe>
            className="
              relative
              w-full
              aspect-video
              rounded-[36px]
              bg-[#01060f]
              border-[12px] border-[#253346]
              overflow-hidden
              shadow-[0_0_0_4px_rgba(0,0,0,0.5),inset_0_0_40px_rgba(0,0,0,1),0_20px_50px_rgba(0,0,0,0.8)]
            "
          >
            {/* ================= BẮT ĐẦU: RÈM BONG BÓNG ĐẠI DƯƠNG (BẢN ĐẶC BIỆT) ================= */}
            <div 
              className={`absolute inset-0 z-20 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-[1500ms] ${openCurtain ? 'pointer-events-none' : ''}`}
              onClick={() => setOpenCurtain(true)}
            >
              {/* Rèm Trái (Nước biển lấp lánh) */}
              <div className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-cyan-300 via-blue-400 to-sky-500 border-r-[6px] border-white/60 transition-transform duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left shadow-[10px_0_30px_rgba(34,211,238,0.6)] flex items-center justify-end overflow-hidden ${openCurtain ? '-translate-x-full' : 'translate-x-0'}`}>
                
                {/* Cụm bong bóng thủy tinh (Trái) */}
                <div className="absolute top-10 left-8 animate-[bounce_4s_infinite] flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-[1.5px] border-white/70 bg-gradient-to-tr from-white/5 to-white/40 backdrop-blur-[2px] shadow-[inset_0_0_12px_rgba(255,255,255,0.9),0_4px_6px_rgba(0,0,0,0.1)] relative">
                    <div className="absolute top-1 left-2 w-3 h-1.5 bg-white/80 rounded-full rotate-[30deg]"></div>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-white/60 bg-gradient-to-tr from-white/5 to-white/30 backdrop-blur-[1px] shadow-[inset_0_0_8px_rgba(255,255,255,0.8)] -mt-2 ml-8 relative"></div>
                </div>

                {/* Bé Sứa Chibi (SVG) */}
                <div className="absolute bottom-1/4 left-1/4 animate-[pulse_3s_infinite] drop-shadow-[0_5px_15px_rgba(255,153,200,0.5)]">
                  <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Thân sứa */}
                    <path d="M20 50 C20 15, 80 15, 80 50" fill="url(#jelly-grad)" opacity="0.9"/>
                    <path d="M20 50 Q50 62 80 50" fill="url(#jelly-grad)"/>
                    {/* Khuôn mặt dễ thương */}
                    <circle cx="36" cy="40" r="5" fill="#1e1b4b"/>
                    <circle cx="64" cy="40" r="5" fill="#1e1b4b"/>
                    <circle cx="34" cy="38" r="2" fill="#ffffff"/>
                    <circle cx="62" cy="38" r="2" fill="#ffffff"/>
                    {/* Má hồng */}
                    <ellipse cx="26" cy="46" rx="5" ry="2.5" fill="#f472b6" opacity="0.8"/>
                    <ellipse cx="74" cy="46" rx="5" ry="2.5" fill="#f472b6" opacity="0.8"/>
                    {/* Xúc tu */}
                    <path d="M30 55 Q20 75 35 90" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" fill="none"/>
                    <path d="M50 58 Q40 85 55 95" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" fill="none"/>
                    <path d="M70 55 Q80 75 65 90" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" fill="none"/>
                    <defs>
                      <linearGradient id="jelly-grad" x1="50" y1="15" x2="50" y2="60">
                        <stop offset="0%" stopColor="#fdf4ff"/>
                        <stop offset="40%" stopColor="#fbcfe8"/>
                        <stop offset="100%" stopColor="#818cf8"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Viền sáng phản quang */}
                <div className="w-3 h-full bg-gradient-to-b from-white/10 to-white/50 blur-[2px] absolute right-1"></div>
              </div>
              
              {/* Rèm Phải (Nước biển lấp lánh) */}
              <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-cyan-300 via-blue-400 to-sky-500 border-l-[6px] border-white/60 transition-transform duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-right shadow-[-10px_0_30px_rgba(34,211,238,0.6)] flex items-center justify-start overflow-hidden ${openCurtain ? 'translate-x-full' : 'translate-x-0'}`}>
                
                {/* Cụm bong bóng thủy tinh (Phải) */}
                <div className="absolute bottom-16 right-12 animate-[bounce_3.5s_infinite]">
                  <div className="w-8 h-8 rounded-full border-[1.5px] border-white/70 bg-gradient-to-bl from-white/5 to-white/40 backdrop-blur-[2px] shadow-[inset_0_0_10px_rgba(255,255,255,0.9)] relative">
                     <div className="absolute top-1 right-1.5 w-2.5 h-1 bg-white/80 rounded-full -rotate-[30deg]"></div>
                  </div>
                </div>

                {/* Bé Sao Biển Chibi (SVG) */}
                <div className="absolute top-1/4 right-1/4 animate-[bounce_5s_infinite] drop-shadow-[0_8px_10px_rgba(0,0,0,0.2)]">
                  <svg width="65" height="65" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ngôi sao */}
                    <path d="M50 8 L62 38 L94 40 L69 60 L78 90 L50 72 L22 90 L31 60 L6 40 L38 38 Z" fill="url(#star-grad)" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round"/>
                    {/* Họa tiết đốm trên sao biển */}
                    <circle cx="50" cy="22" r="2.5" fill="#fde047"/>
                    <circle cx="75" cy="45" r="2" fill="#fde047"/>
                    <circle cx="25" cy="45" r="2" fill="#fde047"/>
                    <circle cx="68" cy="75" r="2" fill="#fde047"/>
                    <circle cx="32" cy="75" r="2" fill="#fde047"/>
                    {/* Khuôn mặt */}
                    <circle cx="41" cy="50" r="4" fill="#292524"/>
                    <circle cx="59" cy="50" r="4" fill="#292524"/>
                    <circle cx="39" cy="48" r="1.5" fill="#ffffff"/>
                    <circle cx="57" cy="48" r="1.5" fill="#ffffff"/>
                    {/* Miệng cười */}
                    <path d="M46 56 Q50 61 54 56" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    {/* Má hồng */}
                    <ellipse cx="33" cy="54" rx="4" ry="2" fill="#ef4444" opacity="0.6"/>
                    <ellipse cx="67" cy="54" rx="4" ry="2" fill="#ef4444" opacity="0.6"/>
                    <defs>
                      <linearGradient id="star-grad" x1="50" y1="8" x2="50" y2="90">
                        <stop offset="0%" stopColor="#fef08a"/>
                        <stop offset="100%" stopColor="#eab308"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Viền sáng phản quang */}
                <div className="w-3 h-full bg-gradient-to-b from-white/10 to-white/50 blur-[2px] absolute left-1"></div>
              </div>

              {/* Chiếc nơ Ngọc Trai Nàng Tiên Cá */}
              <div className={`relative z-30 transition-all duration-1000 ease-in-out flex flex-col items-center ${openCurtain ? 'opacity-0 scale-50 -translate-y-12' : 'opacity-100 scale-100 hover:scale-110 hover:-translate-y-2'}`}>
                
                {/* Hình thù chiếc nơ */}
                <div className="flex items-center justify-center animate-[pulse_2.5s_infinite]">
                  {/* Cánh nơ trái (Màu hồng kẹo ngọt) */}
                  <div className="w-0 h-0 border-y-[24px] border-y-transparent border-r-[44px] border-r-pink-300 drop-shadow-[0_0_15px_rgba(253,164,175,0.9)]"></div>
                  
                  {/* Hạt ngọc trai khổng lồ ở giữa */}
                  <div className="w-14 h-14 bg-[radial-gradient(circle_at_30%_30%,_#ffffff,_#fbcfe8,_#f472b6)] rounded-full border-2 border-white/80 shadow-[0_0_25px_rgba(255,255,255,0.9),inset_-4px_-4px_8px_rgba(0,0,0,0.15)] z-10 -mx-3 flex items-center justify-center text-pink-700 font-black text-sm tracking-wider">
                    WOW
                  </div>
                  
                  {/* Cánh nơ phải (Màu hồng kẹo ngọt) */}
                  <div className="w-0 h-0 border-y-[24px] border-y-transparent border-l-[44px] border-l-pink-300 drop-shadow-[0_0_15px_rgba(253,164,175,0.9)]"></div>
                </div>

                {/* Chữ hướng dẫn kute bong bóng */}
                <span className="mt-5 text-cyan-900 font-extrabold tracking-widest text-sm bg-white/50 px-6 py-2 rounded-full backdrop-blur-md border-[2px] border-white/70 shadow-[0_5px_15px_rgba(34,211,238,0.5),inset_0_0_8px_rgba(255,255,255,1)]">
                  MỞ RÈM ĐẠI DƯƠNG 🌊
                </span>
              </div>
            </div>
            {/* ================= KẾT THÚC: RÈM BONG BÓNG ĐẠI DƯƠNG (BẢN ĐẶC BIỆT) ================= */}






            <iframe
              className="absolute top-0 left-0 w-full h-full z-10"
              src="https://www.youtube.com/embed/8sVtL0o-v7U"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            
          </div>



        </div>
      </div>




      {/* VỊ TRÍ 3: TRẠM SẠC SỨA BIỂN BIOMIMETIC (Ý TƯỞNG MỚI ĐỘC LẠ & KUTE)        */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 left-6 z-40 pointer-events-none filter drop-shadow-[0_10px_20px_rgba(0,180,255,0.4)]">
        
        {/* Vòng tròn năng lượng phát sáng dưới đáy trạm sạc */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-cyan-500/20 rounded-full blur-[4px] border border-cyan-400/30 animate-pulse"></div>

        {/* THÂN CHÚ SỨA ROBOT CHIBI */}
        <div className="relative w-24 h-32 flex flex-col items-center animate-[bounce_4s_infinite_ease-in-out]">
          
          {/* Mũ sứa bong bóng trong suốt pha Neon hồng/xanh */}
          <div className="w-20 h-14 bg-gradient-to-b from-cyan-300/40 via-pink-400/30 to-cyan-400/60 rounded-t-[40px] border-2 border-white/40 shadow-[inset_0_4px_12px_rgba(255,255,255,0.6),0_0_20px_rgba(34,211,238,0.3)] relative overflow-hidden backdrop-blur-[1px]">
            {/* Vệt bóng kính bóng bẩy trên mũ sứa */}
            <div className="w-6 h-2 bg-white/50 rounded-full absolute top-2 left-4 rotate-[15deg]"></div>
            
            {/* Đèn mắt điện tử Chibi siêu kute bên trong mũ sứa */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
              <span className="w-2 h-2 rounded-full bg-cyan-200 shadow-[0_0_8px_#64ffda] animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-cyan-200 shadow-[0_0_8px_#64ffda] animate-ping" style={{ animationDelay: '0.3s' }}></span>
            </div>
            
            {/* Lõi pin năng lượng hạt nhân kute quay tròn bên trong */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-dashed border-white/30 animate-spin" style={{ animationDuration: '6s' }}></div>
          </div>

          {/* ĐẾ CẮM CÁP SẠC BIỂN SÂU (Nối mũ sứa với xúc tu) */}
          <div className="w-12 h-3 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 rounded-full border border-black/30 shadow-md -mt-0.5 relative z-10">
            <div className="w-2 h-1 bg-yellow-400 mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* CÁC XÚC TU CÁP SẠC PHÁT SÁNG ĐU ĐƯA */}
          <div className="flex space-x-1.5 -mt-1 justify-center w-full">
            {/* Dây sạc 1 */}
            <div className="w-1.5 h-14 bg-gradient-to-b from-cyan-400 via-emerald-400 to-transparent rounded-full opacity-90 origin-top animate-[pulse_2s_infinite_ease-in-out] transform -rotate-12"></div>
            
            {/* Dây sạc chính giữa - uốn lượn kute */}
            <div className="w-2 h-16 bg-gradient-to-b from-pink-400 via-purple-400 to-transparent rounded-full opacity-95 origin-top animate-[bounce_3s_infinite_ease-in-out] relative">
              {/* Đầu hạt năng lượng chạy dọc dây sạc */}
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-4 left-0.5 shadow-[0_0_8px_#fff]"></div>
            </div>
            
            {/* Dây sạc 3 */}
            <div className="w-1.5 h-12 bg-gradient-to-b from-cyan-400 via-blue-400 to-transparent rounded-full opacity-85 origin-top animate-[pulse_2.5s_infinite_ease-in-out] transform rotate-12"></div>
          </div>

        </div>

        {/* Bong bóng năng lượng li ti bay lên từ trạm sạc */}
        <div className="absolute -top-6 left-4 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#64ffda] animate-ping"></div>
        <div className="absolute -top-10 right-4 w-2 h-2 rounded-full bg-pink-300 shadow-[0_0_6px_#ff99c8] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>


{/* RƯƠNG KHO BÁU ĐÁY BIỂN (Bản Dark & Glow Mạnh Hơn) */}
<div className="absolute bottom-4 right-12 z-40 pointer-events-none filter drop-shadow-[0_25px_35px_rgba(0,10,30,0.85)] hover:-translate-y-2 hover:scale-110 transition-all duration-700 ease-out flex flex-col items-center">
  
  {/* Ánh sáng ma thuật (Caustic Glow) - Tâm sáng rực rỡ hơn */}
  <div className="absolute -top-32 -left-20 w-72 h-72 bg-[radial-gradient(circle,_rgba(253,224,71,0.4)_0%,_rgba(134,239,172,0.25)_30%,_rgba(192,132,252,0.1)_60%,_transparent_80%)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
  
  {/* Tia sáng kho báu hắt lên (God rays) - Sáng và sắc nét hơn */}
  <div className="absolute -top-24 left-2 w-32 h-40 bg-gradient-to-t from-yellow-300/60 via-cyan-200/20 to-transparent blur-md transform -rotate-12 rounded-t-full z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>

  {/* Lớp cát biển (3D Sand bed) */}
  <div className="absolute -bottom-6 -left-12 w-56 h-16 bg-[radial-gradient(ellipse_at_center,_rgba(20,83,45,0.8)_0%,_rgba(2,6,23,0.95)_70%,_transparent_100%)] rounded-[100%] blur-[5px] z-30 shadow-[0_10px_20px_rgba(0,0,0,0.7)]"></div>

  {/* THÂN RƯƠNG (Gỗ 3D: Tone màu đậm hơn, cổ kính hơn) */}
  <div className="relative w-32 h-20 bg-gradient-to-b from-[#4a2e1b] via-[#2d1a0e] to-[#0a0502] rounded-b-[24px] border-b-[4px] border-[#050201] shadow-[inset_0_5px_12px_rgba(255,255,255,0.05),inset_0_-10px_20px_rgba(0,0,0,0.95)] flex flex-col items-center">
    
    {/* NẮP RƯƠNG MỞ HÉ (Tone đậm) */}
    <div className="absolute -top-11 left-0 w-32 h-14 bg-gradient-to-b from-[#5c3a21] via-[#3d2414] to-[#1a0f08] rounded-t-[26px] border-t-[2px] border-[#8c5a35] transform -rotate-[22deg] origin-bottom-left shadow-[8px_20px_30px_rgba(0,0,0,0.95),inset_0_-5px_12px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1)] overflow-hidden z-20">
      
      {/* Đai viền nắp rương (Kim loại đồng xỉn màu) */}
      <div className="absolute top-0 left-0 w-3.5 h-full bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#78350f] shadow-[inset_-3px_0_5px_rgba(0,0,0,0.8),inset_2px_0_5px_rgba(255,255,255,0.4)]"></div>
      <div className="absolute top-0 right-0 w-3.5 h-full bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#78350f] shadow-[inset_-3px_0_5px_rgba(0,0,0,0.8),inset_2px_0_5px_rgba(255,255,255,0.4)]"></div>
      
      {/* Rêu xanh */}
      <div className="absolute top-0 left-4 w-4 h-6 bg-gradient-to-br from-[#10b981] via-[#047857] to-[#022c22] rounded-b-full shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_1px_1px_2px_rgba(255,255,255,0.2)] opacity-95"></div>
      <div className="absolute top-0 right-6 w-3 h-4.5 bg-gradient-to-br from-[#059669] to-[#064e3b] rounded-b-full shadow-[0_3px_6px_rgba(0,0,0,0.7)]"></div>
    </div>
    
    {/* NÚI VÀNG & NGỌC QUÝ (Bản Nâng Cấp: Thêm tương tác Hover) */}
<div className="absolute -top-5 z-10 flex h-12 w-[114px] items-end justify-around rounded-t-[30px] border-t border-yellow-200/60 bg-gradient-to-b from-[#fef08a] via-[#eab308] to-[#854d0e] px-2 pb-2 shadow-[0_-15px_50px_rgba(253,224,71,0.8),inset_0_5px_15px_rgba(255,255,255,0.9),inset_0_-4px_10px_rgba(0,0,0,0.7)] group">
  
  {/* Ngọc trai hồng (Hover: Phình to & Sáng lên) */}
  <div className="h-6 w-6 animate-bounce cursor-pointer rounded-full bg-[radial-gradient(circle_at_35%_35%,_#ffffff_0%,_#fbcfe8_30%,_#be185d_90%)] shadow-[0_0_30px_rgba(244,114,182,1),0_0_10px_rgba(244,114,182,0.8),inset_-4px_-4px_8px_rgba(0,0,0,0.4),inset_2px_2px_4px_rgba(255,255,255,1)] [animation-duration:2.2s] transition-all duration-300 hover:scale-125 hover:brightness-110 hover:shadow-[0_0_50px_rgba(244,114,182,1)]"></div>
  
  {/* Kim cương xanh (Hover: Xoay thêm & Phình to) */}
  <div className="relative bottom-2 h-5 w-5 animate-pulse cursor-pointer rotate-45 rounded-sm bg-gradient-to-br from-[#ecfeff] via-[#06b6d4] to-[#083344] shadow-[0_0_40px_#22d3ee,0_0_15px_#67e8f9,inset_3px_3px_6px_rgba(255,255,255,1),inset_-2px_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:rotate-90 hover:scale-125 hover:brightness-125">
    <div className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-white opacity-90 blur-[1px]"></div>
  </div>
  
  {/* Ngọc lục bảo (Hover: Đứng thẳng lại & Sáng chói) */}
  <div className="h-6 w-5 animate-pulse cursor-pointer rotate-12 transform rounded-sm bg-gradient-to-br from-[#d1fae5] via-[#10b981] to-[#064e3b] shadow-[0_0_35px_#34d399,0_0_15px_#10b981,inset_2px_2px_5px_rgba(255,255,255,0.9),inset_-2px_-2px_4px_rgba(0,0,0,0.5)] [animation-duration:2.5s] transition-all duration-300 hover:rotate-0 hover:scale-125 hover:brightness-125 hover:shadow-[0_0_50px_#34d399]">
    <div className="absolute right-1 top-1 h-2 w-1 rounded-full bg-white opacity-80 blur-[1px]"></div>
  </div>

</div>
    
    {/* KHÓA RƯƠNG (Kim loại xỉn màu hơn) */}
    <div className="absolute top-1.5 w-9 h-10 bg-gradient-to-br from-[#fbbf24] via-[#b45309] to-[#451a03] rounded-xl border border-[#1a0a01] flex justify-center items-center shadow-[0_8px_15px_rgba(0,0,0,0.8),inset_2px_2px_6px_rgba(255,255,255,0.4),inset_-2px_-2px_6px_rgba(0,0,0,0.7)] z-30">
      <div className="w-3.5 h-4.5 bg-gradient-to-b from-[#1c1917] to-[#000000] rounded-full relative shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.2)]">
        <div className="w-2 h-2.5 bg-black absolute -bottom-1 left-[3px] rounded-full"></div>
        <div className="absolute bottom-0 left-[4px] w-1 h-1 bg-yellow-300 rounded-full blur-[1px] opacity-60"></div>
      </div>
    </div>
    
    {/* ĐAI KIM LOẠI THÂN RƯƠNG */}
    <div className="absolute top-0 left-3 w-3 h-full bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#78350f] shadow-[inset_-3px_0_5px_rgba(0,0,0,0.8),inset_2px_0_5px_rgba(255,255,255,0.3)]"></div>
    <div className="absolute top-0 right-3 w-3 h-full bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#78350f] shadow-[inset_-3px_0_5px_rgba(0,0,0,0.8),inset_2px_0_5px_rgba(255,255,255,0.3)]"></div>

    {/* BÉ SAO BIỂN CHIBI */}
    <div className="absolute bottom-1 right-0 w-8 h-8 z-40 transform rotate-[15deg] hover:rotate-[40deg] hover:scale-110 transition-transform duration-300 drop-shadow-[3px_5px_5px_rgba(0,0,0,0.8)]">
      <div className="absolute top-0 left-3 w-2.5 h-4 bg-[radial-gradient(circle_at_30%_30%,_#ffe4e6,_#fb7185,_#9f1239)] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-4 h-2.5 bg-[radial-gradient(circle_at_30%_30%,_#ffe4e6,_#fb7185,_#9f1239)] rounded-full rotate-45"></div>
      <div className="absolute bottom-0 right-0 w-4 h-2.5 bg-[radial-gradient(circle_at_30%_30%,_#ffe4e6,_#fb7185,_#9f1239)] rounded-full -rotate-45"></div>
      <div className="absolute top-3 left-0 w-8 h-2.5 bg-[radial-gradient(circle_at_30%_30%,_#ffe4e6,_#fb7185,_#9f1239)] rounded-full"></div>
      <div className="absolute top-2.5 left-2.5 w-0.5 h-1.5 bg-[#111827] rounded-full"></div>
      <div className="absolute top-2.5 right-2.5 w-0.5 h-1.5 bg-[#111827] rounded-full"></div>
      <div className="absolute top-3.5 left-1 w-2 h-1 bg-[#e11d48] rounded-full blur-[1px] opacity-90"></div>
      <div className="absolute top-3.5 right-1 w-2 h-1 bg-[#e11d48] rounded-full blur-[1px] opacity-90"></div>
    </div>
    
 {/* HÀ BIỂN (Bản Nâng Cấp: Nhịp thở đại dương & Tương tác khi Hover) */}
<>
  {/* Hà biển tím (Lớn) */}
  <div className="group absolute bottom-3 left-1 h-3.5 w-3.5 animate-pulse cursor-pointer rounded-full bg-[radial-gradient(circle_at_top_left,_#ffffff,_#818cf8,_#1e1b4b)] shadow-[2px_3px_4px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-110 hover:brightness-110 [animation-duration:3.5s]">
    {/* Miệng hà biển: Nở to một chút khi bị hover */}
    <div className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-[#0f0e17] shadow-[inset_0_2px_3px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#1e1b4b]"></div>
  </div>

  {/* Hà biển xanh (Nhỏ) */}
  <div className="group absolute bottom-1 left-4 h-2.5 w-2.5 animate-pulse cursor-pointer rounded-full bg-[radial-gradient(circle_at_top_left,_#ffffff,_#22d3ee,_#083344)] shadow-[2px_3px_4px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-110 hover:brightness-110 [animation-duration:4.2s]">
    {/* Miệng hà biển: Nở to một chút khi bị hover */}
    <div className="absolute left-0.5 top-0.5 h-1 w-1 rounded-full bg-[#041c26] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#083344]"></div>
  </div>
</>

  </div>

  {/* BONG BÓNG NHỎ */}
  <div className="absolute -top-16 left-2 w-4 h-4 rounded-full bg-gradient-to-tr from-white/5 to-white/30 backdrop-blur-md border border-white/60 shadow-[inset_0_0_8px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.6)] animate-bounce" style={{ animationDuration: '1.8s' }}>
    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-90 blur-[0.5px]"></div>
  </div>
  
  <div className="absolute -top-14 right-8 w-3 h-3 rounded-full bg-cyan-200/20 backdrop-blur-sm border border-cyan-100/60 shadow-[inset_0_0_8px_rgba(165,243,252,1),0_0_15px_rgba(165,243,252,0.5)] animate-ping" style={{ animationDuration: '2.2s' }}>
     <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80"></div>
  </div>
  
  <div className="absolute -top-8 left-16 w-2.5 h-2.5 rounded-full bg-pink-200/30 backdrop-blur-sm border border-pink-100/60 shadow-[inset_0_0_6px_rgba(251,207,232,1)] animate-pulse" style={{ animationDuration: '1.5s' }}></div>
</div>


      {/* 3. HỆ THỐNG BONG BÓNG XÀ PHÒNG 3D TRÔI NỔI (Bóng bẩy, có viền cầu vồng) */}
      {/* Bong bóng lớn bên phải */}
      <div className="absolute bottom-12 right-[23%] z-50 pointer-events-none animate-[bounce_6s_infinite_ease-in-out]">
         <div className="w-14 h-14 rounded-full border border-white/20 bg-gradient-to-tr from-cyan-400/10 via-pink-400/5 to-white/10 backdrop-blur-[1px] shadow-[inset_-3px_-3px_8px_rgba(255,255,255,0.2),inset_3px_3px_8px_rgba(100,255,218,0.2),0_4px_10px_rgba(0,0,0,0.15)] relative">
           {/* Vệt sáng phản chiếu hình bán nguyệt kute */}
           <div className="w-3 h-1.5 bg-white/40 rounded-full absolute top-2 left-3 rotate-[30deg]"></div>
         </div>
      </div>
      {/* Bong bóng khổng lồ góc trái */}
      <div className="absolute top-1/4 left-[6%] z-50 pointer-events-none animate-[bounce_8s_infinite_ease-in-out]" style={{ animationDelay: '1.5s' }}>
         <div className="w-24 h-24 rounded-full border border-white/10 bg-gradient-to-br from-purple-400/10 via-transparent to-cyan-400/10 backdrop-blur-[2px] shadow-[inset_-5px_-5px_15px_rgba(255,100,200,0.15),inset_5px_5px_15px_rgba(100,255,218,0.2)] relative">
           <div className="w-6 h-3 bg-white/30 rounded-full absolute top-4 left-5 -rotate-[25deg]"></div>
           <div className="w-2 h-2 bg-white/20 rounded-full absolute bottom-5 right-6"></div>
         </div>
      </div>

    </div>
  );
}