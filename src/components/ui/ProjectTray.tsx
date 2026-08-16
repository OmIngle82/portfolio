"use client";

import React from "react";

const baseProjects = [
  { icon: "smartphone", label: "CropGuard AI" },
  { icon: "cpu", label: "AI Movie Recommender" },
  { icon: "globe", label: "ExamVault" },
  { icon: "database", label: "Smart Policy System" },
  { icon: "code", label: "TaskMate" },
  { icon: "database", label: "Banking Simulator" },
  { icon: "database", label: "Movie Management" },
  { icon: "terminal", label: "Java Utilities" },
];

const IconSVG = ({ type }: { type: string }) => {
  const props = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  
  switch (type) {
    case "terminal":
      return <svg {...props}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;
    case "code":
      return <svg {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case "database":
      return <svg {...props}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
    case "cpu":
      return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>;
    case "smartphone":
      return <svg {...props}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
    case "globe":
      return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    default:
      return <svg {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
  }
};

export const ProjectTray = ({ onProjectClick }: { onProjectClick?: (index: number) => void }) => {
  return (
    <>
      {/* Hidden SVG Filters */}
      <svg style={{ display: "none" }}>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves={2} seed={92} result="noise" />
          <feGaussianBlur in="noise" stdDeviation={0.02} result="blur" />
          <feDisplacementMap in="SourceGraphic" in2="blur" scale={77} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="btn-glass" primitiveUnits="objectBoundingBox">
          <feGaussianBlur in="SourceGraphic" stdDeviation={0.02} result="blur" />
          <feDisplacementMap in="blur" in2="blur" scale={1} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Tray and Text Wrapper */}
      <div className="flex flex-col items-center gap-8">
        {/* Cool Text */}
        <div className="flex items-center gap-3 text-white/60 tracking-[0.2em] text-xs uppercase font-medium">
          <span className="w-8 h-px bg-white/20"></span>
          Explore Projects
          <span className="w-8 h-px bg-white/20"></span>
        </div>

        {/* Tray */}
        <div className="glass-tray-container">
          
          {/* Floating Points Background Effect */}
          <div className="points_wrapper">
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
          </div>

          {baseProjects.map((project, i) => (
            <button
              key={i}
              className="glass-tray-btn group"
              title={project.label}
              onClick={() => onProjectClick?.(i)}
            >
              <IconSVG type={project.icon} />
              <span className="glass-tray-tooltip">{project.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
