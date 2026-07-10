import { motion, AnimatePresence } from 'framer-motion';

export default function LockScreen({ passcode, setPasscode, hint, handleUnlock }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4" 
      style={{
        background: 'linear-gradient(180deg, #0a4d6f 0%, #0f7a99 50%, #1aa0c2 100%)',
        position: 'relative', overflow: 'hidden'
      }}>

      <motion.div 
        initial={{ scale: 0.8, y: 30, opacity: 0 }} 
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="max-w-md w-full relative z-10"
        style={{
          background: 'linear-gradient(135deg, #fff9e6 0%, #ffe6f0 50%, #e6f7ff 100%)',
          borderRadius: '40px',
          padding: '40px 30px',
          border: '6px solid #ffffff',
          boxShadow: `
            0 0 0 8px #64d9ff,
            0 20px 0 #007099,
            0 30px 60px rgba(0, 0, 0, 0.3),
            inset 0 2px 10px rgba(255, 255, 255, 0.6)
          `,
          textAlign: 'center'
        }}>
        
        {/* Icon khóa cute */}
        <motion.div 
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-6xl mx-auto mb-4"
        >
          🔒
        </motion.div>

        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '900', 
          color: '#025673', 
          marginBottom: '8px',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          letterSpacing: '0.5px'
        }}>
          Hộp Thư Dưới Đáy Biển
        </h2>

        <p style={{ 
          fontSize: '14px', 
          color: '#0277bd', 
          marginBottom: '24px',
          fontWeight: '600',
          lineHeight: '1.6'
        }}>
          Nhập mật mã để xem<br/>nơi cất giữ những lời chúc
        </p>

        <form onSubmit={handleUnlock} className="space-y-4" suppressHydrationWarning>
          <input
            type="text" 
            value={passcode} 
            onChange={e => setPasscode(e.target.value)}
            placeholder="4 chữ số khẳng khắc..."
            maxLength="4"
            className="transition-all duration-200 focus:scale-[1.02]"
            style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '20px',
            background: '#ffffff',
            border: '4px solid #64d9ff',
            color: '#025673',
            fontSize: '20px',
            fontWeight: '900',
            textAlign: 'center',
            letterSpacing: passcode ? '8px' : '0px',
            outline: 'none',
            boxShadow: '0 4px 12px rgba(100, 217, 255, 0.2), inset 0 2px 4px rgba(0,0,0,0.05)',
            fontFamily: 'monospace'
          }}
          />

          <button 
            type="submit"
            className="group relative overflow-hidden transition-all duration-200 active:translate-y-2 active:shadow-none"
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'linear-gradient(to bottom, #64d9ff, #33c2f2)',
              color: '#025673',
              fontWeight: '900',
              fontSize: '16px',
              borderRadius: '20px',
              border: '4px solid #ffffff',
              boxShadow: '0 6px 0 #007099, 0 12px 20px rgba(0, 112, 153, 0.3)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>Lặn Xuống Nào</span>
          </button>
        </form>

        <AnimatePresence>
          {hint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{
                marginTop: '20px',
                padding: '14px 16px',
                background: 'linear-gradient(135deg, #fff0e6 0%, #ffe6f0 100%)',
                borderRadius: '16px',
                border: '3px dashed #ff99c4',
                color: '#c21d5a',
                fontSize: '13px',
                fontWeight: '700',
                textShadow: '0 1px 2px rgba(255,255,255,0.8)'
              }}
            >
              💡 {hint}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}