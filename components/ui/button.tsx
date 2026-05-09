"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "ghost";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  children,
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-shadow cursor-pointer",
        variant === "primary" &&
          "gradient-border bg-surface text-text-primary hover:shadow-[0_0_20px_rgba(124,58,237,0.10)]",
        variant === "ghost" &&
          "text-text-secondary hover:text-text-primary hover:bg-black/[0.04]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
