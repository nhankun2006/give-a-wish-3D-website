'use client';

export default function Tab1Gallery({ activeTab, setSelectedImage }) {
  return (
    <div className={`transition-all duration-1000 absolute w-full max-w-4xl ${activeTab === 0 ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-90 pointer-events-none z-0'}`}>
      <div className="bg-[#0a192f]/50 backdrop-blur-md p-8 rounded-[2rem] border-2 border-[#ff99c4]/60 text-center w-full shadow-[0_0_30px_rgba(255,153,196,0.3)] mx-auto">
        <h1 className="text-4xl font-bold text-[#ff99c4] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Góc Nhỏ Của Dâng</h1>
        <p className="text-lg text-[#64d9ff] font-medium mb-8">Những mảnh ghép kỷ niệm lấp lánh dưới đáy đại dương.</p>

        {/* Khung chứa các hình ảnh (Gallery 8 tấm) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-4 px-2">
          {[
            'IMG_0166.JPG', 'IMG_1008.JPG', 'IMG_1824.JPG', 'IMG_3536.JPG',
            'IMG_3779.JPG', 'IMG_4246.JPG', 'IMG_4247.JPG', 'IMG_9281.JPG'
          ].map((imgName, index) => (

            <div
              key={index}
              onClick={() => setSelectedImage(imgName)}
              className="aspect-square bg-[#0a192f]/40 rounded-xl border border-[#64d9ff]/40 flex items-center justify-center hover:scale-105 hover:border-[#ff99c4] shadow-md hover:shadow-[0_0_20px_rgba(255,153,196,0.5)] transition-all duration-300 cursor-pointer overflow-hidden group relative"
            >
              {/* Hiển thị ảnh thực tế */}
              <img
                src={`/images_tab1/${imgName}`}
                alt={`Kỷ niệm ${index + 1}`}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />

              {/* Lớp phủ mờ và chữ 'Xem' hiện lên khi di chuột (Tạo cảm giác pro) */}
              <div className="absolute inset-0 bg-[#021428]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[#ff99c4] font-bold text-sm border-2 border-[#ff99c4]/50 px-4 py-1.5 rounded-full backdrop-blur-md">
                  Xem
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}