'use client';

export default function Jellyfish({ style }) {
  // Bảng màu kẹo dẻo mộng mơ
  const colors = {
    capTop: '#ffd6e8',     // Đỉnh đầu sáng mờ
    capBottom: '#ffb3d6',  // Viền dưới hồng đào
    tentacle1: '#8ef1ff',  // Xúc tu màu xanh ngọc bích
    tentacle2: '#ffb3d6',  // Xúc tu màu hồng pastel
    blush: '#ff4d8d'       // Má hồng
  };

  return (
    <div className="creature group" style={{ position: 'absolute', ...style }}>
      <svg 
        viewBox="0 0 120 140" 
        width="100%" 
        height="100%" 
        /* Hiệu ứng trôi lơ lửng toàn thân */
        className="drop-shadow-[0_8px_15px_rgba(255,179,214,0.3)] animate-[jellyFloat_4s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id="jellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.capTop} />
            <stop offset="100%" stopColor={colors.capBottom} />
          </linearGradient>
        </defs>

        {/* --- CÁC XÚC TU (Mềm mại, ú nu) --- */}
        <g strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.9">
          {/* Xúc tu trái */}
          <g className="origin-[40px_65px] animate-[tentacleSway_2.5s_ease-in-out_infinite_alternate]">
            <path d="M 40 65 Q 25 95 38 125" stroke={colors.tentacle1} />
          </g>
          
          {/* Xúc tu giữa */}
          <g className="origin-[60px_65px] animate-[tentacleSway_3s_ease-in-out_infinite_alternate-reverse]">
            <path d="M 60 65 Q 75 100 55 130" stroke={colors.tentacle2} />
          </g>

          {/* Xúc tu phải */}
          <g className="origin-[80px_65px] animate-[tentacleSway_2s_ease-in-out_infinite_alternate]">
            <path d="M 80 65 Q 95 95 82 125" stroke={colors.tentacle1} />
          </g>
        </g>

        {/* --- THÂN SỨA (Cái ô nấm kẹo dẻo múp míp) --- */}
        <g className="origin-[60px_40px] animate-[jellyPulse_3s_ease-in-out_infinite_alternate]">
          {/* Lớp vỏ sứa scalloped (lượn sóng ở đáy) */}
          <path 
            d="M 20 65 C 20 15, 100 15, 100 65 Q 90 73 80 65 Q 70 73 60 65 Q 50 73 40 65 Q 30 73 20 65 Z" 
            fill="url(#jellyGrad)" 
            opacity="0.95" 
          />

          {/* Vệt sáng bóng bẩy mượt mà (Highlight) */}
          <path 
            d="M 35 25 Q 60 15 85 25" 
            stroke="white" 
            strokeWidth="5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.5" 
          />

          {/* --- KHUÔN MẶT ĐÁNG YÊU --- */}
          {/* Má hồng */}
          <ellipse cx="32" cy="52" rx="7" ry="4" fill={colors.blush} opacity="0.3" />
          <ellipse cx="88" cy="52" rx="7" ry="4" fill={colors.blush} opacity="0.3" />

          {/* Mắt to đen nháy long lanh */}
          <circle cx="42" cy="45" r="5" fill="#021428" /> {/* Mắt trái */}
          <circle cx="40" cy="43" r="2" fill="white" />   {/* Điểm sáng */}

          <circle cx="78" cy="45" r="5" fill="#021428" /> {/* Mắt phải */}
          <circle cx="76" cy="43" r="2" fill="white" />   {/* Điểm sáng */}

          {/* Miệng nhỏ xíu đang cười */}
          <path d="M 56 48 Q 60 52 64 48" stroke="#021428" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
        </g>
      </svg>

      {/* --- HIỆU ỨNG CHUYỂN ĐỘNG --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes jellyFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          @keyframes jellyPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03) scaleY(0.95); }
          }
          @keyframes tentacleSway {
            0% { transform: rotate(-10deg); }
            100% { transform: rotate(10deg); }
          }
        `
      }} />
    </div>
  );
}