"use client";

import { useState, useEffect, useRef } from "react";

const fanMessages = [
  {
    id: "1", // Chuyển thành chuỗi (string) để khớp với nhãn trong JSON
    name: "bacvaxiu",
    icon: "🐚",
    accent: "#ff99c4",
    accentRgb: "255,153,196",
    delay: "0s",
    images: ["/fans/image1.png", "/fans/image2.png"],
  },
  {
    id: "2",
    name: "katmeyy_",
    icon: "🫧",
    accent: "#64d9ff",
    accentRgb: "100,217,255",
    delay: "1.5s",
  },
  {
    id: "3",
    name: "nabii_ove",
    icon: "🐢",
    accent: "#6ee7b7",
    accentRgb: "110,231,183",
    delay: "0.7s",
  },
  {
    id: "4",
    name: "xunhen_",
    icon: "🐠",
    accent: "#ffb347",
    accentRgb: "255,179,71",
    delay: "2.1s"
  },
  {
    id: "5",
    name: "_ienss_1008",
    icon: "🐬",
    accent: "#ffcc5c",
    accentRgb: "255,204,92",
    delay: "0.4s"
  },
  {
    id: "6",
    name: "votamgiahan",
    icon: "🐡",
    accent: "#88d8b0",
    accentRgb: "136,216,176",
    delay: "1.2s",
    images: ["/fans/image6.jpg"],
  },
  {
    id: "7",
    name: "bbi_luvli",
    icon: "🦀",
    accent: "#ff6f69",
    accentRgb: "255,111,105",
    delay: "2.8s"
  },
  {
    id: "8",
    name: "889698_luv",
    icon: "🐋",
    accent: "#b19cd9",
    accentRgb: "177,156,217",
    delay: "0.9s"
  },
  {
    id: "9",
    name: "herb.lite",
    icon: "🦑",
    accent: "#d4a5a5",
    accentRgb: "212,165,165",
    delay: "1.8s"
  },
  {
    id: "10",
    name: "ng.uyen8291",
    icon: "🪼",
    accent: "#e6a8d7",
    accentRgb: "230,168,215",
    delay: "0.2s"
  },
  {
    id: "11",
    name: "hatde_coco",
    icon: "🪸",
    accent: "#f3e5ab",
    accentRgb: "243,229,171",
    delay: "2.5s"
  },
  {
    id: "12",
    name: "_tduyen._",
    icon: "🦈",
    accent: "#96ceb4",
    accentRgb: "150,206,180",
    delay: "1.1s"
  },
  {
    id: "13",
    name: "hhhbhjjj33",
    icon: "🐙",
    accent: "#a1eeff",
    accentRgb: "161,238,255",
    delay: "2.3s"
  },
  {
    id: "14",
    name: "nnct_2310",
    icon: "🌊",
    accent: "#64d9ff",
    accentRgb: "100,217,255",
    delay: "0.6s"
  },
  {
  id: "15",
  name: "c Moon",
  icon: "🌙",
  accent: "#ff99c4",
  accentRgb: "255,153,196",
  delay: "1.9s",
  style: "filter: grayscale(100%) brightness(200%);"
},
  {
    id: "16",
    name: "tragung_213",
    icon: "🧊",
    accent: "#6ee7b7",
    accentRgb: "110,231,183",
    delay: "2.7s",
    images: ["/fans/image16.jpg"],
  },
];

