'use client';

export default function ImagePopup({ selectedImage, setSelectedImage }) {
    if (!selectedImage) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out"
            style={{ zIndex: 99999 }}  /* Ép cứng z-index */
            onClick={() => setSelectedImage(null)}
        >
            <img
                src={`/images_tab1/${selectedImage}`}
                className="max-w-[90%] max-h-[90vh] rounded-2xl border-4 border-[#ff99c4] shadow-[0_0_40px_#ff99c4]"
                alt="Phóng to"
                onClick={(e) => e.stopPropagation()}  /* Chặn lỗi click nhầm */
            />
            <button
                className="absolute top-4 right-6 md:top-6 md:right-8 text-white text-5xl hover:text-[#ff99c4] transition-colors"
                onClick={() => setSelectedImage(null)}
            >
                ×
            </button>
        </div>
    );
}