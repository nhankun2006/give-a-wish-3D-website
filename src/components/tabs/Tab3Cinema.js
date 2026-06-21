'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle } from 'lucide-react';

export default function Tab3Cinema({ showVideo, onCloseVideo }) {
  // Deep sea light particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 4 + 3}s`,
    animationDelay: `${Math.random() * 2}s`
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-auto flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.6) 0%, rgba(8, 47, 73, 0.8) 100%)',
        backdropFilter: 'blur(4px)'
      }}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-200/40 blur-[1px]"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: ['-10px', '10px', '-10px'],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: parseFloat(particle.animationDuration),
              repeat: Infinity,
              ease: "easeInOut",
              delay: parseFloat(particle.animationDelay)
            }}
          />
        ))}
      </div>

      {/* Running Text */}
      <div className="absolute top-1/4 w-full text-center z-10 pointer-events-none">
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-xl md:text-2xl font-light text-cyan-100 tracking-widest drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        >
          Có một bí mật đang trôi dạt...
        </motion.p>
        <p className="text-sm text-cyan-300/60 mt-4 animate-pulse">
          Click the bottle
        </p>
      </div>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.3)] border border-cyan-500/30 flex items-center justify-center group">
              
              <button 
                onClick={onCloseVideo}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-cyan-500/50 p-2 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Placeholder Video Player UI */}
              <div className="text-center">
                <PlayCircle className="w-20 h-20 text-cyan-400 mx-auto mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all cursor-pointer" />
                <p className="text-cyan-200 font-medium">Video Placeholder</p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
