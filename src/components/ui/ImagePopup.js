'use client';

export default function ImagePopup({ selectedImage, setSelectedImage, images }) {
    // Nếu không có ảnh nào được chọn hoặc chưa truyền mảng images vào thì không hiện gì cả
    if (!selectedImage || !images) return null;

    // --- LOGIC CHUYỂN ẢNH ---
    const currentIndex = images.indexOf(selectedImage);
    
    const handlePrev = (e) => {
        e.stopPropagation(); // Chặn click lọt ra nền đen
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
    };
    
    const handleNext = (e) => {
        e.stopPropagation(); // Chặn click lọt ra nền đen
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#0284c7]/40 to-[#082f49]/80 backdrop-blur-xl cursor-zoom-out"
            style={{ zIndex: 99999 }}
            onClick={() => setSelectedImage(null)}
        >
            {/* --- Vài sinh vật biển bơi lội mờ ảo phía sau --- */}

            {/* --- NÚT LÙI (PREV): Hình bong bóng nước --- */}
            <button
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 text-white text-2xl md:text-3xl hover:bg-[#38bdf8]/50 hover:scale-125 hover:shadow-[0_0_20px_#38bdf8] transition-all z-20"
                onClick={handlePrev}
            >
                ❮
            </button>

            {/* --- ẢNH HIỂN THỊ: Khung bo tròn viền dày siêu kute --- */}
            <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                {/* Decor góc khung ảnh */}
                
                <img
                    src={`/images_tab1/${selectedImage}`}
                    className="max-w-[85vw] max-h-[85vh] object-contain rounded-[2rem] border-[8px] md:border-[12px] border-[#e0f2fe] shadow-[0_15px_50px_rgba(2,132,199,0.5)]"
                    alt="Phóng to"
                />
            </div>

            {/* --- NÚT TỚI (NEXT): Hình bong bóng nước --- */}
            <button
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 text-white text-2xl md:text-3xl hover:bg-[#38bdf8]/50 hover:scale-125 hover:shadow-[0_0_20px_#38bdf8] transition-all z-20"
                onClick={handleNext}
            >
                ❯
            </button>

            {/* --- NÚT ĐÓNG: Xoay vòng kute --- */}
            <button
                className="absolute top-6 right-6 md:top-8 md:right-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 text-white text-xl md:text-2xl hover:bg-[#f472b6]/60 hover:border-[#f472b6] hover:rotate-90 hover:scale-110 transition-all shadow-lg z-20"
                onClick={() => setSelectedImage(null)}
            >
                ✕
            </button>
        </div>
    );
}