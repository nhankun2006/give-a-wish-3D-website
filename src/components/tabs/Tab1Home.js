'use client';

import { motion } from 'framer-motion';

export default function Tab1Home() {
  // Generate random bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 2}s`
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
    >
      {/* Background bubbles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute bottom-0 rounded-full bg-cyan-100/30 backdrop-blur-sm border border-white/20"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
            }}
            animate={{
              y: ['0vh', '-100vh'],
              x: ['-10px', '10px', '-10px']
            }}
            transition={{
              y: {
                duration: parseFloat(bubble.animationDuration),
                repeat: Infinity,
                ease: "linear",
                delay: parseFloat(bubble.animationDelay)
              },
              x: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>

      <div className="z-10 bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl max-w-sm w-full mx-4 flex flex-col items-center text-center clay-panel">
        <h2 className="text-3xl font-bold text-cyan-900 drop-shadow-sm mb-6">Tam Triều Dâng</h2>
        
        {/* Portrait Placeholder */}
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-200 shadow-lg mb-6 relative bg-cyan-100/50 flex items-center justify-center">
           <span className="text-cyan-700/50 font-medium">Portrait Placeholder</span>
        </div>

        <p className="text-cyan-800 font-medium px-4">
          Welcome to the Ocean Sunlight theme.<br/>
          Interact with the starfish!
        </p>
      </div>

      <style jsx>{`
        .clay-panel {
          box-shadow: 
            8px 8px 16px rgba(0,0,0,0.1),
            -8px -8px 16px rgba(255,255,255,0.4),
            inset 2px 2px 4px rgba(255,255,255,0.5),
            inset -2px -2px 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </motion.div>
  );
}
