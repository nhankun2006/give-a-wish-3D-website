'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ─── SONAR CANVAS ────────────────────────────────────────────────────────────
function SonarCanvas({ triggerRef, onDotClick, wishesRef, newWishIdRef, readWishesRef }) { // <--- Thêm vào đây // <-- Thêm readWishesRef ở đây
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = { rings: [], dots: [], particles: [], sweepAngle: 0, raf: null };
    const GREEN = '#1aff8c';

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const clickedDot = s.dots.find(d => {
        const dist = Math.sqrt(Math.pow(d.x - mouseX, 2) + Math.pow(d.y - mouseY, 2));
        return dist < 20;
      });

      if (clickedDot && clickedDot.wish && onDotClick) {
        // Truyền thẳng data lời chúc lên hàm cha
        onDotClick(clickedDot.wish);
      }
    };
    canvas.addEventListener('click', handleClick);

    const W = () => canvas.width;
    const H = () => canvas.height;
    const cx = () => W() / 2;
    const cy = () => H() / 2;
    const maxR = () => Math.min(W(), H()) * 1;

    // Expose trigger to parent
    triggerRef.current = () => {
      // double ring burst
      s.rings.push({ x: cx(), y: cy(), r: 4, maxR: maxR(), alpha: 1, speed: 2.8 });
      s.rings.push({ x: cx(), y: cy(), r: 4, maxR: maxR() * 0.6, alpha: 1, speed: 2.2 });
      // random contact dot
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * maxR() * 0.55 + maxR() * 0.1;
      const dx = cx() + Math.cos(angle) * dist;
      const dy = cy() + Math.sin(angle) * dist;
      s.dots.push({ x: dx, y: dy, blink: Math.random() * Math.PI * 2, life: 240 });
      for (let i = 0; i < 22; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = Math.random() * 1.8 + 0.5;
        s.particles.push({ x: dx, y: dy, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, alpha: 1, r: Math.random() * 2 + 1 });
      }
    };

    const drawGrid = () => {
      // Bỏ lưới ô vuông cứng nhắc, chỉ giữ lại các vòng tròn sóng biển
      const R = maxR();
      ctx.strokeStyle = 'rgba(100,217,255,0.15)';
      for (let r = R * 0.25; r <= R; r += R * 0.25) {
        ctx.beginPath(); ctx.arc(cx(), cy(), r, 0, Math.PI * 2); ctx.stroke();
      }
    };

    const drawSweep = () => {
      const R = maxR();
      ctx.save(); ctx.translate(cx(), cy()); ctx.rotate(s.sweepAngle);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
      grad.addColorStop(0, 'rgba(100,217,255,0.15)'); // Xanh cyan mờ
      grad.addColorStop(1, 'rgba(100,217,255,0)');
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, R, -0.06, Math.PI * 0.35); ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();
      ctx.strokeStyle = 'rgba(255,153,196,0.6)'; // Tia viền màu hồng
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(R, 0); ctx.stroke();
      ctx.restore();

      const currentWishes = wishesRef?.current || [];
      const safeRadius = (Math.min(W(), H()) / 2) - 40;

      if (!s.wishNodes || s.wishNodes.length !== currentWishes.length) {
        s.wishNodes = currentWishes.map((wish) => ({
          wish: wish, angle: Math.random() * Math.PI * 2, dist: Math.random() * safeRadius * 0.8 + safeRadius * 0.15, cooldown: 0
        }));
      }

      const normalizedSweep = s.sweepAngle % (Math.PI * 2);
      s.wishNodes.forEach(node => {
        if (node.cooldown > 0) node.cooldown--;
        const diff = Math.abs(normalizedSweep - node.angle);
        if (diff < 0.05 && node.cooldown === 0) {
          node.cooldown = 200;
          const dx = cx() + Math.cos(node.angle) * node.dist;
          const dy = cy() + Math.sin(node.angle) * node.dist;
          s.dots.push({ x: dx, y: dy, blink: Math.random() * Math.PI * 2, life: 400, wish: node.wish });
          s.rings.push({ x: dx, y: dy, r: 2, maxR: 15, alpha: 0.6, speed: 0.8 });
        }
      });
      s.sweepAngle += 0.02;
    };

    const drawRings = () => {
      s.rings = s.rings.filter(r => r.alpha > 0.01);
      s.rings.forEach(r => {
        ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,217,255,${r.alpha * 0.85})`; ctx.lineWidth = 1.5; ctx.stroke();
        r.r += r.speed; r.alpha -= 0.007;
        if (r.r > r.maxR) r.alpha = 0;
      });
    };

    const drawDots = () => {
      s.dots = s.dots.filter(d => d.life > 0);
      s.dots.forEach(d => {
        d.blink += 0.07; d.life--;
        const a = (d.life / 240) * (0.5 + Math.sin(d.blink) * 0.5);
        
        const isNew = newWishIdRef?.current && d.wish && d.wish.id === newWishIdRef.current;
        // KIỂM TRA ĐÃ XEM CHƯA
        const isRead = d.wish && readWishesRef?.current?.has(d.wish.id); 

        ctx.save();
        ctx.globalAlpha = a;

         if (isRead) {
  // ─── BỌTĐÃ ĐỌC: SAN HÔ HỒNG TO & RỌ (Tĩnh tại, chỉ lấp lánh) ───
  const coralGlow = Math.sin(d.blink * 2.5) * 0.5 + 0.5; // Chỉ sáng lên/tắt
  
  ctx.globalAlpha = a * 0.85;
  
  // 👈 THÂN SAN HÔ (6 chi nhánh - TĨNH TẠI)
  for (let i = 0; i < 6; i++) {
    const branchAngle = (Math.PI * 2 / 6) * i - Math.PI / 2;
    const branchLength = 7; // 👈 BỎ lắc lư, cố định
    const branchX = d.x + Math.cos(branchAngle) * branchLength;
    const branchY = d.y + Math.sin(branchAngle) * branchLength; // 👈 BỎ coralSway
    
    // Chi nhánh CHÍNH
    ctx.strokeStyle = 'rgba(255, 153, 196, 0.95)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(branchX, branchY);
    ctx.stroke();
    
    // Viền chi nhánh
    ctx.globalAlpha = a * 0.6;
    ctx.strokeStyle = 'rgba(255, 120, 170, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(branchX, branchY);
    ctx.stroke();
    
    // BÔNG HOA ở đầu chi nhánh
    ctx.globalAlpha = a * 0.9;
    ctx.fillStyle = 'rgba(255, 200, 220, 1)';
    ctx.beginPath();
    ctx.arc(branchX, branchY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Viền bông hoa
    ctx.globalAlpha = a * 0.8;
    ctx.strokeStyle = 'rgba(255, 153, 196, 0.9)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    
    // Sáng lên ở tâm bông (lấp lánh nhẹ)
    ctx.globalAlpha = a * coralGlow * 0.8;
    ctx.fillStyle = 'rgba(255, 220, 235, 0.9)';
    ctx.beginPath();
    ctx.arc(branchX, branchY, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // THÂN SAN HÔ CHÍNH
  ctx.globalAlpha = a * 0.85;
  ctx.fillStyle = 'rgba(255, 153, 196, 0.8)';
  ctx.beginPath();
  ctx.arc(d.x, d.y, 3.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Viền thân
  ctx.globalAlpha = a * 0.7;
  ctx.strokeStyle = 'rgba(255, 100, 160, 0.9)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // Tâm thân sáng
  ctx.globalAlpha = a * coralGlow * 0.7;
  ctx.fillStyle = 'rgba(255, 220, 235, 0.85)';
  ctx.beginPath();
  ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // HALO HỒNG (3 vòng lấp lánh)
  for (let ring = 1; ring <= 3; ring++) {
    ctx.globalAlpha = a * coralGlow * (1 - ring / 4) * 0.65;
    ctx.strokeStyle = `rgba(255, 200, 220, ${0.9 - ring * 0.2})`;
    ctx.lineWidth = 2 - ring * 0.4;
    ctx.beginPath();
    ctx.arc(d.x, d.y, 7 + ring * 4, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // CHẤM SÁNG NHỎ XUNG QUANH
  ctx.globalAlpha = a * coralGlow * 0.7;
  for (let i = 0; i < 8; i++) {
    const sparkAngle = d.blink * 1.2 + (Math.PI * 2 / 8) * i;
    const sparkDist = 12;
    const sparkX = d.x + Math.cos(sparkAngle) * sparkDist;
    const sparkY = d.y + Math.sin(sparkAngle) * sparkDist;
    
    ctx.fillStyle = 'rgba(255, 200, 220, 0.8)';
    ctx.beginPath();
    ctx.arc(sparkX, sparkY, 0.8 + coralGlow * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

} else {
          // ... (Toàn bộ code bọt biển chưa đọc lấp lánh giữ nguyên ở đây) ...
          // ... (Phần code lấp lánh của bọt chưa đọc giữ nguyên) ...
          // ─── GIAO DIỆN BỌT CHƯA ĐỌC (Lấp lánh) ───
          const dotColor = isNew ? PINK : CYAN;
          const rgbColor = isNew ? '255,153,196' : '100,217,255';
          const size = isNew ? 12 : 8; 

          ctx.shadowColor = dotColor;
          ctx.shadowBlur = isNew ? 25 : 15;

          ctx.fillStyle = `rgba(${rgbColor}, 0.25)`;
          ctx.beginPath(); ctx.arc(d.x, d.y, size, 0, Math.PI * 2); ctx.fill();

          ctx.shadowBlur = 0; 
          ctx.strokeStyle = dotColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Hiệu ứng pha lê
          ctx.beginPath();
          ctx.arc(d.x, d.y, size * 0.65, Math.PI * 1.05, Math.PI * 1.55);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'; 
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(d.x, d.y, size * 0.55, Math.PI * 0.15, Math.PI * 0.45);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          if (isNew) {
              ctx.font = '11px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const heartScale = 1 + Math.sin(d.blink * 3) * 0.25; 
              ctx.translate(d.x, d.y);
              ctx.scale(heartScale, heartScale);
              ctx.fillText('💖', 0, 0);
          }
        }

        ctx.restore();
      });
    };

    const drawParticles = () => {
      s.particles = s.particles.filter(p => p.alpha > 0.04);
      s.particles.forEach(p => {
        ctx.globalAlpha = p.alpha; ctx.fillStyle = GREEN;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; p.alpha -= 0.022;
      });
      ctx.globalAlpha = 1;
    };

    const drawCrosshair = () => {
      const sz = 13;
      ctx.strokeStyle = 'rgba(26,255,140,0.4)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx() - sz, cy()); ctx.lineTo(cx() + sz, cy()); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx(), cy() - sz); ctx.lineTo(cx(), cy() + sz); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx(), cy(), 4, 0, Math.PI * 2); ctx.stroke();
    };

    const loop = () => {
      ctx.clearRect(0, 0, W(), H());
      drawGrid(); drawSweep(); drawRings(); drawDots(); drawParticles(); drawCrosshair();
      s.raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(s.raf); ro.disconnect(); canvas.removeEventListener('click', handleClick); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── HUD ITEM ─────────────────────────────────────────────────────────────────
// Thay vì font Courier cứng ngắc và màu xanh neon, ta dùng font mặc định và màu biển
const mono = { fontFamily: "inherit", fontWeight: "500" };
const CYAN = '#64d9ff';
const PINK = '#ff99c4';

function HudItem({ label, value }) {
  return (
    <div>
      <div style={{ ...mono, fontSize: 9, letterSpacing: 2, color: 'rgba(26,255,140,0.45)', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ ...mono, fontSize: 13, color: GREEN, letterSpacing: 1, opacity: 0.9 }}>{value}</div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Tab4Wishes({ isUnlocked, setIsUnlocked }) {
  // lock
  const [passcode, setPasscode] = useState('');
  const [hint, setHint] = useState('');
  const correctPasscode = '1007';

  // data
  const [wishes, setWishes] = useState([]);
  const [wishIdx, setWishIdx] = useState(0);
  const [currentWish, setCurrentWish] = useState(null);
  const [revealed, setRevealed] = useState(false);

const [currentWishIndex, setCurrentWishIndex] = useState(-1);
  const [newWishId, setNewWishId] = useState(null);
  const newWishIdRef = useRef(null);
  useEffect(() => { newWishIdRef.current = newWishId; }, [newWishId]);
  
  
  // form
  const [formOpen, setFormOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [formNote, setFormNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

const [historyOpen, setHistoryOpen] = useState(false);
const [viewedWishes, setViewedWishes] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [readCount, setReadCount] = useState(0); // 👈 THÊM DÒNG NÀY

// Cập nhật danh sách thư đã đọc khi wishes hoặc readCount thay đổi
useEffect(() => {
  if (wishes && readWishesRef.current.size > 0) {
    const viewed = wishes.filter(w => readWishesRef.current.has(w.id));
    setViewedWishes(viewed);
  }
}, [wishes, readCount]); // 👈 THÊM readCount VÀO ĐÂY

  const handleDotClick = useCallback((wish) => {
  if (!wish) return;
  readWishesRef.current.add(wish.id);
  setReadCount(c => c + 1); // 👈 THÊM DÒNG NÀY
  setCurrentWish(wish);
  setCurrentWishIndex(wishes.findIndex(w => w.id === wish.id));
  setRevealed(true);
}, []);

  const handlePrevWish = (e) => {
  e.stopPropagation();
  if (!wishes || wishes.length === 0) return;
  let newIndex = currentWishIndex - 1;
  if (newIndex < 0) newIndex = wishes.length - 1;
  const prevWish = wishes[newIndex];
  readWishesRef.current.add(prevWish.id);
  setReadCount(c => c + 1);
  setCurrentWish(prevWish);
  setCurrentWishIndex(newIndex);
};

const handleNextWish = (e) => {
  e.stopPropagation();
  if (!wishes || wishes.length === 0) return;
  let newIndex = currentWishIndex + 1;
  if (newIndex >= wishes.length) newIndex = 0;
  const nextWish = wishes[newIndex];
  readWishesRef.current.add(nextWish.id);
  setReadCount(c => c + 1);
  setCurrentWish(nextWish);
  setCurrentWishIndex(newIndex);
};

  const triggerRef = useRef(null);
  const wishesRef = useRef([]); // fires canvas animation
  const autoRef = useRef(null);

  const readWishesRef = useRef(new Set());

  // ── fetch
  useEffect(() => { if (isUnlocked) fetchWishes(); }, [isUnlocked]);
  useEffect(() => { wishesRef.current = wishes; }, [wishes]);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('wishes').select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) {
        setWishes(data);
        return data; // Thêm dòng này để trả về data
      }
    } catch (e) { console.error('fetch wishes:', e.message); }
    return null;
  };

  // ── unlock
  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === correctPasscode) { setIsUnlocked(true); return; }
    setHint('Hint: Ngày sinh của chị Dâng!!');
  };

  const handleSubmit = async () => {
    if (!newMsg.trim()) { setFormNote('Chưa có lời chúc!'); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() || 'Fan ẩn danh', message: newMsg.trim() }),
      });
      if (!res.ok) throw new Error();
      setNewName(''); setNewMsg('');
      setFormOpen(false);
      setFormNote('Tín hiệu đã gửi!');
      setTimeout(() => setFormNote(''), 3000);
      const freshData = await fetchWishes();   // refresh list và lấy list mới
      if (freshData && freshData.length > 0) {
        setNewWishId(freshData[0].id); // Đánh dấu lời chúc trên cùng là lời chúc mới
      }   // refresh list
    } catch {
      setFormNote('Bong bóng lạc trôi mất rồi, gửi lại giúp mình nhé');
    } finally { setIsSubmitting(false); }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-auto flex justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(2,44,67,.6) 0%, rgba(1,24,38,.9) 100%)',
        backdropFilter: 'blur(5px)',
      }}
    >

      {/* ══════════════════ LOCK SCREEN ══════════════════ */}
      {!isUnlocked ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-[0_0_40px_rgba(100,217,255,0.1)] text-center">
            <div className="w-16 h-16 bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-sky-400/30">
              <Lock className="w-8 h-8 text-sky-400" />
            </div>
            <h2 className="text-2xl font-bold text-sky-200 mb-2">Hộp Thư Dưới Đáy Biển</h2>
            <p className="text-sky-300/60 mb-6">Nhập mật mã để lặn xuống nơi cất giữ lời chúc</p>
            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="text" value={passcode} onChange={e => setPasscode(e.target.value)}
                placeholder="Nhập 4 số bí mật..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border-2 border-[#64d9ff]/50 focus:outline-none focus:ring-2 focus:ring-[#ff99c4] text-white placeholder-white/50 text-center font-bold tracking-wider shadow-[0_0_15px_rgba(100,217,255,0.2)]"
              />
              <button type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#64d9ff] to-[#a1eeff] hover:from-[#ff99c4] hover:to-[#ffb6c1] text-[#021428] font-bold rounded-xl shadow-[0_0_20px_rgba(100,217,255,0.4)] transition-all active:scale-95">
                Lặn Xuống
              </button>
            </form>
            <AnimatePresence>
              {hint && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="mt-4 text-sm font-medium text-sky-300 bg-sky-900/30 py-2 px-4 rounded-lg border border-sky-500/20">
                  {hint}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      ) : (
        /* ══════════════════ SONAR SCREEN ══════════════════ */
        <div className="absolute inset-0" style={{ background: 'rgba(2, 20, 40, 0.4)', backdropFilter: 'blur(3px)' }}>

          {/* SỬA LẠI THÀNH THẾ NÀY */}
  <SonarCanvas 
    triggerRef={triggerRef} 
    onDotClick={handleDotClick} 
    wishesRef={wishesRef} 
    newWishIdRef={newWishIdRef} 
    readWishesRef={readWishesRef} // <--- THÊM DÒNG NÀY VÀO ĐÂY
  />

          {/* scan-line overlay (Đổi thành màu xanh dương nhạt) */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 1, pointerEvents: 'none',
            background: 'linear-gradient(90deg,transparent,rgba(100,217,255,.15),rgba(100,217,255,.4),rgba(100,217,255,.15),transparent)',
            animation: 'scandown 3s linear infinite',
          }} />

          
<div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
  <div style={{ display: 'flex', gap: '12px' }}>
    <button
      onClick={() => setFormOpen(o => !o)}
      className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-[#ff99c4]/50 text-[#ff99c4] font-bold shadow-[0_0_15px_rgba(255,153,196,0.3)] hover:bg-[#ff99c4] hover:text-[#021428] transition-all hover:scale-105 flex items-center gap-2"
    >
      💌 Thả Bọt Biển
    </button>

    <button
      onClick={() => setHistoryOpen(o => !o)}
      className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-[#64d9ff]/50 text-[#64d9ff] font-bold shadow-[0_0_15px_rgba(100,217,255,0.3)] hover:bg-[#64d9ff] hover:text-[#021428] transition-all hover:scale-105 flex items-center gap-2"
    >
      📚 Thư Đã Xem ({viewedWishes.length})
    </button>
  </div>


            <AnimatePresence>
              {formOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  style={{
                    background: 'rgba(10, 25, 47, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(100,217,255,0.5)',
                    borderRadius: '24px',
                    padding: 32, // Tăng không gian bên trong form cho thoáng đãng
                    width: 600, // 👈 ĐÃ TĂNG LÊN 600 (Siêu bự)
                    maxWidth: '92vw', // Đảm bảo tự động co lại trên màn hình điện thoại
                    display: 'flex', flexDirection: 'column', gap: 20, // Tăng khoảng cách các ô
                    boxShadow: '0 15px 40px rgba(0,0,0,0.6)'
                  }}
                >
                  {/* header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ ...mono, fontSize: 16, color: '#ff99c4', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>
                      ✨ Gửi lời chúc
                    </span>
                    <button onClick={() => setFormOpen(false)}
                      style={{ background: 'none', border: 'none', color: '#ff99c4', cursor: 'pointer', fontSize: 28, lineHeight: 1 }}>
                      ×
                    </button>
                  </div>

                  <input
                    value={newName} onChange={e => setNewName(e.target.value)}
                    placeholder="Tên của bạn..." maxLength={30}
                    style={{ ...mono, background: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: '1px solid rgba(100,217,255,0.3)', color: '#fff', fontSize: 16, padding: '16px 20px', outline: 'none', width: '100%' }}
                  />
                  <textarea
                    value={newMsg} onChange={e => setNewMsg(e.target.value)}
                    placeholder="Viết điều gì đó dễ thương..." 
                    rows={8} // 👈 TĂNG CHIỀU CAO LÊN 8 DÒNG (Cực kỳ rộng rãi)
                    style={{ ...mono, background: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: '1px solid rgba(100,217,255,0.3)', color: '#fff', fontSize: 16, padding: '16px 20px', outline: 'none', width: '100%', resize: 'none', lineHeight: 1.6 }}
                  />
                  <button onClick={handleSubmit} disabled={isSubmitting}
                    style={{ ...mono, background: 'linear-gradient(90deg, #64d9ff, #a1eeff)', border: 'none', color: '#021428', fontWeight: 'bold', fontSize: 16, padding: '16px', cursor: 'pointer', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: 1 }}>
                    {isSubmitting ? 'Đang nhả bọt... 🫧' : 'Nhả Bọt Biển 🫧'}
                  </button>

                  {formNote && (
                    <div style={{ 
                      ...mono, 
                      fontSize: 12, 
                      textAlign: 'center', 
                      // Nếu là lỗi thì màu hồng nhẹ, nếu thành công thì màu xanh biển
                      color: formNote.includes('thất') || formNote.includes('vỡ') || formNote.includes('lạc') 
                             ? '#ff99c4' 
                             : '#64d9ff' 
                    }}>
                      {formNote}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 👈 MODAL XEM LẠI THƯ CŨ */}
          <AnimatePresence>
            {historyOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                style={{
                  position: 'fixed',
                  top: '80px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '500px',
                  maxWidth: '90vw',
                  maxHeight: '70vh',
                  background: 'rgba(10, 25, 47, 0.95)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(100, 217, 255, 0.5)',
                  borderRadius: '20px',
                  padding: '20px',
                  zIndex: 100,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(100,217,255,0.3)', paddingBottom: '12px' }}>
                  <span style={{ ...mono, fontSize: 16, color: '#64d9ff', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    📚 Thư Đã Đọc ({viewedWishes.length})
                  </span>
                  <button
                    onClick={() => setHistoryOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#64d9ff', cursor: 'pointer', fontSize: '24px', lineHeight: 1 }}
                  >
                    ×
                  </button>
                </div>

                {/* Search */}
                <input
                  type="text"
                  placeholder="Tìm tên hoặc nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    ...mono,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(100,217,255,0.3)',
                    color: '#fff',
                    fontSize: '14px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    outline: 'none',
                  }}
                />

                {/* List thư */}
                <div style={{ overflowY: 'auto', maxHeight: 'calc(70vh - 180px)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {viewedWishes
                    .filter(w => 
                      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      w.message.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((wish) => (
                      <div
                        key={wish.id}
                        onClick={() => {
                          setCurrentWish(wish);
                          setRevealed(true);
                          setHistoryOpen(false);
                        }}
                        style={{
                          background: 'rgba(100, 217, 255, 0.1)',
                          border: '1px solid rgba(100, 217, 255, 0.3)',
                          borderRadius: '10px',
                          padding: '12px',
                          cursor: 'pointer',
                          transition: '0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(100, 217, 255, 0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(100, 217, 255, 0.1)'}
                      >
                        <div style={{ fontSize: '13px', color: '#64d9ff', fontWeight: 'bold', marginBottom: '4px' }}>
                          💌 {wish.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#fff', opacity: 0.7, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {wish.message.substring(0, 60)}...
                        </div>
                      </div>
                    ))}
                  {viewedWishes.filter(w => 
                    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    w.message.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <div style={{ textAlign: 'center', color: '#64d9ff', opacity: 0.6, fontSize: '14px', padding: '20px' }}>
                      Không tìm thấy thư nào
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- POPUP LÁ THƯ QUÝ GIÁ (Dễ thương & Sang trọng) --- */}

          {/* --- POPUP LÁ THƯ QUÝ GIÁ (Dễ thương & Sang trọng) --- */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            padding: '50px', borderRadius: '40px',
            background: '#ffffff', // Nền trắng tinh khôi
            border: '8px solid #ff99c4', // Viền hồng đậm chất quà tặng
            boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
            textAlign: 'center', zIndex: 50,
            display: revealed && currentWish ? 'flex' : 'none',
            flexDirection: 'column', alignItems: 'center', gap: 30,
            width: '750px', // 👈 TĂNG RỘNG LÊN 750PX
            maxWidth: '92vw', overflow: 'visible'
          }}>
            <AnimatePresence mode="wait">
              {currentWish && revealed && (
                <motion.div
                  key={currentWish.id}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  {/* Nút X hình tròn nhỏ xinh */}
                  <button onClick={() => setRevealed(false)} style={{ 
                    position: 'absolute', top: '-15px', right: '-15px', 
                    background: '#ff99c4', border: 'none', color: '#fff', 
                    borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
                  }}>
                    <X size={20} />
                  </button>

                  {/* Icon trang trí phía trên */}
                  <div style={{ fontSize: '30px' }}>💌</div>

                  {/* VÙNG CUỘN - TỰ ĐỘNG CĂN GIỮA NẾU THƯ NGẮN & GIỮ ĐÚNG NGUYÊN DẤU XUỐNG DÒNG */}
                  <div className="cute-scroll" style={{ 
                    width: '100%', 
                    maxHeight: '45vh', 
                    overflowY: 'auto', 
                    padding: '0 20px', 
                    backgroundImage: currentWish.message.length > 150 
                      ? 'repeating-linear-gradient(transparent, transparent 31px, rgba(255,153,196,0.4) 31px, rgba(255,153,196,0.4) 32px)' 
                      : 'none',
                    backgroundAttachment: 'local',
                    lineHeight: '32px', 
                    color: '#021428', 
                    fontSize: '18px', 
                    fontWeight: '400', 
                    textAlign: currentWish.message.length > 150 ? 'justify' : 'center',
                    
                    // 👈 DÒNG NÀY GIÚP GIỮ NGUYÊN CÁC DẤU ENTER/XUỐNG DÒNG CỦA FAN
                    whiteSpace: 'pre-wrap', 
                    
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: currentWish.message.length > 150 ? 'flex-start' : 'center'
                  }}>
                    {currentWish.message}
                  </div>

                  {/* Tên người gửi (Dùng màu hồng chủ đạo) */}
                  <div style={{ fontSize: '15px', color: '#ff99c4', fontWeight: '800', marginTop: '10px' }}>
                    — {currentWish.name} —
                  </div>

                  {/* 2 nút 🐡 và 🐳 siêu bự ở dưới */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '20px' }}>
  <button onClick={handlePrevWish} style={{
      background: '#fff', border: '3px solid #ff99c4',
      borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px',
      cursor: 'pointer', transition: '0.3s', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}
    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15) rotate(-10deg)'}
    onMouseOut={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
    🐡
  </button>
  
  <div style={{ fontSize: '12px', color: '#ff99c4', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
    {currentWishIndex + 1} / {wishes.length}
  </div>
  
  <button onClick={handleNextWish} style={{
      background: '#fff', border: '3px solid #64d9ff',
      borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px',
      cursor: 'pointer', transition: '0.3s', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}
    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)'}
    onMouseOut={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
    🐳
  </button>
</div>
                </motion.div>
              )}
            </AnimatePresence>
          
          </div>

          {/* keyframe & custom scrollbar (Sửa màu cuộn thành Hồng/Cyan) */}
          <style>{`

          .history-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .history-scroll::-webkit-scrollbar-track {
              background: rgba(100, 217, 255, 0.1);
              border-radius: 10px;
            }
            .history-scroll::-webkit-scrollbar-thumb {
              background: #64d9ff;
              border-radius: 10px;
            }
            .history-scroll::-webkit-scrollbar-thumb:hover {
              background: #a1eeff;
            }
              
            @keyframes scandown {
              0%   { top: 0;    opacity: .8 }
              90%  { opacity: .5 }
              100% { top: 100%; opacity: 0 }
            }
            .cute-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .cute-scroll::-webkit-scrollbar-track {
              background: rgba(100, 217, 255, 0.1);
              border-radius: 10px;
            }
            .cute-scroll::-webkit-scrollbar-thumb {
              background: #ff99c4;
              border-radius: 10px;
            }
            .cute-scroll::-webkit-scrollbar-thumb:hover {
              background: #ffb6c1;
            }
          `}</style>
        </div>
      )}
    </motion.div>
  );
}
