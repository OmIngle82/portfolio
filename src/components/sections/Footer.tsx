"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles, User, Users } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { BlackHoleParticles } from "@/components/ui/BlackHoleParticles";

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        // Check if we've already counted this user's session
        const hasVisited = sessionStorage.getItem('portfolio_visited');
        const action = hasVisited ? 'get' : 'increment';
        
        // Set the flag synchronously BEFORE the fetch to prevent React 18 StrictMode 
        // from double-firing the increment during development
        if (!hasVisited) {
          sessionStorage.setItem('portfolio_visited', 'true');
        }
        
        const response = await fetch(`/api/visitors?action=${action}`);
        const data = await response.json();
        
        setVisitorCount(data.count);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
        setVisitorCount(1204); // Fallback
      }
    };

    fetchVisitorCount();
  }, []);
  return (
    <footer id="contact" className="w-full relative bg-[#030014] overflow-hidden pt-24 pb-10">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top CTA Area - Restored and positioned high above the black hole */}
        <div className="flex flex-col items-center text-center pb-32 md:pb-48 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <span className="text-sm text-gray-300 font-medium">
              Let's Connect
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight drop-shadow-lg max-w-4xl"
          >
            Let's build something scalable together.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-8 max-w-2xl"
          >
            Whether you're looking for a backend engineer, a full-stack developer, or just want to chat about AI integrations, my inbox is always open.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a href="mailto:ingleom82@gmail.com?subject=Hello%20Om!%20I'd%20like%20to%20connect&body=Hi%20Om,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20chat%20about...">
              <button className="say-hello-btn">
                <span>SAY HELLO</span>
              </button>
            </a>
          </motion.div>
        </div>

        {/* The Divider & Video Wrapper */}
        <div className="relative w-full border-t border-white/10 pt-16">
          
          {/* Black Hole Video Background and Particles - Anchored perfectly to the divider */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] md:w-[200%] lg:w-[150%] min-w-[1500px] max-w-[3000px] z-[-1] pointer-events-none flex justify-center"
            style={{ clipPath: "inset(0 0 50% 0)" }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto opacity-100"
            >
              <source src="/q-c3d7becf.webm" type="video/webm" />
            </video>
            
            <BlackHoleParticles />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand/Logo Area */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg premium-logo-box flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
              <span className="text-white font-bold text-xl tracking-wide ml-1">Om Ingle</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Architecting intelligence and engineering impact through robust backend architecture and AI-driven solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/OmIngle82?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/om-ingle-450610358/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6 tracking-wide">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">About Me</a></li>
              <li><a href="#tech" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">Skills & Technologies</a></li>
              <li><a href="#projects" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">Projects</a></li>
              <li><a href="#experience" className="text-gray-500 hover:text-purple-400 transition-colors text-sm">My Journey</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6 tracking-wide">Resources</h4>
            <ul className="space-y-4">
              <li><a href="/Om Ingle Resume.pdf" download="Om_Ingle_Resume.pdf" className="text-gray-500 hover:text-orange-400 transition-colors text-sm">Resume (PDF)</a></li>
              <li><a href="https://github.com/OmIngle82?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-400 transition-colors text-sm">GitHub Profile</a></li>
              <li><a href="https://www.linkedin.com/in/om-ingle-450610358/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-400 transition-colors text-sm">LinkedIn Profile</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold mb-6 tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:ingleom82@gmail.com" className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm">
                  <Mail className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                  ingleom82@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-gray-500 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
                  <span className="btn-shine">Open to new opportunities</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center pt-8 mt-12 border-t border-white/5 text-gray-600 text-xs text-center gap-6">
          <p>© {new Date().getFullYear()} Om Ingle. All rights reserved.</p>
          
          {/* Custom Native Glassmorphism Visitor Counter */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-orange-500/30 group mb-6 cursor-default">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-full group-hover:bg-orange-500/40 transition-colors" />
              <div className="relative w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
            </div>
            <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-[0.2em]">
              Profile Views
            </span>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <span className="text-sm font-semibold text-white/90 font-mono tracking-wider">
              {visitorCount === null ? (
                <span className="opacity-50">...</span>
              ) : (
                visitorCount.toLocaleString()
              )}
            </span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
