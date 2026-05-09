"use client";

import { useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import { formatDate } from "@/lib/utils";

interface FloatingDashboardProps {
  recentPosts?: Array<{ title: string; published_at: string }>;
  className?: string;
}

const stack = ["Next.js", "TypeScript", "Tailwind", "Supabase"];

const terminalLines = [
  "$ building interfaces...",
  "$ shipping at the speed of thought",
  "$ archive updated ✓",
];

export function FloatingDashboard({
  recentPosts = [],
  className = "",
}: FloatingDashboardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

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

  return (
    <motion.div
      ref={ref}
      className={`glass rounded-2xl p-5 shadow-lg ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Live signal */}
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <span className="text-xs font-mono text-text-muted">live signal</span>
      </div>

      {/* Current stack */}
      <div className="mb-4">
        <p className="text-xs font-mono text-text-muted mb-2">current stack</p>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full bg-brand-purple/8 text-brand-purple text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Recent notes */}
      <div className="mb-4">
        <p className="text-xs font-mono text-text-muted mb-2">recent notes</p>
        <div className="space-y-1.5">
          {recentPosts.length > 0 ? (
            recentPosts.slice(0, 3).map((post) => (
              <div key={post.title} className="flex items-baseline gap-2">
                <span className="text-xs text-text-muted font-mono shrink-0">
                  {formatDate(post.published_at)}
                </span>
                <span className="text-sm text-text-secondary truncate">
                  {post.title}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-muted">no posts yet</p>
          )}
        </div>
      </div>

      {/* Terminal feed */}
      <div className="rounded-lg bg-text-primary/[0.03] p-3 font-mono text-xs space-y-1">
        {terminalLines.map((line, i) => (
          <p key={i} className="text-text-muted">
            {line}
          </p>
        ))}
        <span className="inline-block w-2 h-3.5 bg-brand-purple animate-blink" />
      </div>
    </motion.div>
  );
}
