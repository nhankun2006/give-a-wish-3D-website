'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// === COMPONENT: VỎ SÒ (SVG Draw) ===
// === COMPONENT: VỎ SÒ (Phiên bản Cinematic 3D) ===
const ShellIcon = ({ isOpen, isBreathing, className, depthScale = 1 }) => (
  <motion.div
    animate={
      isBreathing && !isOpen
        ? { y: [0, -8 * depthScale, 0] }
        : { y: 0 }
    }
    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    className="w-full h-full relative flex items-center justify-center"
    style={{ perspective: '400px' }}
  >
    {/* Bloom phía sau */}
    <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-1000 ${isOpen ? 'bg-sky-300/50 scale-150' : 'bg-sky-400/20 scale-100'}`}></div>

    {/* SVG container chính */}
    <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>

      {/* === VỎ DƯỚI (đứng im) === */}
      <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full z-10 ${className}`}>
        <defs>
          <radialGradient id="pearlPremium2" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </radialGradient>
          <filter id="glowPremium2">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Thân vỏ dưới */}
        <path d="M20 80 Q50 100 80 80 C95 60 90 20 50 10 C10 20 5 60 20 80 Z"
          fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" opacity="0.9" />
        <path d="M50 10 L40 85 M50 10 L60 85 M50 10 L25 70 M50 10 L75 70"
          stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.4" />

        {/* Viên ngọc — chỉ hiện khi mở */}
        <motion.circle
          cx="50" cy="58" r="13"
          fill="url(#pearlPremium2)"
          filter="url(#glowPremium2)"
          animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.5, delay: isOpen ? 0.3 : 0 }}
        />
      </svg>

      {/* === VỎ TRÊN (xoay mở ra) === */}
      <motion.svg
        viewBox="0 0 100 100"
        className={`absolute inset-0 w-full h-full z-20 drop-shadow-[0_15px_25px_rgba(2,132,199,0.5)] ${className}`}
        animate={
          isOpen
            ? { rotateX: -70 }
            : isBreathing
              ? { rotateX: [0, -12, 0] }
              : { rotateX: 0 }
        }
        transition={{
          rotateX: isOpen
            ? { type: 'spring', bounce: 0.3, duration: 0.7 }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformOrigin: '50% 95%', transformStyle: 'preserve-3d' }}
      >
        <path d="M20 80 Q50 100 80 80 C95 60 90 20 50 10 C10 20 5 60 20 80 Z"
          fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2" opacity="0.95" />
        <path d="M50 10 L40 85 M50 10 L60 85 M50 10 L25 70 M50 10 L75 70"
          stroke="#bae6fd" strokeWidth="1.5" fill="none" opacity="0.7" />
        {/* Viền sáng mép vỏ trên */}
        <path d="M20 80 Q50 100 80 80" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      </motion.svg>

    </div>
  </motion.div>
);


