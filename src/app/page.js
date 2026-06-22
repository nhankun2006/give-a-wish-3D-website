'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// === CAMERA 360 CONTROLLER ===
function CameraController({ activeTab }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    const targetRotation = activeTab * (Math.PI / 2);
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <perspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <mesh position={[0, 0, -4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ff99c4" emissive="#64d9ff" emissiveIntensity={0.2} wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

export default function Home() {
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main ref={pageRef} className="ocean-page relative w-full h-screen overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 0%, #a1eeff 0%, #0c5c9e 35%, #021428 100%)' }}>
      
      {/* LỚP 2: KHÔNG GIAN 3D XOAY 360 */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 2]} intensity={0.6} color="#ff99c4" />
          <directionalLight position={[-3, -5, -2]} intensity={0.4} color="#64d9ff" />
          <CameraController activeTab={activeTab} />
        </Canvas>
      </div>

    </main>
  );
}