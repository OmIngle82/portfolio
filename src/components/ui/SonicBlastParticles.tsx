"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface SonicBlastParticlesProps {
  x: number;
  y: number;
  color: string;
}

export const SonicBlastParticles = ({ x, y, color }: SonicBlastParticlesProps) => {
  const particles = useMemo(() => {
    // Generate 60 star particles
    return Array.from({ length: 60 }).map((_, i) => {
      // Random angle (0 to 360 degrees)
      const angle = Math.random() * Math.PI * 2;
      
      // Random distance heavily biased outward for a blast effect
      const distance = Math.random() * 400 + 100; 
      
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;
      
      // Calculate a secondary drift target to keep them moving slowly after the initial burst
      const driftX = targetX + Math.cos(angle) * 50;
      const driftY = targetY + Math.sin(angle) * 50;
      
      return {
        id: i,
        targetX,
        targetY,
        driftX,
        driftY,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 4 + 4, // 4 to 8 seconds total lifecycle
      };
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="absolute inset-0 pointer-events-none z-0"
    >

      {/* Scattering Star Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: x,
            top: y,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px ${color}80`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: [0, p.targetX, p.driftX],
            y: [0, p.targetY, p.driftY],
            opacity: [0, 1, 0.8, 0], // Flash, linger, then slowly fade
            scale: [0, 1.5, 1, 0]
          }}
          transition={{
            x: { duration: p.duration, ease: ["circOut", "linear"], times: [0, 0.1, 1] },
            y: { duration: p.duration, ease: ["circOut", "linear"], times: [0, 0.1, 1] },
            opacity: { duration: p.duration, ease: "linear", times: [0, 0.05, 0.8, 1] },
            scale: { duration: p.duration, ease: "linear", times: [0, 0.05, 0.15, 1] }
          }}
        />
      ))}
    </motion.div>
  );
};
