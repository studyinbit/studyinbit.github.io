"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBlobProps {
  className?: string;
  variant?: "warm" | "cool" | "accent";
  delay?: number;
}

export function GradientBlob({ className, variant = "cool", delay = 0 }: GradientBlobProps) {
  const colors = {
    warm: "from-amber-300/40 to-orange-400/40",
    cool: "from-blue-400/40 to-purple-500/40",
    accent: "from-emerald-300/40 to-cyan-400/40",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.3, 1],
        x: [0, 100, -100, 0],
        y: [0, -50, 50, 0],
        rotate: [0, 90, 180, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "mirror",
        delay: delay,
        ease: "easeInOut",
      }}
      className={cn(
        "absolute rounded-full blur-[80px] mix-blend-multiply filter pointer-events-none -z-10",
        "bg-gradient-to-tr",
        colors[variant],
        className
      )}
    />
  );
}
