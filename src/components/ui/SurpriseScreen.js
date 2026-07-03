'use client';

export default function SurpriseScreen({ showSurprise, setShowSurprise }) {
    if (!showSurprise) return null;

    return (
        <div className="step-2 absolute opacity-0 flex flex-col items-center px-4 w-full z-20">
            {/* Ánh sáng bùng nổ phía sau (Đổi sang 2 dải màu Pink - Cyan) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,153,196,0.25)_0%,rgba(100,217,255,0.1)_30%,transparent_60%)] animate-[pulse_4s_infinite] pointer-events-none"></div>

            {/* Tiêu đề bùng nổ cực mạnh */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fbcfe8] to-[#ff99c4] drop-shadow-[0_0_40px_rgba(255,153,196,0.8)] mb-8 leading-tight text-center relative z-10 hover:scale-105 transition-transform duration-500">
                CHÍNH LÀ DÂNG CHỨ AI!!! 💖
            </h1>

            {/* Bảng Lệnh Thủy Tề (Hiệu ứng kính trong suốt Glassmorphism) */}
            <div className="relative z-10 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl px-8 py-8 md:px-12 rounded-[3rem] border-[3px] border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_40px_rgba(100,217,255,0.3),inset_0_0_20px_rgba(255,255,255,0.5)] text-center max-w-4xl mx-auto group">
                
                {/* Icon trang trí quanh bảng */}
                <div className="absolute -top-6 -left-6 text-5xl animate-[bounce_4s_infinite] drop-shadow-md">🫧</div>
                <div className="absolute -bottom-6 -right-4 text-5xl animate-[bounce_5s_infinite] drop-shadow-md">🐚</div>
                
                <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-300 drop-shadow-md mb-4 uppercase tracking-widest">
                    🧜‍♀️ Lệnh từ Đại Dương:
                </p>
                <p className="text-xl md:text-3xl font-extrabold text-[#ff99c4] drop-shadow-[0_0_12px_rgba(255,153,196,0.6)] animate-pulse leading-relaxed">
                    "CÁC CỤC BIỂN, ĐÀN CÁ, ĐÀN HẢI SẢN ĐÂU<br className="hidden md:block"/> TIẾN LÊN TẶNG QUÀ NÀO !!!"
                </p>
            </div>

            {/* Đội quân hải sản trôi trong bong bóng nước */}
            <div className="mt-14 flex flex-wrap justify-center gap-4 md:gap-8 relative z-10">
                {/* Bé Cua */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/40 shadow-[inset_0_0_15px_rgba(255,255,255,0.5),0_10px_20px_rgba(0,0,0,0.2)] text-4xl md:text-5xl animate-[bounce_2.5s_infinite]">
                    🦀
                </div>
                
                {/* Bé Cá Dễ Thương */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-cyan-400/10 backdrop-blur-md rounded-full border border-cyan-300/40 shadow-[inset_0_0_15px_rgba(100,217,255,0.4),0_10px_20px_rgba(0,0,0,0.2)] text-4xl md:text-5xl animate-[bounce_3s_infinite] delay-100">
                    🐟
                </div>
                
                {/* Bé Bánh Kem (Tâm điểm bự nhất) */}
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-pink-400/20 backdrop-blur-md rounded-full border-[3px] border-pink-300/70 shadow-[inset_0_0_25px_rgba(255,153,196,0.6),0_0_40px_rgba(255,153,196,0.5)] text-5xl md:text-6xl animate-[bounce_2.2s_infinite] z-10">
                    🎂
                </div>
                
                {/* Bé Tôm Hùm */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-rose-400/10 backdrop-blur-md rounded-full border border-rose-300/40 shadow-[inset_0_0_15px_rgba(251,113,133,0.4),0_10px_20px_rgba(0,0,0,0.2)] text-4xl md:text-5xl animate-[bounce_2.8s_infinite] delay-200">
                    🦞
                </div>
                
                {/* Nàng Tiên Cá */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/40 shadow-[inset_0_0_15px_rgba(255,255,255,0.5),0_10px_20px_rgba(0,0,0,0.2)] text-4xl md:text-5xl animate-[bounce_3.2s_infinite] delay-300">
                    🧜‍♀️
                </div>
            </div>
        </div>
    );
}