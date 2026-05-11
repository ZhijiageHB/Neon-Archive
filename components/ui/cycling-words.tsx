"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultWords = ["interfaces", "systems", "stories", "experiments"];

interface CyclingWordsProps {
  words?: string[];
  className?: string;
  interval?: number;
}

export function CyclingWords({
  words = defaultWords,
  className = "",
  interval = 3000,
}: CyclingWordsProps) {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentWord}
        initial={{ y: 50, opacity: 0, scale: 0.9, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ y: -50, opacity: 0, scale: 1.1, filter: "blur(4px)" }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className={`gradient-text absolute ${className}`}
      >
        {words[currentWord]}
      </motion.span>
    </AnimatePresence>
  );
}
