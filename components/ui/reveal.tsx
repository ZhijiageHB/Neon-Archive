"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { springs } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  blur?: boolean;
}

const directionMap = {
  up: { initial: { opacity: 0, y: 24, filter: "blur(2px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" } },
  down: { initial: { opacity: 0, y: -24, filter: "blur(2px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" } },
  left: { initial: { opacity: 0, x: 24, filter: "blur(2px)" }, animate: { opacity: 1, x: 0, filter: "blur(0px)" } },
  right: { initial: { opacity: 0, x: -24, filter: "blur(2px)" }, animate: { opacity: 1, x: 0, filter: "blur(0px)" } },
  none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

const directionMapNoBlur = {
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
  blur = true,
}: RevealProps) {
  const map = blur ? directionMap : directionMapNoBlur;
  const { initial, animate } = map[direction];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...springs.smooth, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
