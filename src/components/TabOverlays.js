'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Tab1Home from './tabs/Tab1Home';
import Tab2Gallery from './tabs/Tab2Gallery';
import Tab3Cinema from './tabs/Tab3Cinema';
import Tab4Wishes from './tabs/Tab4Wishes';

export default function TabOverlays({ activeTab, onBack, showVideo, onCloseVideo, isUnlocked, setIsUnlocked }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {activeTab !== null && (
          <>
            {/* Global Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={onBack}
              className="absolute top-6 left-6 z-50 pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full shadow-lg border border-white/50 text-sky-900 font-bold hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Menu
            </motion.button>

            {/* Render active tab content */}
            {activeTab === 0 && <Tab1Home />}
            {activeTab === 1 && <Tab2Gallery />}
            {activeTab === 2 && <Tab3Cinema showVideo={showVideo} onCloseVideo={onCloseVideo} />}
            {activeTab === 3 && <Tab4Wishes isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
