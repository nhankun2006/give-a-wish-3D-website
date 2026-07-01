'use client';

import { useEffect, useCallback } from 'react';

export default function TabNavigation({ activeTab, setActiveTab, handlePrevTab, handleNextTab, isLanding }) {
    const handleKeyDown = useCallback((e) => {
        if (isLanding) return; // Don't navigate if in landing page
        if (e.key === 'ArrowLeft') {
            handlePrevTab();
        } else if (e.key === 'ArrowRight') {
            handleNextTab();
        }
    }, [handlePrevTab, handleNextTab, isLanding]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-[22px] md:gap-5 bg-black/50 px-3.5 py-1.5 md:px-5 md:py-2.5 rounded-full backdrop-blur-xl border border-[#ff99c4]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-1000 ${isLanding
                    ? 'opacity-0 translate-y-10 pointer-events-none'
                    : 'opacity-100 translate-y-0'
                }`}
        >
            <button
                onClick={handlePrevTab}
                className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#64d9ff]/10 text-[#64d9ff] text-lg md:text-xl hover:bg-[#ff99c4]/20 hover:text-[#ff99c4] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,153,196,0.6)] transition-all focus:outline-none cursor-pointer"
                aria-label="Previous Tab"
            >
                ◀
            </button>

            <div className="flex items-center gap-2.5 md:gap-3.5">
                {[0, 1, 2, 3].map((tabIndex) => (
                    <button
                        key={tabIndex}
                        onClick={() => setActiveTab(tabIndex)}
                        className={`rounded-full transition-all duration-500 ease-out focus:outline-none cursor-pointer ${activeTab === tabIndex
                                ? 'w-7 h-2 md:w-9 md:h-2.5 bg-gradient-to-r from-[#ff99c4] to-[#ffb3d1] shadow-[0_0_15px_#ff99c4] scale-110'
                                : 'w-2.5 h-2.5 bg-[#64d9ff]/30 hover:bg-[#64d9ff]/70 hover:shadow-[0_0_10px_#64d9ff]'
                            }`}
                        aria-label={`Tab ${tabIndex + 1}`}
                    />
                ))}
            </div>

            <button
                onClick={handleNextTab}
                className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#64d9ff]/10 text-[#64d9ff] text-lg md:text-xl hover:bg-[#ff99c4]/20 hover:text-[#ff99c4] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,153,196,0.6)] transition-all focus:outline-none cursor-pointer"
                aria-label="Next Tab"
            >
                ▶
            </button>
        </div>
    );
}