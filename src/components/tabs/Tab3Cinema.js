'use client';

import gsap from 'gsap';
import { useState, useEffect } from 'react';
import SecretLockUI from '@/components/ui/SecretLockUI';
import { motion } from 'framer-motion';

export default function Tab3Cinema({ activeTab, showSurprise, setShowSurprise }) {
  const [openCurtain, setOpenCurtain] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  // July 10 00:00 Vietnam time (UTC+7) = July 9 17:00 UTC
  const UNLOCK_TIME = new Date('2026-07-10T00:00:00+07:00');

  // null = not yet determined (SSR safe), then boolean on client
  const [curtainLocked, setCurtainLocked] = useState(null);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = UNLOCK_TIME - now;
      if (diff <= 0) {
        setCurtainLocked(false);
        setCountdown('');
      } else {
        setCurtainLocked(true);
        const totalSec = Math.floor(diff / 1000);
        const d = Math.floor(totalSec / 86400);
        const h = Math.floor((totalSec % 86400) / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        const parts = [];
        if (d > 0) parts.push(`${d}n`);
        parts.push(`${String(h).padStart(2,'0')}h`);
        parts.push(`${String(m).padStart(2,'0')}m`);
        parts.push(`${String(s).padStart(2,'0')}s`);
        setCountdown(parts.join(' '));
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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

      {/* VỊ TRÍ 5: CHIẾC TÀU NGẦM 3D GLOSSY CUTE (BÊN TRÁI) */}
      {/* ========================================================================= */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-48 pointer-events-none animate-[bounce_6s_infinite_ease-in-out] drop-shadow-[0_15px_25px_rgba(2,132,199,0.5)] z-30">
        <svg viewBox="0 0 320 180" className="w-full overflow-visible">
          <defs>
            {/* Gradient 3D cho Thân tàu (Xanh dương bóng bẩy) */}
            <linearGradient id="sub-3d" x1="20%" y1="5%" x2="80%" y2="95%">
              <stop offset="0%" stopColor="#BAE6FD" />   {/* Sáng chói đỉnh tàu */}
              <stop offset="30%" stopColor="#38BDF8" />  {/* Xanh nhạt */}
              <stop offset="70%" stopColor="#0284C7" />  {/* Xanh biển đậm */}
              <stop offset="100%" stopColor="#082F49" /> {/* Bóng tối đáy tàu */}
            </linearGradient>

            {/* Gradient tháp quan sát (Tower) */}
            <linearGradient id="tower-3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Gradient kính lồi 3D */}
            <radialGradient id="glass-3d" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </radialGradient>

            {/* Ánh sáng đèn pha mờ ảo */}
            <linearGradient id="beam-grad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ================= CHÂN VỊT (Động cơ quay) ================= */}
          <g className="origin-[25px_92px] animate-[spin_1s_linear_infinite]">
            <circle cx="25" cy="92" r="18" fill="#0369A1" opacity="0.6" />
            <path d="M 25 92 L 10 75 A 15 15 0 0 1 40 75 Z" fill="#7DD3FC" />
            <path d="M 25 92 L 40 109 A 15 15 0 0 1 10 109 Z" fill="#0284C7" />
            <circle cx="25" cy="92" r="5" fill="#E0F2FE" />
          </g>

          {/* ================= ĐUÔI VÀ VÂY (Fins) ================= */}
          {/* Đuôi nối */}
          <path d="M 45 92 L 15 78 L 15 106 Z" fill="#0C4A6E" />
          
          {/* Vây đuôi trên/dưới */}
          <polygon points="25,92 5,50 15,92 5,134" fill="url(#tower-3d)" />
          {/* Highlight vây */}
          <path d="M 8 55 L 18 92" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

          {/* Vây lưng (Top Fin) */}
          <path d="M 70 65 L 90 35 L 115 65 Z" fill="url(#tower-3d)" />
          <path d="M 88 38 L 110 62" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

          {/* ================= THÁP QUAN SÁT & KÍNH TIỀM VỌNG ================= */}
          {/* Ống nhòm (Periscope) */}
          <path d="M 132 35 V 10 H 155" stroke="#94A3B8" strokeWidth="6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M 134 35 V 12 H 153" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
          {/* Mắt đỏ quét radar */}
          <circle cx="155" cy="10" r="4" fill="#EF4444" className="animate-pulse" />

          {/* Tháp tàu */}
          <rect x="110" y="30" width="40" height="40" rx="8" fill="url(#tower-3d)" />
          {/* Highlight tháp */}
          <path d="M 114 34 L 146 34" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

          {/* Bong bóng nổi lên từ tháp */}
          <circle cx="140" cy="20" r="3" fill="#FFFFFF" opacity="0.6" className="animate-[bounce_2s_infinite]" />
          <circle cx="130" cy="5" r="2" fill="#FFFFFF" opacity="0.4" className="animate-[bounce_3s_infinite]" />

          {/* ================= THÂN TÀU CHÍNH ================= */}
          <g>
            {/* Lớp bóng đen phía sau tạo độ sâu */}
            <rect x="45" y="68" width="180" height="60" rx="30" fill="#042F2E" />
            <ellipse cx="225" cy="98" rx="35" ry="30" fill="#042F2E" />

            {/* Form dáng 3D chính */}
            <rect x="45" y="60" width="180" height="60" rx="30" fill="url(#sub-3d)" />
            <ellipse cx="225" cy="90" rx="35" ry="30" fill="url(#sub-3d)" />

            {/* Vệt Highlight Nhựa Chói (Làm thân tàu mọng nước) */}
            <path d="M 60 68 C 120 62, 180 62, 235 72" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
            <path d="M 65 74 C 120 68, 180 68, 230 78" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />

            {/* Đường gân dập nổi trên thân tàu */}
            <path d="M 50 110 C 120 116, 180 116, 230 106" stroke="#0C4A6E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 50 112 C 120 118, 180 118, 230 108" stroke="#38BDF8" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
          </g>

          {/* ================= CỬA SỔ (PORTHOLES) KÍNH LỒI 3D ================= */}
          {[100, 140, 180].map((cx, i) => (
            <g key={i}>
              {/* Viền ngoài (Frame thép) */}
              <circle cx={cx} cy="90" r="14" fill="#0F172A" />
              <circle cx={cx} cy="90" r="14" fill="none" stroke="#94A3B8" strokeWidth="3" opacity="0.8" />
              {/* Highlight trên viền thép */}
              <path d={`M ${cx - 10} 80 A 14 14 0 0 1 ${cx + 10} 80`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
              
              {/* Mặt kính thủy tinh lồi */}
              <circle cx={cx} cy="90" r="11" fill="url(#glass-3d)" />
              {/* Vệt chói trên kính */}
              <path d={`M ${cx - 6} 85 A 6 6 0 0 1 ${cx + 2} 82`} stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
              <path d={`M ${cx - 5} 87 A 6 6 0 0 1 ${cx + 1} 84`} stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
            </g>
          ))}

          {/* ================= ĐÈN PHA VÀ TIA SÁNG (HEADLIGHT) ================= */}
          <g>
            {/* Hốc đèn */}
            <ellipse cx="254" cy="92" rx="6" ry="12" fill="#082F49" />
            
            {/* Lõi đèn phát sáng */}
            <ellipse cx="256" cy="92" rx="4" ry="10" fill="#FEF08A" className="animate-pulse" />
            <ellipse cx="257" cy="92" rx="2" ry="6" fill="#FFFFFF" />

            {/* Tia sáng quét đại dương */}
            <path d="M 258 92 L 320 50 A 20 50 0 0 1 320 134 Z" fill="url(#beam-grad)" className="animate-pulse" />
          </g>
        </svg>
      </div>


      {/* LỚP 2: NỘI DUNG - Giữ nguyên hiệu ứng scale to/nhỏ của bạn */}
      <div className={`transition-transform duration-1000 w-full max-w-5xl px-4 -translate-y-8 ${activeTab === 2 ? 'scale-100' : 'scale-110'}`}>
        <div className="
          relative
          bg-[#0a192f]/60
          backdrop-blur-2xl
          rounded-[48px]
          border-[3px]
          border-[#64ffda]/30
          p-6 md:p-8
          w-[92%]
          md:w-[95%]
          mx-auto
          shadow-[0_0_50px_rgba(100,255,218,.15)]
          overflow-visible
          ">

          {/* ================= CHI TIẾT TRANG TRÍ NỀN ĐẠI DƯƠNG (LỚP 1) ================= */}

          {/* ================= KẾT THÚC TRANG TRÍ NỀN ================= */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

          <SecretLockUI
            setShowSurprise={setShowSurprise}
            isLocked={isLocked}
            setIsLocked={setIsLocked}
          />

          <h2
            className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-wide"
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
              className={`absolute inset-0 z-20 flex items-center justify-center overflow-hidden transition-all duration-[1500ms] ${
                openCurtain ? 'pointer-events-none' : curtainLocked ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={() => {
                if (curtainLocked) return;
                setOpenCurtain(true);
              }}
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

                {/* Bé Rùa Biển Chibi (Bản 3D Nhựa Bóng / Glossy 3D) */}
<div className="absolute bottom-1/4 left-1/4 animate-[pulse_3s_infinite] drop-shadow-[0_10px_20px_rgba(16,185,129,0.5)]">
  <svg width="85" height="85" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Gradient 3D cho Làn da rùa (Màu xanh Mint bóng bẩy) */}
      <linearGradient id="turtle-skin" x1="15%" y1="15%" x2="85%" y2="85%">
        <stop offset="0%" stopColor="#D1FAE5" />    {/* Xanh nhạt chói sáng */}
        <stop offset="40%" stopColor="#10B981" />   {/* Xanh lục tươi */}
        <stop offset="100%" stopColor="#047857" />  {/* Xanh rêu đậm (Bóng râm) */}
      </linearGradient>

      {/* Gradient 3D cho Da phần khuất (Tối hơn tạo chiều sâu) */}
      <linearGradient id="turtle-skin-back" x1="20%" y1="20%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="80%" stopColor="#065F46" />
        <stop offset="100%" stopColor="#022C22" />
      </linearGradient>

      {/* Gradient 3D cho Mai rùa (Emerald / Xanh Ngọc Lục Bảo) */}
      <linearGradient id="turtle-shell" x1="20%" y1="10%" x2="80%" y2="90%">
        <stop offset="0%" stopColor="#A7F3D0" />
        <stop offset="30%" stopColor="#059669" />
        <stop offset="85%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#022C22" />
      </linearGradient>

      {/* Gradient 3D cho Viền mai rùa (Màu vàng mật ong) */}
      <linearGradient id="turtle-rim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="40%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
    </defs>

    {/* ================= PHẦN KHUẤT PHÍA SAU (TẠO 3D) ================= */}
    {/* Vây sau bên trái */}
    <path d="M 22 55 C 10 50, 2 58, 8 68 C 15 65, 20 60, 24 55 Z" fill="url(#turtle-skin-back)" />
    {/* Vây trước bên trái */}
    <path d="M 68 52 C 80 48, 88 55, 80 68 C 75 62, 70 58, 65 55 Z" fill="url(#turtle-skin-back)" />
    {/* Đuôi rùa nhỏ xinh */}
    <path d="M 18 55 C 5 58, 2 48, 15 48 Z" fill="url(#turtle-skin-back)" />

    {/* ================= ĐẦU VÀ CỔ RÙA ================= */}
    <g>
      <path d="M 45 50 C 60 40, 75 35, 78 45 C 80 55, 60 60, 50 60 Z" fill="url(#turtle-skin)" />
      <circle cx="76" cy="38" r="14" fill="url(#turtle-skin)" />
      
      {/* Vệt sáng Highlight trên đỉnh đầu */}
      <path d="M 65 30 C 70 26, 78 25, 85 28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
    </g>

    {/* ================= MAI RÙA CĂNG BÓNG ================= */}
    {/* Khối Dome (Mái vòm của mai) */}
    <path d="M 18 58 C 18 20, 68 20, 68 58 Z" fill="url(#turtle-shell)" />
    
    {/* Highlight siêu bóng bẩy cong theo mai rùa */}
    <path d="M 26 48 C 26 28, 58 28, 58 48" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5"/>
    
    {/* Vân mai rùa (Geometric lục giác ảo diệu) */}
    <path d="M 43 30 L 53 33 L 56 45 L 48 52 L 38 49 L 35 37 Z" fill="#047857" opacity="0.5" stroke="#059669" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M 43 30 L 53 33 L 56 45 L 48 52 L 38 49 L 35 37 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" transform="translate(0, -1.5)"/> {/* Cạnh nổi bật */}
    
    {/* Vân phụ ở 2 bên mai */}
    <path d="M 28 35 L 35 37 L 38 49 L 30 51 Z" fill="#047857" opacity="0.3" />
    <path d="M 53 33 L 60 38 L 58 50 L 56 45 Z" fill="#047857" opacity="0.3" />

    {/* ================= VIỀN MAI RÙA (RIM) ================= */}
    {/* Đường bo khối viền */}
    <path d="M 12 56 C 12 50, 74 50, 74 56 C 74 62, 12 62, 12 56 Z" fill="url(#turtle-rim)" />
    {/* Highlight phản quang trên viền */}
    <path d="M 16 54 C 30 51, 55 51, 70 54" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round"/>
    {/* Đổ bóng nhẹ dưới viền lên da rùa */}
    <path d="M 16 58 C 30 61, 55 61, 70 58" stroke="#064E3B" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round"/>

    {/* ================= VÂY TRƯỚC VÀ SAU (BÊN PHẢI) ================= */}
    {/* Vây chân sau */}
    <path d="M 24 57 C 14 68, 8 80, 16 85 C 24 85, 28 72, 32 58 Z" fill="url(#turtle-skin)" />
    <path d="M 22 62 C 16 70, 14 78, 18 82" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/> {/* Highlight vây sau */}
    
    {/* Đốm dễ thương vây sau */}
    <circle cx="22" cy="70" r="1.5" fill="#047857" opacity="0.4"/>
    <circle cx="26" cy="75" r="2" fill="#047857" opacity="0.4"/>

    {/* Vây tay trước (Bơi bơi) */}
    <path d="M 52 58 C 65 70, 72 85, 60 90 C 50 85, 45 70, 48 58 Z" fill="url(#turtle-skin)" />
    <path d="M 52 64 C 58 72, 62 82, 58 86" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/> {/* Highlight vây trước */}
    
    {/* Đốm dễ thương vây trước */}
    <circle cx="56" cy="70" r="2" fill="#047857" opacity="0.4"/>
    <circle cx="53" cy="76" r="1.5" fill="#047857" opacity="0.4"/>
    <circle cx="58" cy="80" r="2.5" fill="#047857" opacity="0.4"/>

    {/* ================= KHUÔN MẶT KUTE HẠT ME ================= */}
    {/* Mắt to đen */}
    <circle cx="80" cy="34" r="4.5" fill="#1C1014" />
    {/* Điểm sáng to */}
    <circle cx="78.5" cy="32.5" r="1.8" fill="#FFFFFF" />
    {/* Điểm sáng nhỏ */}
    <circle cx="81.5" cy="35" r="0.8" fill="#FFFFFF" />
    {/* Vệt phản quang long lanh đáy mắt */}
    <path d="M 78 38 C 80 39, 82 38, 83 36" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>

    {/* Má hồng chúm chím */}
    <ellipse cx="86" cy="40" rx="3.5" ry="2" fill="#FF2462" opacity="0.5" />
    <ellipse cx="85.5" cy="39.5" rx="1.5" ry="0.8" fill="#FFFFFF" opacity="0.3" />

    {/* Nụ cười mỉm đáng yêu */}
    <path d="M 88 34 C 90 36, 92 36, 93 34" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" fill="none" />
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

                {/* Bé Sao Biển Chibi (Bản 3D - Mi Nhon, Thanh Thoát) */}
<div className="absolute top-1/4 right-1/4 animate-[bounce_5s_infinite] drop-shadow-[0_12px_15px_rgba(234,179,8,0.4)]">
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="star-3d-slim" x1="20%" y1="10%" x2="80%" y2="90%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="40%" stopColor="#FACC15" />
        <stop offset="80%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#A16207" />
      </linearGradient>

      <linearGradient id="bump-3d-slim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEFAEC" />
        <stop offset="100%" stopColor="#FDE047" />
      </linearGradient>
    </defs>

    {/* ================= KHỐI THÂN MI NHON ================= */}
    {/* Đã giảm strokeWidth từ 16 xuống 8 để em nó ốm lại */}
    <path d="M 50 18 L 60 38 L 86 42 L 66 58 L 73 82 L 50 68 L 27 82 L 34 58 L 14 42 L 40 38 Z" 
          fill="#854D0E" stroke="#854D0E" strokeWidth="8" strokeLinejoin="round" transform="translate(0, 3)" />
    
    {/* Đã giảm strokeWidth từ 14 xuống 6 */}
    <path d="M 50 18 L 60 38 L 86 42 L 66 58 L 73 82 L 50 68 L 27 82 L 34 58 L 14 42 L 40 38 Z" 
          fill="url(#star-3d-slim)" stroke="url(#star-3d-slim)" strokeWidth="6" strokeLinejoin="round" />

    {/* ================= HIGHLIGHT NHỰA BÓNG ================= */}
    {/* Đã kéo sát highlight vào viền mới */}
    <path d="M 46 16 C 50 14, 50 14, 54 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
    <path d="M 22 39 C 18 43, 18 43, 22 47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M 78 39 C 82 43, 82 43, 78 47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M 33 77 C 35 80, 35 80, 37 74" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
    <path d="M 67 77 C 65 80, 65 80, 63 74" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>

    {/* ================= ĐỐM XINH ================= */}
    <g fill="url(#bump-3d-slim)">
      <circle cx="50" cy="24" r="2.5" />
      <circle cx="74" cy="45" r="2" />
      <circle cx="26" cy="45" r="2" />
      <circle cx="66" cy="70" r="2" />
      <circle cx="34" cy="70" r="2" />
    </g>

    {/* ================= KHUÔN MẶT CÂN ĐỐI HƠN ================= */}
    {/* Mắt trái kéo vào trong 1 xíu */}
    <circle cx="40" cy="52" r="4.5" fill="#422006" />
    <circle cx="38.5" cy="50.5" r="1.8" fill="#FFFFFF" />
    <circle cx="41.5" cy="53.5" r="0.8" fill="#FFFFFF" />
    <path d="M 38 55 C 40 56, 42 55, 42 53" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/> 

    {/* Mắt phải kéo vào trong 1 xíu */}
    <circle cx="60" cy="52" r="4.5" fill="#422006" />
    <circle cx="58.5" cy="50.5" r="1.8" fill="#FFFFFF" />
    <circle cx="61.5" cy="53.5" r="0.8" fill="#FFFFFF" />
    <path d="M 58 55 C 60 56, 62 55, 62 53" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6"/>

    {/* Má hồng gom lại */}
    <ellipse cx="32" cy="55" rx="3.5" ry="2.5" fill="#FB7185" opacity="0.6" />
    <ellipse cx="31" cy="54" rx="1.2" ry="0.8" fill="#FFFFFF" opacity="0.4" />

    <ellipse cx="68" cy="55" rx="3.5" ry="2.5" fill="#FB7185" opacity="0.6" />
    <ellipse cx="67" cy="54" rx="1.2" ry="0.8" fill="#FFFFFF" opacity="0.4" />

    {/* Nụ cười mỉm nhỏ gọn lại */}
    <path d="M 47 56 C 49 58, 51 58, 53 56" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  </svg>
</div>

                {/* Viền sáng phản quang */}
                <div className="w-3 h-full bg-gradient-to-b from-white/10 to-white/50 blur-[2px] absolute left-1"></div>
              </div>

              {/* WOW Bow + label — locked state shows countdown, unlocked shows normal */}
              <div className={`relative z-30 transition-all duration-1000 ease-in-out flex flex-col items-center ${
                openCurtain
                  ? 'opacity-0 scale-50 -translate-y-12'
                  : curtainLocked
                  ? 'opacity-70 scale-100'               /* dimmed, no hover when locked */
                  : 'opacity-100 scale-100 hover:scale-110 hover:-translate-y-2'
              }`}>

                {/* Hình thù chiếc nơ */}
                <div className="flex items-center justify-center animate-[pulse_2.5s_infinite]">
                  {/* Cánh nơ trái */}
                  <div className="w-0 h-0 border-y-[24px] border-y-transparent border-r-[44px] border-r-pink-300 drop-shadow-[0_0_15px_rgba(253,164,175,0.9)]"></div>

                  {/* Hạt ngọc trai khổng lồ ở giữa */}
                  <div className="w-14 h-14 bg-[radial-gradient(circle_at_30%_30%,_#ffffff,_#fbcfe8,_#f472b6)] rounded-full border-2 border-white/80 shadow-[0_0_25px_rgba(255,255,255,0.9),inset_-4px_-4px_8px_rgba(0,0,0,0.15)] z-10 -mx-3 flex items-center justify-center text-pink-700 font-black text-sm tracking-wider">
                    {curtainLocked ? '🔒' : 'WOW'}
                  </div>

                  {/* Cánh nơ phải */}
                  <div className="w-0 h-0 border-y-[24px] border-y-transparent border-l-[44px] border-l-pink-300 drop-shadow-[0_0_15px_rgba(253,164,175,0.9)]"></div>
                </div>

               {/* Label: countdown khi khóa, hướng dẫn khi mở */}
                    {curtainLocked ? (
                      <motion.div 
                        animate={{ y: [0, -8, 0] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-5 flex flex-col items-center gap-4"
                      >
                        {/* Thẻ thông báo: Kiểu dải ruy băng lấp lánh trên cát */}
                        <div className="relative group">
                          {/* Vòng sáng hào quang mờ phía sau */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 rounded-full blur-md opacity-50 animate-pulse" />
                          
                          {/* Thẻ chính màu vỏ sò */}
                          <div className="relative flex items-center gap-2 bg-gradient-to-br from-white to-cyan-50 px-6 py-2.5 rounded-full border-[3px] border-cyan-200/80 shadow-[0_8px_20px_rgba(34,211,238,0.25)]">
                            <span className="text-xl animate-bounce" style={{ animationDuration: '2s' }}></span>
                            <span className="text-cyan-800 font-extrabold tracking-wide text-xs sm:text-sm uppercase drop-shadow-sm">
                              Mở lúc 0h ngày 10/7
                            </span>
                            <span className="text-xl animate-bounce" style={{ animationDuration: '2.5s' }}></span>
                          </div>
                        </div>

                        {/* Khung đồng hồ: Kiểu giọt nước khổng lồ dưới biển sâu */}
                        <div className="relative px-8 py-3 md:py-4 bg-cyan-950/40 backdrop-blur-xl rounded-[2rem] border-2 border-cyan-300/50 shadow-[inset_0_0_20px_rgba(34,211,238,0.4),0_10px_30px_rgba(8,145,178,0.3)] overflow-hidden flex items-center justify-center min-w-[200px]">
                          {/* Hiệu ứng vệt sáng phản chiếu của mặt nước */}
                          <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/30 to-transparent opacity-80 pointer-events-none rounded-t-[2rem]" />
                          
                          {/* Chữ số đồng hồ đếm ngược */}
                          <span className="relative z-10 text-cyan-50 font-black text-lg sm:text-xl tracking-widest drop-shadow-[0_0_15px_rgba(103,232,249,1)] tabular-nums">
                            {countdown}
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.span 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-6 flex items-center justify-center text-cyan-800 font-extrabold tracking-widest text-sm bg-gradient-to-br from-white to-cyan-100 px-8 py-3 rounded-full backdrop-blur-md border-[3px] border-white shadow-[0_8px_25px_rgba(34,211,238,0.5),inset_0_0_15px_rgba(255,255,255,0.9)] cursor-pointer"
                      >
                        MỞ RÈM ĐẠI DƯƠNG 🌊
                      </motion.span>
                    )}
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


{/* VỊ TRÍ 4: HỘP BẮP RANG NGỌC TRAI & KÍNH 3D (BẢN 3D NHỰA BÓNG) */}
      {/* ========================================================================= */}
      <div className="absolute top-10 right-8 md:top-16 md:right-20 z-40 pointer-events-none animate-[bounce_5s_infinite_ease-in-out] drop-shadow-[0_18px_25px_rgba(244,114,182,0.6)]">
        
        {/* Vòng sáng Neon phía sau hộp bắp */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-pink-400/40 rounded-full blur-[20px]"></div>

        <div className="relative w-36 h-36 md:w-40 md:h-40">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gradient khối 3D cho hộp bắp */}
              <linearGradient id="bucket-3d" x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor="#FBCFE8" />   {/* Hồng sáng chói */}
                <stop offset="30%" stopColor="#F472B6" />  {/* Hồng tươi */}
                <stop offset="80%" stopColor="#BE185D" />  {/* Hồng đậm (khối) */}
                <stop offset="100%" stopColor="#831843" /> {/* Bóng tối */}
              </linearGradient>

              {/* Lòng trong của hộp bắp (Tạo độ sâu) */}
              <linearGradient id="bucket-inside" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#831843" />
                <stop offset="100%" stopColor="#BE185D" />
              </linearGradient>

              {/* Gradient vé vàng 3D */}
              <linearGradient id="ticket-3d" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#854D0E" />
              </linearGradient>

              {/* Khối ngọc trai Thủy tinh 3D */}
              <radialGradient id="pearl-cyan" cx="35%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#67E8F9" />
                <stop offset="90%" stopColor="#0891B2" />
              </radialGradient>
              
              <radialGradient id="pearl-pink" cx="35%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#F9A8D4" />
                <stop offset="90%" stopColor="#BE185D" />
              </radialGradient>
              
              <radialGradient id="pearl-yellow" cx="35%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#FDE047" />
                <stop offset="90%" stopColor="#A16207" />
              </radialGradient>
            </defs>

            {/* ================= VÉ XEM PHIM 3D ================= */}
            <g transform="rotate(15, 80, 40)">
              {/* Lớp bóng dập nổi phía sau (Thickness) */}
              <path d="M 67 17 L 97 17 L 97 62 L 67 62 Z" fill="#713F12" />
              
              {/* Mặt vé chính */}
              <path d="M 65 15 L 95 15 L 95 60 L 65 60 Z" fill="url(#ticket-3d)" />
              {/* Lỗ xé vé */}
              <circle cx="65" cy="37" r="4" fill="#0A192F" />
              <circle cx="95" cy="37" r="4" fill="#0A192F" />
              
              {/* Vệt phản quang 3D trên vé */}
              <path d="M 65 15 L 75 15 L 65 25 Z" fill="#FFFFFF" opacity="0.6" />
              <rect x="72" y="22" width="16" height="30" rx="2" fill="#CA8A04" opacity="0.5" />
              <text x="80" y="50" fontFamily="monospace" fontSize="9" fill="#713F12" fontWeight="bold" transform="rotate(-90, 80, 50)">TICKET</text>
            </g>

            {/* ================= LÒNG HỘP (TẠO ĐỘ SÂU) ================= */}
            <ellipse cx="60" cy="50" rx="28" ry="8" fill="url(#bucket-inside)" />

            {/* ================= BẮP RANG NGỌC TRAI 3D ================= */}
            {/* Viên 1 (Cyan lớn) */}
            <circle cx="38" cy="45" r="11" fill="url(#pearl-cyan)" />
            <circle cx="34" cy="41" r="2.5" fill="#FFFFFF" opacity="0.9" /> {/* Điểm chói chói (Specular) */}
            
            {/* Viên 2 (Hồng lớn) */}
            <circle cx="56" cy="35" r="13" fill="url(#pearl-pink)" />
            <circle cx="51" cy="30" r="3" fill="#FFFFFF" opacity="0.9" />

            {/* Viên 3 (Cyan nhỏ) */}
            <circle cx="78" cy="42" r="10" fill="url(#pearl-cyan)" />
            <circle cx="75" cy="39" r="2" fill="#FFFFFF" opacity="0.9" />

            {/* Viên 4 (Vàng sao biển) */}
            <circle cx="48" cy="49" r="12" fill="url(#pearl-yellow)" />
            <circle cx="44" cy="45" r="2.5" fill="#FFFFFF" opacity="0.9" />

            {/* Viên 5 (Hồng nhỏ tràn ra ngoài) */}
            <circle cx="68" cy="50" r="10" fill="url(#pearl-pink)" />
            <circle cx="65" cy="47" r="2" fill="#FFFFFF" opacity="0.9" />

            {/* ================= THÂN HỘP 3D CĂNG BÓNG ================= */}
            {/* Vỏ hộp */}
            <path d="M 32 50 C 32 58, 88 58, 88 50 L 78 105 C 78 112, 42 112, 42 105 Z" fill="url(#bucket-3d)" />
            
            {/* Vệt Highlight nhựa chói lóa dọc thân hộp */}
            <path d="M 40 54 L 46 106" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
            <path d="M 46 55 L 50 107" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            
            {/* Logo dập nổi giữa hộp */}
            <circle cx="60" cy="78" r="14" fill="#0891B2" shadow="0 2px 5px rgba(0,0,0,0.5)" />
            <circle cx="60" cy="78" r="10" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
            <circle cx="60" cy="78" r="4" fill="url(#pearl-yellow)" />

            {/* ================= KÍNH 3D NHỰA DÀY ================= */}
            <g transform="translate(16, 88) rotate(-15)">
              {/* Viền bóng lưng (Tạo độ dày gọng kính 3D) */}
              <rect x="0" y="3" width="22" height="14" rx="4" fill="#94A3B8" />
              <rect x="26" y="3" width="22" height="14" rx="4" fill="#94A3B8" />
              <path d="M 22 8 L 26 8" stroke="#94A3B8" strokeWidth="4" />
              
              {/* Gọng kính trắng sứ */}
              <rect x="0" y="0" width="22" height="14" rx="4" fill="#FFFFFF" />
              <rect x="26" y="0" width="22" height="14" rx="4" fill="#FFFFFF" />
              <path d="M 22 5 L 26 5" stroke="#FFFFFF" strokeWidth="4" />
              
              {/* Tròng kính Đỏ & Cyan */}
              <rect x="3" y="3" width="16" height="8" rx="2" fill="#EF4444" />
              <rect x="29" y="3" width="16" height="8" rx="2" fill="#06B6D4" />
              
              {/* Phản quang mặt kính chéo 3D */}
              <path d="M 4 8 L 10 3 M 7 10 L 17 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              <path d="M 30 8 L 36 3 M 33 10 L 43 3" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

              {/* Vệt Highlight chói trên viền kính */}
              <path d="M 2 2 L 18 2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M 28 2 L 44 2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

              {/* Gọng tai đeo (Arm) đổ bóng */}
              <path d="M 0 5 C -6 5 -8 -1 -8 -6" stroke="#94A3B8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" transform="translate(0, 2)" />
              <path d="M 0 5 C -6 5 -8 -1 -8 -6" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>
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