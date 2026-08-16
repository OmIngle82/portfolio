"use client";

import React, { useEffect, useState } from "react";

export const TimelineParticles = () => {
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      // Restrict particles to the center 60% of the screen (from 20% to 80%)
      left: Math.random() * 60 + 20,
      // Very long duration because they are traveling the entire section height
      duration: Math.random() * 40 + 40,
      delay: Math.random() * 40,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-orange-100 opacity-0"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: "-20px", 
            boxShadow: "0 0 10px 2px rgba(255, 165, 0, 0.4)",
            animation: `timeline-float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
