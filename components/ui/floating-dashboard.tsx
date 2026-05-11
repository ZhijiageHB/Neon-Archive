"use client";

import { useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import { formatDate } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerSweep } from "@/components/ui/shimmer-sweep";
import { LiveClock } from "@/components/ui/live-clock";

interface FloatingDashboardProps {
  recentPosts?: Array<{ title: string; published_at: string }>;
  className?: string;
}

const stack = [
  { name: "Next.js", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "Tailwind", level: 95 },
  { name: "Supabase", level: 85 },
  { name: "React", level: 90 },
  { name: "Node.js", level: 82 },
];

const terminalLines = [
  "$ building interfaces...",
  "$ shipping at the speed of thought",
  "$ archive updated ✓",
  "$ status: online",
];

const activityTimeline = [
  { time: "2h ago", action: "Published", label: "Harness Engineering", color: "#7c3aed" },
  { time: "1d ago", action: "Updated", label: "Guestbook entries", color: "#00fff5" },
  { time: "3d ago", action: "Created", label: "New experiment", color: "#00ff88" },
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
      className={`glass rounded-2xl p-6 shadow-lg relative ${className}`}
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
      <BorderBeam duration={6} size={300} />
      <ShimmerSweep interval={4} />

      {/* Header: Live signal + Clock */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-mono text-text-muted">live signal</span>
        </div>
        <LiveClock />
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-green/10 text-neon-green text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
          available
        </div>
        <span className="text-[10px] text-text-muted font-mono">Shanghai, CN</span>
      </div>

      {/* Current stack — progress bars */}
      <div className="mb-5">
        <p className="text-[10px] font-mono text-text-muted mb-3 uppercase tracking-widest">
          current stack
        </p>
        <div className="space-y-2">
          {stack.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3">
              <span className="text-xs text-text-secondary w-24 shrink-0 font-mono">
                {tech.name}
              </span>
              <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #7c3aed, #00fff5)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-[10px] text-text-muted font-mono w-8 text-right">
                {tech.level}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity timeline */}
      <div className="mb-5">
        <p className="text-[10px] font-mono text-text-muted mb-3 uppercase tracking-widest">
          recent activity
        </p>
        <div className="space-y-3">
          {activityTimeline.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center mt-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: item.color }}
                />
                {i < activityTimeline.length - 1 && (
                  <div className="w-px h-5 bg-white/[0.06] mt-1" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono text-text-muted">
                    {item.time}
                  </span>
                  <span className="text-xs text-text-secondary">{item.action}</span>
                </div>
                <p className="text-xs text-text-primary truncate">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent notes — compact */}
      <div className="mb-5">
        <p className="text-[10px] font-mono text-text-muted mb-2 uppercase tracking-widest">
          recent notes
        </p>
        <div className="space-y-1.5">
          {recentPosts.length > 0 ? (
            recentPosts.slice(0, 3).map((post) => (
              <div key={post.title} className="flex items-baseline gap-2">
                <span className="text-[10px] text-text-muted font-mono shrink-0">
                  {formatDate(post.published_at)}
                </span>
                <span className="text-xs text-text-secondary truncate">
                  {post.title}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-text-muted">no posts yet</p>
          )}
        </div>
      </div>

      {/* Terminal feed */}
      <div className="rounded-lg bg-white/[0.03] p-3 font-mono text-[11px] space-y-1">
        {terminalLines.map((line, i) => (
          <p key={i} className="text-text-muted">
            {line}
          </p>
        ))}
        <span className="inline-block w-2 h-3 bg-brand-purple animate-blink" />
      </div>
    </motion.div>
  );
}
