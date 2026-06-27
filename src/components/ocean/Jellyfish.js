'use client';

export default function Jellyfish({ style }) {
    return (
        <div className="creature" style={{ position: 'absolute', ...style }}>
            <svg viewBox="0 0 100 120" width="100%" height="100%">
                {/* Thân sứa */}
                <path d="M10 60 C10 10 90 10 90 60 Q80 70 70 60 Q60 70 50 60 Q40 70 30 60 Q20 70 10 60 Z" fill="#ffb3d6" opacity="0.8" />
                {/* Xúc tu */}
                <path d="M30 60 Q20 90 35 110 M50 60 Q50 90 50 115 M70 60 Q80 90 65 110" stroke="#64d9ff" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
            </svg>
        </div>
    );
}