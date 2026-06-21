'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ClayStarfish({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate based on mouse movement
      const mouseX = state.mouse.x;
      const mouseY = state.mouse.y;
      
      // Target rotation
      const targetRotationX = mouseY * 0.5;
      const targetRotationY = mouseX * 0.5;

      // Smooth interpolation
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
    }
  });

  // Simple procedural starfish using 5 cones for arms and a sphere for body
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
      
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        const radius = 0.2;
        const armX = Math.cos(angle) * radius;
        const armY = Math.sin(angle) * radius;
        
        return (
          <mesh 
            key={i} 
            position={[armX, armY, 0]} 
            rotation={[0, 0, angle - Math.PI / 2]}
          >
            <coneGeometry args={[0.15, 0.8, 16]} />
            <meshStandardMaterial 
              color="#e76f51" 
              roughness={0.9} 
              metalness={0.1} 
            />
          </mesh>
        );
      })}
    </group>
  );
}
