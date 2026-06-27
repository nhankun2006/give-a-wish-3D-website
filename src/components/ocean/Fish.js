'use client';

export default function Fish({ style, variant }) {
  const isPink = variant === 'pink';
  
  // Bảng màu kẹo ngọt pastel 
  const colors = {
    top: isPink ? '#ffa6c9' : '#8ef1ff',   
    bottom: isPink ? '#ff70a6' : '#29c5f6', 
    fin: isPink ? '#ffb3d6' : '#b5f6ff',    
    blush: isPink ? '#ff4d8d' : '#0099cc'   
  };

  return (
    <div className="creature creature-fish group" style={{ position: 'absolute', ...style }}>
      <svg 
        viewBox="0 0 160 100" 
        width="100%" height="100%" 
        className="drop-shadow-[0_5px_15px_rgba(0,0,0,0.15)] animate-[swimBob_3s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id={`cuteFishGrad-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.top} />
            <stop offset="100%" stopColor={colors.bottom} />
          </linearGradient>
        </defs>

        {/* --- ĐUÔI CÁ (Xinh xắn, vừa vặn) --- */}
        <g className="origin-[115px_50px] animate-[tailWag_0.8s_ease-in-out_infinite_alternate]">
          <path d="M 115 50 C 135 20, 155 30, 145 50 C 155 70, 135 80, 115 50 Z" fill={colors.fin} />
        </g>

        {/* --- VÂY LƯNG VÀ VÂY BỤNG --- */}
        <path d="M 55 31 Q 75 10 95 31 Z" fill={colors.fin} />
        <path d="M 60 69 Q 75 85 85 69 Z" fill={colors.fin} />

        {/* --- THÂN CÁ (Đã được làm thon gọn lại giống lúc trước) --- */}
        <path d="M 20 50 C 40 25, 95 25, 120 50 C 95 75, 40 75, 20 50 Z" fill={`url(#cuteFishGrad-${variant})`} />

        {/* --- KHUÔN MẶT KAWAII --- */}
        {/* Má hồng (Blush) */}
        <ellipse cx="45" cy="55" rx="6" ry="3" fill={colors.blush} opacity="0.4" />
        
        {/* Miệng nhỏ xinh đang cười mỉm */}
        <path d="M 23 52 Q 26 56 30 52" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Mắt to tròn long lanh */}
        <circle cx="40" cy="40" r="6" fill="white" />
        <circle cx="38" cy="40" r="3.5" fill="#021428" />
        <circle cx="36.5" cy="38.5" r="1.5" fill="white" />

        {/* --- VÂY BÊN HÔNG (Quạt nhẹ nhàng) --- */}
        <g className="origin-[65px_55px] animate-[finFlap_1.2s_ease-in-out_infinite_alternate]">
          <path d="M 65 55 Q 85 50 80 65 Q 70 65 65 55 Z" fill={colors.fin} opacity="0.9"/>
        </g>
      </svg>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes swimBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          @keyframes tailWag { 0% { transform: rotate(-10deg); } 100% { transform: rotate(10deg); } }
          @keyframes finFlap { 0% { transform: rotate(-5deg); } 100% { transform: rotate(15deg); } }
        `
      }} />
    </div>
  );
}