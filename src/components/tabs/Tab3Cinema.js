'use client';

import gsap from 'gsap';

export default function Tab3Cinema({ activeTab, showSurprise, setShowSurprise }) {
  return (
    /* LỚP 1: NỀN FULL MÀN HÌNH - Bổ sung 'inset-0' và màu nền đại dương kẹo ngọt che kín trang chủ */
    <div
      className={`transition-all duration-1000 absolute inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden ${activeTab === 2 ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none z-0'}`}
      style={{
        background: `
    radial-gradient(circle at 15% 20%, rgba(255,255,255,.08), transparent 20%),
    radial-gradient(circle at 85% 15%, rgba(255,200,220,.08), transparent 18%),
    radial-gradient(circle at 20% 80%, rgba(120,240,255,.08), transparent 22%),
    linear-gradient(
      180deg,
      #1f4b82 0%,
      #173b69 40%,
      #122d58 100%
    )
  `
      }}
    >

      {/* LỚP 2: NỘI DUNG - Giữ nguyên hiệu ứng scale to/nhỏ của bạn */}
      <div className={`transition-transform duration-1000 w-full max-w-5xl px-4 -translate-y-8 ${activeTab === 2 ? 'scale-100' : 'scale-110'}`}>
        <div className="
relative
bg-[#173b69]/65
backdrop-blur-xl
rounded-[32px]
border-2
border-[#7dddf5]/30
p-5 md:p-6
w-[92%]
md:w-[95%]
mx-auto
shadow-[0_0_40px_rgba(130,220,255,.12)]
overflow-visible
">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
         
<div
  className={`absolute top-10 -right-48 md:-right-64 z-30 flex flex-col items-center ${
    showSurprise ? "hidden" : ""
  }`}
>
            <div className="animate-bounce flex flex-col items-center mb-1">
              <span
                className="
px-4
py-2
rounded-full
bg-white/20
backdrop-blur-lg
border
border-white/30
text-white
font-bold
shadow-lg
"
              >
                Post! Em ở đây nè! 🎁
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
                    .to('.step-1', { opacity: 0, duration: 0.5, delay: 3.5 })
                    .fromTo('.step-2', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" });
                }, 150);
              }}
              className="
relative
px-8
py-4
rounded-full
bg-gradient-to-b
from-[#ffd9ef]
to-[#ffc4df]
border-2
border-[#ffb7d7]
font-bold
text-[#6d5c77]
shadow-[0_0_20px_rgba(255,180,220,.6)]
hover:scale-105
transition
"
            >
              Trạm Bí Mật! 🎁
            </button>
          </div>

          <h2
            className="text-4xl md:text-5xl font-extrabold text-center mb-8"
            style={{
              color: "#f7bfd8",
              WebkitTextStroke: "1.5px rgba(255,255,255,.85)",
              textShadow: `
0 0 12px rgba(255,180,220,.5),
0 3px 10px rgba(0,0,0,.25)
`
            }}
          >
            Rạp Chiếu Phim Đại Dương
          </h2>

          {/* KHUNG YOUTUBE */}
          <div className="
relative
w-full
aspect-video
rounded-[26px]
bg-white
border-[3px]
border-[#bfeeff]
overflow-hidden
shadow-[0_0_30px_rgba(255,255,255,.25)]
">




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
    </div>
  );
}