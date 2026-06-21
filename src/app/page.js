'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import TabOverlays from '../components/TabOverlays';
import ClayStarfish from '../components/models/ClayStarfish';
import GlassBottle from '../components/models/GlassBottle';
import TreasureChest from '../components/models/TreasureChest';

// --- HỆ THỐNG BIẾN HÌNH (MORPHING PARTICLE SYSTEM) ---
function MorphingParticles({ isMorphed }) {
  const pointsRef = useRef();
  const particleCount = 15000;

  const [cakePositions, prismPositions, colors] = useMemo(() => {
    const cake = new Float32Array(particleCount * 3);
    const prism = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    const oceanColors = [new THREE.Color('#00BFFF'), new THREE.Color('#00FFFF'), new THREE.Color('#4682B4')];
    const goldColors = [new THREE.Color('#FFD700'), new THREE.Color('#FFA500'), new THREE.Color('#FFFFFF')];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const rand = Math.random();
      let rColor, gColor, bColor;

      // 1. TẠO HÌNH BÁNH KEM
      let cx, cy, cz;
      if (rand < 0.55) {
        const r = 2.4 * Math.pow(Math.random(), 0.2); 
        const theta = Math.random() * 2 * Math.PI;
        cx = r * Math.cos(theta); cz = r * Math.sin(theta);
        cy = (Math.random() - 0.5) * 0.8 - 0.6; 
        const c = Math.random() > 0.85 ? new THREE.Color('#FFFFFF') : oceanColors[Math.floor(Math.random() * oceanColors.length)];
        rColor = c.r; gColor = c.g; bColor = c.b;
      } else if (rand < 0.90) {
        const r = 1.7 * Math.pow(Math.random(), 0.2); 
        const theta = Math.random() * 2 * Math.PI;
        cx = r * Math.cos(theta); cz = r * Math.sin(theta);
        cy = (Math.random() - 0.5) * 0.7 + 0.15; 
        const c = Math.random() > 0.6 ? new THREE.Color('#E0FFFF') : oceanColors[Math.floor(Math.random() * oceanColors.length)];
        rColor = c.r; gColor = c.g; bColor = c.b;
      } else if (rand < 0.96) {
        const r = 0.08 * Math.sqrt(Math.random()); 
        const theta = Math.random() * 2 * Math.PI;
        cx = r * Math.cos(theta); cz = r * Math.sin(theta);
        cy = Math.random() * 0.9 + 0.5; 
        const c = new THREE.Color('#FFFFFF');
        rColor = c.r; gColor = c.g; bColor = c.b;
      } else {
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

      if (face === 0 || face === 2) pz += (Math.random() - 0.5) * 0.1;
      else px += (Math.random() - 0.5) * 0.1;

      prism[i3] = px; prism[i3 + 1] = py; prism[i3 + 2] = pz;
      cols[i3] = rColor; cols[i3 + 1] = gColor; cols[i3 + 2] = bColor;
    }

    return [cake, prism, cols];
  }, [particleCount]);

  const currentPositions = useMemo(() => new Float32Array(cakePositions), [cakePositions]);

  useFrame(() => {
    if (pointsRef.current) {
      let needsUpdate = false;
      const targetPositions = isMorphed ? prismPositions : cakePositions;
      
      for (let i = 0; i < particleCount * 3; i++) {
        const diff = targetPositions[i] - currentPositions[i];
        if (Math.abs(diff) > 0.005) {
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

// --- CLICK TARGETS (Cho 4 Tab) ---
function ClickTargets({ isMorphed, setActiveTab, activeTab }) {
  // Chỉ hiển thị click target khi đã biến hình và chưa chọn tab nào
  const visible = isMorphed && activeTab === null;
  const depth = 2.2;

  const handlePointerOver = (e) => {
    if (!visible) return;
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };
  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  return (
    <group visible={visible}>
      {/* Tab 0 - Front */}
      <mesh position={[0, 0, depth]} onClick={(e) => { e.stopPropagation(); setActiveTab(0); document.body.style.cursor = 'auto'; }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <planeGeometry args={[2.5, 4.0]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* Tab 1 - Right */}
      <mesh position={[depth, 0, 0]} rotation={[0, Math.PI / 2, 0]} onClick={(e) => { e.stopPropagation(); setActiveTab(1); document.body.style.cursor = 'auto'; }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <planeGeometry args={[2.5, 4.0]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* Tab 2 - Back */}
      <mesh position={[0, 0, -depth]} rotation={[0, Math.PI, 0]} onClick={(e) => { e.stopPropagation(); setActiveTab(2); document.body.style.cursor = 'auto'; }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <planeGeometry args={[2.5, 4.0]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* Tab 3 - Left */}
      <mesh position={[-depth, 0, 0]} rotation={[0, -Math.PI / 2, 0]} onClick={(e) => { e.stopPropagation(); setActiveTab(3); document.body.style.cursor = 'auto'; }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <planeGeometry args={[2.5, 4.0]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
}

// --- CAMERA CONTROLLER ---
function CameraController({ activeTab, isMorphed, orbitControlsRef }) {
  const { camera } = useThree();
  const targetCameraPos = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();

  useFrame(() => {
    // Determine target positions based on activeTab
    if (activeTab === null) {
      targetCameraPos.set(0, 0, 6);
      targetLookAt.set(0, 0, 0);
    } else {
      const zoomDepth = 4.5;
      const targetDepth = 2.2;
      
      switch(activeTab) {
        case 0:
          targetCameraPos.set(0, 0, zoomDepth);
          targetLookAt.set(0, 0, targetDepth);
          break;
        case 1:
          targetCameraPos.set(zoomDepth, 0, 0);
          targetLookAt.set(targetDepth, 0, 0);
          break;
        case 2:
          targetCameraPos.set(0, 0, -zoomDepth);
          targetLookAt.set(0, 0, -targetDepth);
          break;
        case 3:
          targetCameraPos.set(-zoomDepth, 0, 0);
          targetLookAt.set(-targetDepth, 0, 0);
          break;
      }
    }

    // Lerp camera position
    camera.position.lerp(targetCameraPos, 0.05);

    // Lerp orbit controls target to look at the center of the face smoothly
    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.lerp(targetLookAt, 0.05);
      orbitControlsRef.current.update();
    }
  });

  return null;
}

import Image from 'next/image';

// --- TRANG CHỦ HOÀN CHỈNH ---
export default function Home() {
  const [isMorphed, setIsMorphed] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // null = menu, 0-3 = specific tab
  const orbitControlsRef = useRef();

  // Tab states
  const [showVideo, setShowVideo] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Drag logic
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    if (activeTab !== null) return; // Disable dragging in tab view
    isDragging.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || activeTab !== null) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    if (!isMorphed && (Math.abs(dx) > 150 || Math.abs(dy) > 200)) {
      setIsMorphed(true);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleDoubleClick = () => {
    if (activeTab !== null) return;
    setIsMorphed(false);
  };

  const handleBackToMenu = () => {
    setActiveTab(null);
  };

  // Determine which background image should be active
  // Map: null -> 0, 0 -> 0, 1 -> 1, 2 -> 2, 3 -> 3
  const activeBgIndex = activeTab !== null ? activeTab : 0;
  const bgs = ['/images/Oceans1.jpg', '/images/Oceans2.jpg', '/images/Oceans3.jpg', '/images/Oceans4.jpg'];

  return (
    <main className="min-h-screen bg-sky-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Images */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {bgs.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Ocean Background"
            fill
            className={`object-cover transition-opacity duration-1000 ease-in-out ${activeBgIndex === index ? 'opacity-100' : 'opacity-0'}`}
            priority={index === 0}
          />
        ))}
        {/* Dark overlay to ensure text/3D elements remain readable */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Background UI Text - Hide when tab is active */}
      <div className={`text-center mb-6 z-10 pointer-events-none transition-opacity duration-500 ${activeTab !== null ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-md">
          Dự án Happy Birthday
        </h1>
        <p className="text-xl text-yellow-100 drop-shadow">
          {isMorphed 
            ? "Click vào 1 trong 4 thẻ bài, hoặc click đúp để quay về bánh kem" 
            : "Nhấn giữ và kéo chuột để mở Tab nội dung"}
        </p>
      </div>

      {/* Main Container */}
      <div 
        className={`w-full max-w-xl aspect-square bg-black/40 rounded-full shadow-2xl backdrop-blur-md z-0 overflow-hidden border-4 border-yellow-300/30 transition-all duration-700 ease-in-out ${activeTab !== null ? 'max-w-full h-full rounded-none aspect-auto border-none !bg-transparent' : 'cursor-grab active:cursor-grabbing'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDoubleClick={handleDoubleClick}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00ffff" />

          <MorphingParticles isMorphed={isMorphed} />
          
          <ClickTargets isMorphed={isMorphed} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Specific 3D Elements for each tab */}
          <group visible={isMorphed && (activeTab === null || activeTab === 0)}>
            <ClayStarfish position={[0, -1.2, 2.2]} scale={1.5} />
          </group>

          <group visible={isMorphed && (activeTab === null || activeTab === 2)}>
            <GlassBottle 
              position={[0, -0.5, -2.2]} 
              scale={1} 
              onClick={() => { if (activeTab === 2) setShowVideo(true); }} 
            />
          </group>

          <group visible={isMorphed && (activeTab === null || activeTab === 3)}>
             <TreasureChest 
               position={[-2.2, -1, 0]} 
               scale={1.2} 
               isUnlocked={isUnlocked} 
             />
          </group>
          {/* Note: Tab 1 (Right) face corresponds to activeTab 1, which has timeline. */}

          <CameraController activeTab={activeTab} isMorphed={isMorphed} orbitControlsRef={orbitControlsRef} />

          <OrbitControls 
            ref={orbitControlsRef}
            enablePan={false} 
            enableZoom={activeTab === null} 
            enableRotate={activeTab === null}
            autoRotate={false} 
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      {/* 2D HTML Overlays */}
      <TabOverlays 
        activeTab={activeTab} 
        onBack={handleBackToMenu}
        showVideo={showVideo}
        onCloseVideo={() => setShowVideo(false)}
        isUnlocked={isUnlocked}
        setIsUnlocked={setIsUnlocked}
      />
      
    </main>
  );
}