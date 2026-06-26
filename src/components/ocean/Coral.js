'use client';

export default function Coral({ style }) {
    return (
        <div className="decor decor-coral" style={{ position: 'absolute', ...style }}>
            <svg viewBox="0 0 160 140" width="100%" height="100%">
                <path d="M20 120 Q22 70 40 54 Q55 40 54 18 Q66 16 68 36 Q82 56 76 78 Q90 96 92 120 Z" fill="#ff8db8" />
                <path d="M70 120 Q72 76 84 60 Q96 46 98 24 Q110 22 112 42 Q126 64 118 86 Q132 104 134 128 Z" fill="#ffbad8" />
            </svg>
        </div>
    );
}