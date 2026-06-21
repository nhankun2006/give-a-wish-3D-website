'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TreasureChest({ position = [0, 0, 0], scale = 1, isUnlocked = false, onOpenFinish }) {
  const groupRef = useRef();
  const lidRef = useRef();
  const openedRef = useRef(false);

  useFrame(() => {
    if (isUnlocked && lidRef.current && lidRef.current.rotation.x > -Math.PI / 2) {
      // Animate opening lid
      lidRef.current.rotation.x -= 0.05;
      
      // Notify when finished
      if (lidRef.current.rotation.x <= -Math.PI / 2 && !openedRef.current) {
        openedRef.current = true;
        if (onOpenFinish) onOpenFinish();
      }
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Base */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[1, 0.5, 0.8]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
      </mesh>
      
      {/* Gold bands on base */}
      <mesh position={[0.4, -0.25, 0]}>
        <boxGeometry args={[0.05, 0.51, 0.81]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.4, -0.25, 0]}>
        <boxGeometry args={[0.05, 0.51, 0.81]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Lid Group (Pivot at the back) */}
      <group position={[0, 0, -0.4]} ref={lidRef}>
        <mesh position={[0, 0.2, 0.4]}>
          <cylinderGeometry args={[0.4, 0.4, 1, 16, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
        </mesh>
        
        {/* Lock on lid */}
        <mesh position={[0, 0, 0.82]}>
          <boxGeometry args={[0.2, 0.2, 0.05]} />
          <meshStandardMaterial color="#a9a9a9" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.05, 0.83]}>
          <circleGeometry args={[0.03, 16]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>
    </group>
  );
}
