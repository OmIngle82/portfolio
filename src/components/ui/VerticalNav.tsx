"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, LayoutGrid, Briefcase, Mail } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Home, color: "rgba(249,115,22,0.3)", shadow: "rgba(249,115,22,0.5)" }, // Orange
  { id: "about", label: "About Me", icon: User, color: "rgba(59,130,246,0.3)", shadow: "rgba(59,130,246,0.5)" }, // Blue
  { id: "tech", label: "Skills & Technologies", icon: Code, color: "rgba(168,85,247,0.3)", shadow: "rgba(168,85,247,0.5)" }, // Purple
  { id: "projects", label: "Projects", icon: LayoutGrid, color: "rgba(6,182,212,0.3)", shadow: "rgba(6,182,212,0.5)" }, // Cyan Blue
  { id: "experience", label: "My Journey", icon: Briefcase, color: "rgba(244,63,94,0.3)", shadow: "rgba(244,63,94,0.5)" }, // Rose
  { id: "contact", label: "Contact", icon: Mail, color: "rgba(99,102,241,0.3)", shadow: "rgba(99,102,241,0.5)" }, // Indigo
];

export default function VerticalNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showLabel, setShowLabel] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isManualScrollRef = useRef(false);
  const activeSectionRef = useRef(activeSection);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize(); // Check immediately on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const triggerLabel = useCallback(() => {
    setShowLabel(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowLabel(false);
    }, 2500);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isManualScrollRef.current) {
          if (activeSectionRef.current !== entry.target.id) {
            setActiveSection(entry.target.id);
            triggerLabel();
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Give a slight delay to allow the DOM elements to render before observing
    setTimeout(() => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, [triggerLabel]);

  const activeIndex = navItems.findIndex((item) => item.id === activeSection);
  const safeActiveIndex = activeIndex !== -1 ? activeIndex : 0;

  const handleClick = (id: string) => {
    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    triggerLabel();
    
    // Unlock observer after scroll finishes (approx 1000ms)
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:right-6 sm:left-auto sm:translate-x-0 z-[100]">
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-full p-2 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(255,255,255,0.05)] flex flex-row sm:flex-col gap-2">
        
        {/* Slime Slider Background */}
        <motion.div
          className="absolute left-2 top-2 sm:left-2 sm:top-2 w-10 h-10 backdrop-blur-xl rounded-full border border-white/30 pointer-events-none"
          initial={false}
          animate={{
            x: isMobile ? safeActiveIndex * 48 : 0,
            y: isMobile ? 0 : safeActiveIndex * 48, 
            backgroundColor: navItems[safeActiveIndex].color,
            boxShadow: `0 0 20px ${navItems[safeActiveIndex].shadow}, inset 0 0 10px rgba(255,255,255,0.2)`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
        />

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredIndex === index;

          return (
            <div 
              key={item.id} 
              className="relative w-10 h-10 flex items-center justify-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip Label */}
              <AnimatePresence>
                {((isActive && showLabel) || isHovered) && (
                  <motion.div
                    initial={{ opacity: 0, x: isMobile ? 0 : 10, y: isMobile ? -5 : 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: isMobile ? 0 : -15, y: isMobile ? 10 : 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: isMobile ? 0 : 10, y: isMobile ? -5 : 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.2 }}
                    className={`absolute ${
                      isMobile ? "top-full left-1/2 -translate-x-1/2 mt-2" : "right-full top-1/2 -translate-y-1/2 mr-2"
                    } px-3 py-1.5 rounded-md glass border border-white/10 text-xs font-medium text-white whitespace-nowrap shadow-lg pointer-events-none`}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => handleClick(item.id)}
                className={`relative z-10 w-full h-full flex items-center justify-center transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
