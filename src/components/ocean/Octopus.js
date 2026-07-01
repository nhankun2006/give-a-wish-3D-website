'use client';

export default function Octopus({ style }) {
  const colors = {
    top: '#e2b4fa',    // Tím pastel mộng mơ
    bottom: '#ff99c4', // Chuyển dần sang hồng
    blush: '#ff4d8d'
  };

  return (
    <div className="creature group" style={{ position: 'absolute', ...style }}>
      <svg 
        viewBox="0 0 120 140" 
        width="100%" height="100%" 
        className="drop-shadow-[0_8px_15px_rgba(226,180,250,0.3)] animate-[octoFloat_4s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id="octoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.top} />
            <stop offset="100%" stopColor={colors.bottom} />
          </linearGradient>
        </defs>

        {/* --- CÁC XÚC TU (Uốn lượn) --- */}
        <g stroke="url(#octoGrad)" strokeWidth="14" fill="none" strokeLinecap="round">
          {/* Xúc tu 1 */}
          <g className="origin-[30px_70px] animate-[tentacleWiggle_2s_ease-in-out_infinite_alternate]">
            <path d="M 35 70 Q 15 100 25 120" />
          </g>
          {/* Xúc tu 2 */}
          <g className="origin-[50px_70px] animate-[tentacleWiggle_2.5s_ease-in-out_infinite_alternate-reverse]">
            <path d="M 50 70 Q 50 110 40 125" />
          </g>
          {/* Xúc tu 3 */}
          <g className="origin-[70px_70px] animate-[tentacleWiggle_2.2s_ease-in-out_infinite_alternate]">
            <path d="M 70 70 Q 70 110 80 125" />
          </g>
          {/* Xúc tu 4 */}
          <g className="origin-[90px_70px] animate-[tentacleWiggle_2.8s_ease-in-out_infinite_alternate-reverse]">
            <path d="M 85 70 Q 105 100 95 120" />
          </g>
        </g>

        {/* --- ĐẦU BẠCH TUỘC (Béo tròn) --- */}
        <g className="animate-[octoSquish_4s_ease-in-out_infinite]">
          <path d="M 20 70 C 20 10, 100 10, 100 70 C 100 85, 20 85, 20 70 Z" fill="url(#octoGrad)" />
          
          <path d="M 40 25 Q 60 15 80 25" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* Khuôn mặt */}
          <ellipse cx="38" cy="60" rx="6" ry="3" fill={colors.blush} opacity="0.4" />
          <ellipse cx="82" cy="60" rx="6" ry="3" fill={colors.blush} opacity="0.4" />

          <circle cx="45" cy="52" r="5" fill="#021428" />
          <circle cx="43.5" cy="50.5" r="2" fill="white" />
          
          <circle cx="75" cy="52" r="5" fill="#021428" />
          <circle cx="73.5" cy="50.5" r="2" fill="white" />

          {/* Miệng nhỏ xíu */}
          <path d="M 57 58 Q 60 62 63 58" stroke="#021428" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
        </g>
      </svg>


    </div>
  );
}