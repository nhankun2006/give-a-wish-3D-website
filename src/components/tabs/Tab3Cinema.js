'use client';

import gsap from 'gsap';
export default function Tab3Cinema({ activeTab, showSurprise, setShowSurprise }) {
  return (
    <div className={`transition-all duration-1000 absolute w-full max-w-5xl px-4 ${activeTab === 2 ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-110 pointer-events-none z-0'}`}>
      <div className="bg-[#0a192f]/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl border-2 border-[#64d9ff]/50 flex flex-col items-center shadow-[0_0_30px_rgba(100,217,255,0.2)] relative">

        {/* BÉ CUA ÔM NÚT BÍ MẬT */}
        <div className={`absolute top-0 -right-40 md:-right-50 md:-top-2 z-30 flex flex-col items-center ${showSurprise ? 'hidden' : ''}`}>
          <div className="animate-bounce flex flex-col items-center mb-1">
            <span className="bg-white/95 text-[#ff70a6] text-sm font-black px-4 py-1.5 rounded-2xl shadow-[0_0_15px_#ff99c4] border-2 border-[#ff70a6]">
              Psst! Em ở đây nè! 🦀
            </span>
            <span className="text-3xl drop-shadow-md mt-1">⬇️</span>
          </div>
          <button
            onClick={() => {
              setShowSurprise(true);
              setTimeout(() => {
                const tl = gsap.timeline();
                tl.fromTo('.surprise-bg', { opacity: 0 }, { opacity: 1, duration: 1 })
                  .fromTo('.step-1', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
                  .to('.step-1', { opacity: 0, duration: 0.5, delay: 3.5 }) // Tăng thời gian đọc dòng Radar lên 3.5s
                  .fromTo('.step-2', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" });
              }, 150);
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#ff99c4] to-[#64d9ff] text-black rounded-full font-bold shadow-[0_0_20px_#ff99c4] hover:scale-110 transition-transform hover:rotate-3"
          >
            Trạm Bí Mật! 🎁
          </button>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#64d9ff] mb-6 drop-shadow-md">Rạp Chiếu Phim Đại Dương</h2>

        {/* KHUNG YOUTUBE */}
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#ff99c4]/30 shadow-[0_0_30px_rgba(255,153,196,0.2)] relative">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/8sVtL0o-v7U"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </div>
  );
}
