"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  hoverEffect?: boolean;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  hoverEffect = false,
}: SplitTextProps) {
  const chars = text.split("");
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!hoverEffect || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const charWidth = rect.width / chars.length;
      const idx = Math.round(relX / charWidth);
      const clamped = Math.max(0, Math.min(chars.length - 1, idx));
      if (clamped !== hoveredIndex) setHoveredIndex(clamped);
    },
    [hoverEffect, chars.length, hoveredIndex]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <motion.span
      ref={containerRef}
      className={className}
      aria-label={text}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {chars.map((char, i) => {
        const isHoverActive = hoverEffect && hoveredIndex !== null;
        const hoverDelay = isHoverActive
          ? Math.abs(i - hoveredIndex) * 0.02
          : 0;

        return (
          <motion.span
            key={`${char}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHoverActive
                ? { opacity: 1, y: [0, -4, 0] }
                : { opacity: 1, y: 0 }
            }
            transition={
              isHoverActive
                ? {
                    delay: hoverDelay,
                    type: "spring",
                    stiffness: 600,
                    damping: 30,
                  }
                : {
                    delay: delay + i * stagger,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }
            }
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            aria-hidden="true"
          >
            {char === " " ? " " : char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
