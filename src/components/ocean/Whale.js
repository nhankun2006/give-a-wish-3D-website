'use client';

export default function Whale({ style }) {
  const colors = {
    top: '#8ef1ff',     // Lưng xanh ngọc sáng
    bottom: '#29c5f6',  // Bụng xanh biển
    belly: '#eaffff',   // Phần bụng trắng kem
    water: '#b5f6ff',   // Giọt nước
    blush: '#ff99c4'    // Má hồng
  };

  return (
    <div className="creature group" style={{ position: 'absolute', ...style }}>
      <svg 
        viewBox="0 0 160 130" 
        width="100%" height="100%" 
        className="drop-shadow-[0_8px_15px_rgba(41,197,246,0.2)] animate-[whaleFloat_5s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id="whaleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.top} />
            <stop offset="100%" stopColor={colors.bottom} />
          </linearGradient>
        </defs>

        {/* --- VÒI PHUN NƯỚC TRÊN ĐẦU (Có animation bắn nước) --- */}
        <g className="animate-[spout_2s_ease-out_infinite]">
          <circle cx="95" cy="30" r="4" fill={colors.water} />
          <circle cx="85" cy="20" r="3" fill={colors.water} />
          <circle cx="105" cy="15" r="4.5" fill={colors.water} />
        </g>
        {/* Tia nước gốc */}
        <path d="M 95 45 L 95 35" stroke={colors.water} strokeWidth="3" strokeLinecap="round" opacity="0.6"/>

        {/* --- ĐUÔI CÁ VOI (Quẫy lên xuống) --- */}
        <g className="origin-[25px_75px] animate-[tailFlap_1.5s_ease-in-out_infinite_alternate]">
          <path d="M 25 75 C 10 50, 0 65, 5 80 C 0 95, 10 110, 25 75 Z" fill="url(#whaleGrad)" />
        </g>

        {/* --- THÂN HÌNH Ú NU --- */}
        {/* Form dáng to ở đầu, thon dần về đuôi */}
        <path 
          d="M 20 75 C 35 40, 85 35, 120 50 C 145 60, 145 95, 115 105 C 75 115, 35 100, 20 75 Z" 
          fill="url(#whaleGrad)" 
        />

        {/* --- PHẦN BỤNG TRẮNG --- */}
        <path 
          d="M 50 100 C 75 110, 115 105, 130 80 C 125 100, 95 115, 50 100 Z" 
          fill={colors.belly} 
          opacity="0.8" 
        />

        {/* --- VÂY BƠI BÊN HÔNG (Vẫy nhè nhẹ) --- */}
        <g className="origin-[75px_85px] animate-[flipperWave_2s_ease-in-out_infinite_alternate]">
          <path d="M 75 85 C 90 105, 70 110, 60 90 Z" fill={colors.bottom} />
        </g>

        {/* --- KHUÔN MẶT CUTE --- */}
        {/* Má hồng */}
        <ellipse cx="120" cy="78" rx="6" ry="3" fill={colors.blush} opacity="0.6" />
        
        {/* Mắt to đen nháy */}
        <circle cx="110" cy="70" r="5" fill="#021428" />
        <circle cx="108.5" cy="68.5" r="2" fill="white" />
        
        {/* Miệng mỉm cười */}
        <path d="M 128 72 Q 131 75 134 72" stroke="#021428" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      </svg>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes whaleFloat { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
          @keyframes tailFlap { 0% { transform: rotate(-15deg); } 100% { transform: rotate(15deg); } }
          @keyframes flipperWave { 0% { transform: rotate(-10deg); } 100% { transform: rotate(20deg); } }
          @keyframes spout { 
            0% { transform: translateY(10px); opacity: 0; } 
            20% { opacity: 1; } 
            100% { transform: translateY(-20px); opacity: 0; } 
          }
        `
      }} />
    </div>
  );
}