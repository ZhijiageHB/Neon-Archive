"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { springs } from "@/lib/animations";

interface MessageItemProps {
  name: string;
  message: string;
  created_at: string;
  index: number;
  variant?: "guestbook" | "comment";
}

export function MessageItem({
  name,
  message,
  created_at,
  index,
  variant = "comment",
}: MessageItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.smooth, delay: index * 0.04 }}
      className="py-4 border-b border-border-subtle last:border-0"
    >
      <div className="flex items-baseline gap-2">
        <span
          className={`font-mono text-sm font-medium ${
            variant === "guestbook" ? "text-brand-cyan" : "text-brand-purple"
          }`}
        >
          {name}
        </span>
        {variant === "guestbook" && (
          <span className="text-text-muted font-mono text-xs">@archive:~$</span>
        )}
        <span className="text-text-muted font-mono text-xs">
          {formatDate(created_at)}
        </span>
      </div>
      <p className="mt-1.5 text-text-secondary text-sm leading-relaxed">
        {message}
      </p>
    </motion.div>
  );
}