// === MAIN COMPONENT ===
export default function Tab4Wishes({ isUnlocked, setIsUnlocked }) {
  const [passcode, setPasscode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');

  const [wishes, setWishes] = useState([]);
  const [positionedWishes, setPositionedWishes] = useState([]);
  const [selectedWish, setSelectedWish] = useState(null);

  // Form states
  const [isBigShellOpen, setIsBigShellOpen] = useState(false);
  const [newWishName, setNewWishName] = useState('');
  const [newWishMsg, setNewWishMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animation states
  const [flyingPearl, setFlyingPearl] = useState(null);
  const [highlightedShellId, setHighlightedShellId] = useState(null);
  const [pearlAnimation, setPearlAnimation] = useState(null);
  const [pendingShellPos, setPendingShellPos] = useState(null);
  const correctPasscode = "1007";
  // === DÁN ĐOẠN NÀY VÀO DƯỚI correctPasscode ===
  useEffect(() => {
    if (isUnlocked) fetchWishes();
  }, [isUnlocked]);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .eq('is_approved', true) // <-- PHỤC HỒI LẠI TÍNH NĂNG LỌC CỦA ÔNG TẠI ĐÂY
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setWishes(data);
    } catch (error) {
      console.error('Error fetching wishes:', error.message);
    }
  };
  // ==============================================



  // TÌM toàn bộ useEffect([wishes]) và THAY BẰNG:
  useEffect(() => {
    const MAX_TRIES = 300;
    const SHELL_PX = 128;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const MIN_GAP_PX = 20;

    const BIG_SHELL_CX = vw / 2;
    const BIG_SHELL_CY = vh - 24 - 96;
    const BIG_SHELL_R = 160;
    const LABEL_CY = BIG_SHELL_CY - 110;
    const LABEL_R = 200;

    const isForbidden = (cx, cy) => {
      const d1 = Math.sqrt((cx - BIG_SHELL_CX) ** 2 + (cy - BIG_SHELL_CY) ** 2);
      if (d1 < BIG_SHELL_R) return true;
      const d2 = Math.sqrt((cx - BIG_SHELL_CX) ** 2 + (cy - LABEL_CY) ** 2);
      if (d2 < LABEL_R) return true;
      return false;
    };

    const isOverlapping = (cx, cy, r, others) => {
      return others.some(p => {
        const minDist = r + p.r + MIN_GAP_PX;
        const dx = cx - p.cx;
        const dy = cy - p.cy;
        return Math.sqrt(dx * dx + dy * dy) < minDist;
      });
    };

    const placed = positionedWishes.filter(p =>
      wishes.some(w => w.id === p.id)
    );

    const placedPx = placed.map(p => ({
      ...p,
      cx: (p.x / 100) * vw,
      cy: (p.y / 100) * vh,
      r: (SHELL_PX * p.scale) / 2,
    }));

    const newPositionsPx = [...placedPx];
    const newPositions = [...placed];

    for (const wish of wishes) {
      if (placed.find(p => p.id === wish.id)) continue;

      // Nếu là vỏ sò vừa gửi → dùng vị trí đã tính sẵn, không random
      if (pendingShellPos && pendingShellPos.id === wish.id) {
        const cx = (pendingShellPos.x / 100) * vw;
        const cy = (pendingShellPos.y / 100) * vh;
        newPositionsPx.push({ cx, cy, r: (SHELL_PX * pendingShellPos.scale) / 2, id: wish.id, scale: pendingShellPos.scale });
        newPositions.push({
          ...wish,
          x: pendingShellPos.x,
          y: pendingShellPos.y,
          scale: pendingShellPos.scale,
          rotation: Math.floor(Math.random() * 40) - 20,
          depth: pendingShellPos.scale,
          zIndex: Math.floor(pendingShellPos.scale * 30),
        });
        setPendingShellPos(null);
        continue;
      }

      // Vỏ sò thường → random vị trí
      const scale = Math.random() * 0.35 + 0.45;
      const r = (SHELL_PX * scale) / 2;
      const margin = r + 10;
      const xMin = margin;
      const xMax = vw - margin;
      const yMin = margin;
      const yMax = vh * 0.48;

      let cx, cy, tries = 0, found = false;
      do {
        cx = Math.random() * (xMax - xMin) + xMin;
        cy = Math.random() * (yMax - yMin) + yMin;
        tries++;
        if (!isForbidden(cx, cy) && !isOverlapping(cx, cy, r, newPositionsPx)) {
          found = true;
          break;
        }
      } while (tries < MAX_TRIES);

      if (!found) {
        const col = newPositions.length % 2 === 0 ? margin : vw - margin;
        cx = col;
        cy = margin + (newPositions.length * (SHELL_PX + 10)) % (yMax - yMin);
      }

      const x = (cx / vw) * 100;
      const y = (cy / vh) * 100;

      newPositionsPx.push({ cx, cy, r, id: wish.id, scale });
      newPositions.push({
        ...wish,
        x, y, scale,
        rotation: Math.floor(Math.random() * 40) - 20,
        depth: scale,
        zIndex: Math.floor(scale * 30),
      });
    }

    setPositionedWishes(newPositions);
  }, [wishes]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode.toLowerCase() === correctPasscode) {
      setIsUnlocked(true);
      return;
    }
    setAttempts(prev => prev + 1);
    setHint("Hint: Ngày Sinh của chị Dâng!!");
  };

  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!newWishMsg.trim()) {
      setErrorMsg("Bạn chưa gửi gắm tâm tư vào viên ngọc kìa!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newWishName.trim() || 'Fan ẩn danh',
          message: newWishMsg.trim(),
        }),
      });
      if (!res.ok) throw new Error('Lỗi gửi lời chúc');

      const fakeId = "new-" + Date.now();
      const newWish = {
        id: fakeId,
        name: newWishName.trim() || 'Fan ẩn danh',
        message: newWishMsg.trim(),
        created_at: new Date().toISOString()
      };

      // Tính vị trí vỏ sò mới NGAY BÂY — dùng cùng vị trí cho cả animation lẫn shell
      const SHELL_PX = 128;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.random() * 0.35 + 0.45;
      const r = (SHELL_PX * scale) / 2;
      const margin = r + 10;
      const BIG_SHELL_CX = vw / 2;
      const BIG_SHELL_CY = vh - 24 - 96;

      let cx, cy, tries = 0;
      do {
        cx = Math.random() * (vw - margin * 2) + margin;
        cy = Math.random() * (vh * 0.42 - margin) + margin;
        tries++;
        const d = Math.sqrt((cx - BIG_SHELL_CX) ** 2 + (cy - BIG_SHELL_CY) ** 2);
        const noOverlap = !positionedWishes.some(p => {
          const px = (p.x / 100) * vw;
          const py = (p.y / 100) * vh;
          const pr = (SHELL_PX * p.scale) / 2;
          return Math.sqrt((cx - px) ** 2 + (cy - py) ** 2) < (r + pr + 20);
        });
        if (d > 160 && noOverlap) break;
      } while (tries < 200);

      const targetX = (cx / vw) * 100; // % để dùng cho animation
      const targetY = (cy / vh) * 100;

      // Lưu vị trí đã tính để useEffect KHÔNG random lại
      setPendingShellPos({ id: fakeId, x: targetX, y: targetY, scale });

      // Đóng form
      setIsBigShellOpen(false);
      setNewWishName('');
      setNewWishMsg('');
      setErrorMsg('');

      // Phase 1: Ngọc rơi xuống đáy
      setWishes(prev => [newWish, ...prev]);
      setHighlightedShellId(fakeId); // Vỏ sò mở miệng chờ

      // Phase 2: Ngọc rơi xuống đáy (400ms sau)
      setTimeout(() => {
        setPearlAnimation({ phase: 'falling', targetX, targetY });

        // Phase 3: Ngọc bay đến đúng vị trí vỏ sò (800ms sau)
        setTimeout(() => {
          setPearlAnimation({ phase: 'flying', targetX, targetY });

          // Phase 4: Ngọc đến nơi — vỏ sò khép lại
          setTimeout(() => {
            setPearlAnimation(null);
            setHighlightedShellId(null); // Vỏ sò khép lại
          }, 1000);
        }, 800);
      }, 400);

    } catch (error) {
      console.error('Lỗi gửi ngọc:', error.message);
      setErrorMsg("Bão biển cản trở, thử lại nha bạn!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-auto flex justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(2, 44, 67, 0.6) 0%, rgba(1, 24, 38, 0.9) 100%)',
        backdropFilter: 'blur(5px)'
      }}
    >
      {/* KHÓA MẬT MÃ (Giữ nguyên) */}
      {!isUnlocked ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-[0_0_40px_rgba(100,217,255,0.1)] text-center">
            <div className="w-16 h-16 bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-sky-400/30">
              <Lock className="w-8 h-8 text-sky-400" />
            </div>
            <h2 className="text-2xl font-bold text-sky-200 mb-2">Hộp Thư Dưới Đáy Biển</h2>
            <p className="text-sky-300/60 mb-6">Nhập mật mã để lặn xuống nơi cất giữ lời chúc</p>
            <form onSubmit={handleUnlock} className="space-y-4">
              <input type="text" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Nhập 4 số bí mật..." className="w-full px-4 py-3 rounded-xl bg-sky-950/50 border border-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-100 placeholder-sky-100/30 text-center font-bold tracking-wider" />
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-400 hover:to-sky-300 text-sky-950 font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all active:scale-95">Lặn Xuống</button>
            </form>
            <AnimatePresence>
              {hint && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm font-medium text-sky-300 bg-sky-900/30 py-2 px-4 rounded-lg border border-sky-500/20">{hint}</motion.p>}
            </AnimatePresence>
          </motion.div>
        </div>
      ) : (
        <>
          {/* ĐẠI DƯƠNG VỎ SÒ (Wishes) */}
          <div className="absolute inset-0 w-full h-full">
            {positionedWishes.map((wish) => {
              const isSelected = selectedWish?.id === wish.id;
              const isHighlighted = highlightedShellId === wish.id;

              return (
                <motion.div
                  key={wish.id}
                  className="absolute cursor-pointer group"
                  style={{ left: `${wish.x}%`, top: `${wish.y}%`, zIndex: isSelected ? 40 : 10 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: wish.scale, opacity: 1, rotate: wish.rotation }}
                  whileHover={{ scale: wish.scale * 1.1, zIndex: 20 }}
                  onClick={() => setSelectedWish(wish)}
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    {/* Hào quang khi hover hoặc khi nhận ngọc mới */}
                    <div className={`absolute inset-0 bg-sky-300/30 rounded-full blur-xl transition-all duration-500 ${isHighlighted ? 'opacity-100 scale-150 animate-pulse' : 'opacity-0 group-hover:opacity-100 group-hover:scale-125'}`}></div>

                    {/* SVG Vỏ Sò */}
                    <ShellIcon isOpen={isSelected || isHighlighted} isBreathing={!isSelected && !isHighlighted} />

                    {/* Tooltip */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none backdrop-blur-sm">
                      Nhấn để đọc lời chúc
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* VỎ SÒ LỚN (GỬI LỜI CHÚC) - Nằm giữa dưới đáy */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">

            {/* LABEL gợi ý - ẩn khi form mở */}
            <AnimatePresence>
              {!isBigShellOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="cursor-pointer text-center mb-4 mt-16"
                  onClick={() => setIsBigShellOpen(true)}
                >
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-200 font-semibold tracking-widest uppercase text-xs animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    ✨ Nhấn vào vỏ sò để gửi viên ngọc của bạn ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* VỎ SÒ SVG — chỉ bắt click khi form chưa mở */}
            <motion.div
              className={`relative w-36 h-36 md:w-48 md:h-48 flex items-end justify-center drop-shadow-[0_20px_50px_rgba(2,132,199,0.8)] ${!isBigShellOpen ? 'cursor-pointer' : ''}`}
              onClick={() => !isBigShellOpen && setIsBigShellOpen(true)}
              animate={isBigShellOpen ? { scale: 1.15, y: -30 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 20 }}
              style={{ pointerEvents: isBigShellOpen ? 'none' : 'auto' }}
            >
              <div className="absolute inset-0 bg-sky-300/30 rounded-full blur-[40px] animate-pulse -z-10"></div>
              <ShellIcon isOpen={isBigShellOpen} isBreathing={!isBigShellOpen} depthScale={0} />
            </motion.div>

            {/* FORM — là SIBLING của vỏ sò, KHÔNG nằm bên trong motion.div */}
            <AnimatePresence>
              {isBigShellOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, y: -20, rotateX: 90 }}
                  animate={{ opacity: 1, scale: 1, y: -220, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="absolute bottom-0 w-[92vw] max-w-md bg-white/10 backdrop-blur-3xl p-6 md:p-8 rounded-[2rem] border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.2)]"
                  style={{ pointerEvents: 'auto' }}
                >
                  <button
                    onClick={() => setIsBigShellOpen(false)}
                    className="absolute top-4 right-5 text-sky-200 hover:text-white transition-transform hover:rotate-90"
                  >
                    <X size={24} />
                  </button>

                  <div className="text-center mb-5">
                    <span className="text-3xl animate-bounce inline-block mb-1">💎</span>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">
                      Gửi Ngọc Lời Chúc
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newWishName}
                      onChange={(e) => setNewWishName(e.target.value)}
                      placeholder="Tên của bạn..."
                      maxLength={30}
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-sky-300/30 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-800 placeholder-gray-400 text-sm md:text-base font-medium shadow-inner transition-all"
                    />

                    <div className="relative">
                      <textarea
                        value={newWishMsg}
                        onChange={(e) => {
                          const wordCount = e.target.value.trim() === '' ? 0 : e.target.value.trim().split(/\s+/).length;
                          if (wordCount <= 1000) setNewWishMsg(e.target.value);
                        }}
                        placeholder="Những lời trân quý gửi đến đại dương..."
                        rows="3"
                        className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-sky-300/30 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-gray-800 placeholder-gray-400 resize-none text-sm md:text-base font-medium custom-scrollbar shadow-inner transition-all"
                      />
                      <span className={`absolute bottom-2 right-3 text-xs font-medium ${(newWishMsg.trim() === '' ? 0 : newWishMsg.trim().split(/\s+/).length) >= 950
                        ? 'text-red-400' : 'text-gray-400'
                        }`}>
                        {newWishMsg.trim() === '' ? 0 : newWishMsg.trim().split(/\s+/).length}/1000 từ
                      </span>
                    </div>

                    {errorMsg && (
                      <p className="text-pink-300 text-xs text-center animate-pulse">{errorMsg}</p>
                    )}

                    <button
                      onClick={handleSubmitWish}
                      disabled={isLoading}
                      className="w-full py-3.5 mt-2 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 text-sky-950 font-extrabold tracking-wide uppercase rounded-2xl shadow-[0_0_20px_rgba(125,211,252,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(125,211,252,0.8)]"
                    >
                      {isLoading ? 'Đang tạo ngọc...' : '✨ Thả Xuống Biển ✨'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>


          {/* POPUP ĐỌC LỜI CHÚC (Glassmorphism Card) */}
          <AnimatePresence>
            {selectedWish && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                onClick={() => setSelectedWish(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.8, y: 30, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-[92vw] max-w-2xl bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.1)] text-center glass-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => setSelectedWish(null)} className="absolute top-5 right-5 text-sky-200 hover:text-white transition-transform hover:rotate-90">
                    <X size={28} />
                  </button>

                  <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-gradient-to-br from-white to-sky-100 shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse flex items-center justify-center">
                    <span className="text-xl">💎</span>
                  </div>

                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-sky-200/50 to-transparent mb-8"></div>

                  {selectedWish.message.length > 80 ? (
                    /* LONG: scroll box, chữ nhỏ, text-left để dễ đọc */
                    <>
                      <div className="w-full max-h-[55vh] overflow-y-auto custom-scrollbar px-2 pb-1">
                        <p className="text-sm md:text-base text-sky-50 leading-relaxed whitespace-pre-line text-left">
                          <span className="text-sky-400/50 font-serif text-3xl leading-none align-[-10px] mr-0.5">"</span>
                          {selectedWish.message}
                          <span className="text-sky-400/50 font-serif text-3xl leading-none align-[-10px] ml-0.5">"</span>
                        </p>
                      </div>
                      <p className="text-sky-400/40 text-[10px] mt-1.5 flex items-center gap-1">
                        ↕ cuộn để đọc thêm
                      </p>
                    </>
                  ) : (
                    /* SHORT: căn giữa, chữ to, padding thoáng */
                    <div className="w-full flex items-center justify-center py-6 px-2">
                      <p className="text-xl md:text-2xl text-sky-50 leading-relaxed text-center whitespace-pre-wrap">
                        <span className="text-sky-400/50 font-serif text-4xl leading-none align-[-14px] mr-0.5">"</span>
                        {selectedWish.message}
                        <span className="text-sky-400/50 font-serif text-4xl leading-none align-[-14px] ml-0.5">"</span>
                      </p>
                    </div>
                  )}

                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-sky-200/50 to-transparent mt-8 mb-6"></div>

                  <p className="font-bold text-sky-300 text-lg tracking-widest uppercase">
                    — {selectedWish.name} —
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
            .font-handwriting { font-family: 'Caveat', cursive; }
            .glass-card {
              box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
            }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
          `}</style>
        </>
      )}
    </motion.div>
  );
}