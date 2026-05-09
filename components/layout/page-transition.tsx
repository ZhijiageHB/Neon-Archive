"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { springs } from "@/lib/animations";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={springs.smooth}
    >
      {children}
    </motion.div>
  );
}
