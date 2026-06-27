'use client';

export default function LandingScreen({ isLanding, setIsLanding }) {
    return (
        <div className={`absolute inset-0 z-40 flex flex-col items-center justify-center transition-all duration-[1500ms] ${isLanding ? 'opacity-100 scale-100' : 'opacity-0 scale-150 pointer-events-none'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-[#ff99c4] drop-shadow-[0_0_30px_rgba(255,153,196,0.8)] mb-4 text-center tracking-wide">
                Đại Dương Bất Ngờ
            </h1>
            <p className="text-xl md:text-2xl text-[#64d9ff] font-bold mb-16 drop-shadow-md text-center">
                Chào mừng đến với thế giới của Tam Triều Dâng
            </p>

            {/* Nút Ngọc Trai Kích Hoạt */}
            <button
                onClick={() => setIsLanding(false)}
                className="relative group flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm shadow-[0_0_40px_rgba(100,217,255,0.3)] hover:shadow-[0_0_60px_rgba(255,153,196,0.6)] transition-all duration-500 hover:scale-110 cursor-pointer focus:outline-none"
            >
                <div className="absolute inset-0 rounded-full border-[3px] border-[#ff99c4]/50 group-hover:border-[#64d9ff] animate-ping opacity-30"></div>
                <div className="text-center">
                    <span className="block text-4xl mb-2">🌊</span>
                    <span className="text-white font-bold tracking-widest text-sm uppercase text-[#64d9ff] group-hover:text-[#ff99c4] transition-colors drop-shadow-md">
                        Lặn Xuống
                    </span>
                </div>
            </button>
        </div>
    );
}