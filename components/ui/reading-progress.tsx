"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #7C3AED, #06B6D4, #a855f7)",
        boxShadow: "0 0 10px rgba(124,58,237,0.4), 0 0 20px rgba(6,182,212,0.2)",
      }}
    />
  );
}
