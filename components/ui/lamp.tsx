"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampProps {
  className?: string;
  color?: string;
}

export function Lamp({
  className,
  color = "#7c3aed",
}: LampProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Left cone */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.5 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="absolute left-1/2 -translate-x-[60%] -top-24 w-[60%] h-48"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${color}30 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      {/* Right cone */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.5 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="absolute left-1/2 translate-x-[10%] -top-24 w-[60%] h-48"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${color}20 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      {/* Top line glow */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
        className="relative mx-auto w-[40%] h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 20px ${color}60, 0 0 60px ${color}20`,
        }}
      />
    </div>
  );
}
