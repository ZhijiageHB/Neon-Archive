"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to color: purple → cyan
  const color = useTransform(
    scrollYProgress,
    [0, 1],
    ["#7c3aed", "#00fff5"]
  );

  // Dynamic glow intensity based on progress
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #7c3aed, #00fff5)",
        boxShadow: "0 0 6px #7c3aed, 0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.2)",
      }}
    />
  );
}
