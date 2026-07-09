'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import './Tab4Wishes.css';

import SonarCanvas from '@/components/ui/SonarCanvas';
import LockScreen from '@/components/ui/LockScreen';
import WishReader from '@/components/ui/WishReader';
const mono = { fontFamily: "inherit", fontWeight: "500" };

export default function Tab4Wishes({ isUnlocked, setIsUnlocked }) {
  // Lock state

  const [passcode, setPasscode] = useState('');
  const [hint, setHint] = useState('');
  const correctPasscode = '1007';

  // State chung
  const [confetti, setConfetti] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [currentWish, setCurrentWish] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [currentWishIndex, setCurrentWishIndex] = useState(-1);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [newWishId, setNewWishId] = useState(null);
  
  // Form state 
  const [formOpen, setFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  
  // Các state để quản lý thư cá nhân
  const [myWishesIds, setMyWishesIds] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editWishId, setEditWishId] = useState(null);

  const [newName, setNewName] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [formNote, setFormNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy danh sách ID thư đã viết từ LocalStorage khi mới vào web
  useEffect(() => {
    const stored = localStorage.getItem('myWishesIds');
    if (stored) setMyWishesIds(JSON.parse(stored));
  }, []);

  // Lịch sử state
  const [historyOpen, setHistoryOpen] = useState(false);
  const [viewedWishes, setViewedWishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [readCount, setReadCount] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);
  // Refs
  const triggerRef = useRef(null);
  const wishesRef = useRef([]);
  const newWishIdRef = useRef(null);
  const readWishesRef = useRef(new Set());

  // UseEffects
  useEffect(() => { newWishIdRef.current = newWishId; }, [newWishId]);
  useEffect(() => { wishesRef.current = wishes; }, [wishes]);
  useEffect(() => { if (isUnlocked) fetchWishes(); }, [isUnlocked]);
  useEffect(() => {
    if (wishes && readWishesRef.current.size > 0) {
      const viewed = wishes.filter(w => readWishesRef.current.has(w.id));
      setViewedWishes(viewed);
    }
  }, [wishes, readCount]);

  // Actions
  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('wishes').select('*').eq('is_approved', true).order('created_at', { ascending: false });
      if (error) throw error;
      if (data) { setWishes(data); return data; }
    } catch (e) { console.error('fetch wishes:', e.message); }
    return null;
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === correctPasscode) { setIsUnlocked(true); return; }
    setHint('Hint: Ngày sinh của Dâng');
  };

  const handleDotClick = useCallback((wish) => {
    if (!wish) return;
    const newConfetti = Array.from({ length: 15 }).map(() => ({
      id: Math.random(), left: Math.random() * 100, delay: Math.random() * 0.15, duration: 1.5 + Math.random() * 0.5,
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 2500);
    
    readWishesRef.current.add(wish.id);
    setReadCount(c => c + 1);
    setCurrentWish(wish);
    
    // ✅ Luôn lấy đúng vị trí thực tế của thư nhờ wishesRef
    setCurrentWishIndex(wishesRef.current.findIndex(w => w.id === wish.id));
    setRevealed(true);
  }, [wishes]);

  const handlePrevWish = (e) => {
    e.stopPropagation();
    if (!wishes || wishes.length === 0) return;
    let newIndex = currentWishIndex - 1;
    if (newIndex < 0) newIndex = wishes.length - 1;
    updateWishView(wishes[newIndex], newIndex);
  };

  const handleNextWish = (e) => {
    e.stopPropagation();
    if (!wishes || wishes.length === 0) return;
    let newIndex = currentWishIndex + 1;
    if (newIndex >= wishes.length) newIndex = 0;
    updateWishView(wishes[newIndex], newIndex);
  };

  // ✅ Đã bỏ tham số "step" và logic tính ảo
  const updateWishView = (wish, index) => {
    readWishesRef.current.add(wish.id);
    setReadCount(c => c + 1);
    setCurrentWish(wish);
    setCurrentWishIndex(index);
  };

  const handleEditClick = (wish) => {
    setIsEditing(true);
    setEditWishId(wish.id);
    setNewName(wish.name);
    setNewMsg(wish.message);
    setActiveTab('create'); // Chuyển sang Tab 1 để sửa
  };

  const handleDeleteWish = async (id) => {
    if (!window.confirm("Bạn có muốn thu hồi lại bọt biển này không?")) return;
    try {
      const { error } = await supabase.from('wishes').delete().eq('id', id);
      if (error) throw error;
      
      // Xóa ID khỏi danh sách của mình
      const updatedIds = myWishesIds.filter(wishId => wishId !== id);
      setMyWishesIds(updatedIds);
      localStorage.setItem('myWishesIds', JSON.stringify(updatedIds));
      
      // Tải lại data
      fetchWishes();
    } catch (e) { 
      alert("Lỗi khi xóa, vui lòng thử lại!"); 
    }
  };

  // Hàm xử lý đóng Form Modal, clear các trạng thái
  const handleCloseForm = () => {
    setFormOpen(false);
    setIsEditing(false);
    setActiveTab('create');
    setNewName('');
    setNewMsg('');
    setEditWishId(null);
  };

  const handleSubmit = async () => {
    if (!newMsg.trim()) { setFormNote('Chưa có lời chúc!'); return; }
    setIsSubmitting(true);
    try {
      if (isEditing) {
        // LOGIC SỬA THƯ
        const { error } = await supabase.from('wishes').update({ name: newName.trim(), message: newMsg.trim() }).eq('id', editWishId);
        if (error) throw new Error('Không thể sửa lời chúc lúc này. Vui lòng thử lại.');
        setFormNote('Đã sửa lời chúc thành công!');
      } else {
        // LOGIC TẠO MỚI
        const res = await fetch('/api/wishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName.trim() || 'Fan ẩn danh', message: newMsg.trim() }),
        });
        
        // 🌟 BẮT LỖI TỪ API TRẢ VỀ
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Gửi tín hiệu thất bại, thử lại nhé.');
        }
        setFormNote('Tín hiệu đã gửi!');
      }

      setTimeout(() => setFormNote(''), 3000);
      const freshData = await fetchWishes();   
      
      // Nếu là tạo mới, lưu ID lại để quản lý
      if (!isEditing && freshData && freshData.length > 0) {
        const newId = freshData[0].id;
        setNewWishId(newId);
        const updatedIds = [...myWishesIds, newId];
        setMyWishesIds(updatedIds);
        localStorage.setItem('myWishesIds', JSON.stringify(updatedIds));
      }
      
      // Trả mọi thứ về như cũ
      setTimeout(() => {
        handleCloseForm();
      }, 1000); // Đợi 1s cho user đọc formNote rồi đóng
    } catch (err) {
      // 🌟 HIỂN THỊ LỖI CỤ THỂ CHO NGƯỜI DÙNG
      setFormNote(err.message || 'Lỗi rồi, thử lại giúp mình nhé');
    } finally { 
      setIsSubmitting(false); 
    }
  };

  // Lọc ra các thư cá nhân để hiển thị ở Tab 2
  const mySentWishes = wishes.filter(w => myWishesIds.includes(w.id));

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-auto flex justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(2,44,67,.6) 0%, rgba(1,24,38,.9) 100%)',
        backdropFilter: 'blur(5px)',
      }}
    >
      {!isUnlocked ? (
        <LockScreen 
          passcode={passcode} setPasscode={setPasscode} 
          hint={hint} handleUnlock={handleUnlock} 
        />
      ) : (
        <div className="absolute inset-0" style={{ background: 'rgba(2, 20, 40, 0.4)', backdropFilter: 'blur(3px)' }}>
          <SonarCanvas 
          triggerRef={triggerRef} 
          onDotClick={handleDotClick} 
          wishesRef={wishesRef} 
          newWishIdRef={newWishIdRef} 
          readWishesRef={readWishesRef}
          onAllDotsFinished={() => setScrollMode(true)}
        />

          <div style={{
            position: 'absolute', left: 0, right: 0, height: 1, pointerEvents: 'none',
            background: 'linear-gradient(90deg,transparent,rgba(100,217,255,.15),rgba(100,217,255,.4),rgba(100,217,255,.15),transparent)',
            animation: 'scandown 3s linear infinite',
          }} />

          {/* Buttons Trên Cùng */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
            <div style={{ display: 'flex', gap: '270px' }}>
              <button
  onClick={() => {
    setFormOpen(true);
    setActiveTab('create'); // Chuyển về tab tạo mới
    setNewName('');
    setNewMsg('');
  }}
  className="
    relative overflow-hidden
    flex items-center justify-center gap-3
    px-10 pt-3 pb-4
    rounded-[2rem]
    border-[2px] border-[#ff99c4]
    bg-gradient-to-b from-[#fff0f5] via-[#ffe6f0] to-[#ffb3d1]
    text-[#c21d5a] font-extrabold text-lg
    shadow-[0_6px_0_#ff7ea5,0_15px_25px_rgba(255,153,196,0.4)]
    hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_0_#ff7ea5,0_20px_35px_rgba(255,153,196,0.6)]
    active:scale-95 active:translate-y-1.5 active:shadow-[0_0px_0_#ff7ea5,0_5px_10px_rgba(255,153,196,0.4)]
    transition-all duration-200
    group cursor-pointer
  "
>
  {/* Ánh sáng phản chiếu mặt kính ở mép trên */}
  <div className="absolute inset-x-6 top-1.5 h-1/3 rounded-full bg-white/70 blur-[1.5px] pointer-events-none" />
  
  {/* Các bong bóng mini liti trang trí bên trong nút */}
  <div className="absolute left-5 top-2.5 w-1.5 h-1.5 rounded-full bg-white/90" />
  <div className="absolute right-6 bottom-3 w-2 h-2 rounded-full bg-white/70" />

  {/* Icon 1: Thư (Sẽ lắc lư khi đưa chuột vào) */}
  <span className="relative z-10 text-2xl group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">
    💌
  </span>
  
  {/* Chữ */}
  <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] tracking-wide">
    Thả Bọt Biển
  </span>
</button>
              <button
  onClick={() => setHistoryOpen(o => !o)}
  className="
    relative overflow-hidden
    flex items-center justify-center gap-3
    px-10 pt-3 pb-4
    rounded-[2rem]
    border-[2px] border-[#64d9ff]
    bg-gradient-to-b from-[#f0fbff] via-[#e0f7ff] to-[#aae6ff]
    text-[#025673] font-extrabold text-lg
    shadow-[0_6px_0_#33c2f2,0_15px_25px_rgba(100,217,255,0.4)]
    hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_0_#33c2f2,0_20px_35px_rgba(100,217,255,0.6)]
    active:scale-95 active:translate-y-1.5 active:shadow-[0_0px_0_#33c2f2,0_5px_10px_rgba(100,217,255,0.4)]
    transition-all duration-200
    group cursor-pointer
  "
>
  {/* Ánh sáng phản chiếu mặt kính ở mép trên */}
  <div className="absolute inset-x-6 top-1.5 h-1/3 rounded-full bg-white/70 blur-[1.5px] pointer-events-none" />
  
  {/* Các bong bóng mini liti trang trí */}
  <div className="absolute left-5 top-2.5 w-1.5 h-1.5 rounded-full bg-white/90" />
  <div className="absolute right-6 bottom-3 w-2 h-2 rounded-full bg-white/70" />

  {/* Icon 1: Sách */}
  <span className="relative z-10 text-2xl group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">
    📚
  </span>
  
  {/* Chữ */}
  <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] tracking-wide">
    Thư Đã Xem ({viewedWishes.length})
  </span>

</button>
            </div>

            {/* FORM MODAL - HỘP QUÀ THỦY CUNG 3D SIÊU BÉO */}
            {/* FORM MODAL - HỘP QUÀ THỦY CUNG 3D SIÊU BÉO */}
            <AnimatePresence>
              {formOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -10 }} 
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} 
                  exit={{ opacity: 0, y: 50, scale: 0.9, rotateX: 10 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                  className="relative z-50 flex items-center justify-center mt-2 perspective-1000"
                >
                  <div
                    className="relative overflow-hidden flex flex-col group"
                    style={{
                      /* 🌟 Ý TƯỞNG MỚI: Màu biển sâu hoạt hình rực rỡ, không dùng kính mờ nữa */
                      background: 'linear-gradient(180deg, #09203F 0%, #1A548B 50%, #53A0FD 100%)', 
                      /* 🌟 BO GÓC BÉO & VIỀN 3D DÀY CUI NHƯ MÁY CHƠI GAME */
                      border: '6px solid #FFFFFF',
                      borderRadius: '40px', 
                      padding: '24px 32px',
                      width: '980px', 
                      maxWidth: '92vw', 
                      height: '80vh', 
                      gap: '16px',
                      /* 🌟 BÓNG ĐỔ NHIỀU LỚP: Tạo cảm giác chiếc hộp nổi bần bật lên hẳn màn hình */
                      boxShadow: `
                        0 0 0 6px ${activeTab === 'create' ? '#64d9ff' : '#ff99c4'}, 
                        0 25px 0 ${activeTab === 'create' ? '#007099' : '#b34774'},
                        0 40px 50px rgba(0,0,0,0.5),
                        inset 0 10px 30px rgba(255,255,255,0.2)
                      `
                    }}
                  >                    
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff99c4] rounded-full blur-[50px] opacity-30 pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#64d9ff] rounded-full blur-[50px] opacity-30 pointer-events-none"></div>

                    {/* HEADER */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                      <span style={{ 
                        ...mono, fontSize: 20, 
                        color: '#FFF', 
                        fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2,
                        textShadow: '0 4px 0 rgba(0,0,0,0.2)' /* Chữ 3D */
                      }}>
                        {activeTab === 'create' ? (isEditing ? '🛠️ Sửa Lời Yêu Thương' : 'Thả Lời Chúc Mới') : '🗃️ Hộp Thư Bí Mật'}
                      </span>
                      <button onClick={handleCloseForm} 
                        className="flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 active:translate-y-1" 
                        style={{ 
                          background: '#ff4d4d', color: '#fff', border: '4px solid #fff', 
                          borderRadius: '50%', width: '45px', height: '45px', fontSize: 24, fontWeight: 'bold',
                          boxShadow: '0 4px 0 #cc0000', cursor: 'pointer'
                        }}>×</button>
                    </div>

                    {/* NÚT CHUYỂN TABS 3D */}
                    <div style={{ display: 'flex', gap: '8px', zIndex: 10, marginTop: '-6px' }}>
                      <button
                        onClick={() => { setActiveTab('create'); if (!isEditing) { setNewName(''); setNewMsg(''); } }}
                        className="group relative flex-1 transition-all duration-200 active:translate-y-2 active:shadow-none"
                        style={{
                          ...mono, padding: '12px', borderRadius: '24px', fontWeight: '900', cursor: 'pointer', fontSize: '15px',
                          background: activeTab === 'create' ? '#FFF' : 'rgba(255,255,255,0.1)',
                          color: activeTab === 'create' ? '#1A548B' : '#FFF',
                          border: activeTab === 'create' ? '4px solid #64d9ff' : '4px solid transparent',
                          boxShadow: activeTab === 'create' ? '0 6px 0 #007099' : 'none',
                        }}
                      >
                        <span className="group-hover:scale-105 inline-block transition-transform">{isEditing ? '✏️ CHỈNH SỬA THƯ' : '✍️ VIẾT THƯ MỚI'}</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('manage')}
                        className="group relative flex-1 transition-all duration-200 active:translate-y-2 active:shadow-none"
                        style={{
                          ...mono, padding: '12px', borderRadius: '24px', fontWeight: '900', cursor: 'pointer', fontSize: '15px',
                          background: activeTab === 'manage' ? '#FFF' : 'rgba(255,255,255,0.1)',
                          color: activeTab === 'manage' ? '#b34774' : '#FFF',
                          border: activeTab === 'manage' ? '4px solid #ff99c4' : '4px solid transparent',
                          boxShadow: activeTab === 'manage' ? '0 6px 0 #b34774' : 'none',
                        }}
                      >
                        <span className="group-hover:scale-105 inline-block transition-transform">💌 HỘP THƯ CỦA BẠN ({myWishesIds?.length || 0})</span>
                      </button>
                    </div>

                    {/* NỘI DUNG FORM CHÍNH */}
                    <div style={{ zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'hidden', overflowX: 'hidden' }}>
                    {activeTab === 'create' ? (
                      /* 🌟 ĐÃ ẨN THANH CUỘN CHO CẢ KHUNG CHỨA TAB VIẾT THƯ BẰNG OVERFLOW: 'HIDDEN' */
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', flex: 1, overflow: 'hidden' }}>      
                        
                        {/* Ô nhập Tên */}
                        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Tên của bạn là gì nè?" maxLength={30}
                          className="transition-all duration-200 focus:scale-[1.01]"
                          style={{ 
                            ...mono, background: '#FFF', borderRadius: '20px', 
                            border: '4px solid #64d9ff', color: '#1A548B', 
                            fontSize: 16, fontWeight: 'bold', padding: '12px 24px', outline: 'none', width: '100%', flexShrink: 0, 
                            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.08)'
                          }} />
                        
                        {/* Khung viết bự */}
                        {/* 🌟 ĐÃ FIX: Thay 'cute-scroll' thành 'scrollbar-none' để ẩn thanh cuộn trên ô nhập nội dung thư */}
                        <textarea value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Hãy viết điều gì đó dễ thương vào đây nhé... 🐚" 
                          className="transition-all duration-200 focus:scale-[1.01] scrollbar-none"
                          style={{ 
                            ...mono, 
                            flex: 1,
                            minHeight: '220px',
                            background: '#FFF', borderRadius: '24px', 
                            border: '4px solid #64d9ff', color: '#1A548B', 
                            fontSize: 16, fontWeight: '600', padding: '20px 24px', outline: 'none', width: '100%', resize: 'none', lineHeight: 1.6, 
                            boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.08)',
                            overflowY: 'auto' /* Vẫn cho phép cuộn bằng chuột/vướt nhưng thanh cuộn sẽ bị ẩn đi nhờ class CSS */
                          }} />
                        
                        {/* Nút Submit */}
                        <button 
                          onClick={handleSubmit} 
                          disabled={isSubmitting}
                          className={`
                            relative flex items-center justify-center gap-3
                            pt-3.5 pb-3.5 mt-1 rounded-[24px] font-black text-[18px] transition-all duration-150 cursor-pointer w-full flex-shrink-0
                            active:translate-y-[8px] active:shadow-none
                          `}
                          style={{ 
                            ...mono, textTransform: 'uppercase', letterSpacing: 2,
                            background: isEditing ? '#ff99c4' : '#64d9ff',
                            color: isEditing ? '#fff' : '#09203F',
                            border: '4px solid #FFF',
                            boxShadow: isEditing ? '0 8px 0 #b34774, 0 15px 20px rgba(0,0,0,0.3)' : '0 8px 0 #007099, 0 15px 20px rgba(0,0,0,0.3)'
                          }}
                        >
                          <span className="text-2xl drop-shadow-md">{isSubmitting ? '🎀' : (isEditing ? '🎀' : '🎀')}</span>
                          <span>{isSubmitting ? 'ĐANG LẶN XUỐNG BIỂN...' : (isEditing ? 'LƯU LỜI YÊU THƯƠNG' : 'THẢ BỌT BIỂN XANH')}</span>
                        </button>

                        {formNote && (
                          <div style={{ ...mono, fontSize: 13, textAlign: 'center', color: formNote.includes('lỗi') ? '#ffb6c1' : '#fff', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.4)', flexShrink: 0 }}>
                            {formNote}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* TAB QUẢN LÝ THƯ CỦA BẠN - Giao diện thẻ bài (Card) */
                      /* 🌟 GIỮ NGUYÊN: Thẻ 'cute-scroll' và 'overflowY: auto' để tab này vẫn hiện thanh cuộn mượt mà như cũ */
                      <div className="cute-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto', maxHeight: '100%', paddingRight: '12px', paddingBottom: '20px' }}>
                        {wishes.filter(w => myWishesIds?.includes(w.id)).length === 0 ? (
                          <div style={{ color: '#FFF', textAlign: 'center', padding: '60px 0', ...mono, fontSize: 16, fontWeight: 'bold' }}>
                            <span style={{ fontSize: '60px', display: 'block', marginBottom: '20px' }}>🪹</span>
                            Hộp thư của bạn đang trống trơn!<br/>Hãy thả một chiếc bọt biển xuống nhé!
                          </div>
                        ) : (
                          wishes.filter(w => myWishesIds?.includes(w.id)).map((wish) => (
                            <div key={wish.id} style={{ 
                              background: '#FFF', 
                              border: '4px solid #ff99c4', 
                              borderRadius: '24px', 
                              padding: '20px',
                              boxShadow: '0 6px 0 #b34774',
                              transform: 'translateY(0)',
                              transition: '0.2s ease-in-out',
                              flexShrink: 0 
                            }}
                            className="hover:-translate-y-1 hover:shadow-[0_10px_0_#b34774]"
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div style={{ color: '#b34774', fontWeight: '900', fontSize: '18px' }}>💌 {wish.name}</div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                  <button onClick={() => handleEditClick(wish)}
                                    className="active:translate-y-1 active:shadow-none transition-all"
                                    style={{ background: '#64d9ff', color: '#09203F', border: '3px solid #007099', padding: '6px 16px', borderRadius: '16px', fontSize: '13px', cursor: 'pointer', fontWeight: '900', boxShadow: '0 4px 0 #007099' }}>SỬA</button>
                                  <button onClick={() => handleDeleteWish(wish.id)}
                                    className="active:translate-y-1 active:shadow-none transition-all"
                                    style={{ background: '#ff99c4', color: '#FFF', border: '3px solid #b34774', padding: '6px 16px', borderRadius: '16px', fontSize: '13px', cursor: 'pointer', fontWeight: '900', boxShadow: '0 4px 0 #b34774' }}>XÓA</button>
                                </div>
                              </div>
                              <div style={{ color: '#1A548B', fontSize: '15px', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontWeight: '600' }}>
                                {wish.message}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>



          <AnimatePresence>
  {historyOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.6 }} // Nảy mềm mượt như thạch
      style={{
        /* --- GIỮ NGUYÊN KÍCH THƯỚC BẢN GỐC --- */
        position: 'fixed', top: '80px', left: '60%', transform: 'translateX(-50%)', width: '500px', maxWidth: '90vw', maxHeight: '80vh',
        display: 'flex', flexDirection: 'column', gap: '15px', zIndex: 100, padding: '20px', 
        
        /* --- STYLE BIỂN XINH, SOLID PASTEL CUTE --- */
        borderRadius: '24px',
        // Gradient đặc: Từ màu nước biển trong xanh (trên) xuống màu bãi cát vàng nhạt (dưới)
        background: 'linear-gradient(180deg, #81D4FA 0%, #B2EBF2 60%, #FFF9C4 100%)', 
        border: '4px solid #FFFFFF', // Viền trắng dày siêu cute
        boxShadow: '0 15px 35px rgba(2, 119, 189, 0.25)', // Bóng đổ nhẹ nhàng, ấm áp
      }}
    >
      {/* CSS con: Ẩn thanh cuộn & Bo góc thanh cuộn nếu cần */}
      <style>{`
        .cute-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px dashed rgba(255, 255, 255, 0.7)', paddingBottom: '12px' }}>
        <span style={{ fontSize: 18, color: '#01579B', fontWeight: '900', letterSpacing: '0.5px' }}>
          Thư Đã Đọc ({viewedWishes.length})
        </span>
        <motion.button 
          whileHover={{ scale: 1.15, rotate: 90, backgroundColor: '#FF8A80', color: '#FFF' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setHistoryOpen(false)} 
          style={{ background: '#FFFFFF', border: 'none', color: '#01579B', cursor: 'pointer', fontSize: '20px', lineHeight: 1, width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
        >
          ×
        </motion.button>
      </div>

      {/* THANH TÌM KIẾM */}
      <input 
        type="text" 
        placeholder="Tìm tên hoặc nội dung..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ 
          background: '#FFFFFF', // Trắng tinh
          border: 'none', 
          color: '#0277BD', 
          fontSize: '14px', 
          padding: '14px 18px', 
          borderRadius: '16px', 
          outline: 'none', 
          boxShadow: '0 4px 12px rgba(2, 119, 189, 0.1)', // Bóng đổ giúp thanh search nổi bần bật
          fontWeight: '600'
        }} 
      />

      {/* DANH SÁCH THƯ */}
      <div 
        className="cute-scroll" 
        style={{ overflowY: 'auto', maxHeight: 'cal(85vh - 180px)', display: 'flex', flexDirection: 'column', gap: '12px', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '4px' }}
      >
        {viewedWishes.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()) || w.message.toLowerCase().includes(searchTerm.toLowerCase())).map((wish, index) => (
          <motion.div 
            key={wish.id} 
            // Thư hiện lên lần lượt
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 120 }} 
            
            // HIỆU ỨNG WAO CUTE: Khi di chuột vào sẽ hơi nghiêng nhẹ (rotate) và nhảy lên
            whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1.5 : -1.5, y: -4, boxShadow: '0 10px 20px rgba(2, 119, 189, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setCurrentWish(wish); setRevealed(true); setHistoryOpen(false); }}
            style={{ 
              background: '#FFFFFF', // Thư trắng muốt
              border: '2px solid #E1F5FE', // Viền xanh lam nhạt
              borderRadius: '16px', 
              padding: '16px', 
              cursor: 'pointer', 
              transition: 'all 0.1s ease-out'
            }}
          >
            {/* DUY NHẤT ICON 💌 Ở ĐÂY */}
            <div style={{ fontSize: '15px', color: '#0277BD', fontWeight: '900', marginBottom: '6px' }}>
              💌 {wish.name}
            </div>
            <div style={{ fontSize: '13px', color: '#0288D1', opacity: 0.9, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' }}>
              {wish.message.substring(0, 60)}...
            </div>
          </motion.div>
        ))}

        {viewedWishes.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()) || w.message.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
          <div style={{ textAlign: 'center', color: '#01579B', marginTop: '20px', fontSize: '14px', fontWeight: '700' }}>
            Không tìm thấy thư nào...
          </div>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>



{/* COMPONENT ĐỌC THƯ */}
<WishReader 
  currentWish={currentWish} 
  revealed={revealed} 
  setRevealed={setRevealed} 
  wishesLength={wishes.length}
  currentWishIndex={currentWishIndex}
  handlePrevWish={handlePrevWish}
  handleNextWish={handleNextWish}
  confetti={confetti}
/>
          {/* COMPONENT ĐỌC THƯ */}
          <WishReader 
            currentWish={currentWish} 
            revealed={revealed} 
            setRevealed={setRevealed} 
            wishesLength={wishes.length}
            currentWishIndex={currentWishIndex} /* 👈 ĐỔI THÀNH currentWishIndex */
            handlePrevWish={handlePrevWish}
            handleNextWish={handleNextWish}
            confetti={confetti}
          />
          
        </div>
      )}
    </motion.div>
  );
}