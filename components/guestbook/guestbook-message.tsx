"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

interface GuestbookMessageProps {
  name: string;
  message: string;
  created_at: string;
  index: number;
}

export function GuestbookMessage({
  name,
  message,
  created_at,
  index,
}: GuestbookMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.06,
      }}
      className="py-3 border-b border-border-subtle last:border-0"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-brand-cyan font-mono text-sm">{name}</span>
        <span className="text-text-muted font-mono text-xs">@site:~$</span>
      </div>
      <p className="mt-1 text-text-secondary text-sm">{message}</p>
      <time className="mt-1 block text-[11px] text-text-muted font-mono">
        {formatDate(created_at)}
      </time>
    </motion.div>
  );
}
