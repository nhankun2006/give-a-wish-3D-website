'use client';

export default function LandingScreen({ isLanding, setIsLanding }) {
    return (
        <div
            className={`absolute inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-[1200ms] ease-in-out ${isLanding
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Tiêu đề chính - Cảm hứng San hô & Bọt biển */}
            <h1 className="relative top-6 text-6xl md:text-8xl font-normal text-[#ff99c4] mb-3 text-center italic tracking-normal transition-all duration-300 select-none cursor-default hover:scale-102"
                style={{
                    fontFamily: "'Alex Brush', 'Great Vibes', cursive",
                    textShadow: "2px 2px 0px #fff, 4px 4px 0px rgba(0, 141, 218, 0.5), 5px 5px 10px rgba(0, 141, 218, 0.3)"
                }}>
                Thanh Âm Đại Dương
            </h1>

            {/* Câu quote tiếng Anh - Sáng trong như nước */}
            <p className="text-lg md:text-xl font-bold italic mb-8 text-[#aee4ff] drop-shadow-[0_0_10px_rgba(100,217,255,0.8)] text-center tracking-wider">
                "Charting new seas, anchored in love"
            </p>

            {/* 🌊 Khối nội dung chính - Giao diện Quả Bong Bóng Nước */}
            <div className="relative flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border-[2px] border-white/40 rounded-[3rem] md:rounded-[4rem] p-8 md:p-10 max-w-2xl mx-4 mb-10 shadow-[0_0_30px_rgba(100,217,255,0.2),inset_0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,153,196,0.3)] transition-all duration-500 group overflow-hidden">

                {/* Vệt sáng phản chiếu (Tạo cảm giác bong bóng 3D) */}
                <div className="absolute top-4 left-8 w-20 h-4 bg-white/40 rounded-full blur-[2px] rotate-[-15deg] pointer-events-none"></div>
                <div className="absolute bottom-6 right-8 w-10 h-3 bg-white/20 rounded-full blur-[1px] rotate-[-15deg] pointer-events-none"></div>

                <p className="text-base md:text-lg text-blue-50 font-medium leading-loose text-center px-2 md:px-6 z-10">
                    Nơi lưu giữ hải trình rực rỡ đã qua, vươn buồm đón nhận những chân trời mới, và là bến cảng neo đậu mọi tâm tư, tình cảm chân thành nhất từ{' '}
                    <span className="font-extrabold text-[#ff99c4] text-xl drop-shadow-[0_0_12px_rgba(255,153,196,0.9)] animate-pulse inline-block">
                        Oceans
                    </span>
                </p>

                <div className="mt-8 px-8 py-4 flex flex-col items-center justify-center bg-gradient-to-r from-[#ff99c4]/50 via-[#ffb3d1]/60 to-[#ff99c4]/50 rounded-[2rem] border-[2px] border-white/60 shadow-[0_0_25px_rgba(255,153,196,0.4)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 z-10 cursor-default">
                    <span className="text-white/95 font-semibold text-sm md:text-base text-center block drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] tracking-wider mb-1">
                        Chào mừng bạn đến với thế giới của
                    </span>
                    <span className="text-white font-extrabold text-2xl md:text-3xl text-center block drop-shadow-[0_3px_5px_rgba(0,0,0,0.4)] tracking-wide">
                        Tam Triều Dâng
                    </span>
                </div>
            </div>


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