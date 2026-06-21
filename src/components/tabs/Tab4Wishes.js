'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Send, ImagePlus } from 'lucide-react';

export default function Tab4Wishes({ isUnlocked, setIsUnlocked }) {
  const [passcode, setPasscode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');
  
  const [wishes, setWishes] = useState([
    { id: 1, name: "Fan 1", message: "Always shining bright!", img: null },
    { id: 2, name: "Fan 2", message: "Love your acting so much.", img: null },
  ]);
  const [newWishName, setNewWishName] = useState('');
  const [newWishMsg, setNewWishMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const correctPasscode = "sunlight"; // Placeholder

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode.toLowerCase() === correctPasscode) {
      setIsUnlocked(true);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts === 1) {
      setHint("Vague Hint: It's what the ocean needs to sparkle.");
    } else if (newAttempts === 2) {
      setHint("Explicit Hint: Starts with 'sun' and ends with 'light'.");
    } else if (newAttempts >= 3) {
      setPasscode(correctPasscode);
      setHint("Auto-unlocked! (Too many attempts)");
      setTimeout(() => setIsUnlocked(true), 1000);
    }
  };

  const filterBadWords = (text) => {
    const badWords = ['badword1', 'badword2', 'ugly', 'hate'];
    let sanitized = text;
    badWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      sanitized = sanitized.replace(regex, '***');
    });
    return sanitized;
  };

  const handleSubmitWish = (e) => {
    e.preventDefault();
    if (!newWishName.trim() || !newWishMsg.trim()) {
      setErrorMsg("Please fill in both name and message.");
      return;
    }
    if (newWishMsg.length > 250) {
      setErrorMsg("Message cannot exceed 250 characters.");
      return;
    }

    const sanitizedMsg = filterBadWords(newWishMsg);
    setWishes([{ id: Date.now(), name: newWishName, message: sanitizedMsg, img: null }, ...wishes]);
    setNewWishName('');
    setNewWishMsg('');
    setErrorMsg('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-auto flex flex-col items-center custom-scrollbar overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, rgba(254, 243, 199, 0.5) 0%, rgba(2, 132, 199, 0.4) 100%)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className="w-full max-w-4xl px-4 py-16">
        
        {!isUnlocked ? (
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-md mx-auto bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl clay-card text-center mt-32"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-amber-300">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-sky-900 mb-2">Secret Treasure</h2>
            <p className="text-sky-800/80 mb-6">Enter the passcode to unlock fan wishes</p>
            
            <form onSubmit={handleUnlock} className="space-y-4">
              <input 
                type="text" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-900 placeholder-sky-900/40 text-center font-bold tracking-wider"
              />
              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
              >
                Unlock
              </button>
            </form>

            <AnimatePresence>
              {hint && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm font-medium text-amber-700 bg-amber-100/50 py-2 px-4 rounded-lg"
                >
                  {hint}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-sky-100 rounded-full mb-4 shadow-sm border border-sky-200">
                 <Unlock className="w-6 h-6 text-sky-600" />
              </div>
              <h2 className="text-3xl font-bold text-sky-900 drop-shadow-sm">Treasure Chest Unlocked!</h2>
              <p className="text-sky-800/80 mt-2">Read and share your wishes</p>
            </div>

            {/* Wishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.map((wish) => (
                <motion.div 
                  key={wish.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ y: -5, rotate: -2 }}
                  className="bg-white p-4 rounded-lg shadow-xl pb-12 relative border border-gray-100 origin-bottom"
                  style={{ backgroundImage: 'linear-gradient(to bottom, #fff 0%, #fefefe 100%)' }}
                >
                  {/* Polaroid Photo area */}
                  <div className="w-full aspect-square bg-sky-50 mb-4 flex items-center justify-center border border-gray-100 overflow-hidden">
                    {wish.img ? (
                       <img src={wish.img} alt="Fan upload" className="w-full h-full object-cover" />
                    ) : (
                       <span className="text-sky-200 font-bold text-4xl opacity-50">♥</span>
                    )}
                  </div>
                  <p className="font-handwriting text-gray-800 text-lg leading-relaxed">{wish.message}</p>
                  <p className="absolute bottom-4 right-4 font-bold text-sky-600 text-sm">- {wish.name}</p>
                </motion.div>
              ))}
            </div>

            {/* Submit Form */}
            <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/80 shadow-2xl clay-card">
              <h3 className="text-2xl font-bold text-sky-900 mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-sky-500" /> Add Your Wish
              </h3>
              
              <form onSubmit={handleSubmitWish} className="space-y-4">
                <div className="flex gap-4 flex-col sm:flex-row">
                  <input 
                    type="text" 
                    value={newWishName}
                    onChange={(e) => setNewWishName(e.target.value)}
                    placeholder="Your Name"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-white focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-900"
                  />
                  <div className="relative flex-1">
                    <input type="file" id="file-upload" className="hidden" accept="image/*" />
                    <label htmlFor="file-upload" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-white focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-900 cursor-pointer hover:bg-white/80 transition-colors h-full">
                      <ImagePlus className="w-5 h-5 text-sky-500" /> Upload Photo
                    </label>
                  </div>
                </div>
                
                <div className="relative">
                  <textarea 
                    value={newWishMsg}
                    onChange={(e) => setNewWishMsg(e.target.value)}
                    placeholder="Write your message here... (max 250 chars)"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-900 resize-none"
                  ></textarea>
                  <span className={`absolute bottom-3 right-3 text-sm ${newWishMsg.length > 250 ? 'text-red-500 font-bold' : 'text-sky-600/60'}`}>
                    {newWishMsg.length}/250
                  </span>
                </div>

                {errorMsg && <p className="text-red-500 text-sm font-medium">{errorMsg}</p>}

                <button 
                  type="submit"
                  className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] transition-all active:scale-95 text-lg"
                >
                  Send Wish
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .font-handwriting {
          font-family: 'Caveat', 'Comic Sans MS', cursive;
        }
        .clay-card {
          box-shadow: 
            8px 8px 16px rgba(2, 132, 199, 0.1),
            -8px -8px 16px rgba(255, 255, 255, 0.7),
            inset 1px 1px 2px rgba(255, 255, 255, 0.4);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(14, 165, 233, 0.5);
          border-radius: 4px;
        }
      `}</style>
    </motion.div>
  );
}
