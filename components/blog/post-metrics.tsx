"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";

interface PostMetricsProps {
  views: number;
  likes: number;
}

function AnimatedCount({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (value === 0) return;
    const duration = 800;
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    };

    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

export function PostMetrics({ views, likes }: PostMetricsProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-text-muted">
      <motion.span
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Eye size={14} />
        <AnimatedCount value={views} />
      </motion.span>
      <motion.span
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Heart size={14} />
        <AnimatedCount value={likes} />
      </motion.span>
    </div>
  );
}
