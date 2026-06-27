'use client';

export default function Starfish({ style }) {
  const colors = {
    body: '#ffa6c9',    // Hồng phấn pastel
    stroke: '#ff8db8',  // Viền hồng đậm hơn một chút
    blush: '#ff4d8d',   // Má hồng
    spots: '#ffb3d6'    // Đốm trang trí
  };

  return (
    <div className="creature group" style={{ position: 'absolute', ...style }}>
      <svg 
        viewBox="0 0 120 120" 
        width="100%" 
        height="100%" 
        className="drop-shadow-[0_6px_12px_rgba(255,141,184,0.3)] animate-[starWobble_3s_ease-in-out_infinite]"
      >
        {/* --- THÂN SAO BIỂN Ú NU --- */}
        {/* Dùng strokeWidth siêu dày kết hợp strokeLinejoin="round" để bo tròn triệt để các góc nhọn */}
        <path 
          d="M 60 25 
             L 72 48 L 98 48 
             L 77 65 L 85 92 
             L 60 76 L 35 92 
             L 43 65 L 22 48 
             L 48 48 Z" 
          fill={colors.body} 
          stroke={colors.body} 
          strokeWidth="18" 
          strokeLinejoin="round" 
        />
        
        {/* Viền ảo tạo cảm giác 3D nhẹ (highlight) */}
        <path 
          d="M 60 25 L 72 48 L 98 48 L 77 65 L 85 92 L 60 76 L 35 92 L 43 65 L 22 48 L 48 48 Z" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinejoin="round" 
          fill="none" 
          opacity="0.4" 
        />

        {/* --- CÁC ĐỐM TRANG TRÍ (Texture dễ thương) --- */}
        <g fill={colors.spots} opacity="0.8">
          <circle cx="60" cy="20" r="3" />
          <circle cx="95" cy="48" r="2.5" />
          <circle cx="85" cy="85" r="3" />
          <circle cx="35" cy="85" r="2.5" />
          <circle cx="25" cy="48" r="3" />
        </g>

        {/* --- KHUÔN MẶT KAWAII --- */}
        <g transform="translate(0, 5)"> {/* Hạ toàn bộ mặt xuống một chút cho cân đối */}
          {/* Má hồng phúng phính */}
          <ellipse cx="44" cy="62" rx="6" ry="3" fill={colors.blush} opacity="0.4" />
          <ellipse cx="76" cy="62" rx="6" ry="3" fill={colors.blush} opacity="0.4" />

          {/* Mắt to tròn */}
          <circle cx="50" cy="54" r="4.5" fill="#021428" />
          <circle cx="48.5" cy="52.5" r="1.5" fill="white" /> {/* Đốm sáng */}
          
          <circle cx="70" cy="54" r="4.5" fill="#021428" />
          <circle cx="68.5" cy="52.5" r="1.5" fill="white" /> {/* Đốm sáng */}

          {/* Miệng cười hình chữ V (Mèo) */}
          <path d="M 56 58 Q 60 63 64 58" stroke="#021428" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
        </g>
      </svg>

      {/* --- HIỆU ỨNG LẮC LƯ VÀ PHÌNH TO --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes starWobble {
            0% { transform: rotate(-8deg) scale(1); }
            50% { transform: rotate(8deg) scale(1.05); }
            100% { transform: rotate(-8deg) scale(1); }
          }
        `
      }} />
    </div>
  );
}