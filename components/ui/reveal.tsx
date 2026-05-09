"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  className?: string;
}

const directionMap = {
  up: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -24 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 } },
  none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const { initial, animate } = directionMap[direction];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
