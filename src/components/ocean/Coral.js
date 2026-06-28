'use client';

export default function Coral({ style }) {
  return (
    <div className="decor decor-coral group" style={{ position: 'absolute', ...style }}>
      <svg 
        viewBox="0 0 160 160" 
        width="100%" height="100%" 
        className="drop-shadow-[0_8px_10px_rgba(0,0,0,0.2)] animate-[sway_5s_ease-in-out_infinite] origin-bottom"
      >
        <defs>
          <linearGradient id="cuteCoralBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff70a6" />
            <stop offset="100%" stopColor="#d63c65" />
          </linearGradient>
          <linearGradient id="cuteCoralFront" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffb3c6" />
            <stop offset="100%" stopColor="#ffc2d4" />
          </linearGradient>
        </defs>

        {/* BÓNG ĐỔ DƯỚI ĐÁY */}
        <ellipse cx="80" cy="148" rx="25" ry="6" fill="rgba(0,0,0,0.15)" />

        <g strokeLinecap="round" strokeLinejoin="round">
          {/* LỚP SAN HÔ SAU (Màu sậm hơn, thân béo ú) */}
          <g stroke="url(#cuteCoralBack)" fill="none" strokeWidth="20">
            <path d="M 60 140 Q 40 100 35 60" />
            <path d="M 45 90 Q 25 70 25 45" strokeWidth="16" />
            <path d="M 100 140 Q 125 100 135 60" />
            <path d="M 120 95 Q 145 75 145 50" strokeWidth="16" />
          </g>

          {/* LỚP SAN HÔ TRƯỚC (Màu sáng tươi kẹo ngọt, ú nu) */}
          <g stroke="url(#cuteCoralFront)" fill="none" strokeWidth="24">
            <path d="M 80 145 Q 85 90 70 30" />
            <path d="M 75 90 Q 110 65 105 25" strokeWidth="18" />
            <path d="M 75 60 Q 50 45 55 15" strokeWidth="18" />
          </g>
          
          {/* VỆT SÁNG BÓNG BẨY (Làm san hô nhìn như thạch Jelly) */}
          <g stroke="white" fill="none" opacity="0.3">
            <path d="M 75 130 Q 80 90 65 35" strokeWidth="4" />
            <path d="M 80 85 Q 105 65 100 30" strokeWidth="3" />
          </g>
        </g>

        {/* BỌT KHÍ ĐÁNG YÊU (Trôi lơ lửng nhẹ) */}
        <g fill="white" opacity="0.6">
          <circle cx="50" cy="20" r="3" className="animate-[floatUp_3s_ease-in-out_infinite]" />
          <circle cx="100" cy="10" r="2" className="animate-[floatUp_2s_ease-in-out_infinite_0.5s]" />
          <circle cx="130" cy="30" r="4" className="animate-[floatUp_4s_ease-in-out_infinite_1s]" />
        </g>
      </svg>


    </div>
  );
}