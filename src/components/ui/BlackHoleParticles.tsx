"use client";

import React, { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Star = {
  id: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  tx: number;
  ty: number;
};

export const BlackHoleParticles = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Increased the container size from 700 to 1400 to cover 50% surround of the massive black hole
    const containerSize = 1400;
    const centerX = containerSize / 2;
    const centerY = containerSize / 2;

    const generatedStars: Star[] = [];

    // Vastly reduced particle count on mobile to save performance
    const particleCount = isMobile ? 60 : 300;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Spawn within the 1400px container (radius up to 700px)
      const distance = Math.random() * 700;
      
      const startX = centerX + Math.cos(angle) * distance;
      const startY = centerY + Math.sin(angle) * distance;

      const leftPct = (startX / containerSize) * 100;
      const topPct = (startY / containerSize) * 100;

      const tx = centerX - startX;
      const ty = centerY - startY;

      generatedStars.push({
        id: i,
        top: topPct,
        left: leftPct,
        duration: Math.random() * 15 + 25, // 25s to 40s (much slower travel speed)
        delay: Math.random() * 20, 
        tx: tx,
        ty: ty,
      });
    }
    setStars(generatedStars);
  }, [isMobile]);

  return (
    <div 
      className="absolute top-1/2 left-1/2 z-10 pointer-events-none"
      style={{
        width: "1400px",
        height: "1400px",
        maskImage: "radial-gradient(50% 50% at 50% 50%, rgba(217,217,217,0) 27.08%, #d9d9d9 47.92%, rgba(217,217,217,.8) 75%, rgba(217,217,217,0) 100%)",
        WebkitMaskImage: "radial-gradient(50% 50% at 50% 50%, rgba(217,217,217,0) 27.08%, #d9d9d9 47.92%, rgba(217,217,217,.8) 75%, rgba(217,217,217,0) 100%)",
        maskSize: "cover",
        WebkitMaskSize: "cover",
        animation: "black-hole-spin 70s linear infinite",
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="hero-black-hole-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            // @ts-ignore
            "--transform-x": `${star.tx}px`,
            // @ts-ignore
            "--transform-y": `${star.ty}px`,
          }}
        />
      ))}
    </div>
  );
};
