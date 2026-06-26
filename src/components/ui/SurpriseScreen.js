'use client';

export default function SurpriseScreen({ showSurprise, setShowSurprise }) {
    if (!showSurprise) return null;

    return (
        <div className="step-2 absolute opacity-0 flex flex-col items-center px-4 w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff99c4_0%,transparent_60%)] opacity-40 animate-ping pointer-events-none"></div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#ff99c4] drop-shadow-[0_0_50px_#ff99c4] mb-8 leading-tight text-center relative z-10">
                CHÍNH LÀ DÂNG CHỨ AI!!! 💖
            </h1>

            <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-3xl border-2 border-[#64d9ff] shadow-[0_0_40px_#64d9ff] relative z-10 text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-3">🧜‍♀️ LỆNH TỪ ĐẠI DƯƠNG:</p>
                <p className="text-xl md:text-3xl font-extrabold text-[#64d9ff] animate-pulse">
                    CÁC CỤC BIỂN, ĐÀN CÁ, ĐÀN HẢI SẢN ĐÂU TIẾN LÊN TẶNG QUÀ NÀO !!!🦞🐟
                </p>
            </div>

            <div className="mt-12 text-5xl md:text-7xl animate-bounce flex gap-8 relative z-10">
                🦀 🌊 🎂 🌊 🧜‍♀️
            </div>
        </div>
    );
}