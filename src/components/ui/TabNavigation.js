'use client';

export default function TabNavigation({ activeTab, setActiveTab, handlePrevTab, handleNextTab, isLanding }) {
    return (
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-[#ff99c4]/30 shadow-lg transition-all duration-1000 ${isLanding ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
            <button onClick={handlePrevTab} className="text-[#64d9ff] hover:text-[#ff99c4] hover:scale-125 transition-all px-2 font-bold">◀</button>
            {[0, 1, 2, 3].map((tabIndex) => (
                <button
                    key={tabIndex}
                    onClick={() => setActiveTab(tabIndex)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTab === tabIndex ? 'bg-[#ff99c4] scale-150 shadow-[0_0_12px_#ff99c4]' : 'bg-[#64d9ff]/40 hover:bg-[#64d9ff]'}`}
                />
            ))}
            <button onClick={handleNextTab} className="text-[#64d9ff] hover:text-[#ff99c4] hover:scale-125 transition-all px-2 font-bold">▶</button>
        </div>
    );
}