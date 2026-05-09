"use client";

import { useRef, type ReactNode } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";
import Link from "next/link";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  href,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass =
    variant === "primary"
      ? "gradient-border inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface text-sm font-medium text-text-primary shadow-sm hover:shadow-md transition-shadow"
      : "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-black/[0.04] transition-colors";

  const inner = (
    <motion.div
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <Link href={href} className={`${baseClass} ${className}`}>
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`${baseClass} ${className}`}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
