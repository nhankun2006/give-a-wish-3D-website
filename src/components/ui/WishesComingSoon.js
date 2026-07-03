'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Target date: July 10, 2026 at 00:00:00 Vietnam time (UTC+7)
const UNLOCK_DATE = new Date('2026-07-10T00:00:00+07:00');

function getTimeLeft() {
  const now = new Date();
  const diff = UNLOCK_DATE - now;
  if (diff <= 0) return null; // Already unlocked

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownUnit({ value, label }) {
  return (
    <motion.div
      key={value}
      className="flex flex-col items-center"
    >
      <motion.div
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl"
        style={{
          background: 'rgba(100, 217, 255, 0.08)',
          border: '1.5px solid rgba(100, 217, 255, 0.3)',
          boxShadow: '0 0 20px rgba(100, 217, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Glass shimmer */}
        <div className="absolute inset-x-2 top-1 h-1/3 rounded-xl bg-white/5 pointer-events-none" />
        <span className="relative z-10 text-2xl md:text-3xl font-black text-white tabular-nums" style={{ textShadow: '0 0 20px rgba(100,217,255,0.8)' }}>
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="mt-2 text-[10px] md:text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(100,217,255,0.5)' }}>
        {label}
      </span>
    </motion.div>
  );
}

// Pre-computed stable particle data — avoids Math.random() on every render
// which would cause SSR/CSR hydration mismatches.
const PARTICLE_DATA = [
  { w: 7.92, h: 4.76, left: 29.1,  dur: 6.2, delay: 1.3 },
  { w: 9.78, h: 11.8, left: 45.9,  dur: 7.5, delay: 3.7 },
  { w: 7.45, h: 9.88, left: 12.5,  dur: 5.8, delay: 0.4 },
  { w: 5.68, h: 10.4, left: 64.0,  dur: 8.1, delay: 4.9 },
  { w: 7.50, h: 8.59, left: 44.6,  dur: 6.7, delay: 2.1 },
  { w: 4.40, h: 11.4, left: 50.7,  dur: 5.3, delay: 5.5 },
  { w: 10.8, h: 11.6, left: 29.0,  dur: 7.9, delay: 0.8 },
  { w: 10.3, h: 4.68, left: 85.2,  dur: 6.4, delay: 3.2 },
  { w: 5.70, h: 7.13, left: 19.5,  dur: 8.6, delay: 1.7 },
  { w: 9.95, h: 9.89, left: 66.1,  dur: 5.1, delay: 4.3 },
  { w: 8.04, h: 10.9, left: 68.6,  dur: 7.2, delay: 2.6 },
  { w: 6.89, h: 8.38, left: 37.5,  dur: 6.9, delay: 0.1 },
];

export default function WishesComingSoon({ onUnlocked }) {
  // Initialize as null to avoid SSR/client mismatch from Date.now() differences.
  // The real value is set immediately on the client inside useEffect.
  const [timeLeft, setTimeLeft] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());

    const timer = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (!t && onUnlocked) {
        onUnlocked(); // Notify parent that wishes are now unlocked
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [onUnlocked]);

  // Floating particles (count matches PARTICLE_DATA length)
  const particles = Array.from({ length: PARTICLE_DATA.length }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-auto flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(2,44,67,.75) 0%, rgba(1,24,38,.95) 100%)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Animated background rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            border: '1px solid rgba(100,217,255,0.08)',
            width: `${i * 200}px`,
            height: `${i * 200}px`,
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}

      {/* Floating bubbles — uses pre-computed PARTICLE_DATA to avoid SSR/client mismatch */}
      {particles.map((i) => {
        const p = PARTICLE_DATA[i];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.left}%`,
              bottom: '-20px',
              background: 'rgba(100,217,255,0.15)',
              border: '1px solid rgba(100,217,255,0.3)',
            }}
            animate={{ y: [0, -450], opacity: [0.7, 0] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        );
      })}

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative flex flex-col items-center text-center px-8 py-10 mx-4"
        style={{
          background: 'rgba(5, 20, 40, 0.6)',
          border: '1.5px solid rgba(255, 153, 196, 0.25)',
          borderRadius: '32px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,153,196,0.05), inset 0 1px 0 rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          maxWidth: '480px',
          width: '100%',
        }}
      >
        {/* Glass top shimmer */}
        <div className="absolute inset-x-8 top-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full pointer-events-none" />

        {/* Lock icon with glow */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{
            background: 'radial-gradient(circle, rgba(255,153,196,0.15) 0%, rgba(255,153,196,0.03) 100%)',
            border: '2px solid rgba(255,153,196,0.3)',
            boxShadow: '0 0 30px rgba(255,153,196,0.2)',
          }}
        >
          <span className="text-4xl">🔒</span>
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-black mb-2" style={{
          background: 'linear-gradient(135deg, #ff99c4 0%, #ffb6c1 50%, #64d9ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Hộp Thư Chưa Mở
        </h2>

        <p className="text-sm md:text-base mb-1 font-medium" style={{ color: 'rgba(100,217,255,0.7)' }}>
          Lời chúc từ các fan sẽ được mở vào
        </p>
        <p className="text-base md:text-lg font-bold mb-8" style={{
          color: '#ff99c4',
          textShadow: '0 0 15px rgba(255,153,196,0.4)',
        }}>
          🗓️ 10 tháng 7, 2026 &nbsp;—&nbsp; 00:00 🌊
        </p>

        {/* Countdown — only rendered after mount to avoid SSR/client time mismatch */}
        {mounted && (
          timeLeft ? (
            <div className="flex items-start gap-3 md:gap-4 mb-8">
              <CountdownUnit value={timeLeft.days}    label="Ngày"   />
              <div className="text-2xl font-black mt-4" style={{ color: 'rgba(100,217,255,0.4)' }}>:</div>
              <CountdownUnit value={timeLeft.hours}   label="Giờ"    />
              <div className="text-2xl font-black mt-4" style={{ color: 'rgba(100,217,255,0.4)' }}>:</div>
              <CountdownUnit value={timeLeft.minutes} label="Phút"   />
              <div className="text-2xl font-black mt-4" style={{ color: 'rgba(100,217,255,0.4)' }}>:</div>
              <CountdownUnit value={timeLeft.seconds} label="Giây"   />
            </div>
          ) : (
            <div className="mb-8 text-lg font-bold" style={{ color: '#64d9ff' }}>
              🎉 Đã mở! Hãy tải lại trang.
            </div>
          )
        )}

        {/* Decorative bottom note */}
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', maxWidth: '280px', lineHeight: 1.6 }}>
          Hộp thư sẽ tự động mở đúng ngày — bạn không cần làm gì cả 🫧
        </p>
      </motion.div>
    </motion.div>
  );
}
