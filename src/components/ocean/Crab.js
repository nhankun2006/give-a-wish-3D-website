'use client';

export default function Crab({ style }) {
  return (
    <div className="creature group" style={{ position: 'absolute', ...style }}>
      <svg 
        viewBox="0 0 120 100" 
        width="100%" 
        height="100%" 
        className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110 cursor-pointer"
      >
        <defs>
          {/* Gradient tạo hiệu ứng khối 3D cho mai cua */}
          <radialGradient id="crabBody" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffb3c6" />   {/* Điểm sáng */}
            <stop offset="60%" stopColor="#ff70a6" />   {/* Màu gốc */}
            <stop offset="100%" stopColor="#d63c65" />  {/* Đổ bóng tối */}
          </radialGradient>
          
          {/* Gradient cho càng cua */}
          <linearGradient id="clawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9a9e" />
            <stop offset="100%" stopColor="#ff70a6" />
          </linearGradient>
        </defs>

        {/* Bóng đen dưới đáy đại dương */}
        <ellipse cx="60" cy="85" rx="35" ry="6" fill="rgba(0,0,0,0.2)" className="animate-pulse" />

        {/* 6 CÁI CHÂN NHỎ (Khớp gập tự nhiên) */}
        <g stroke="#d63c65" strokeWidth="4" strokeLinecap="round" fill="none">
          {/* Chân trái */}
          <path d="M 35 65 Q 20 75 15 85" />
          <path d="M 40 70 Q 25 80 25 90" />
          <path d="M 45 75 Q 35 85 35 95" />
          {/* Chân phải */}
          <path d="M 85 65 Q 100 75 105 85" />
          <path d="M 80 70 Q 95 80 95 90" />
          <path d="M 75 75 Q 85 85 85 95" />
        </g>

        {/* CÀNG TRÁI (Có animation ngoe nguẩy) */}
        <g className="origin-[30px_50px] animate-[wiggle_2.5s_ease-in-out_infinite]">
          {/* Cánh tay */}
          <path d="M 40 55 Q 15 25 30 15" stroke="#d63c65" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Đầu kẹp (Pincer) */}
          <path d="M 30 15 C 5 -5, -5 25, 15 30 C 25 20, 20 15, 30 15 Z" fill="url(#clawGrad)" />
        </g>

        {/* CÀNG PHẢI (Ngoe nguẩy ngược nhịp) */}
        <g className="origin-[90px_50px] animate-[wiggle_2.5s_ease-in-out_infinite_1s_reverse]">
          {/* Cánh tay */}
          <path d="M 80 55 Q 105 25 90 15" stroke="#d63c65" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Đầu kẹp (Pincer) */}
          <path d="M 90 15 C 115 -5, 125 25, 105 30 C 95 20, 100 15, 90 15 Z" fill="url(#clawGrad)" />
        </g>

        {/* MAI CUA (Bầu bĩnh) */}
        <ellipse cx="60" cy="60" rx="45" ry="28" fill="url(#crabBody)" />
        
        {/* Nếp gấp trên vỏ cua cho thêm phần chân thật */}
        <path d="M 35 45 Q 60 60 85 45" stroke="#ffb3c6" strokeWidth="2" fill="none" opacity="0.6" />

        {/* CUỐNG MẮT */}
        <path d="M 45 45 L 40 25 M 75 45 L 80 25" stroke="#d63c65" strokeWidth="4" strokeLinecap="round" />

        {/* CẶP MẮT TO TRÒN */}
        {/* Lòng trắng */}
        <circle cx="40" cy="25" r="9" fill="white" />
        <circle cx="80" cy="25" r="9" fill="white" />
        {/* Lòng đen */}
        <circle cx="40" cy="25" r="4.5" fill="#021428" />
        <circle cx="80" cy="25" r="4.5" fill="#021428" />
        {/* Đốm sáng long lanh (Hiệu ứng Anime/Cute) */}
        <circle cx="38" cy="23" r="2" fill="white" />
        <circle cx="78" cy="23" r="2" fill="white" />

        {/* MIỆNG CƯỜI */}
        <path d="M 55 65 Q 60 70 65 65" stroke="#d63c65" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>


    </div>
  );
}