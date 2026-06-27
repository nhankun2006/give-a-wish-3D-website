'use client';

export default function Starfish({ style }) {
    return (
        <div className="creature" style={{ position: 'absolute', ...style }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
                {/* Thân sao biển */}
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="#ff8db8" />
                {/* Mắt và miệng cười */}
                <circle cx="40" cy="45" r="3" fill="#021428" />
                <circle cx="60" cy="45" r="3" fill="#021428" />
                <path d="M45 55 Q50 60 55 55" stroke="#021428" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
        </div>
    );
}