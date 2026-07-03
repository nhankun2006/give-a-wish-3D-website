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

    useEffect(() => {
        creatureRefs.current.forEach((creature, index) => {
            if (!creature) return;

            // ⬅️ TẠO GỢN SÓNG MỘT LẦN KHI LOAD
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.className = 'spawn-ripple';
                ripple.style.width = creature.offsetWidth + 'px';
                ripple.style.height = creature.offsetWidth + 'px';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';

                creature.appendChild(ripple);
                setTimeout(() => ripple.remove(), 1200); // ⬅️ XÓA GỢN SAU 1.2s
            }, index * 200); // ⬅️ LẦN LƯỢT TẠO GỢN SÓ
        });
    }, []);

    return (
        <>
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

            <Coral style={{ left: '5%', bottom: '3%', width: '130px' }} />
            <Coral style={{ right: '6%', bottom: '1%', width: '150px' }} />
        </>
    );
}