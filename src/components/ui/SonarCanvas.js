'use client';
import { useEffect, useRef } from 'react';

export default function SonarCanvas({ triggerRef, onDotClick, wishesRef, newWishIdRef, readWishesRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = { rings: [], dots: [], particles: [], sweepAngle: 0, raf: null };
    const GREEN = '#1aff8c';
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
        return dist < 20;
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

    triggerRef.current = () => {
      s.rings.push({ x: cx(), y: cy(), r: 4, maxR: maxR(), alpha: 1, speed: 2.8 });
      s.rings.push({ x: cx(), y: cy(), r: 4, maxR: maxR() * 0.6, alpha: 1, speed: 2.2 });
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
      grad.addColorStop(0, 'rgba(100,217,255,0.15)');
      grad.addColorStop(1, 'rgba(100,217,255,0)');
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, R, -0.06, Math.PI * 0.35); ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();
      ctx.strokeStyle = 'rgba(255,153,196,0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(R, 0); ctx.stroke();
      ctx.restore();

      const currentWishes = wishesRef?.current || [];
      const safeRadius = (Math.min(W(), H()) / 2) - 40;

      if (!s.wishNodes || s.wishNodes.length !== currentWishes.length) {
        s.wishNodes = [];
        const MIN_DIST = 55; // Khoảng cách tối thiểu giữa 2 bọt biển (tăng số này nếu muốn chúng cách xa hơn)

        currentWishes.forEach(wish => {
          let isValid = false;
          let attempts = 0;
          let nodeAngle = 0;
          let nodeDist = 0;

          // Thử tìm vị trí ngẫu nhiên (tối đa 200 lần thử cho mỗi bọt biển để tránh treo trình duyệt)
          while (!isValid && attempts < 200) {
            attempts++;
            nodeAngle = Math.random() * Math.PI * 2;
            nodeDist = Math.random() * safeRadius * 0.8 + safeRadius * 0.15;
            
            // Tính tọa độ x, y thực tế của bọt biển trên màn hình
            const dx = cx() + Math.cos(nodeAngle) * nodeDist;
            const dy = cy() + Math.sin(nodeAngle) * nodeDist;

            // 1️⃣ VÙNG CẤM SỐ 1: Nút "Nổi Lên Mặt Nước" (Góc trái trên)
            // (Giả sử nút rộng 280px, cao 100px)
            const isOverlappingTopLeft = (dx < 280 && dy < 100);

            // 2️⃣ VÙNG CẤM SỐ 2: TabNavigation (Giữa dưới cùng)
            // (Giả sử thanh tab bao phủ từ giữa tỏa ra 2 bên mỗi bên 160px, cao 120px từ đáy lên)
            const isOverlappingBottomCenter = (dx > cx() - 160 && dx < cx() + 160 && dy > H() - 120);

            // 3️⃣ VÙNG CẤM SỐ 3: Các bọt biển đã được vẽ trước đó
            let isOverlappingOthers = false;
            for (let existingNode of s.wishNodes) {
              const ex = cx() + Math.cos(existingNode.angle) * existingNode.dist;
              const ey = cy() + Math.sin(existingNode.angle) * existingNode.dist;
              
              // Tính khoảng cách giữa vị trí đang thử và bọt biển cũ
              const distance = Math.sqrt(Math.pow(dx - ex, 2) + Math.pow(dy - ey, 2));
              
              if (distance < MIN_DIST) {
                isOverlappingOthers = true;
                break; // Vị trí này đè lên bọt biển khác, thoát vòng lặp và thử lại
              }
            }

            // Nếu vượt qua được 3 chướng ngại vật trên -> Vị trí hợp lệ!
            if (!isOverlappingTopLeft && !isOverlappingBottomCenter && !isOverlappingOthers) {
              isValid = true;
            }
          }

          // Lưu vị trí hợp lệ (hoặc vị trí của lần thử thứ 200) vào mảng
          s.wishNodes.push({ 
            wish: wish, 
            angle: nodeAngle, 
            dist: nodeDist, 
            cooldown: 0 
          });
        });
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
          
          for (let i = 0; i < 6; i++) {
            const branchAngle = (Math.PI * 2 / 6) * i - Math.PI / 2;
            const branchLength = 7; 
            const branchX = d.x + Math.cos(branchAngle) * branchLength;
            const branchY = d.y + Math.sin(branchAngle) * branchLength; 
            
            ctx.strokeStyle = 'rgba(255, 153, 196, 0.95)';
            ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(branchX, branchY); ctx.stroke();
            
            ctx.globalAlpha = a * 0.6;
            ctx.strokeStyle = 'rgba(255, 120, 170, 0.7)';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(branchX, branchY); ctx.stroke();
            
            ctx.globalAlpha = a * 0.9;
            ctx.fillStyle = 'rgba(255, 200, 220, 1)';
            ctx.beginPath(); ctx.arc(branchX, branchY, 2.5, 0, Math.PI * 2); ctx.fill();
            
            ctx.globalAlpha = a * 0.8;
            ctx.strokeStyle = 'rgba(255, 153, 196, 0.9)';
            ctx.lineWidth = 1.2; ctx.stroke();
            
            ctx.globalAlpha = a * coralGlow * 0.8;
            ctx.fillStyle = 'rgba(255, 220, 235, 0.9)';
            ctx.beginPath(); ctx.arc(branchX, branchY, 1.2, 0, Math.PI * 2); ctx.fill();
          }
          
          ctx.globalAlpha = a * 0.85;
          ctx.fillStyle = 'rgba(255, 153, 196, 0.8)';
          ctx.beginPath(); ctx.arc(d.x, d.y, 3.5, 0, Math.PI * 2); ctx.fill();
          
          ctx.globalAlpha = a * 0.7;
          ctx.strokeStyle = 'rgba(255, 100, 160, 0.9)';
          ctx.lineWidth = 1.5; ctx.stroke();
          
          ctx.globalAlpha = a * coralGlow * 0.7;
          ctx.fillStyle = 'rgba(255, 220, 235, 0.85)';
          ctx.beginPath(); ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2); ctx.fill();

          for (let ring = 1; ring <= 3; ring++) {
            ctx.globalAlpha = a * coralGlow * (1 - ring / 4) * 0.65;
            ctx.strokeStyle = `rgba(255, 200, 220, ${0.9 - ring * 0.2})`;
            ctx.lineWidth = 2 - ring * 0.4;
            ctx.beginPath(); ctx.arc(d.x, d.y, 7 + ring * 4, 0, Math.PI * 2); ctx.stroke();
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
          const dotColor = isNew ? PINK : CYAN;
          const rgbColor = isNew ? '255,153,196' : '100,217,255';
          const size = isNew ? 12 : 8; 

          ctx.shadowColor = dotColor;
          ctx.shadowBlur = isNew ? 25 : 15;

          ctx.fillStyle = `rgba(${rgbColor}, 0.25)`;
          ctx.beginPath(); ctx.arc(d.x, d.y, size, 0, Math.PI * 2); ctx.fill();

          ctx.shadowBlur = 0; 
          ctx.strokeStyle = dotColor;
          ctx.lineWidth = 1.5; ctx.stroke();

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
              ctx.fillText('💖', 0, 0);
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
      drawGrid(); drawSweep(); drawRings(); drawDots(); drawParticles(); drawCrosshair();
      s.raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(s.raf); ro.disconnect(); canvas.removeEventListener('click', handleClick); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}