"use client";

import { motion } from "framer-motion";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Footer from "@/components/sections/Footer";
import VerticalNav from "@/components/ui/VerticalNav";

export default function Home() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <VerticalNav />
    <div id="hero" className="w-full min-h-screen flex items-center justify-center pt-20 pb-20 relative">
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-orange-500/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass border-orange-500/30"
        >
          <span className="text-sm font-medium text-orange-200">
            👋 Welcome — Let's build something scalable
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 max-w-4xl will-change-transform"
        >
          Architecting Intelligence. <br className="hidden sm:block" />
          <span className="text-gradient-orange">Engineering Impact.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed will-change-transform"
        >
          I leverage Java, Python, and modern frameworks to design robust backends
          and integrate AI. Whether it's an offline-first tool or a complex data
          platform, I turn intricate algorithms into seamless user experiences.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
        >
          <AnimatedButton 
            variant="secondary" 
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-1/2 group border-orange-500/30 hover:border-orange-500/60 transition-colors"
          >
            View Projects
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline-block" />
          </AnimatedButton>
          <a href="/Om Ingle Resume.pdf" download="Om_Ingle_Resume.pdf" className="w-full sm:w-1/2 block">
            <AnimatedButton 
              variant="secondary" 
              className="w-full group hover:bg-white/5 transition-colors"
            >
              Download Resume
            </AnimatedButton>
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full glass border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-500/30 transition-colors z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </div>
    <About />
    <TechStack />
    <ProjectsGrid />
    <ExperienceTimeline />
    <Footer />
    </>
  );
}
