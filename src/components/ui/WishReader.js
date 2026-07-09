import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function WishReader({ 
  currentWish, 
  revealed, 
  setRevealed, 
  wishesLength, 
  currentWishIndex, 
  handlePrevWish, 
  handleNextWish, 
  confetti
}) {
  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      padding: '50px', borderRadius: '40px',
      background: '#ffffff',
      border: '8px solid #ff99c4',
      boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
      textAlign: 'center', zIndex: 50,
      display: revealed && currentWish ? 'flex' : 'none',
      flexDirection: 'column', alignItems: 'center', gap: 30,
      width: '750px',
      maxWidth: '92vw', overflow: 'visible'
    }}>
      
      {confetti.map(c => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            position: 'absolute',
            left: c.left + '%',
            top: '-10px',
            width: '10px', height: '10px',
            background: Math.random() > 0.5 ? '#ff99c4' : '#64d9ff',
            animation: `confetti-fall ${c.duration}s ease-in forwards`,
            animationDelay: c.delay + 's',
            borderRadius: '50%'
          }}
        />
      ))}
      
      <AnimatePresence mode="wait">
        {currentWish && revealed && (
          <motion.div
            key={currentWish.id}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <button onClick={() => setRevealed(false)} style={{ 
              position: 'absolute', top: '-15px', right: '-15px', 
              background: '#ff99c4', border: 'none', color: '#fff', 
              borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
            }}>
              <X size={20} />
            </button>

            <div style={{ fontSize: '30px' }}>💌</div>

            <div className="cute-scroll" style={{ 
              width: '100%', 
              maxHeight: '45vh', 
              overflowY: 'auto', 
              padding: '0 20px', 
              backgroundImage: currentWish.message.length > 150 
                ? 'repeating-linear-gradient(transparent, transparent 31px, rgba(255,153,196,0.4) 31px, rgba(255,153,196,0.4) 32px)' 
                : 'none',
              backgroundAttachment: 'local',
              lineHeight: '32px', 
              color: '#021428', 
              fontSize: '18px', 
              fontWeight: '400', 
              textAlign: currentWish.message.length > 150 ? 'justify' : 'center',
              whiteSpace: 'pre-wrap', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: currentWish.message.length > 150 ? 'flex-start' : 'center'
            }}>
              {currentWish.message}
            </div>

            <div style={{ fontSize: '15px', color: '#ff99c4', fontWeight: '800', marginTop: '10px' }}>
              — {currentWish.name} —
            </div>

            {/* Đã xóa cụm nút Sửa và Thu Hồi ở đây */}

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '20px' }}>
              <button onClick={handlePrevWish} style={{
                  background: '#fff', border: '3px solid #ff99c4',
                  borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px',
                  cursor: 'pointer', transition: '0.3s', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15) rotate(-10deg)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
                🐡
              </button>
              
              <div style={{ fontSize: '12px', color: '#ff99c4', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                {currentWishIndex >= 0 ? currentWishIndex + 1 : 1} / {wishesLength}
            </div>
              
              <button onClick={handleNextWish} style={{
                  background: '#fff', border: '3px solid #64d9ff',
                  borderRadius: '50%', width: '60px', height: '60px', fontSize: '30px',
                  cursor: 'pointer', transition: '0.3s', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
                🐳
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}