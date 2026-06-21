'use client';

import { motion } from 'framer-motion';
import { Footprints } from 'lucide-react';

export default function Tab2Gallery() {
  const milestones = [
    { year: "2012", title: "Gia đình phép thuật", desc: "First acting role that captured many hearts." },
    { year: "2014", title: "Chuyện làng Bè", desc: "A remarkable performance demonstrating versatility." },
    { year: "2018", title: "Ngôi sao khoai tây", desc: "Major breakthrough in television." },
    { year: "2021", title: "Mùa hè sôi động", desc: "Leading role in a successful youth series." },
    { year: "2024", title: "Present", desc: "Continuing to shine and inspire." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 overflow-y-auto pointer-events-auto custom-scrollbar"
      style={{
        background: 'linear-gradient(180deg, rgba(253, 230, 138, 0.4) 0%, rgba(217, 119, 6, 0.2) 100%)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className="max-w-2xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center text-amber-900 mb-12 drop-shadow-md">
          Career Timeline
        </h2>

        <div className="relative border-l-4 border-amber-300/50 ml-6 md:ml-12 space-y-16">
          {milestones.map((item, index) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Footprint Indicator */}
              <div className="absolute -left-5 md:-left-6 top-1 bg-amber-100 rounded-full p-2 shadow-lg border-2 border-amber-300 flex items-center justify-center">
                 <Footprints className="w-5 h-5 text-amber-700" />
              </div>

              {/* Content Card */}
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl clay-card">
                <span className="inline-block px-3 py-1 bg-amber-200/80 text-amber-900 font-bold rounded-full text-sm mb-3">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-amber-950 mb-2">{item.title}</h3>
                
                {/* Image Placeholder */}
                <div className="w-full h-40 bg-amber-100/50 rounded-xl mb-4 flex items-center justify-center border-2 border-dashed border-amber-300/50">
                  <span className="text-amber-700/50 font-medium">Image Placeholder</span>
                </div>

                <p className="text-amber-900/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(217, 119, 6, 0.5);
          border-radius: 4px;
        }
        .clay-card {
          box-shadow: 
            6px 6px 12px rgba(217, 119, 6, 0.15),
            -6px -6px 12px rgba(255, 255, 255, 0.6),
            inset 1px 1px 2px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </motion.div>
  );
}
