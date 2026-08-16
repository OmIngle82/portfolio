"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const StarBackground = ({ isMobile, ...props }: any) => {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points in a sphere based on device
  const numStars = isMobile ? 1500 : 5000;
  
  const [sphere] = useState(() => {
    const positions = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars; i++) {
      const r = 1.2 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  // Fades out completely to 0 opacity as the user scrolls down
  const opacity = useTransform(scrollY, [0, 1000], [1, 0]);

  return (
    <motion.div 
      style={{ opacity }}
      className="w-full h-full fixed inset-0 z-[-1]"
    >
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile }}
      >
        <Suspense fallback={null}>
          <StarBackground isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </motion.div>
  );
};

export default StarsCanvas;
