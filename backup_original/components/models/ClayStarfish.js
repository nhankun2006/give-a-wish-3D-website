'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ClayStarfish({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();

n  useFrame((state) => {
    if (groupRef.current) {
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;
      const targetRotationX = mouseY * 0.5;
      const targetRotationY = mouseX * 0.5;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#f4a261" 
          roughness={0.8} 
          metalness={0.1} 
        />
      </mesh>
    </group>
  );
}
