"use client";

import { useState, useId, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Position = "top" | "bottom" | "left" | "right";

interface GooeyTooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: Position;
  className?: string;
  delay?: number;
}

const positionConfig: Record<
  Position,
  {
    origin: string;
    tooltip: string;
    offset: { x: string; y: string };
  }
> = {
  top: {
    origin: "bottom center",
    tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    offset: { x: "-50%", y: "0" },
  },
  bottom: {
    origin: "top center",
    tooltip: "top-full left-1/2 -translate-x-1/2 mt-3",
    offset: { x: "-50%", y: "0" },
  },
  left: {
    origin: "center right",
    tooltip: "right-full top-1/2 -translate-y-1/2 mr-3",
    offset: { x: "0", y: "-50%" },
  },
  right: {
    origin: "center left",
    tooltip: "left-full top-1/2 -translate-y-1/2 ml-3",
    offset: { x: "0", y: "-50%" },
  },
};

export function GooeyTooltip({
  children,
  content,
  position = "top",
  className,
  delay = 0,
}: GooeyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filterId = useId();
  const config = positionConfig[position];

  return (
    <>
      {/* Hidden SVG filter for the gooey merge effect */}
      <svg
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id={`gooey-${filterId}`}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Wrapper with gooey filter applied */}
      <div
        className={cn("relative inline-flex", className)}
        style={{ filter: `url(#gooey-${filterId})` }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        {/* Trigger */}
        <div className="relative z-10">{children}</div>

        {/* Tooltip portal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={cn(
                "absolute z-20 pointer-events-none",
                config.tooltip
              )}
              style={{ transformOrigin: config.origin }}
              initial={{
                scale: 0,
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                scale: 0,
                opacity: 0,
                filter: "blur(8px)",
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: delay,
              }}
            >
              <div
                className={cn(
                  "whitespace-nowrap select-none",
                  "bg-[#0d0d1a]/90 backdrop-blur-md",
                  "border border-white/10 rounded-lg",
                  "px-3 py-1.5 text-xs text-[#e8e8f0]",
                  "shadow-lg shadow-black/20"
                )}
              >
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
