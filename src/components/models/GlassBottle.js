'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GlassBottle({ position = [0, 0, 0], scale = 1, onClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [shattered, setShattered] = useState(false);
  const glowMaterialRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;

    if (groupRef.current && !shattered) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
      // Gentle rotation
      groupRef.current.rotation.y = time * 0.5;
      groupRef.current.rotation.z = Math.sin(time) * 0.1;
    }

    if (glowMaterialRef.current) {
      // Pulsing glow
      glowMaterialRef.current.opacity = 0.5 + Math.sin(time * 3) * 0.3;
    }

    
    if (shattered && groupRef.current) {
       // Simple burst effect: scale up quickly and fade out
       groupRef.current.scale.lerp(new THREE.Vector3(scale * 3, scale * 3, scale * 3), 0.1);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!shattered) {
      setShattered(true);
      setTimeout(() => {
        if (onClick) onClick();
      }, 400); // Wait for burst animation
    }
  };

  return (
    <group 
      ref={groupRef} 
      position={position} 
      scale={scale}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
      visible={!shattered || groupRef.current?.scale.x < scale * 2.9}
    >
      {/* Bottle Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1.2, 16]} />
        <meshPhysicalMaterial 
          color={hovered ? "#88ffff" : "#e0ffff"} 
          transmission={0.9} 
          opacity={1} 
          metalness={0} 
          roughness={0.1} 
          ior={1.5} 
          thickness={0.5} 
        />
      </mesh>

      {/* Bottle Neck */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 0.4, 16]} />
        <meshPhysicalMaterial 
          color="#e0ffff" 
          transmission={0.9} 
          opacity={1} 
          metalness={0} 
          roughness={0.1} 
          ior={1.5} 
          thickness={0.5} 
        />
      </mesh>

      {/* Cork */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.2, 16]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>

      {/* Inside Glow / Secret Message Paper */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial 
          ref={glowMaterialRef}
          color="#ffebaa" 
          emissive="#ffebaa" 
          emissiveIntensity={2} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
    </group>
  );
}
