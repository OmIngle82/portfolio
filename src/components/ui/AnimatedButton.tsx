"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, variant = "primary", ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white rounded-full group",
        variant === "primary" ? "bg-gradient-to-r from-orange-500 to-pink-500 glow" : "glass",
        className
      )}
      {...props}
    >
      {/* Shimmer sweep effect */}
      <span className="absolute top-0 left-0 h-full w-[50%] -translate-x-[200%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"></span>
      <span className="relative z-10 font-bold">{children}</span>
    </motion.button>
  );
};

export default AnimatedButton;
