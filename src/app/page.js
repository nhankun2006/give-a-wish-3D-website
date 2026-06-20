'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- HỆ THỐNG BIẾN HÌNH (MORPHING PARTICLE SYSTEM) ---
function MorphingParticles({ isMorphed }) {
  const pointsRef = useRef();
  const particleCount = 15000;

  // Tính toán 2 bộ tọa độ: Bánh kem và Lăng trụ 4 mặt
  const [cakePositions, prismPositions, colors] = useMemo(() => {
    const cake = new Float32Array(particleCount * 3);
    const prism = new Float32Array(particleCount * 3); // Lăng trụ 4 mặt
    const cols = new Float32Array(particleCount * 3);

    const oceanColors = [new THREE.Color('#00BFFF'), new THREE.Color('#00FFFF'), new THREE.Color('#4682B4')];
    const goldColors = [new THREE.Color('#FFD700'), new THREE.Color('#FFA500'), new THREE.Color('#FFFFFF')];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const rand = Math.random();

      // Biến tạm để lưu màu chuẩn cho từng bộ phận
      let rColor, gColor, bColor;

      // 1. TẠO HÌNH BÁNH KEM & PHÂN MÀU
      // 1. TẠO HÌNH BÁNH KEM & PHÂN MÀU
      let cx, cy, cz;
      if (rand < 0.55) {
        // Tầng 1 (Đế bánh) - Dùng Math.pow(..., 0.2) để ép hạt lồi ra viền ngoài (vỏ bánh)
        const r = 2.4 * Math.pow(Math.random(), 0.2); 
        const theta = Math.random() * 2 * Math.PI;
        cx = r * Math.cos(theta); cz = r * Math.sin(theta);
        cy = (Math.random() - 0.5) * 0.8 - 0.6; 
        
        const c = Math.random() > 0.85 ? new THREE.Color('#FFFFFF') : oceanColors[Math.floor(Math.random() * oceanColors.length)];
        rColor = c.r; gColor = c.g; bColor = c.b;

      } else if (rand < 0.90) {
        // Tầng 2 (Thân bánh) - Ép hạt ra viền vỏ bánh
        const r = 1.7 * Math.pow(Math.random(), 0.2); 
        const theta = Math.random() * 2 * Math.PI;
        cx = r * Math.cos(theta); cz = r * Math.sin(theta);
        cy = (Math.random() - 0.5) * 0.7 + 0.15; 
        
        const c = Math.random() > 0.6 ? new THREE.Color('#E0FFFF') : oceanColors[Math.floor(Math.random() * oceanColors.length)];
        rColor = c.r; gColor = c.g; bColor = c.b;

      } else if (rand < 0.96) {
        // Cây nến - Thu ốm lại (từ 0.12 xuống 0.08) và nối sát xuống thân bánh
        const r = 0.08 * Math.sqrt(Math.random()); 
        const theta = Math.random() * 2 * Math.PI;
        cx = r * Math.cos(theta); cz = r * Math.sin(theta);
        cy = Math.random() * 0.9 + 0.5; 
        
        const c = new THREE.Color('#FFFFFF');
        rColor = c.r; gColor = c.g; bColor = c.b;

      } else {
        // Ngọn lửa nến - Đặt sát ngay trên đỉnh nến
        const r = 0.15 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        cx = (r * Math.sin(phi) * Math.cos(theta)) * 0.6; 
        cz = (r * Math.cos(phi)) * 0.6;
        cy = r * Math.sin(phi) * Math.sin(theta) + 1.45; 
        
        const c = goldColors[Math.floor(Math.random() * goldColors.length)];
        rColor = c.r; gColor = c.g; bColor = c.b;
      }
      
      cake[i3] = cx; cake[i3 + 1] = cy; cake[i3 + 2] = cz;

      // 2. TẠO HÌNH LĂNG TRỤ 4 MẶT (4 TAB)
      const face = i % 4; 
      let px, py, pz;
      const w = 2.5; 
      const h = 4.0; 
      const depth = 2.2; 

      const randomW = (Math.random() - 0.5) * w;
      const randomH = (Math.random() - 0.5) * h;

      if (face === 0) { px = randomW; py = randomH; pz = depth; } 
      else if (face === 1) { px = depth; py = randomH; pz = randomW; } 
      else if (face === 2) { px = randomW; py = randomH; pz = -depth; } 
      else { px = -depth; py = randomH; pz = randomW; }

      // Độ mỏng của mặt tab
      if (face === 0 || face === 2) pz += (Math.random() - 0.5) * 0.1;
      else px += (Math.random() - 0.5) * 0.1;

      prism[i3] = px; prism[i3 + 1] = py; prism[i3 + 2] = pz;

      // 3. GÁN MÀU CHÍNH THỨC
      cols[i3] = rColor; cols[i3 + 1] = gColor; cols[i3 + 2] = bColor;
    }

    return [cake, prism, cols];
  }, [particleCount]);

  const currentPositions = useMemo(() => new Float32Array(cakePositions), [cakePositions]);

  // Logic chạy hiệu ứng Biến Hình (Cả bung ra và thu vào)
  useFrame(() => {
    if (pointsRef.current) {
      let needsUpdate = false;
      // Chọn mục tiêu là Khung 4 mặt (nếu đang kéo) hoặc Bánh kem (nếu click đúp)
      const targetPositions = isMorphed ? prismPositions : cakePositions;
      
      for (let i = 0; i < particleCount * 3; i++) {
        const diff = targetPositions[i] - currentPositions[i];
        
        if (Math.abs(diff) > 0.005) {
          // Lực hút: Bung ra thì nhiễu nhiều (0.04), thu vào bánh kem thì mượt mà hơn (0.01)
          const speed = isMorphed ? 0.04 : 0.06;
          const noise = isMorphed ? (Math.random() - 0.5) * 0.04 : (Math.random() - 0.5) * 0.01;
          
          currentPositions[i] += diff * speed + noise;
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry key={particleCount}>
        <bufferAttribute attach="attributes-position" count={currentPositions.length / 3} array={currentPositions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors={true} transparent={true} opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// --- TRANG CHỦ HOÀN CHỈNH ---
export default function Home() {
  const [isMorphed, setIsMorphed] = useState(false);
  
  // Các biến dùng để đo quãng đường kéo chuột
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Khi nhấn chuột xuống: Ghi nhận tọa độ bắt đầu
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  // Khi di chuyển chuột: Tính toán quãng đường
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    
    // Nếu kéo đi xa hơn 10px thì kích hoạt biến hình thành 4 Tab
    if (!isMorphed && (Math.abs(dx) > 150 || Math.abs(dy) > 200)) {
      setIsMorphed(true);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Khi click đúp: Đóng 4 Tab, hút ngược về thành Bánh kem
  const handleDoubleClick = () => {
    setIsMorphed(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-300 to-cyan-600 flex flex-col items-center justify-center p-4">
      
      <div className="text-center mb-6 z-10 pointer-events-none">
        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-md">
          Dự án Happy Birthday
        </h1>
        <p className="text-xl text-yellow-100 drop-shadow">
          {isMorphed ? "Click Đúp để quay về bánh kem nhé!" : "Nhấn giữ và kéo chuột để mở Tab nội dung"}
        </p>
      </div>

      <div 
        className="w-full max-w-xl aspect-square bg-black/40 rounded-full shadow-2xl backdrop-blur-md z-0 overflow-hidden border-4 border-yellow-300/30 cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp} // Tránh lỗi khi kéo chuột ra khỏi vòng tròn
        onDoubleClick={handleDoubleClick}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <MorphingParticles isMorphed={isMorphed} />
          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            enableRotate={true}
            autoRotate={false} 
          />
        </Canvas>
      </div>
      
    </main>
  );
}