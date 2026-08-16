"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { TimelineParticles } from "@/components/ui/TimelineParticles";

type ExperienceItem = {
  id: number;
  type: "work" | "education";
  role: string;
  company: string;
  location: string;
  date: string;
  description: string;
  tech: string[];
};

const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: "work",
    role: "Quality Assurance Intern",
    company: "PTC Software (India) Pvt. Ltd.",
    location: "Pune",
    date: "Jul 2026 - Present",
    description:
      "Driving enterprise-grade software quality through rigorous testing methodologies. Leveraging automation tools like Playwright and Selenium to analyze system performance and ensure highly resilient application delivery.",
    tech: ["QA", "Playwright", "Selenium", "Automation"],
  },
  {
    id: 2,
    type: "work",
    role: "Full Stack Web Developer Intern",
    company: "AgroZone Technology Pvt Ltd",
    location: "Remote",
    date: "Aug 2025 - Jan 2026",
    description:
      "Engineered responsive, scalable web applications by seamlessly integrating robust backend services with modern frontend frameworks. Focused on bridging complex data structures with clean, high-performance user experiences.",
    tech: ["Full-Stack", "Next.js", "Firebase", "APIs"],
  },
  {
    id: 3,
    type: "education",
    role: "Bachelor of Engineering - Information Technology",
    company: "Mauli College of Engineering and Technology",
    location: "Shegaon, Maharashtra",
    date: "2023 - Present",
    description:
      "Maintained a strong academic record in Information Technology while mastering core foundations in Data Structures, Java, and backend architecture. Actively engaged in competitive programming. Bridged theoretical knowledge with practical application by developing complex, real-world systems such as CropGuard AI, ExamVault, and the Smart Policy Retrieval System.",
    tech: ["Java", "Python", "Data Structures", "System Design"],
  },
  {
    id: 4,
    type: "education",
    role: "Higher Secondary Education",
    company: "D.E.S. Highschool and Jr. College",
    location: "Datala, Maharashtra",
    date: "2021 - 2023",
    description:
      "Completed higher secondary education in the Science stream, focusing on core subjects such as Physics, Chemistry, and Mathematics. Developed strong analytical skills, logical reasoning, and a solid foundation in scientific principles to prepare for advanced studies in engineering.",
    tech: ["Mathematics", "Logic", "Science"],
  },
];

const ExperienceTimeline = () => {
  return (
    <section id="experience" className="w-full py-24 relative overflow-hidden bg-[#030014]">
      {/* Top Background Image (Globe) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full opacity-70">
            <Image
              src="/Background.png"
              alt="Cosmic Background"
              fill
              quality={100}
              className="object-cover object-center"
              style={{
                maskImage: "radial-gradient(50% 50% at 50% 50%, black 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(50% 50% at 50% 50%, black 30%, transparent 100%)"
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Background Image */}
      <div className="absolute bottom-0 left-0 w-full h-[80vh] z-0 pointer-events-none">
        <Image
          src="/Background_below.png"
          alt="Bottom Cosmic Background"
          fill
          quality={100}
          className="object-cover object-bottom opacity-80"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 85%, transparent 100%)"
          }}
        />
      </div>

      {/* Timeline Particles — Rendered IN FRONT of the bottom image, masking out the bottom 30vh so they appear to rise FROM the planet's surface */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          maskImage: "linear-gradient(to top, transparent 0%, transparent 30vh, black 60vh, black 100%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, transparent 30vh, black 60vh, black 100%)"
        }}
      >
        <TimelineParticles />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20 will-change-transform"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-gradient-orange">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A timeline of my professional experience and academic background,
            highlighting the roles where I've engineered impact.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Track Container (Hidden Overflow to clip the pulse) */}
          <div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 overflow-hidden rounded-full z-0"
            style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)", maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)" }}
          >
            {/* Center Glowing Line Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-orange-500/30 to-orange-500/30" />
            
            {/* Simple Slow Energy Pulse */}
            <motion.div 
              className="absolute left-0 top-0 w-full h-40 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-80 z-10"
              animate={{ top: ["-30%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node with Breathing Glow */}
                  <motion.div 
                    className="absolute left-8 md:left-1/2 w-9 h-9 rounded-full border-[3px] border-[#030014] bg-gradient-to-b from-orange-400 to-orange-600 -translate-x-1/2 mt-5 md:mt-0 z-20 flex items-center justify-center shadow-lg"
                    animate={{ boxShadow: ["0 0 15px rgba(255,126,95,0.3)", "0 0 35px rgba(255,126,95,0.8)", "0 0 15px rgba(255,126,95,0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                  >
                    {exp.type === "work" ? (
                      <Briefcase className="w-3.5 h-3.5 text-white drop-shadow-md" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-white drop-shadow-md" />
                    )}
                  </motion.div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content Wrapper for Animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                      isEven ? "md:pr-12" : "md:pl-12"
                    } will-change-transform`}
                  >
                    {/* Parallax Hover Physics Container */}
                    <div className="exp-parallax-container">
                      {/* Invisible Tracking Grid */}
                      <div className="exp-tracker exp-tr-1"></div>
                      <div className="exp-tracker exp-tr-2"></div>
                      <div className="exp-tracker exp-tr-3"></div>
                      <div className="exp-tracker exp-tr-4"></div>
                      <div className="exp-tracker exp-tr-5"></div>
                      <div className="exp-tracker exp-tr-6"></div>
                      <div className="exp-tracker exp-tr-7"></div>
                      <div className="exp-tracker exp-tr-8"></div>
                      <div className="exp-tracker exp-tr-9"></div>

                      {/* Actual Glass Card */}
                      <div className="exp-tilt-card glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors group relative overflow-hidden">
                        {/* Dynamic Glare Effect */}
                        <div className="exp-glare"></div>

                        {/* Subtle hover glow inside card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-purple-600/0 group-hover:from-orange-500/5 group-hover:to-purple-600/5 transition-colors duration-500 z-0" />
                        
                        {/* 3D Popped Content Wrapper */}
                        <div className="exp-content-wrapper relative z-10">
                          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-5">
                          <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-300 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full w-fit shadow-[inset_0_1px_2px_rgba(255,165,0,0.2)]">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.date}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 text-white/70 text-sm font-semibold tracking-wide">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4 text-purple-400" />
                            {exp.company}
                          </div>
                          <div className="hidden sm:block text-white/20">•</div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-orange-400" />
                            {exp.location}
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-8 text-base drop-shadow-sm">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5">
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="relative px-3 py-1.5 rounded-full bg-gradient-to-b from-white/10 to-white/5 text-xs font-bold text-white/90 border-t border-white/20 border-b border-black/50 shadow-[0_4px_10px_rgba(197,107,240,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md overflow-hidden group-hover:shadow-[0_4px_15px_rgba(255,165,0,0.2)] transition-shadow duration-300"
                            >
                              <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{tech}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
