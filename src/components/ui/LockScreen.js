import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function LockScreen({ passcode, setPasscode, hint, handleUnlock }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-[0_0_40px_rgba(100,217,255,0.1)] text-center">
        <div className="w-16 h-16 bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-sky-400/30">
          <Lock className="w-8 h-8 text-sky-400" />
        </div>
        <h2 className="text-2xl font-bold text-sky-200 mb-2">Hộp Thư Dưới Đáy Biển</h2>
        <p className="text-sky-300/60 mb-6">Nhập mật mã để lặn xuống nơi cất giữ lời chúc</p>
        <form onSubmit={handleUnlock} className="space-y-4">
          <input
            type="text" value={passcode} onChange={e => setPasscode(e.target.value)}
            placeholder="4 chữ số của khoảnh khắc..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border-2 border-[#64d9ff]/50 focus:outline-none focus:ring-2 focus:ring-[#ff99c4] text-white placeholder-white/50 text-center font-bold tracking-wider shadow-[0_0_15px_rgba(100,217,255,0.2)]"
          />
          <button type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#64d9ff] to-[#a1eeff] hover:from-[#ff99c4] hover:to-[#ffb6c1] text-[#021428] font-bold rounded-xl shadow-[0_0_20px_rgba(100,217,255,0.4)] transition-all active:scale-95">
            Lặn Xuống
          </button>
        </form>
        <AnimatePresence>
          {hint && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="mt-4 text-sm font-medium text-sky-300 bg-sky-900/30 py-2 px-4 rounded-lg border border-sky-500/20">
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}