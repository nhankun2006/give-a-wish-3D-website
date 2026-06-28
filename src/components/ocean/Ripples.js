'use client';

export default function Ripples() {
  // Chỉ cần 3 vòng sóng nhẹ nhàng, màu trắng và pastel trong suốt
  const ripples = [
    { color: 'rgba(255, 255, 255, 0.5)', delay: '0s' },
    { color: 'rgba(161, 238, 255, 0.4)', delay: '1.2s' }, // Xanh ngọc
    { color: 'rgba(255, 153, 196, 0.3)', delay: '2.4s' }, // Hồng pastel
  ];

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center">
        {ripples.map((ripple, index) => (
          <div
            key={index}
            className="absolute rounded-full animate-[gentleRipple_3.6s_ease-out_infinite]"
            style={{
              animationDelay: ripple.delay,
              border: `solid ${ripple.color}`,
              opacity: 0, // Ẩn lúc ban đầu để chờ delay
            }}
          />
        ))}
      </div>


    </>
  );
}