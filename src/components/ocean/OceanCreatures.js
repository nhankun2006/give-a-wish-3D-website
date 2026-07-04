'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';

const Fish     = dynamic(() => import('./Fish'),     { ssr: false });
const Whale    = dynamic(() => import('./Whale'),    { ssr: false });
const Starfish = dynamic(() => import('./Starfish'), { ssr: false });
const Crab     = dynamic(() => import('./Crab'),     { ssr: false });
const Coral    = dynamic(() => import('./Coral'),    { ssr: false });
const Turtle   = dynamic(() => import('./Turtle'),   { ssr: false });
const Octopus  = dynamic(() => import('./Octopus'),  { ssr: false });

const creatures = [
    { type: 'fish', left: '10%', top: '18%', size: '120px', variant: 'pink' },
    { type: 'fish', left: '80%', top: '6%', size: '96px', variant: 'blue' },
    { type: 'fish', left: '18%', top: '6%', size: '85px', variant: 'blue' },
    { type: 'fish', left: '88%', top: '55%', size: '105px', variant: 'pink' },
    { type: 'fish', left: '8%', top: '58%', size: '70px', variant: 'pink' },

    { type: 'whale', left: '15%', top: '32%', size: '140px' },
    { type: 'whale', left: '82%', top: '30%', size: '160px' },
    //{ type: 'whale', left: '48%', top: '1%', size: '160px' },

    { type: 'octopus', left: '16%', top: '50%', size: '100px' },
    { type: 'octopus', left: '75%', top: '62%', size: '95px' },
    { type: 'turtle', left: '86%', top: '10%', size: '110px' },
    { type: 'turtle', left: '5%', top: '8%', size: '90px' },
    { type: 'starfish', left: '16%', top: '82%', size: '60px' },
    { type: 'starfish', left: '78%', top: '84%', size: '70px' },
    { type: 'crab', left: '28%', top: '86%', size: '65px' },
    { type: 'crab', left: '65%', top: '88%', size: '55px' },
];

export default function OceanCreatures() {
    const creatureRefs = useRef([]);
    const timeoutsRef = useRef([]); 
    const isMounted = useRef(true); 

    // ⬅️ ĐỊNH NGHĨA HÀM TRƯỚC
    const createWaterSplash = (element) => {
    if (!isMounted.current) return;
    const creatureRect = element.getBoundingClientRect();
    const centerX = creatureRect.left + creatureRect.width / 2;
    const centerY = creatureRect.top + creatureRect.height / 2;

    for (let i = 0; i < 5; i++) {  // ⬅️ CHỈ 5 HẠT
        const particle = document.createElement('div');
        particle.className = 'splash-particle'; 
        const size = 20 + Math.random() * 15;  // 20-35px
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8), rgba(100,217,255,0.6));
            box-shadow: 0 0 ${size}px rgba(100,217,255,0.7);
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
        `;

        document.body.appendChild(particle);

        const angle = (i / 5) * Math.PI * 2;
        const distance = 120;
        const vx = Math.cos(angle) * distance;
        const vy = Math.sin(angle) * distance;

        gsap.to(particle, {
            x: vx,
            y: vy,
            opacity: 0,
            scale: 0.3,
            duration: 1.2,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
};
    useEffect(() => {
    creatureRefs.current.forEach((creature, index) => {
        if (!creature) return;

        // ⬅️ DELAY CHUNG: 1.3s (delay animation) + 1.5s (duration di chuyển) + 200ms (stagger) = 2.8s + 200ms*index
        const delayBeforeSplash = 1300 + 1500 + (index * 200);

        const t1 = setTimeout(() => {
        // ... code tạo ripple ...
        const t2 = setTimeout(() => ripple.remove(), 1200);
        timeoutsRef.current.push(t2);

        const t3 = setTimeout(() => {
            createWaterSplash(creature);
        }, 1200);
        timeoutsRef.current.push(t3);
    }, delayBeforeSplash);

    timeoutsRef.current.push(t1); 
        });
        return () => {
            isMounted.current = false; // ⬅️ Báo hiệu: Đã tắt tab, mọi người ngừng hoạt động!

            // 1. Tắt hết đồng hồ đếm ngược
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            
            // 2. Tắt hẳn động cơ GSAP đang chạy ngầm cho các giọt nước và gợn sóng
            gsap.killTweensOf('.splash-particle');
            gsap.killTweensOf('.spawn-ripple');
            
            // 3. Quét sạch 100% tàn dư còn sót lại trên màn hình
            const strayParticles = document.querySelectorAll('.splash-particle, .spawn-ripple');
            strayParticles.forEach(p => p.remove());
        };
}, []);

   return (
    <>
        <div className="creatures-layer">  {/* ⬅️ THÊM CONTAINER NÀY */}
            {creatures.map((item, i) => (
                <div
                    key={i}
                    className="creature absolute"
                    ref={(el) => {
                        if (el) creatureRefs.current[i] = el;
                    }}
                    style={{ left: item.left, top: item.top, width: item.size }}
                >
                    {item.type === 'fish' && <Fish style={{ width: '100%' }} variant={item.variant} />}
                    {item.type === 'whale' && <Whale style={{ width: '100%' }} />}
                    {item.type === 'octopus' && <Octopus style={{ width: '100%' }} />}
                    {item.type === 'turtle' && <Turtle style={{ width: '100%' }} />}
                    {item.type === 'starfish' && <Starfish style={{ width: '100%' }} />}
                    {item.type === 'crab' && <Crab style={{ width: '100%' }} />}
                </div>
            ))}
        </div>

        <Coral style={{ left: '5%', bottom: '3%', width: '130px' }} />
        <Coral style={{ right: '6%', bottom: '1%', width: '150px' }} />
    </>
);
}