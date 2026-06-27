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
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6 md:gap-8 bg-black/50 px-6 py-4 md:px-8 md:py-4 rounded-full backdrop-blur-xl border border-[#ff99c4]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-1000 ${isLanding ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
            <button onClick={handlePrevTab} className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#64d9ff]/10 text-[#64d9ff] text-2xl md:text-3xl hover:bg-[#ff99c4]/20 hover:text-[#ff99c4] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,153,196,0.6)] transition-all focus:outline-none" aria-label="Previous Tab">
                ◀
            </button>
            <div className="flex items-center gap-4">
                {[0, 1, 2, 3].map((tabIndex) => (
                    <button
                        key={tabIndex}
                        onClick={() => setActiveTab(tabIndex)}
                        className={`rounded-full transition-all duration-500 ease-out focus:outline-none ${
                            activeTab === tabIndex 
                            ? 'w-10 h-3 md:w-12 md:h-3.5 bg-gradient-to-r from-[#ff99c4] to-[#ffb3d1] shadow-[0_0_15px_#ff99c4] scale-110' 
                            : 'w-3 h-3 md:w-3.5 md:h-3.5 bg-[#64d9ff]/30 hover:bg-[#64d9ff]/70 hover:shadow-[0_0_10px_#64d9ff]'
                        }`}
                        aria-label={`Tab ${tabIndex + 1}`}
                    />
                ))}
            </div>
            <button onClick={handleNextTab} className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#64d9ff]/10 text-[#64d9ff] text-2xl md:text-3xl hover:bg-[#ff99c4]/20 hover:text-[#ff99c4] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,153,196,0.6)] transition-all focus:outline-none" aria-label="Next Tab">
                ▶
            </button>
        </div>
    );
}