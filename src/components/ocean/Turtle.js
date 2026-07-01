'use client';

export default function Turtle({ style }) {
  const colors = {
    shellTop: '#64d9ff',   // Mai rùa xanh ngọc
    shellBottom: '#a1eeff', 
    body: '#b5f6ff',       // Da rùa xanh nhạt
    blush: '#ff99c4',      // Má hồng
  };

  return (
    <div className="creature group" style={{ position: 'absolute', ...style }}>
      <svg 
        viewBox="0 0 140 100" 
        width="100%" height="100%" 
        className="drop-shadow-[0_6px_12px_rgba(100,217,255,0.2)] animate-[turtleFloat_6s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id="turtleShell" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.shellTop} />
            <stop offset="100%" stopColor={colors.shellBottom} />
          </linearGradient>
        </defs>

        {/* --- CHÂN BƠI (FLIPPERS) --- */}
        {/* Chân sau */}
        <ellipse cx="40" cy="70" rx="15" ry="8" fill={colors.body} transform="rotate(20 40 70)" className="animate-[flipperFlap_2s_ease-in-out_infinite_alternate]" />
        <ellipse cx="65" cy="75" rx="15" ry="8" fill={colors.body} transform="rotate(-15 65 75)" className="animate-[flipperFlap_2s_ease-in-out_infinite_alternate-reverse]" />
        
        {/* Chân trước (Quạt nước) */}
        <g className="origin-[95px_65px] animate-[flipperFlap_2s_ease-in-out_infinite_alternate]">
          <ellipse cx="105" cy="70" rx="20" ry="10" fill={colors.body} transform="rotate(30 105 70)" />
        </g>

        {/* --- MAI RÚA --- */}
        <path 
          d="M 25 60 C 25 20, 95 20, 95 60 C 95 70, 25 70, 25 60 Z" 
          fill="url(#turtleShell)" 
        />
        
        {/* Họa tiết mai rùa (Các đốm tròn múp míp) */}
        <g fill="white" opacity="0.3">
          <circle cx="45" cy="40" r="6" />
          <circle cx="60" cy="32" r="8" />
          <circle cx="75" cy="45" r="7" />
          <circle cx="55" cy="52" r="5" />
        </g>

        {/* --- ĐẦU VÀ MẶT --- */}
        <g className="origin-[85px_50px] animate-[headBob_3s_ease-in-out_infinite_alternate]">
          <circle cx="110" cy="48" r="16" fill={colors.body} />
          
          {/* Má hồng */}
          <ellipse cx="116" cy="54" rx="5" ry="2.5" fill={colors.blush} opacity="0.7" />
          
          {/* Mắt to tròn */}
          <circle cx="112" cy="46" r="4" fill="#021428" />
          <circle cx="111" cy="45" r="1.5" fill="white" />
          
          {/* Miệng cười hiền lành */}
          <path d="M 120 50 Q 123 53 126 50" stroke="#021428" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        </g>
      </svg>


    </div>
  );
}