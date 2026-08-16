"use client";

import { motion } from "framer-motion";
import React from "react";



const About = () => {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center z-10 py-12 md:py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-12">
        
        {/* Custom Glowing Hover Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center w-full will-change-transform"
        >
          <div className="about-box">
            <span></span>
            <div className="about-content">
              <h2>Architecting Intelligence</h2>
              <p className="mb-4 text-sm md:text-[0.95rem] leading-relaxed text-gray-200">
                I am an Information Technology engineer with a deep fascination for the intersection of scalable backend architecture and artificial intelligence. My technical foundation is built on rigorous problem-solving in Java and Python, which has evolved into designing comprehensive, AI-driven platforms.
              </p>
              <p className="text-sm md:text-[0.95rem] leading-relaxed text-gray-200">
                Whether I am building an offline-first diagnostic application for remote agricultural regions or engineering a complex AI policy retrieval system, my goal is always to create seamless, intuitive, and performant user experiences that solve real-world problems.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
