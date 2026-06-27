'use client';

export default function Tab2Journey({ activeTab }) {

  return (
    <div className={`transition-all duration-1000 absolute ${activeTab === 1 ? 'opacity-100 translate-x-0 z-20' : 'opacity-0 translate-x-20 pointer-events-none z-0'}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#ff99c4] mb-8 drop-shadow-md">Hành Trình Sự Nghiệp</h2>
        <div className="flex gap-6 justify-center">
          {[2015, 2018, 2021, 2024].map((year) => (
            <div key={year} className="w-32 h-32 rounded-full bg-gradient-to-b from-[#64d9ff]/20 to-[#ff99c4]/20 border-2 border-[#64d9ff] backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:border-[#ff99c4] transition-all cursor-pointer shadow-[0_0_20px_rgba(100,217,255,0.4)]">
              <p className="font-bold text-2xl text-white drop-shadow-lg">{year}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[#64d9ff] font-medium">(Bấm vào các bong bóng để xem chi tiết)</p>
      </div>
    </div>
  );
}
