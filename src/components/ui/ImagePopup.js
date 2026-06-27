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
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out"
            style={{ zIndex: 99999 }}  /* Ép cứng z-index */
            onClick={() => setSelectedImage(null)}
        >
            {/* NÚT LÙI (PREV) */}
            <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl hover:text-[#ff99c4] transition-all hover:scale-110 p-4 z-10"
                onClick={handlePrev}
            >
                ◀
            </button>

            {/* ẢNH HIỂN THỊ */}
            <img
                src={`/images_tab1/${selectedImage}`}
                className="max-w-[75%] max-h-[90vh] object-contain rounded-2xl border-4 border-[#ff99c4] shadow-[0_0_40px_#ff99c4] relative z-0"
                alt="Phóng to"
                onClick={(e) => e.stopPropagation()}  /* Chặn lỗi click nhầm */
            />

            {/* NÚT TỚI (NEXT) */}
            <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl hover:text-[#ff99c4] transition-all hover:scale-110 p-4 z-10"
                onClick={handleNext}
            >
                ▶
            </button>

            {/* NÚT ĐÓNG */}
            <button
                className="absolute top-4 right-6 md:top-6 md:right-8 text-white text-5xl hover:text-[#ff99c4] transition-colors z-10 hover:rotate-90 duration-300"
                onClick={() => setSelectedImage(null)}
            >
                ×
            </button>
        </div>
    );
}