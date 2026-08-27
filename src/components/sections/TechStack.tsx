"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  SiIntellijidea, SiEclipseide, SiSelenium, SiApachejmeter,
  SiOllama, SiLangchain, SiTensorflow, SiPython, SiPostgresql,
  SiJavascript, SiTypescript, SiFastapi, SiNextdotjs, SiReact,
  SiTailwindcss, SiPwa, SiFirebase, SiGooglecloud, SiVercel,
  SiRailway, SiGit, SiGithub, SiDocker, SiLinux
} from "react-icons/si";
import { FaGoogle, FaDatabase, FaAws, FaJava, FaVial } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";
import { SonicBlastParticles } from "../ui/SonicBlastParticles";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── Data ──────────────────────────────────────────────
type Tech = {
  name: string;
  Icon: IconType;
  category: string;
  color: string;
};

// Exactly 30 technologies matching the user's exact stack list with custom hex colors
const techList: Tech[] = [
  // 1. IDEs & Development Environments (4)
  { name: "Google Antigravity", Icon: FaGoogle, category: "IDE / AI Agent", color: "#4285F4" },
  { name: "VS Code", Icon: VscVscode, category: "Code Editor", color: "#007ACC" },
  { name: "IntelliJ IDEA", Icon: SiIntellijidea, category: "Java IDE", color: "#FE2857" },
  { name: "Eclipse", Icon: SiEclipseide, category: "Java IDE", color: "#2C2255" },

  // 2. Testing & Automation (3)
  { name: "Playwright", Icon: FaVial, category: "E2E Testing", color: "#2EAD33" },
  { name: "Selenium", Icon: SiSelenium, category: "Browser Automation", color: "#43B02A" },
  { name: "JMeter", Icon: SiApachejmeter, category: "Load Testing", color: "#D22128" },

  // 3. AI & Machine Learning (4)
  { name: "Ollama", Icon: SiOllama, category: "Local LLMs", color: "#FFFFFF" },
  { name: "LangChain", Icon: SiLangchain, category: "RAG Workflows", color: "#39D353" },
  { name: "ChromaDB", Icon: FaDatabase, category: "Vector Database", color: "#F4B400" },
  { name: "TensorFlow.js", Icon: SiTensorflow, category: "Browser ML", color: "#FF6F00" },

  // 4. Core Languages (5)
  { name: "Java", Icon: FaJava, category: "Backend / Algorithms", color: "#007396" },
  { name: "Python", Icon: SiPython, category: "AI / API Dev", color: "#3776AB" },
  { name: "SQL", Icon: SiPostgresql, category: "Relational DBs", color: "#336791" },
  { name: "JavaScript", Icon: SiJavascript, category: "Frontend Core", color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, category: "Typed JavaScript", color: "#3178C6" },

  // 5. Backend & Web Development (4)
  { name: "FastAPI", Icon: SiFastapi, category: "Python Microservices", color: "#009688" },
  { name: "Next.js", Icon: SiNextdotjs, category: "Full-Stack React", color: "#FFFFFF" },
  { name: "React", Icon: SiReact, category: "UI Components", color: "#61DAFB" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, category: "Rapid Styling", color: "#06B6D4" },

  // 6. Databases, Cloud & DevOps (10)
  { name: "PWA", Icon: SiPwa, category: "Offline-First Web", color: "#5A0FC8" },
  { name: "Firebase", Icon: SiFirebase, category: "NoSQL DB", color: "#FFCA28" },
  { name: "AWS", Icon: FaAws, category: "Cloud Infrastructure", color: "#FF9900" },
  { name: "Google Cloud", Icon: SiGooglecloud, category: "Cloud Services", color: "#4285F4" },
  { name: "Vercel", Icon: SiVercel, category: "Frontend Hosting", color: "#FFFFFF" },
  { name: "Railway", Icon: SiRailway, category: "Backend Hosting", color: "#9375EE" },
  { name: "Git", Icon: SiGit, category: "Version Control", color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, category: "CI / CD", color: "#FFFFFF" },
  { name: "Docker", Icon: SiDocker, category: "Containerization", color: "#2496ED" },
  { name: "Linux", Icon: SiLinux, category: "System Administration", color: "#FCC624" }
];

