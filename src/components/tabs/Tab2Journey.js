'use client';

import { useState, useEffect, useRef } from 'react';

const fanMessages = [
  {
    id: 1,
    name: 'bacvaxiu',
    icon: '🐚',
    accent: '#ff99c4', // Pink
    accentRgb: '255,153,196',
    delay: '0s',
    preview: 'Em đã nghĩ rất nhiều trước khi bắt đầu viết những dòng này. Em muốn nó thật đặc biệt, thật chân thành...',
    full: `Viết cho Dâng,,
Em đã nghĩ rất nhiều trước khi bắt đầu viết những dòng này. Em muốn nó thật đặc biệt, thật chân thành, thật lãng mạn và cũng thật dịu dàng để có thể bày tỏ lòng mình với người mà em quý mến. Thế nên em đã loay hoay mãi mà chẳng biết nên bắt đầu từ đâu,,.

Em chỉ mới biết Dâng dạo gần đây thui, đôi lúc em còn hay đùa với mọi người rằng mình là " fan tháng 3 " hahah. Nhưng rồi em nghĩ, mình đến vào thời điểm nào có lẽ không quá quan trọng, miễn là mình đã bắt đầu và vẫn đang đồng hành cùng nhau, đúng hông chị?

Từ những ngày đầu, em đã luôn rất ấn tượng với năng lượng tích cực của Dâng. Đó là thứ năng lượng mà ngay cả một đứa chỉ nhìn Dâng qua màn hình như em cũng có thể cảm nhận được. Em mến cách Dâng luôn quan tâm, chăm sóc và dành sự tử tế cho những người xung quanh. Em nghĩ nó đáng quý lắm.
Và đến khi tìm hiểu Dâng " đủ " nhiều để biết về những nỗi buồn, những tổn thương mà Dâng từng trải qua, em lại càng trân quý nhiều hơn.
Em biết ơn vì dù cuộc đời đôi lúc đối xử với Dâng thật bất công, chị vẫn chọn ôm lấy cuộc đời bằng tất cả sự yêu thương và tử tế. Thay vì để những tổn thương làm mình khép lại, Dâng lại mạnh mẽ biến chúng thành sự thấu hiểu, bao dung và ấm áp dành cho những người xung quanh mình. Em mến lấm !!

Và cả những lần được gặp chị ngoài đời nữa. Em luôn nhớ cách chị hết lòng trân trọng những người yêu thương mình, dù nắng hay mưa vẫn nán lại để trò chuyện, tương tác và dành thời gian cho mọi người. Những điều tưởng chừng rất nhỏ ấy lại khiến trái tin em được sưởi ấm rất nhiều. Em nghĩ không phải ai cũng có thể làm được như vậy. Dễ thương lấm !!
Sắp tới là sinh nhật Dâng. Em mong tuổi mới sẽ mang đến cho chị thật nhiều niềm vui, thật nhiều yêu thương từ những người luôn quý mến chị. Mong chị sẽ luôn khỏe mạnh, làm được thật nhiều điều mình muốn làm.
Em biết chị sẽ còn đi xa hơn nữa, nhớ gom nhặt những mảnh hạnh phúc trên con đường đó, Dâng nhé !!
🎀💝💫💛`,
  },
  {
    id: 2,
    name: 'katmeyy_',
    icon: '🫧',
    accent: '#64d9ff', // Cyan
    accentRgb: '100,217,255',
    delay: '1.5s',
    preview: 'Em không phải là người biết chị từ những ngày đầu tiên, nhưng em nghĩ mình đã đủ may mắn để được gặp chị vào đúng thời điểm...',
    full: `Chị Dâng thân mến,
Em không phải là người biết chị từ những ngày đầu tiên, nhưng em nghĩ mình đã đủ may mắn để được gặp chị vào đúng thời điểm.
Em nhớ mình từng ấn tượng với chị qua Hai Ngày 1 Đêm bởi cái tên Tam Triều Dâng rất đẹp, rất đặc biệt và cũng rất dễ nhớ. Rồi sau đó là sự hết mình, lăn xả và nguồn năng lượng tích cực mà chị mang đến trong chương trình.
Từ sự tò mò đó, em bắt đầu tìm xem những bộ phim chị tham gia. Càng xem lại càng thấy quen thuộc, như thể mình đã từng gặp chị ở đâu đó trên màn ảnh từ rất lâu rồi mà không nhận ra.
Em từng gặp chị qua rất nhiều phiên bản khác nhau.
Là Hoàng Yến của Hoa Vương, sống hết mình với cảm xúc, dám yêu, dám theo đuổi điều mình muốn và cũng đủ mạnh mẽ để buông bỏ khi cần.
Là Thanh Tâm của Vì mẹ anh phán chia tay, một cô gái bình thường nhưng đầy nghị lực, luôn cố gắng gìn giữ những điều mình trân trọng dù cuộc sống không phải lúc nào cũng dễ dàng.
Là Cát Tường trong Tiểu tam không có lỗi?, cá tính, thẳng thắn, yêu ghét rõ ràng và luôn sống thật với cảm xúc của mình.
Và là Cà Ri của Tiệm bánh Hoàng tử bé năm nào, cô gái đã trở thành một phần ký ức thanh xuân của rất nhiều khán giả.
Mỗi nhân vật đều mang một màu sắc riêng, nhưng càng dõi theo chị lâu, em lại càng cảm thấy đâu đó trong tất cả những vai diễn ấy đều có một phần con người của chị. Đó là sự chân thành. Có lẽ đó cũng là điều em cảm nhận được ở chính con người chị ngoài đời. Một nguồn năng lượng tích cực không gượng ép, một sự mạnh mẽ nhưng vẫn dịu dàng và cảm giác ấm áp khiến người khác muốn ở lại lâu hơn một chút.
Em nghĩ chị giống như biển vậy.
Có những ngày biển lặng, có những ngày biển động. Có lúc thủy triều dâng cao, cũng có lúc rút xuống để lại những khoảng lặng rất dài. Nhưng sau tất cả, biển vẫn luôn là biển, vẫn mang trong mình một vẻ đẹp rất riêng.
Có lẽ điều em yêu quý ở chị không phải là những khoảnh khắc rực rỡ nhất, mà là sự bền bỉ. Dù ở giai đoạn nào, chị vẫn luôn giữ được sự chân thành, tích cực và tử tế của mình.
Em mong rồi sẽ có thêm thật nhiều người biết đến chị qua những vai diễn mới, những bộ phim mới. Mong chị sẽ gặp được những câu chuyện thật hay để kể bằng diễn xuất của mình và có thêm thật nhiều kỷ niệm đẹp trên hành trình làm nghề.
Và biết đâu một ngày nào đó, khi nhìn lại, bên cạnh những vai diễn đáng nhớ, chị sẽ còn có thêm cả một bộ sưu tập "phim trăm tỷ" nữa.
Và dù tương lai có thế nào đi nữa, em tin sẽ luôn có những người yêu thương chị vì chính con người chị.
"Không phải vì những con sóng lớn hay những ngày biển đẹp nhất, mà đơn giản vì đó là chị "`,
  },
  {
    id: 3,
    name: 'nabu_ove',
    icon: '🪸',
    accent: '#a1eeff', // Light Blue
    accentRgb: '161,238,255',
    delay: '0.7s',
    preview: 'Tuổi 16 của em được lấp đầy bởi những bài học, những ước mơ và cả những người đã vô tình để lại dấu ấn trong lòng mình...',
    full: `Tuổi 16 của em được lấp đầy bởi những bài học, những ước mơ và cả những người đã vô tình để lại dấu ấn trong lòng mình. Với em, Dâng chính là một trong những người như thế. Chị không chỉ xuất hiện trong những thước phim em yêu thích, mà còn trở thành một phần rất đẹp trong thanh xuân của em.

Em không giỏi viết những lời hoa mỹ, nhưng nhân dịp đặc biệt của Dâng, em vẫn muốn viết đôi lời gửi đến người đã trở thành một phần ký ức đẹp trong tuổi thanh xuân rực rỡ của em – Công chúa Biển Cả 💛

💌 Dear: 👑🌊✨🎀💛
Công chúa Biển Cả _ 3TD thân mến!!

Ở tuổi 16 – độ tuổi của những ước mơ, những hoài bão và cả những lần chông chênh trước tương lai – em thật may mắn khi có cơ hội biết đến và yêu mến chị. Có thể em chưa đủ trưởng thành để nói những điều quá sâu sắc, cũng chưa trải qua nhiều để hiểu hết những khó khăn trên hành trình của một người nghệ sĩ. Nhưng em nghĩ rằng tình cảm chân thành thì không cần phải lớn lên mới có thể cảm nhận được. ❤️‍🔥❤️‍🔥

Em biết đến và ấn tượng chị đã 2 năm từ vai diễn Thanh Trúc (Tham Vọng Giàu Sang/2024)🎞️, và đó cũng là cơ duyên đầu tiên khiến em chú ý đến chị. Ban đầu chỉ đơn giản là yêu thích nhân vật ấy, nhưng càng tìm hiểu và theo dõi chị nhiều hơn, em lại càng thêm yêu mến con người chị ngoài đời. Điều khiến em quý chị không chỉ là khả năng diễn xuất mà còn là cách chị luôn mang đến cảm giác gần gũi, tích cực và ấm áp. Có những người nổi tiếng khiến người ta ngưỡng mộ vì tài năng, nhưng với em, chị còn là người khiến em cảm thấy dễ chịu và vui vẻ mỗi khi nhìn thấy. 💝🌷

Em nghĩ rằng làm nghệ thuật là một công việc không hề dễ dàng. Đằng sau những vai diễn hay những khoảnh khắc rực rỡ mà khán giả nhìn thấy chắc hẳn là rất nhiều cố gắng và đánh đổi. Vì vậy, em luôn trân trọng những gì chị đã mang đến. Mỗi nhân vật chị thể hiện đều cho em thấy sự nghiêm túc và tâm huyết của chị với nghề. Và chính điều đó khiến em càng thêm yêu quý và tự hào khi được đồng hành cùng chị.

Có lẽ chị sẽ không bao giờ biết hết có bao nhiêu người đã nhận được động lực từ chị, nhưng em tin rằng ở đâu đó luôn có những người giống như em, âm thầm dõi theo và cảm thấy vui vẻ hơn nhờ sự xuất hiện của chị. Chị không chỉ mang đến những vai diễn mà còn mang đến năng lượng tích cực cho rất nhiều người.

Khi tìm hiểu về chị nhiều hơn, em cũng biết rằng chị đã từng trải qua những giai đoạn không dễ dàng. Có những điều mà người ngoài nhìn vào sẽ không thể hiểu hết, nhưng em càng thêm trân trọng chị vì dù đã đi qua những khoảng thời gian khó khăn ấy, chị vẫn lựa chọn mạnh mẽ bước tiếp.

Ở chặng đường sắp tới, em không chỉ mong chị có thêm nhiều vai diễn hay, nhiều giải thưởng hay nhiều thành công hơn nữa. Điều em mong nhất là chị sẽ luôn hạnh phúc với những gì mình lựa chọn. Mong chị luôn giữ được ngọn lửa đam mê với nghề, giữ được nụ cười rạng rỡ và sự chân thành đã khiến rất nhiều người yêu mến chị. 🖇️💐🌟💧

Mong chị luôn có những người yêu thương ở bên cạnh, có một nơi để trở về sau những ngày làm việc vất vả, có những khoảnh khắc thật bình yên giữa nhịp sống bận rộn. 🤍🤍

Em hy vọng cuộc sống sẽ dịu dàng với chị hơn một chút, để những áp lực hay mệt mỏi rồi cũng sẽ qua đi và những điều tốt đẹp sẽ ở lại thật lâu.

Cảm ơn Dâng vì đã trở thành một phần ký ức đẹp trong tuổi 16 của em. Chúc chị sẽ luôn bình an, may mắn trên hành trình mình đã chọn, luôn giữ được nụ cười và sự ấm áp vốn có của mình.

NGUYỄN VŨ PHƯƠNG GIANG_Nabi
_ 17/6/2026 _`,
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
      setSelectedFan(null); // Reset modal if tab changes
    }
  }, [activeTab]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <>
      <div className={`transition-all duration-1000 absolute inset-0 flex flex-col items-center justify-center ${activeTab === 1 ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none z-0'}`}>
        
        {/* HEADER SECTION */}
        <div className="text-center mb-4 mt-8 md:mt-2 relative px-4 w-full max-w-4xl mx-auto flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0a192f]/50 border border-[#64d9ff]/30 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(100,217,255,0.2)]"
            style={{
              animation: isVisible ? 'fadeInDown 0.6s ease-out forwards' : 'none',
              opacity: 0,
            }}>
            <span className="text-lg animate-pulse">🫧</span>
            <span className="text-[#64d9ff] text-sm font-semibold tracking-wider uppercase">Từ trái tim đại dương</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff99c4] via-[#64d9ff] to-[#a1eeff] mb-4 drop-shadow-lg pb-1"
            style={{
              animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s forwards' : 'none',
              opacity: 0,
            }}>
            Lời Tâm Sự Của Fan
          </h2>
          <p className="text-[#eaf4ff]/70 text-sm md:text-base max-w-lg mx-auto"
            style={{
              animation: isVisible ? 'fadeInUp 0.8s ease-out 0.4s forwards' : 'none',
              opacity: 0,
            }}>
            Những dòng tin nhắn lấp lánh như bọt biển gửi đến Công chúa Biển Cả 🌊
          </p>
        </div>

        {/* DYNAMIC SCROLLING CONTAINER */}
        <div className="relative w-full max-w-[1400px] mx-auto">
          {/* Scroll Buttons (Desktop) */}
          <button onClick={scrollLeft} className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-[#041c32]/80 border border-[#64d9ff]/40 items-center justify-center text-[#64d9ff] hover:bg-[#64d9ff] hover:text-[#041c32] hover:scale-110 transition-all shadow-[0_0_20px_rgba(100,217,255,0.3)] backdrop-blur-md"
            style={{
              animation: isVisible ? 'fadeIn 1s ease-out 1s forwards' : 'none',
              opacity: 0,
            }}>
            <span className="text-xl -ml-1">◀</span>
          </button>
          
          <button onClick={scrollRight} className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-[#041c32]/80 border border-[#ff99c4]/40 items-center justify-center text-[#ff99c4] hover:bg-[#ff99c4] hover:text-[#041c32] hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,153,196,0.3)] backdrop-blur-md"
            style={{
              animation: isVisible ? 'fadeIn 1s ease-out 1s forwards' : 'none',
              opacity: 0,
            }}>
            <span className="text-xl -mr-1">▶</span>
          </button>

          {/* Cards Track */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 md:gap-10 pb-16 pt-8 px-6 md:px-24 snap-x snap-mandatory hide-scrollbar items-center"
          >
            {fanMessages.map((fan, index) => (
              <div 
                key={fan.id}
                className="snap-center flex-shrink-0 w-[85vw] md:w-[420px] group relative cursor-pointer"
                onClick={() => setSelectedFan(fan)}
                style={{
                  animation: isVisible ? `fadeInUp 0.8s ease-out ${0.4 + index * 0.2}s forwards, floating 6s ease-in-out infinite ${fan.delay}` : 'none',
                  opacity: 0,
                }}
              >
                {/* Glowing Aura on Hover */}
                <div 
                  className="absolute -inset-1 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, rgba(${fan.accentRgb},0.4) 0%, transparent 70%)` }}
                />

                {/* Card Body - Glass Bubble Style */}
                <div className="relative bg-gradient-to-br from-[#041c32]/70 to-[#02101f]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-7 md:p-8 transition-all duration-500 overflow-hidden group-hover:border-white/30"
                  style={{
                    boxShadow: `0 20px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(${fan.accentRgb}, 0.1)`,
                  }}
                >
                  {/* Decorative Gradient Blob inside card */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: fan.accent }}
                  />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-[50px] opacity-10 pointer-events-none"
                    style={{ backgroundColor: fan.accent }}
                  />

                  {/* Top: Avatar & Name */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl relative shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                      style={{
                        background: `linear-gradient(135deg, ${fan.accent}40, rgba(255,255,255,0.05))`,
                        border: `2px solid ${fan.accent}60`,
                        boxShadow: `inset 0 0 10px rgba(${fan.accentRgb},0.5)`
                      }}>
                      <span className="relative z-10">{fan.icon}</span>
                      {/* Bubble highlight curve */}
                      <div className="absolute top-1 left-2 w-4 h-4 border-t-2 border-l-2 border-white/50 rounded-full blur-[1px] opacity-70"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl md:text-2xl tracking-wide">@{fan.name}</h3>
                      <div className="h-[2px] w-16 rounded-full mt-1 opacity-80" style={{ backgroundColor: fan.accent }}></div>
                    </div>
                  </div>

                  {/* Middle: Quote Preview */}
                  <div className="relative mb-8 z-10 pl-2">
                    <span className="absolute -top-4 -left-3 text-5xl opacity-20 font-serif" style={{ color: fan.accent }}>"</span>
                    <p className="text-[#eaf4ff]/80 text-[15px] md:text-base leading-relaxed line-clamp-4 font-medium">
                      {fan.preview}
                    </p>
                    <span className="absolute -bottom-6 right-2 text-5xl opacity-20 font-serif" style={{ color: fan.accent }}>"</span>
                  </div>

                  {/* Bottom: Action Button */}
                  <div className="flex justify-center relative z-10">
                    <button className="w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(${fan.accentRgb},0.1))`,
                        color: fan.accent,
                        border: `1px solid rgba(${fan.accentRgb},0.3)`,
                        boxShadow: `0 4px 15px rgba(0,0,0,0.2)`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, rgba(${fan.accentRgb},0.2), rgba(${fan.accentRgb},0.3))`;
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = `rgba(${fan.accentRgb},0.6)`;
                        e.currentTarget.style.boxShadow = `0 0 20px rgba(${fan.accentRgb},0.4)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(${fan.accentRgb},0.1))`;
                        e.currentTarget.style.color = fan.accent;
                        e.currentTarget.style.borderColor = `rgba(${fan.accentRgb},0.3)`;
                        e.currentTarget.style.boxShadow = `0 4px 15px rgba(0,0,0,0.2)`;
                      }}
                    >
                      <span>Mở Thư Trôi</span>
                      <span className="text-lg">🌊</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe indicator (Mobile) */}
          <div className="md:hidden flex justify-center items-center gap-3 mt-0 text-[#64d9ff]/70 text-sm font-medium tracking-wide"
             style={{
               animation: isVisible ? 'fadeIn 1s ease-out 1.2s forwards' : 'none',
               opacity: 0,
             }}
          >
            <span className="animate-bounce-x">👈</span>
            <span>Vuốt ngang để xem thư</span>
            <span className="animate-bounce-x" style={{ animationDirection: 'reverse' }}>👉</span>
          </div>
        </div>
      </div>

      {/* === READING MODAL (Full fan message) === */}
      {selectedFan && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedFan(null)}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          {/* Deep Ocean Backdrop */}
          <div className="absolute inset-0 bg-[#020a14]/90 backdrop-blur-xl" />

          {/* Modal content */}
          <div
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-[2.5rem] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'linear-gradient(180deg, rgba(10,25,47,0.95) 0%, rgba(4,16,31,0.98) 100%)',
              border: `1px solid rgba(${selectedFan.accentRgb},0.3)`,
              boxShadow: `0 0 100px rgba(${selectedFan.accentRgb},0.15), 0 40px 80px rgba(0,0,0,0.8)`,
            }}
          >
            {/* Ambient Modal Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-[60px] opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(ellipse, ${selectedFan.accent} 0%, transparent 70%)` }}
            />

            {/* Modal header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 flex-shrink-0 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl relative shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${selectedFan.accent}40, rgba(255,255,255,0.05))`,
                    border: `1.5px solid ${selectedFan.accent}50`,
                  }}>
                  <span className="relative z-10">{selectedFan.icon}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">@{selectedFan.name}</p>
                  <div className="h-[2px] w-12 rounded-full mt-1" style={{ backgroundColor: selectedFan.accent }}></div>
                </div>
              </div>
              <button
                onClick={() => setSelectedFan(null)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 hover:rotate-90 transition-all duration-300 text-lg shadow-md"
              >
                ✕
              </button>
            </div>

            {/* Scrollable message body */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8 custom-scrollbar relative z-10">
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full" style={{ background: `linear-gradient(to bottom, ${selectedFan.accent}, transparent)` }} />
                {selectedFan.full.split('\n').map((line, i) => (
                  <p key={i} className={`text-[#eaf4ff]/85 text-[15px] md:text-[17px] leading-[1.8] tracking-wide ${line.trim() === '' ? 'h-4' : 'mb-2'}`}>
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>
            </div>

            {/* Modal footer */}
            <div className="p-5 md:p-6 border-t border-white/10 flex-shrink-0 bg-[#041c32]/50 relative z-10">
              <button
                onClick={() => setSelectedFan(null)}
                className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, rgba(${selectedFan.accentRgb},0.2), rgba(${selectedFan.accentRgb},0.05))`,
                  border: `1px solid rgba(${selectedFan.accentRgb},0.4)`,
                  color: selectedFan.accent,
                  boxShadow: `0 0 20px rgba(${selectedFan.accentRgb},0.1)`
                }}
              >
                Khép Lại Thư Trôi 🌊
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === EMBEDDED KEYFRAMES & UTILS === */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s infinite ease-in-out;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}} />
    </>
  );
}
