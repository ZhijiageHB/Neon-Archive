"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
}: SplitTextProps) {
  const chars = text.split("");

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * stagger,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          aria-hidden="true"
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
