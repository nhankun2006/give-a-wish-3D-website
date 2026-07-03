'use client';

import { useEffect, useCallback } from 'react';

export default function TabNavigation({ activeTab, setActiveTab, handlePrevTab, handleNextTab, isLanding, isWishesOpen }) {
    const handleKeyDown = useCallback((e) => {
        if (isLanding) return;
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
        /* KHUNG NỀN: Thu nhỏ padding, giảm khoảng cách (gap) và hạ xuống một chút (bottom-4) */
        <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-5 md:py-2 rounded-[3rem] bg-[#5da2cc]/40 backdrop-blur-md border-[2px] border-[#9cecfb]/80 shadow-[0_0_20px_rgba(156,236,251,0.3),inset_0_0_15px_rgba(255,255,255,0.4)] transition-all duration-1000 ${
                isLanding ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
        >
            {/* NÚT LÙI: Thu nhỏ size xuống w-9 h-9 (mobile) và w-10 h-10 (PC) */}
            <button
                onClick={handlePrevTab}
                className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border-[1.5px] border-white/40 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.1),inset_2px_2px_6px_rgba(255,255,255,0.5)] hover:bg-white/20 transition-all focus:outline-none cursor-pointer group"
                aria-label="Previous Tab"
            >
                <div className="absolute top-1.5 left-1.5 w-2.5 h-1.5 bg-white rounded-full rotate-[-30deg] opacity-90 blur-[0.5px]"></div>
                <div className="absolute bottom-1 right-1.5 w-1.5 h-1 bg-white rounded-full rotate-[-30deg] opacity-60 blur-[0.5px]"></div>
                <span className="text-[#a5f3ff] text-lg md:text-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] group-hover:-translate-x-0.5 transition-transform z-10">◀</span>
            </button>

            {/* CÁC CHẤM TAB: Thu nhỏ khoảng cách mx-1, thu nhỏ size bong bóng active */}
            <div className="flex items-center gap-2.5 md:gap-3 mx-1">
                {[0, 1, 2, 3].map((tabIndex) => (
                    <button
                        key={tabIndex}
                        onClick={() => setActiveTab(tabIndex)}
                        className={`transition-all duration-500 ease-out focus:outline-none cursor-pointer ${
                            activeTab === tabIndex
                                ? 'relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border-[1.5px] border-white/50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.2),inset_3px_3px_8px_rgba(255,255,255,0.6)] scale-110'
                                : 'w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#a5f3ff]/60 border border-white/40 hover:bg-[#a5f3ff] shadow-[0_0_5px_rgba(165,243,255,0.4)]'
                        }`}
                        aria-label={`Tab ${tabIndex + 1}`}
                    >
                        {activeTab === tabIndex && (
                            <>
                                <div className="absolute top-1.5 left-2 w-3 h-1.5 bg-white rounded-full rotate-[-25deg] opacity-90 blur-[0.5px]"></div>
                                <div className="absolute bottom-1.5 right-1.5 w-2 h-1 bg-white rounded-full rotate-[-25deg] opacity-60 blur-[0.5px]"></div>
                                {/* Chấm trung tâm cũng được thu nhỏ */}
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#a5f3ff] drop-shadow-[0_0_5px_rgba(255,255,255,0.9)] z-10"></div>
                            </>
                        )}
                    </button>
                ))}
            </div>

            {/* NÚT TIẾN: Đồng bộ size với nút lùi */}
            <button
                onClick={handleNextTab}
                className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border-[1.5px] border-white/40 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.1),inset_2px_2px_6px_rgba(255,255,255,0.5)] hover:bg-white/20 transition-all focus:outline-none cursor-pointer group"
                aria-label="Next Tab"
            >
                <div className="absolute top-1.5 left-1.5 w-2.5 h-1.5 bg-white rounded-full rotate-[-30deg] opacity-90 blur-[0.5px]"></div>
                <div className="absolute bottom-1 right-1.5 w-1.5 h-1 bg-white rounded-full rotate-[-30deg] opacity-60 blur-[0.5px]"></div>
                <span className="text-[#a5f3ff] text-lg md:text-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] group-hover:translate-x-0.5 transition-transform z-10">▶</span>
            </button>
        </div>
    );
}