// Grid calculation moved into the component for dynamic mobile sizing

// ── Component ─────────────────────────────────────────

// Component logic starts below

type ActiveData = {
  tech: Tech;
  x: number;
  y: number;
  isRight: boolean;
  containerWidth: number;
  containerHeight: number;
  svgPath: string;
};

const TechStack = () => {
  const isMobile = useIsMobile();
  const [activeData, setActiveData] = useState<ActiveData | null>(null);
  const [badgeWidth, setBadgeWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the full 61-cell grid globally to maintain perfect shape and centering
  const grid = React.useMemo(() => {
    const honeycombPattern = [5, 6, 7, 8, 9, 8, 7, 6, 5];
    const centerOffset = 4; // Center column index for 9 columns
    
    const slots: { colIndex: number; cellIndex: number; distance: number }[] = [];
    honeycombPattern.forEach((count, colIndex) => {
      const mid = (count - 1) / 2;
      for (let cellIndex = 0; cellIndex < count; cellIndex++) {
        const q = colIndex - centerOffset;
        const r = cellIndex - mid;
        const x = q;
        const y = r - q / 2;
        const z = -x - y;
        const distance = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
        
        slots.push({ colIndex, cellIndex, distance });
      }
    });

    slots.sort((a, b) => a.distance - b.distance);
    
    const assignmentMap = new Map();
    slots.forEach((slot, i) => {
      if (i < techList.length) {
        assignmentMap.set(`${slot.colIndex}-${slot.cellIndex}`, techList[i]);
      }
    });

    let globalIndex = 0;
    return honeycombPattern.map((count, colIndex) => ({
      colIndex,
      cells: Array.from({ length: count }, (_, cellIndex) => {
        const tech = assignmentMap.get(`${colIndex}-${cellIndex}`) || null;
        return { tech, cellIndex, globalIndex: globalIndex++ };
      }),
    }));
  }, []); // Remove isMobile dependency since grid is static again

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0 : 0.015, ease: "easeInOut" },
    },
  };

  const hexVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, filter: isMobile ? "blur(0px)" : "blur(10px)" },
    show: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: isMobile ? { type: "tween", duration: 0.3 } : { type: "spring", stiffness: 80, damping: 20 }
    },
  };

  // Clear active data on resize to prevent broken lines
  useEffect(() => {
    const handleResize = () => { setActiveData(null); setBadgeWidth(0); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHexClick = (e: React.MouseEvent, tech: Tech | null, globalIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    // trigger the ripple math for all hexes (skip on mobile for performance)
    if (!container.classList.contains("show-ripple") && !isMobile) {
      const allHexes = Array.from(
        container.querySelectorAll(".honeycomb-hex")
      ) as HTMLDivElement[];
      const target = allHexes[globalIndex];
      
      if (target) {
        const targetRect = target.getBoundingClientRect();
        const data = allHexes
          .map((el) => {
            const rect = el.getBoundingClientRect();
            const distance = Math.round(
              Math.sqrt(
                Math.pow(rect.x - targetRect.x, 2) +
                  Math.pow(rect.y - targetRect.y, 2)
              )
            );
            return { el, distance };
          })
          .sort((a, b) => a.distance - b.distance);

        const maxDist = data[data.length - 1].distance || 1;
        data.forEach((item) =>
          item.el.style.setProperty(
            "--ripple-factor",
            `${(item.distance * 100) / maxDist}`
          )
        );

        container.classList.add("show-ripple");
        const last = data[data.length - 1].el;
        const cleanup = () => {
          requestAnimationFrame(() => {
            container.classList.remove("show-ripple");
            data.forEach((item) =>
              item.el.style.removeProperty("--ripple-factor")
            );
            last.removeEventListener("animationend", cleanup);
          });
        };
        last.addEventListener("animationend", cleanup);
      }
    }

    // Handle Active Tech Badge logic with Curved SVG Generation
    if (tech) {
      const containerRect = container.getBoundingClientRect();
      const hexRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      
      const startX = hexRect.left - containerRect.left + hexRect.width / 2;
      const startY = hexRect.top - containerRect.top + hexRect.height / 2;
      
      const isRight = startX > containerRect.width / 2;
      
      setActiveData({
        tech,
        x: startX,
        y: startY,
        isRight,
        containerWidth: containerRect.width,
        containerHeight: containerRect.height,
        svgPath: ""
      });
      setBadgeWidth(0);
    }
  };

  // Generate dynamic SVG path during render so it perfectly stops at the badge's true edge
  let dynamicSvgPath = "";
  if (activeData) {
    const widthOffset = badgeWidth || 200; // fallback until measured
    const endX = activeData.isRight ? activeData.containerWidth - widthOffset : widthOffset;
    const endY = activeData.containerHeight / 2;
    
    const dirX = activeData.isRight ? 1 : -1;
    const dirY = endY > activeData.y ? 1 : -1;
    
    // Calculate a dynamic border radius. If the icon is very close to the vertical center,
    // shrink the radius so the two 90-degree bends can still fit perfectly without overlapping.
    const verticalDist = Math.abs(endY - activeData.y);
    const r = Math.min(25, verticalDist / 2); 
    
    // Push the bend out to 40px from the badge to clear the honeycomb structure
    const midX = activeData.isRight 
      ? Math.max(activeData.x + r, endX - 40)
      : Math.min(activeData.x - r, endX + 40);
    
    // Generate the path with guaranteed 90-degree bends.
    // If r=0, this gracefully degrades into a perfectly straight horizontal line.
    dynamicSvgPath = `M ${activeData.x} ${activeData.y} ` +
              `L ${midX - r * dirX} ${activeData.y} ` +
              `Q ${midX} ${activeData.y} ${midX} ${activeData.y + r * dirY} ` +
              `L ${midX} ${endY - r * dirY} ` +
              `Q ${midX} ${endY} ${midX + r * dirX} ${endY} ` +
              `L ${endX} ${endY}`;
  }

  return (
    <section id="tech" className="w-full py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 relative z-20 pointer-events-none will-change-transform"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & <span className="text-gradient-orange">Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensively curated stack of languages, IDEs, and automation tools I leverage to engineer robust backends, integrate offline AI models, and deliver heavily tested, scalable applications.
          </p>
        </motion.div>

        {/* Honeycomb Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px", amount: 0.1 }}
          className="relative"
        >
          <div className="honeycomb-container relative" ref={containerRef}>
            
            {/* SVG Trace Layer and Particles (UNDERNEATH the honeycomb tiles) */}
            <AnimatePresence mode="wait">
              {activeData && (
                <React.Fragment key={activeData.tech.name}>
                  {/* Sonic Blast Particles Originating from Clicked Hexagon */}
                  <SonicBlastParticles x={activeData.x} y={activeData.y} color={activeData.tech.color} />

                  <motion.svg
                    initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="absolute inset-0 pointer-events-none"
                  style={{ width: "100%", height: "100%", overflow: "visible", zIndex: 0 }}
                >
                  {/* Faint track background */}
                  <motion.path
                    d={dynamicSvgPath}
                    stroke={activeData.tech.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.2"
                    fill="none"
                  />
                  
                  {/* Drawing line */}
                  <motion.path
                    d={dynamicSvgPath}
                    stroke={activeData.tech.color}
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />

                  {/* Pulsing Energy Comet */}
                  {isMobile ? (
                    // Fake Glow for Mobile (Zero Filter Overhead)
                    <motion.path
                      d={dynamicSvgPath}
                      stroke={activeData.tech.color}
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="none"
                      style={{ opacity: 0.2 }}
                      initial={{ pathLength: 0.15, pathOffset: -0.15, opacity: 0 }}
                      animate={{ pathOffset: 1, opacity: 0.2 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ 
                        pathOffset: { duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 },
                        opacity: { delay: 0.4, duration: 0.2 }
                      }}
                    />
                  ) : (
                    // True Drop-Shadow for Desktop
                    <motion.path
                      d={dynamicSvgPath}
                      stroke={activeData.tech.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      style={{ filter: `drop-shadow(0 0 8px ${activeData.tech.color})` }}
                      initial={{ pathLength: 0.15, pathOffset: -0.15, opacity: 0 }}
                      animate={{ pathOffset: 1, opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ 
                        pathOffset: { duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 },
                        opacity: { delay: 0.4, duration: 0.2 }
                      }}
                    />
                  )}
                </motion.svg>
                </React.Fragment>
              )}
            </AnimatePresence>

            {/* Honeycomb Geometry */}
            {grid.map(({ colIndex, cells }) => (
              <div
                className="honeycomb-column"
                key={colIndex}
                style={{ "--hc-column": colIndex } as React.CSSProperties}
              >
                {cells.map(({ tech, globalIndex, cellIndex }) => {
                  const isActive = activeData?.tech.name === tech?.name;
                  const hasActive = activeData !== null;
                  const hasTech = tech !== null;

                  // GHOST NODE: If mobile and no tech, render a raw HTML div instead of Framer Motion.
                  // This cuts the animation tracking overhead by 50% while preserving the exact flex layout!
                  if (isMobile && !hasTech) {
                    return (
                      <div
                        key={globalIndex}
                        className="honeycomb-hex opacity-0 pointer-events-none"
                        style={{ "--hc-index": cellIndex } as React.CSSProperties}
                      />
                    );
                  }

                  return (
                    <motion.div
                      variants={hexVariants}
                      key={globalIndex}
                      className={`honeycomb-hex ${
                        isActive ? "hex-active" : ""
                      } ${!tech ? "opacity-30 hover:opacity-100" : ""} ${
                        hasActive && !isActive ? "opacity-40" : ""
                      }`}
                      style={{
                        "--hc-index": cellIndex,
                        transform: "translateZ(0)", // Force Hardware Acceleration
                        willChange: "transform, opacity, filter",
                        ...(isActive && tech ? {
                          filter: `drop-shadow(0 0 15px ${tech.color}80) brightness(1.2)`,
                          backgroundColor: `${tech.color}15`,
                          borderColor: `${tech.color}50`,
                          zIndex: 10,
                        } : {})
                      } as React.CSSProperties}
                      onClick={(e) => handleHexClick(e, tech, globalIndex)}
                    >
                      {tech && (
                        <tech.Icon 
                          className="hex-icon" 
                          style={isActive ? { color: tech.color } : {}}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {/* Dynamic Boundary Badge */}
            <AnimatePresence mode="wait">
              {activeData && (
                <motion.div
                  key={activeData.tech.name}
                  ref={(el) => {
                    if (el && el.offsetWidth !== badgeWidth) {
                      setBadgeWidth(el.offsetWidth);
                    }
                  }}
                  initial={{ opacity: 0, x: activeData.isRight ? -20 : 20, y: "-50%" }}
                  animate={{ opacity: 1, x: 0, y: "-50%" }}
                  exit={{ opacity: 0, x: activeData.isRight ? -10 : 10, y: "-50%", transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                  className="absolute z-20 flex items-center gap-2 px-4 py-2 rounded-full glass border whitespace-nowrap"
                  style={{
                    // Fixed vertically centered
                    top: activeData.containerHeight / 2,
                    // Pin badge perfectly inside the inner left/right bounds
                    left: activeData.isRight ? 'auto' : 0,
                    right: activeData.isRight ? 0 : 'auto',
                    borderColor: `${activeData.tech.color}50`,
                    boxShadow: `0 0 20px ${activeData.tech.color}20`,
                    backgroundColor: '#030014', // Solid background to cleanly mask the line underneath
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <activeData.tech.Icon className="text-lg" style={{ color: activeData.tech.color }} />
                  <span className="text-sm font-medium text-white">
                    {activeData.tech.name}
                  </span>
                  <span className="text-xs ml-1" style={{ color: `${activeData.tech.color}90` }}>
                    — {activeData.tech.category}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
