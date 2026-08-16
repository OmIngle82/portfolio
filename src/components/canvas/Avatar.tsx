"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Float, Preload } from "@react-three/drei";
import * as THREE from "three";

// Using a local GLTF model to avoid CORS/Fetch issues
const AVATAR_URL = "/Soldier.glb";

const HumanAvatar = () => {
  // Load the GLTF model
  const { scene } = useGLTF(AVATAR_URL);
  const avatarRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (avatarRef.current) {
      // Gentle floating and rotation
      avatarRef.current.position.y = Math.sin(t / 1.5) / 10 - 1; // offset downwards so it stays in frame
      // Follow mouse horizontally slightly
      const mouseX = state.pointer.x;
      const targetRotation = mouseX * 0.5;
      avatarRef.current.rotation.y += (targetRotation - avatarRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group ref={avatarRef}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  );
};

const AvatarCanvas = () => {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 10, -5]} intensity={1} color="#ff7e5f" />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <HumanAvatar />
          </Float>
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2}
        />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;
