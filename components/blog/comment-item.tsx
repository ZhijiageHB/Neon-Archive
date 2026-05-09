"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

interface CommentItemProps {
  name: string;
  message: string;
  created_at: string;
  index: number;
}

export function CommentItem({
  name,
  message,
  created_at,
  index,
}: CommentItemProps) {
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
      className="py-4 border-b border-border-subtle last:border-0"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-brand-purple font-mono text-sm font-medium">
          {name}
        </span>
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
