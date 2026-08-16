"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RisingParticles } from "@/components/ui/RisingParticles";
import { ProjectTray } from "@/components/ui/ProjectTray";

const projectsData: Record<number, { title: string; desc: string; features: string[]; github: string; live: string; }> = {
  0: { 
    title: "CropGuard AI", 
    desc: "Offline-first Progressive Web App empowering farmers with instant, AI-driven crop disease diagnosis.", 
    features: ["TensorFlow.js & Google Gemini API", "Offline-first PWA architecture", "Real-time leaf disease detection", "Localized UI for rural farming communities", "Cloud Firestore backend synchronization"],
    github: "https://github.com/OmIngle82/cropguard-ai",
    live: "https://cropguard-ai-official.vercel.app/login"
  },
  1: { 
    title: "AI Movie Recommender", 
    desc: "Content-based machine learning platform delivering highly accurate, personalized movie suggestions.", 
    features: ["Python, Pandas, & Scikit-learn", "Custom NLP pipeline for feature extraction", "Cosine similarity algorithm integration", "Interactive Streamlit frontend UI", "Deployed and hosted on Hugging Face Spaces"],
    github: "https://huggingface.co/spaces/OmIngle/movie_recommender/tree/main",
    live: "https://huggingface.co/spaces/OmIngle/movie_recommender"
  },
  2: { 
    title: "ExamVault", 
    desc: "Next-gen AI-enhanced examination platform featuring real-time proctoring and violation tracking.", 
    features: ["Next.js & React full-stack framework", "Real-time face detection & tracking", "Automated proctoring violation alerts", "Secure test delivery & response logging", "Responsive, accessible UI/UX"],
    github: "https://github.com/OmIngle82/ExamVault",
    live: "https://exam-vault-beryl.vercel.app/login"
  },
  3: { 
    title: "Smart Policy Retrieval", 
    desc: "Advanced RAG platform for seamless data ingestion, vector search, and intelligent document querying.", 
    features: ["FastAPI & LangChain orchestration", "ChromaDB vector embeddings", "Context-aware document retrieval", "High-throughput microservice architecture", "Automated document processing pipeline"],
    github: "https://github.com/OmIngle82/Smart-Policy-Retrieval-System",
    live: "#"
  },
  4: { 
    title: "TaskMate", 
    desc: "Web-hosted personalized task management platform built for efficiency and real-time state persistence.", 
    features: ["Dynamic web frontend interface", "Google Cloud & Firebase integration", "Real-time task synchronization", "State management & session persistence", "Clean, accessible dashboard design"],
    github: "https://github.com/OmIngle82/TaskMate",
    live: "https://omingle82.github.io/TaskMate/#"
  },
  5: {
    title: "Banking Simulator",
    desc: "Robust banking simulation application managing customer accounts and secure transactions.",
    features: ["Core Java & OOP principles", "Secure transaction processing", "Java Collections data storage", "Strict exception handling", "Rigorous logic testing"],
    github: "#",
    live: "#"
  },
  6: {
    title: "Movie Management",
    desc: "Backend management system to securely add, update, retrieve, and delete movie records.",
    features: ["Java & JDBC integration", "Relational MySQL database", "Secure prepared statements", "Complex SQL queries", "Efficient data retrieval"],
    github: "#",
    live: "#"
  },
  7: {
    title: "Java Utilities",
    desc: "Suite of backend console applications designed to automate administrative and financial tasks.",
    features: ["Student Management System CRUD", "Employee Tax Calculator", "Core Java & Collections", "Strict OOP principles", "Clean code architecture"],
    github: "#",
    live: "#"
  }
};

const ProjectsGrid = () => {
  const [openProjects, setOpenProjects] = useState<number[]>([]);

  const toggleProject = (index: number) => {
    setOpenProjects(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      
      if (isMobile) {
        // Enforce only one open card on mobile devices
        return [index];
      }
      
      const next = [...prev, index];
      if (next.length > 3) {
        return next.slice(1); // Remove the oldest project
      }
      return next;
    });
  };

  return (
    <section id="projects" className="w-full min-h-screen py-20 relative flex flex-col items-center justify-center overflow-hidden bg-[#030014]">
      
      {/* Background Image and Blending Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none translate-y-40 scale-[1.40]">
        <div 
          className="absolute inset-0 bg-no-repeat opacity-90"
          style={{ backgroundImage: 'url("/Cone.png")', backgroundSize: 'contain', backgroundPosition: 'center bottom' }}
        />
      </div>
      
      <RisingParticles />

      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top gradient mask to blend with previous section */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#030014] via-[#030014]/80 to-transparent" />
        {/* Bottom gradient mask */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent" />
        {/* Subtle radial gradient to darken horizontal edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#030014_100%)] opacity-70" />
      </div>

      {/* Tray at bottom - Z-Index 50 so it's always interactive */}
      <div className="absolute bottom-20 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <ProjectTray onProjectClick={toggleProject} />
        </div>
      </div>

      {/* Project Cards Container - Z-Index 40 so tray sits above it */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        {/* We use flex-wrap to stack safely if too many are opened. padding bottom clears tray */}
        <div className="flex flex-wrap items-center justify-center gap-8 w-full px-8 pb-32">
          <AnimatePresence>
            {openProjects.map((index) => {
              const project = projectsData[index];
              if (!project) return null;

              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="pointer-events-auto shrink-0"
                >
                  {/* Card Wrapper for Hover Reveal */}
                  <div className="card-wrapper">
                    
                    {/* Hidden Action Buttons */}
                    <div className="card-under-buttons">
                      {project.github !== "#" ? (
                        <a href={project.github} target="_blank" rel="noreferrer" className="card-under-btn">GitHub</a>
                      ) : (
                        <span className="card-under-btn opacity-50 cursor-not-allowed">GitHub</span>
                      )}
                      
                      {project.live !== "#" ? (
                        <a href={project.live} target="_blank" rel="noreferrer" className="card-under-btn">Site Visit</a>
                      ) : (
                        <span className="card-under-btn opacity-50 cursor-not-allowed">Local App</span>
                      )}
                    </div>
                    
                    {/* Main Card */}
                    <div className="project-card">
                      <button 
                        onClick={() => toggleProject(index)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white z-50 transition-colors"
                      >
                        ✕
                      </button>
                      
                      <div className="card__border"></div>
                      <div className="card__bg"></div>
                      
                      <div className="card_title__container">
                        <span className="card_title">{project.title}</span>
                        <p className="card_paragraph">
                          {project.desc}
                        </p>
                      </div>
              
                      <hr className="line" />
                      
                      <ul className="card__list">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="card__list_item">
                            <span className="check">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="check_svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                            <span className="list_text">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {project.live !== "#" ? (
                        <a href={project.live} target="_blank" rel="noreferrer" className="card-button w-full text-center block" style={{ textDecoration: 'none' }}>Live Preview</a>
                      ) : project.github !== "#" ? (
                        <a href={project.github} target="_blank" rel="noreferrer" className="card-button w-full text-center block" style={{ textDecoration: 'none' }}>View Repository</a>
                      ) : (
                        <span className="card-button w-full text-center block opacity-50 cursor-not-allowed">Backend System</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