export default function Tab2Journey({ activeTab }) {
  const [selectedFan, setSelectedFan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef(null);


  useEffect(() => {
    if (activeTab === 1) {
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setSelectedFan(null);
    }
  }, [activeTab]);

  // Xử lý sự kiện nhấn phím ESC để đóng thư
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedFan(null);
      }
    };
    
    if (selectedFan) {
      window.addEventListener("keydown", handleKeyDown);
    }
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFan]);

  const handleOpenLetter = async (fan) => {
    if (!fan) {
      setSelectedFan(null);
      return;
    }

    // Đổi giao diện sang người mới ngay lập tức để tạo độ mượt
    setSelectedFan({ ...fan, full: "" });

    try {
      const response = await fetch("/fans/messages.json");
      const allMessages = await response.json();
      const text = allMessages[fan.id];

      if (text) {
        setSelectedFan({ ...fan, full: text });
      } else {
        setSelectedFan({
          ...fan,
          full: "Không tìm thấy thư của bạn này rồi 😢",
        });
      }
    } catch (error) {
      console.error("Lỗi khi đọc thư:", error);
      setSelectedFan({
        ...fan,
        full: "Dòng nước đã cuốn trôi bức thư này mất rồi... 🌊",
      });
    }
  };
  const currentIndex = selectedFan
    ? fanMessages.findIndex((f) => f.id === selectedFan.id)
    : -1;
  const prevFan =
    currentIndex >= 0
      ? fanMessages[
          (currentIndex - 1 + fanMessages.length) % fanMessages.length
        ]
      : null;
  const nextFan =
    currentIndex >= 0
      ? fanMessages[(currentIndex + 1) % fanMessages.length]
      : null;
  return (
    <>
      <div
        className={`transition-all duration-1000 absolute inset-0 overflow-y-auto overflow-x-hidden custom-scrollbar ${activeTab === 1 ? "opacity-100 z-20" : "opacity-0 pointer-events-none z-0"}`}
        style={{
  background: `
    radial-gradient(circle at 18% 20%, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 18%),
    radial-gradient(circle at 82% 18%, rgba(255,255,255,.45) 0%, rgba(255,255,255,0) 15%),
    radial-gradient(circle at 12% 75%, rgba(255,220,235,.45) 0%, rgba(255,220,235,0) 22%),
    radial-gradient(circle at 90% 80%, rgba(255,240,180,.28) 0%, rgba(255,240,180,0) 20%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.12) 0%, transparent 45%),
    radial-gradient(circle at 65% 35%, rgba(175,255,250,.22) 0%, transparent 30%),
    linear-gradient(
              180deg,
              #1f4b82 0%,   /* Xanh biển đậm ở trên mặt */
              #173b69 40%,  /* Tối dần xuống dưới */
              #122d58 100%  /* Dưới đáy biển tối thẳm */
            )
`
}}


      >
        <div
  className="absolute inset-0 pointer-events-none"
  style={{
    background: `
      radial-gradient(circle at 20% 30%, rgba(255,255,255,.35), transparent 30%),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,.25), transparent 25%),
      radial-gradient(circle at 50% 60%, rgba(255,255,255,.15), transparent 35%)
    `,
    mixBlendMode: "screen"
  }}
/>

{[
  {top:"8%",left:"8%",size:70},
  {top:"18%",left:"18%",size:95},
  {top:"12%",left:"72%",size:65},
  {top:"15%",left:"92%",size:55},
  {top:"40%",left:"15%",size:55},
  {top:"58%",left:"85%",size:85},
  {top:"70%",left:"8%",size:110},
  {top:"80%",left:"92%",size:90},
].map((b,i)=>(
  <div
    key={i}
    className="absolute rounded-full"
    style={{
      top:b.top,
      left:b.left,
      width:b.size,
      height:b.size,
      background:"rgba(255,255,255,.28)",
      filter:"blur(4px)",
      boxShadow:"0 0 45px rgba(255,255,255,.45)"
    }}
  />
))}
{Array.from({ length: 120 }).map((_, i) => (
  <div
    key={i}
    className="absolute rounded-full animate-pulse"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`,
      background: [
        "#fff",
        "#fff7c2",
        "#ffe4f3",
        "#dffcff",
      ][Math.floor(Math.random() * 4)],
      opacity: 0.8,
      boxShadow: "0 0 12px currentColor",
    }}
  />
))}
        <div className="min-h-full flex flex-col items-center justify-center py-16 md:py-24">
          {/* HEADER SECTION */}
          <div className="text-center mb-4 mt-8 md:mt-2 relative px-4 w-full max-w-4xl mx-auto flex-shrink-0">
            
<div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-lg mb-5">
  <span>💖</span>
  <span className="text-[#4f6d7a] font-bold uppercase tracking-wide">
    Từ Trái Tim Đại Dương
  </span>
</div>
            <h2
  className="text-3xl md:text-5xl font-extrabold text-[#f78fb3] mb-4 pb-1"
  style={{
    textShadow: `
      0 2px 0 rgba(255,255,255,.95),
      0 0 10px rgba(255,180,210,.8),
      0 4px 12px rgba(255,120,170,.35)
    `,
    WebkitTextStroke: "2px rgba(255,255,255,.9)",
    animation: isVisible
      ? "fadeInUp 0.8s ease-out 0.2s forwards"
      : "none",
    opacity: 0,
  }}
>
  Lời Tâm Sự Của Fan
</h2>
            <p
  className="text-[#4f6d7a] text-sm md:text-base font-semibold max-w-lg mx-auto"
  style={{
    textShadow: "0 2px 8px rgba(255,255,255,.6)",
    animation: isVisible
      ? "fadeInUp 0.8s ease-out 0.4s forwards"
      : "none",
    opacity: 0,
  }}
>
  Những dòng tin nhắn lấp lánh gửi đến Công chúa Biển Cả 🌊
</p>
          </div>

          {/* DYNAMIC BUBBLES CONTAINER */}
          <div className="relative w-full max-w-5xl mx-auto mt-8 z-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10 pb-16 pt-8 px-4 justify-items-center">
              {fanMessages.map((fan, index) => (
                <div
                  key={fan.id}
                  onClick={() => handleOpenLetter(fan)}
                  className="relative cursor-pointer group flex flex-col items-center"
                  style={{
                    animation: isVisible
                      ? `fadeInUp 0.8s ease-out ${0.4 + index * 0.1}s forwards, floating ${5 + (index % 3)}s ease-in-out infinite ${fan.delay}`
                      : "none",
                    opacity: 0,
                  }}
                >
                  {/* Bubble Shape (Giao diện bong bóng xà phòng dễ thương) */}
                  <div
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full backdrop-blur-sm border-2 flex items-center justify-center text-4xl md:text-5xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-[5deg] relative"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 70%), rgba(${fan.accentRgb}, 0.15)`,
                      borderColor: `rgba(${fan.accentRgb}, 0.6)`,
                      boxShadow: `inset 0 0 20px rgba(${fan.accentRgb}, 0.4), 0 10px 25px rgba(${fan.accentRgb}, 0.3), 0 0 15px rgba(255,255,255,0.3)`,
                    }}
                  >
                    <span className="relative z-10 group-hover:animate-bounce">
                      {fan.icon}
                    </span>

                    {/* Điểm sáng lấp lánh (Highlight) kiểu bong bóng anime */}
                    <div className="absolute top-3 left-4 w-4 h-4 md:w-5 md:h-5 bg-white/90 rounded-full blur-[1px]"></div>
                    <div className="absolute top-8 left-3 w-1.5 h-1.5 md:w-2 md:h-2 bg-white/70 rounded-full blur-[0.5px]"></div>
                    <div className="absolute bottom-3 right-4 w-3 h-1.5 bg-white/40 rounded-full blur-[1px] rotate-[-45deg]"></div>
                  </div>

                  {/* Name Tag (Kẹo dẻo) */}
                  <div
                    className="mt-5 px-6 py-1.5 rounded-full backdrop-blur-md bg-white/10 border-2 text-white font-bold text-sm md:text-base transition-all duration-300 group-hover:bg-white/25"
                    style={{
                      borderColor: `rgba(${fan.accentRgb}, 0.5)`,
                      boxShadow: `0 5px 15px rgba(0,0,0,0.2), 0 0 10px rgba(${fan.accentRgb}, 0.2)`,
                      textShadow: "0 2px 4px rgba(0,0,0,0.4)"
                    }}
                  >
                    @{fan.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === READING MODAL (Full fan message) === */}
      {selectedFan && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 pb-24 md:pb-32"
          onClick={() => handleOpenLetter(null)}
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          {/* Backdrop mờ ảo */}
          <div className="absolute inset-0 bg-[#020a14]/80 backdrop-blur-sm" />

          {/* Modal content - Bức thư dễ thương */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl overflow-hidden text-[#5a4a42]"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: `0 0 60px rgba(${selectedFan.accentRgb},0.3), 0 20px 50px rgba(0,0,0,0.5)`,
              border: `3px solid ${selectedFan.accent}`,
              backgroundColor: "#fffcf8",
              /* Nhuộm màu giấy nhẹ nhàng theo màu của từng fan */
              backgroundImage: `radial-gradient(circle at top right, rgba(${selectedFan.accentRgb}, 0.08), transparent 400px), radial-gradient(circle at bottom left, rgba(${selectedFan.accentRgb}, 0.08), transparent 400px)`,
            }}
          >
            {/* Header thư họa tiết đáng yêu (Đổi Icon theo ID fan) */}
            <div
              className="h-14 w-full flex items-center justify-center relative shadow-sm z-20"
              style={{ backgroundColor: selectedFan.accent }}
            >
              <span className="text-white text-lg md:text-xl tracking-[0.2em] font-bold uppercase drop-shadow-md flex items-center gap-2">
                {selectedFan.id === 1
                  ? "🎀"
                  : selectedFan.id === 2
                    ? "🫧"
                    : "🌊"}{" "}
                Gửi từ đại dương{" "}
                {selectedFan.id === 1
                  ? "🎀"
                  : selectedFan.id === 2
                    ? "🫧"
                    : "🌊"}
              </span>
              {/* Nếp gấp ruy băng hai bên */}
              <div className="absolute -bottom-2 left-4 w-4 h-4 rotate-45 bg-black/20 z-[-1]"></div>
              <div className="absolute -bottom-2 right-4 w-4 h-4 rotate-45 bg-black/20 z-[-1]"></div>
            </div>

            {/* Thông tin người gửi */}
            <div
              className="flex items-center justify-between p-5 md:p-6 border-b-2 border-dashed flex-shrink-0 z-10 relative bg-white/50 backdrop-blur-sm"
              style={{ borderColor: `rgba(${selectedFan.accentRgb}, 0.3)` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-inner border-2"
                  style={{
                    backgroundColor: `rgba(${selectedFan.accentRgb}, 0.1)`,
                    borderColor: selectedFan.accent,
                  }}
                >
                  {selectedFan.icon}
                </div>
                <div>
                  <p
                    className="font-extrabold text-xl md:text-2xl"
                    style={{ color: selectedFan.accent }}
                  >
                    @{selectedFan.name}
                  </p>
                  <p
                    className="text-sm font-medium opacity-80"
                    style={{ color: selectedFan.accent }}
                  >
                    Thư tay trôi nổi 💌
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenLetter(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:rotate-90 transition-all duration-300 text-lg shadow-sm font-bold border cursor-pointer"
                style={{
                  backgroundColor: `rgba(${selectedFan.accentRgb}, 0.1)`,
                  color: selectedFan.accent,
                  borderColor: `rgba(${selectedFan.accentRgb}, 0.2)`,
                }}
              >
                ✕
              </button>
            </div>

            {/* Nội dung thư */}
            <div
              className="overflow-y-auto flex-1 p-6 md:p-10 custom-scrollbar font-sans text-[16px] md:text-[18px] leading-[2.2] relative"
              style={{
                /* Đường kẻ ô ly mang màu riêng của từng fan */
                backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, rgba(${selectedFan.accentRgb}, 0.15) 31px, rgba(${selectedFan.accentRgb}, 0.15) 32px)`,
                backgroundAttachment: "local",
              }}
            >
              {/* Con dấu chìm */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] pointer-events-none rotate-[-15deg] mix-blend-multiply"
                style={{ opacity: 0.04, color: selectedFan.accent }}
              >
                {selectedFan.icon}
              </div>

              {/* Icon dán trang trí góc thay đổi theo Fan */}
              <div className="absolute top-4 right-4 text-4xl opacity-20 rotate-[15deg] pointer-events-none">
                {selectedFan.id === 1
                  ? "🌸"
                  : selectedFan.id === 2
                    ? "🐠"
                    : "🐚"}
              </div>
              <div className="absolute bottom-4 left-4 text-5xl opacity-20 rotate-[-20deg] pointer-events-none">
                {selectedFan.id === 1
                  ? "✨"
                  : selectedFan.id === 2
                    ? "🪼"
                    : "🪸"}
              </div>

              <div className="relative z-10 mt-[-6px]">
                {/* --- PHẦN 1: HIỂN THỊ CHỮ --- */}
                {(selectedFan.full || "Đang từ từ mở thư... 🌊")
                  .split("\n")
                  .map((line, i) => (
                    <p
                      key={i}
                      // Thêm 'text-justify' để căn đều 2 bên lề giống trong ảnh
                      // Thêm 'mb-3' để tạo khoảng cách giữa các đoạn văn nhìn thoáng hơn
                      className={`text-[#4a3f35] text-justify ${line.trim() === "" ? "h-4 md:h-6" : "mb-3 md:mb-4"}`}
                    >
                      {line || "\u00A0"}
                    </p>
                  ))}

                {/* --- PHẦN 2: HIỂN THỊ ẢNH ĐÍNH KÈM (NẾU CÓ) --- */}
                {selectedFan.images && selectedFan.images.length > 0 && (
                  <div className="mt-8 flex flex-col items-center gap-6 pb-4">
                    {/* Dải phân cách dễ thương để tách biệt chữ và ảnh */}
                    <div className="flex items-center gap-4 opacity-50 w-full justify-center">
                      <div
                        className="h-[1px] w-16"
                        style={{ backgroundColor: selectedFan.accent }}
                      ></div>
                      <span className="text-xl">📸</span>
                      <div
                        className="h-[1px] w-16"
                        style={{ backgroundColor: selectedFan.accent }}
                      ></div>
                    </div>

                    {/* Lặp qua mảng ảnh - Đã chỉnh sửa để ảnh nhỏ gọn và xếp cạnh nhau */}
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                      {selectedFan.images.map((imgUrl, index) => (
                        <img
                          key={index}
                          src={imgUrl}
                          alt={`Ảnh đính kèm từ ${selectedFan.name}`}
                          // Điểm mấu chốt: Khống chế chiều cao max-h-[200px] hoặc [250px] để ảnh luôn nhỏ gọn
                          className="w-auto max-w-[85%] max-h-[200px] md:max-h-[280px] object-contain rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] border-[3px] rotate-[-2deg] hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer"
                          style={{
                            borderColor: `rgba(${selectedFan.accentRgb}, 0.4)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Nút điều hướng & Đóng thư */}
            <div
              className="p-4 md:p-5 border-t-2 border-dashed flex-shrink-0 bg-white/80 backdrop-blur-sm z-10 relative flex justify-between items-center gap-3 md:gap-4"
              style={{ borderColor: `rgba(${selectedFan.accentRgb}, 0.3)` }}
            >
              {/* Nút lùi */}
              <button
                onClick={() => handleOpenLetter(prevFan)}
                className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm border text-xl cursor-pointer"
                style={{
                  backgroundColor: `rgba(${selectedFan.accentRgb}, 0.1)`,
                  color: selectedFan.accent,
                  borderColor: `rgba(${selectedFan.accentRgb}, 0.3)`,
                }}
              >
                ◀
              </button>

              {/* Nút giữa (Gấp thư - Giữ nguyên y như cũ) */}
              <button
                onClick={() => handleOpenLetter(null)}
                className="flex-1 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.01] text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: selectedFan.accent }}
              >
                Gấp Thư Lại{" "}
                {selectedFan.id === "1"
                  ? "🎀"
                  : selectedFan.id === "2"
                    ? "🫧"
                    : "💌"}
              </button>

              {/* Nút tới */}
              <button
                onClick={() => handleOpenLetter(nextFan)}
                className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm border text-xl cursor-pointer"
                style={{
                  backgroundColor: `rgba(${selectedFan.accentRgb}, 0.1)`,
                  color: selectedFan.accent,
                  borderColor: `rgba(${selectedFan.accentRgb}, 0.3)`,
                }}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}