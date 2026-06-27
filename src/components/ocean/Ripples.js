'use client';

export default function Ripples() {
    return (
        <>
            <div className="ripple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[15px] border-[#a1eeff]/80 z-10" style={{ width: 0, height: 0 }}></div>
            <div className="ripple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-[#ff99c4]/60 z-10" style={{ width: 0, height: 0 }}></div>
            <div className="ripple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-[#64d9ff]/50 z-10" style={{ width: 0, height: 0 }}></div>
            <div className="ripple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-[#ffb3d6]/40 z-10" style={{ width: 0, height: 0 }}></div>
            <div className="ripple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white/30 z-10" style={{ width: 0, height: 0 }}></div>
        </>
    );
}