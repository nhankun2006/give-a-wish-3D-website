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

      {/* --- HIỆU ỨNG GỢN SÓNG TINH TẾ --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gentleRipple {
            0% { 
              width: 120px; /* Bắt đầu từ kích thước sát viền nút Lặn Xuống */
              height: 120px; 
              opacity: 0.8; 
              border-width: 3px; /* Nét viền vừa phải */
            }
            100% { 
              width: 700px; /* Tỏa ra nhẹ nhàng bao trùm giữa màn hình */
              height: 700px; 
              opacity: 0; 
              border-width: 0px; /* Mỏng dần rồi tan biến */
            }
          }
        `
      }} />
    </>
  );
}