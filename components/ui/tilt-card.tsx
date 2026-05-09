"use client";

import { useRef, type ReactNode } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const xPct = useTransform(mouseX, (v) => v);
  const yPct = useTransform(mouseY, (v) => v);

  return (
    <motion.div
      ref={ref}
      className={`group relative glass rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-xl ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* Radial highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [xPct, yPct],
            ([x, y]: number[]) =>
              `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, rgba(124,58,237,0.06), transparent 40%)`
          ),
        }}
      />
      {/* Gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          padding: "1px",
          background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      <div className="relative z-0" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
