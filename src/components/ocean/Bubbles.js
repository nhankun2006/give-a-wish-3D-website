'use client';

const bubbles = [
    { left: '10%', size: 12, delay: 0, duration: 8 },
    { left: '20%', size: 18, delay: 2.1, duration: 9 },
    { left: '30%', size: 10, delay: 1.2, duration: 7 },
    { left: '54%', size: 14, delay: 0.9, duration: 10 },
    { left: '78%', size: 16, delay: 3.4, duration: 11 },
    { left: '88%', size: 10, delay: 1.7, duration: 8.5 },

    { left: '15%', size: 15, delay: 3.0, duration: 6 },
    { left: '40%', size: 12, delay: 0.5, duration: 9 },
    { left: '65%', size: 20, delay: 1.5, duration: 7.5 },
    { left: '82%', size: 14, delay: 2.8, duration: 8 },
    { left: '5%', size: 16, delay: 4.1, duration: 10 },
    { left: '95%', size: 11, delay: 0.2, duration: 6.5 },
    { left: '45%', size: 18, delay: 2.5, duration: 8.5 },
    { left: '72%', size: 13, delay: 1.0, duration: 7 },
];

export default function Bubbles() {
    return (
        <>
            {bubbles.map((b, i) => (
                <div key={i} className="bubble absolute bg-white/30 rounded-full shadow-[0_0_10px_#64d9ff]"
                    style={{ left: b.left, width: b.size, height: b.size, bottom: '-10%' }} />
            ))}
        </>
    );
}