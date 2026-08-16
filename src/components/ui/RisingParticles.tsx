"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export const RisingParticles = () => {
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; duration: number; delay: number }[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const particleCount = isMobile ? 15 : 40;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      // Restrict particles to the center 60% of the screen (from 20% to 80%)
      left: Math.random() * 60 + 20,
      // Increase duration to make movement much slower (20s to 40s)
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 20,
    }));
    setParticles(newParticles);
  }, [isMobile]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-100 opacity-0"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: "-10px", // Animating via translateY from CSS
            boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.3)",
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
