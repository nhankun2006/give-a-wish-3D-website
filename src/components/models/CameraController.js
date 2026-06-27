'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController({ activeTab }) {
    const groupRef = useRef();

    useFrame((state) => {
        const targetRotation = activeTab * (Math.PI / 2);
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetRotation,
                0.05
            );
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