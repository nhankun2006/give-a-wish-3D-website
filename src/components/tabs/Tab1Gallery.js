'use client';

export default function Tab1Gallery({ activeTab, setSelectedImage }) {
  const images = [
    'IMG_0166.JPG', 'IMG_1008.JPG', 'IMG_1824.JPG', 'IMG_3536.JPG',
    'IMG_3779.JPG', 'IMG_4246.JPG', 'IMG_4247.JPG', 'IMG_9281.JPG', 
    'IMG_111.JPG', 'IMG_222.JPG'
  ];

  const Polaroid = ({ img, rotate, tapeColor, delay }) => (
    <div className="flex justify-center items-center w-full h-full p-1">
      <div
        onClick={() => setSelectedImage(img)}
        className={`relative bg-[#fafafa] p-1.5 pb-5 md:p-2 md:pb-8 rounded-sm shadow-lg transition-all duration-300 cursor-pointer hover:scale-125 hover:z-50 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] group wave-float w-full max-w-[120px] md:max-w-[150px] ${rotate}`}
        style={{ animationDelay: delay }}
      >
        {/* Đinh ghim 3D siêu cute */}
<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-200 to-sky-300 shadow-md border border-white/60 flex items-center justify-center">
    <span className="text-[10px]">🤍</span>
  </div>
</div>    
        {/* Khung Ảnh */}
        <div className="overflow-hidden bg-[#021428] aspect-square w-full shadow-inner border border-gray-200">
         <img
  src={`/images_tab1/${img}`}
  alt="Kỷ niệm"
  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
    img === "IMG_9281.JPG"
      ? "object-[center_10%]"
      : img === "IMG_3536.JPG"
      ? "object-[center_20%]"
      : ""
  }`}
/>
        </div>
      </div>
    </div>
  );

  return (
    <div
  className={`transition-all duration-1000 absolute inset-0 flex items-center justify-cente ${
    activeTab === 0
      ? 'opacity-100 scale-100 z-20'
      : 'opacity-0 scale-90 pointer-events-none z-0'
  }`}
>
      
      {/* KHUNG CHÍNH: KHÔNG CUỘN (overflow-hidden), NỀN ĐẠI DƯƠNG SÂU */}
      <div className="w-full h-full rounded-none border-[4px] border-[#38bdf8]/30 overflow-hidden relative deep-sea-bg flex flex-col">
        
        {/* Elements trang trí mờ ảo dưới đáy biển */}
        <div className="absolute top-[8%] left-[5%] text-4xl opacity-70 wave-float pointer-events-none">🐢</div>
        <div className="absolute top-[5%] right-[8%] text-5xl opacity-60 wave-float pointer-events-none" style={{ animationDelay: '1s' }}>🐳</div>
        <div className="absolute bottom-[22%] left-[5%] text-5xl opacity-70 wave-float pointer-events-none" style={{ animationDelay: '2s' }}>🦑</div>
        <div className="absolute top-[35%] left-[3%] text-2xl opacity-50 wave-float pointer-events-none" style={{ animationDelay: '0.5s' }}>🫧</div>
        <div className="absolute top-[50%] right-[4%] text-3xl opacity-50 wave-float pointer-events-none" style={{ animationDelay: '2.5s' }}>🫧</div>
        <div className="absolute bottom-[40%] left-[40%] text-3xl opacity-30 wave-float pointer-events-none" style={{ animationDelay: '3s' }}>🐟</div>

        <div className="flex flex-col items-center justify-center text-center w-full pt-6 pb-2 md:pt-8 shrink-0 z-10">
  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0369a1] drop-shadow-md tracking-wide font-sans">
    Góc nhỏ của dâng
  </h1>

  <p className="mt-2 text-[#0284c7] font-bold text-xs md:text-sm bg-[#e0f2fe] px-6 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-white/40">
    Nơi lưu giữ những thước ảnh lấp lánh dưới đáy đại dương – Để ánh mắt nói thay lời và tâm tư được sẻ chia
  </p>
</div>

        {/* NỘI DUNG GRID - Tự động co giãn vừa đúng 1 khung hình */}
        <div className="flex-1 min-h-0 w-full max-w-7xl mx-auto flex flex-col justify-center pb-4 z-10">
          {/* Lưới 5 cột x 3 hàng */}
          <div className="grid grid-cols-3 md:grid-cols-5 grid-rows-5 md:grid-rows-3 gap-2 md:gap-4 p-2 w-full h-full items-center justify-items-center">
            
            {/* Hàng 1 */}
            <Polaroid img={images[0]} rotate="-rotate-3" tapeColor="bg-[#38bdf8]" delay="0s" />
            
            {/* Khung Text 2 (Chiếm 2 cột) */}
            <div className="col-span-2 bg-[#f0f9ff]/90 backdrop-blur-md rounded-2xl p-3 md:p-5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-[#bae6fd] -rotate-1 relative w-full h-full min-h-[130px] flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl drop-shadow-md">🦀</div>
              <p className="text-[#0369a1] font-bold text-xs md:text-sm lg:text-base italic leading-relaxed text-center">
                "Những năm tháng, cũng chỉ là con số nếu mình dừng lại, mình bỏ cuộc. Nhưng nếu mình cứ đi, cứ kiên định với điều mình chọn thì những con số đó sẽ thật ý nghĩa và là giá trị bền vững của chính mình"
              </p>
            </div>
            
            <Polaroid img={images[1]} rotate="rotate-2" tapeColor="bg-[#f472b6]" delay="0.2s" />
            <Polaroid img={images[2]} rotate="-rotate-1" tapeColor="bg-[#34d399]" delay="0.4s" />

            {/* Hàng 2 */}
            <Polaroid img={images[3]} rotate="rotate-3" tapeColor="bg-[#fbbf24]" delay="0.6s" />
            <Polaroid img={images[4]} rotate="-rotate-2" tapeColor="bg-[#a78bfa]" delay="0.8s" />
            <Polaroid img={images[5]} rotate="rotate-1" tapeColor="bg-[#38bdf8]" delay="1s" />
            <Polaroid img={images[6]} rotate="-rotate-3" tapeColor="bg-[#f472b6]" delay="1.2s" />
            <Polaroid img={images[7]} rotate="rotate-2" tapeColor="bg-[#34d399]" delay="1.4s" />

            {/* Hàng 3 */}
            <Polaroid img={images[8]} rotate="-rotate-1" tapeColor="bg-[#fbbf24]" delay="1.6s" />
            <Polaroid img={images[9]} rotate="rotate-3" tapeColor="bg-[#a78bfa]" delay="1.8s" />
            
            {/* Khung Text 2 (Chiếm 2 cột) */}
<div className="col-span-2 -translate-y-2 bg-[#0c4a6e]/50 backdrop-blur-md rounded-2xl p-3 md:p-5 shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#f472b6]/30 -rotate-1 relative w-full h-full min-h-[130px] flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-300">
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl drop-shadow-md">🦀</div>
  <p className="text-[#fbcfe8] font-bold text-xs md:text-sm lg:text-base italic leading-relaxed text-center">
  "Chỉ cần biết bên trong mình đã trưởng thành, thì mình sẽ có niềm tin để bước ra vùng an toàn"
</p>
</div>
            
            {/* Ô trang trí cuối cùng cân bằng lưới */}
            <div className="flex justify-center items-center w-full h-full text-4xl wave-float opacity-80 cursor-default" style={{ animationDelay: '2s' }}>
              🐙
            </div>

          </div>
        </div>
      </div>

      <style>{`
        
        .deep-sea-bg {
  background: linear-gradient(
    180deg,
    #ecfeff 0%,
    #a5f3fc 35%,
    #67e8f9 65%,
    #f9a8d4 100%
  );
}

        /* Hiệu ứng trôi nhè nhẹ của nước biển */
        @keyframes waveFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .wave-float {
          animation: waveFloat 5s ease-in-out infinite;
        }

        .wave-float:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}