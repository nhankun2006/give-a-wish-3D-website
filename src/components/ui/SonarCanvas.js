'use client';
import { useEffect, useRef } from 'react';

export default function SonarCanvas({ triggerRef, onDotClick, wishesRef, newWishIdRef, readWishesRef, onAllDotsFinished }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = { rings: [], dots: [], particles: [], raf: null };    const GREEN = '#1aff8c';
    const CYAN = '#64d9ff';
    const PINK = '#ff99c4';

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
        return dist < 30;
      });

      if (clickedDot && clickedDot.wish && onDotClick) {
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI * 2 / 12) * i;
          const spd = 3.5 + Math.random() * 1.5;
          s.particles.push({ 
            x: clickedDot.x, 
            y: clickedDot.y, 
            vx: Math.cos(angle) * spd, 
            vy: Math.sin(angle) * spd, 
            alpha: 1, 
            r: Math.random() * 3 + 1.5,
            color: Math.random() > 0.5 ? '#ff99c4' : '#64d9ff'
          });
        }
        onDotClick(clickedDot.wish);
      }
    };
    canvas.addEventListener('click', handleClick);

    const W = () => canvas.width;
    const H = () => canvas.height;
    const cx = () => W() / 2;
    const cy = () => H() / 2;
    const maxR = () => Math.min(W(), H()) * 1;

    const drawGrid = () => {
      const R = maxR();
      ctx.strokeStyle = 'rgba(100,217,255,0.15)';
      for (let r = R * 0.25; r <= R; r += R * 0.25) {
        ctx.beginPath(); ctx.arc(cx(), cy(), r, 0, Math.PI * 2); ctx.stroke();
      }
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
      s.dots.forEach(d => {
        // d.blink vẫn giữ để dùng cho sparkle, nhưng thêm shake cho rung ring
        d.shake = (d.shake || 0) + 0.1;
        const a = 1;        
        // 🌟 SỬA LẠI: Giữ màu vàng nếu là thư mới nhất HOẶC mang nhãn thư vừa gửi (isOwnNew)
        const isNew = (newWishIdRef?.current && d.wish && d.wish.id === newWishIdRef.current) || d.isOwnNew;
        const isRead = d.wish && readWishesRef?.current?.has(d.wish.id); 

        if (isNew) {
          ctx.save();
          ctx.globalAlpha = a * 0.9;
          ctx.font = 'bold 9px Arial';
          ctx.fillStyle = '#ff1493';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const labelScale = 1 + Math.sin(d.blink * 3) * 0.2;
          ctx.translate(d.x, d.y - 16);
          ctx.scale(labelScale, labelScale);
          ctx.restore();
        }

        ctx.save();
        ctx.globalAlpha = a;

        if (isRead) {
          const coralGlow = Math.sin(d.blink * 2.5) * 0.5 + 0.5;
          ctx.globalAlpha = a * 0.85;
          ctx.shadowColor = '#ff99c4'; 
          ctx.shadowBlur = 12; // Tạo vầng sáng hồng xung quanh
          
          for (let i = 0; i < 6; i++) {
            const branchAngle = (Math.PI * 2 / 6) * i - Math.PI / 2;
            const branchLength = 10; 
            const branchX = d.x + Math.cos(branchAngle) * branchLength;
            const branchY = d.y + Math.sin(branchAngle) * branchLength; 
            
            ctx.strokeStyle = 'rgba(255, 153, 196, 0.95)';
            ctx.lineWidth = 1.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(branchX, branchY); ctx.stroke();
            
            ctx.globalAlpha = a * 0.6;
            ctx.strokeStyle = 'rgba(255, 120, 170, 0.7)';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(branchX, branchY); ctx.stroke();
            
            ctx.globalAlpha = a * 0.9;
            ctx.fillStyle = 'rgba(255, 200, 220, 1)';
            ctx.beginPath(); ctx.arc(branchX, branchY, 1.5, 0, Math.PI * 2); ctx.fill();
            
            ctx.globalAlpha = a * 0.8;
            ctx.strokeStyle = 'rgba(255, 153, 196, 0.9)';
            ctx.lineWidth = 1.2; ctx.stroke();
            
            ctx.globalAlpha = a * coralGlow * 0.8;
            ctx.fillStyle = 'rgba(255, 220, 235, 0.9)';
            ctx.beginPath(); ctx.arc(branchX, branchY, 1.2, 0, Math.PI * 2); ctx.fill();
          }
          
          ctx.globalAlpha = a * 0.85;
          ctx.fillStyle = 'rgba(255, 153, 196, 0.8)';
          ctx.beginPath(); ctx.arc(d.x, d.y, 4, 0, Math.PI * 2); ctx.fill();
          
          ctx.globalAlpha = a * 0.7;
          ctx.strokeStyle = 'rgba(255, 100, 160, 0.9)';
          ctx.lineWidth = 1.5; ctx.stroke();
          
          ctx.globalAlpha = a * coralGlow * 0.7;
          ctx.fillStyle = 'rgba(255, 220, 235, 0.85)';
          ctx.beginPath(); ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2); ctx.fill();

          for (let ring = 1; ring <= 3; ring++) {
            ctx.globalAlpha = a * coralGlow * (1 - ring / 4) * 0.65;
            ctx.strokeStyle = `rgba(255, 200, 220, ${0.9 - ring * 0.2})`;
            ctx.lineWidth = 1 - ring * 0.2;
            ctx.beginPath(); ctx.arc(d.x, d.y, 6 + ring * 4, 0, Math.PI * 2); ctx.stroke();
          }
          
          ctx.globalAlpha = a * coralGlow * 0.7;
          for (let i = 0; i < 8; i++) {
            const sparkAngle = d.blink * 1.2 + (Math.PI * 2 / 8) * i;
            const sparkDist = 12;
            const sparkX = d.x + Math.cos(sparkAngle) * sparkDist;
            const sparkY = d.y + Math.sin(sparkAngle) * sparkDist;
            
            ctx.fillStyle = 'rgba(255, 200, 220, 0.8)';
            ctx.beginPath(); ctx.arc(sparkX, sparkY, 0.8 + coralGlow * 0.5, 0, Math.PI * 2); ctx.fill();
          }

        } else {
        const dotColor = isNew ? '#ffd700' : CYAN;
        const rgbColor = isNew ? '255,215,0' : '100,217,255';
        const size = isNew ? 17 : 12;
        
        // 🔧 RUNG RING thay vì nhấp nháy
        const shake = Math.sin(d.shake || 0) * 2;
        const shakeX = d.x + shake;
        const shakeY = d.y + shake * 0.5;

        ctx.shadowColor = dotColor;
        ctx.shadowBlur = isNew ? 25 : 15;

        // 🔧 TĂNG OPACITY: 0.25 → 0.6 để sáng hơn
        ctx.fillStyle = `rgba(${rgbColor}, 0.6)`;
        ctx.beginPath(); ctx.arc(shakeX, shakeY, size, 0, Math.PI * 2); ctx.fill();

          ctx.shadowBlur = 0; 
          ctx.strokeStyle = dotColor;
          ctx.lineWidth = 2.5; 
          ctx.globalAlpha = a * 0.9;  // 🔧 Thêm dòng này để stroke sáng hơn
          ctx.stroke();
          ctx.globalAlpha = a;  // Reset lại

          ctx.beginPath();
          ctx.arc(d.x, d.y, size * 0.65, Math.PI * 1.05, Math.PI * 1.55);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'; 
          ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(d.x, d.y, size * 0.55, Math.PI * 0.15, Math.PI * 0.45);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1.2; ctx.stroke();

          if (isNew) {
              ctx.font = '11px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const heartScale = 1 + Math.sin(d.blink * 3) * 0.25; 
              ctx.translate(d.x, d.y);
              ctx.scale(heartScale, heartScale);
              ctx.fillText('💛', 0, 0);
          }
        }
        ctx.restore();
      });
    };

    const drawParticles = () => {
      s.particles = s.particles.filter(p => p.alpha > 0.04);
      s.particles.forEach(p => {
        ctx.globalAlpha = p.alpha; 
        ctx.fillStyle = p.color || GREEN; 
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

      // 1. Khởi tạo biến đếm
      if (s.spawnedCount === undefined) {
        s.spawnedCount = 0;
      }

      // 2. SPAWN DOTS TỪ TRÊN XUỐNG
      const currentWishes = wishesRef?.current || [];
      if (currentWishes.length > 0) {
        // KIỂM TRA THƯ MỚI: Nếu ID thư mới nhất chưa có trong danh sách dots, đưa nó vào Canvas ngay lập tức!
        if (newWishIdRef?.current) {
          const hasNewDot = s.dots.some(d => d.wish && d.wish.id === newWishIdRef.current);
          if (!hasNewDot) {
            const newWishObj = currentWishes.find(w => w.id === newWishIdRef.current);
            if (newWishObj) {
              const randomX = 80 + Math.random() * (W() - 160);
              s.dots.push({ 
                x: randomX, 
                y: -50, 
                vy: 3.5, 
                blink: Math.random() * Math.PI * 2, 
                life: 9999, 
                wish: newWishObj,
                isSuperNew: true, // Đánh dấu hiệu ứng rơi đặc biệt
                isOwnNew: true
              });
            }
          }
        }

        // Spawn các thư cũ bình thường
        if (s.spawnedCount < currentWishes.length && Math.random() < 0.08) {
          const wishToSpawn = currentWishes[s.spawnedCount];
          // Tránh spawn trùng lặp nếu nó là thư mới đã được add ở trên
          const isAlreadySpawned = s.dots.some(d => d.wish && d.wish.id === wishToSpawn.id);
          if (!isAlreadySpawned) {
            const randomX = 50 + Math.random() * (W() - 100);
            s.dots.push({ 
              x: randomX, 
              y: -30, 
              vy: 1.5 + Math.random() * 0.5,
              blink: Math.random() * Math.PI * 2, 
              life: 9999, 
              wish: wishToSpawn 
            });
          }
          s.spawnedCount++;
        }
      }

      // 3. UPDATE POSITION DOTS (Chạm điểm dừng thì xếp hàng)
      s.dots.forEach((d, index) => {
        if (d.vy !== undefined) {
          const row = Math.floor(index / 5);
          const targetY = H() - 100 - (row * 65); 
          
          if (d.y < targetY) {
            d.y += d.vy; 
            
            // ✨ HIỆU ỨNG ĐUÔI PHÁT SÁNG CHO THƯ MỚI ĐANG RƠI
            if (d.isSuperNew && Math.random() < 0.4) {
              s.particles.push({ 
                x: d.x + (Math.random() - 0.5) * 8, 
                y: d.y - 10, 
                vx: (Math.random() - 0.5) * 1, 
                vy: -Math.random() * 0.8, // bay ngược nhẹ lên trên
                alpha: 1, 
                r: Math.random() * 2 + 1,
                color: '#ffd700' // màu hồng phát sáng lấp lánh
              });
            }
          } else {
            // Khi chạm đất: Tạo một vòng sóng xung kích (Pulse) cực mạnh báo hiệu thư đã tiếp đất an toàn!
            if (d.isSuperNew) {
              d.isSuperNew = false; // Tắt trạng thái rơi đặc biệt
              // Tạo 2 vòng sóng lan tỏa ra ngoài
              s.rings.push({ x: d.x, y: targetY, r: 5, speed: 2.5, maxR: 60, alpha: 1 });
              s.rings.push({ x: d.x, y: targetY, r: 5, speed: 1.5, maxR: 40, alpha: 0.8 });
            }
            
            d.y = targetY; 
            d.vy = 0; 
          }

          // Giữ không cho bọt biển bị đẩy văng ra ngoài 2 bên lề màn hình
          if (d.x < 30) d.x = 30;
          if (d.x > W() - 30) d.x = W() - 30;
        }
      });

      // 4. LOGIC ĐẨY NHAU (CHỐNG ĐÈ LÊN NHAU) - MIN_DIST = 55
      const MIN_DIST = 55;
      for (let i = 0; i < s.dots.length; i++) {
        for (let j = i + 1; j < s.dots.length; j++) {
          const d1 = s.dots[i];
          const d2 = s.dots[j];
          
          const dx = d2.x - d1.x;
          const dy = d2.y - d1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MIN_DIST && dist > 0) {
            const overlap = MIN_DIST - dist;
            const pushX = (dx / dist) * overlap * 0.5;
            const pushY = (dy / dist) * overlap * 0.5;

            // Đẩy 2 cục dạt ra xa nhau
            d1.x -= pushX;
            d1.y -= pushY; 
            d2.x += pushX;
            d2.y += pushY;
          }
        }
      }

      // Đã xóa bỏ hoàn toàn tất cả đoạn mã kiểm tra mở thang cuộn (onAllDotsFinished) ở đây

      drawGrid(); drawRings(); drawDots(); drawParticles(); drawCrosshair();
      s.raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(s.raf); ro.disconnect(); canvas.removeEventListener('click', handleClick); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}