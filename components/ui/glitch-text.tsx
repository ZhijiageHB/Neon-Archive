"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
  interval?: number;
  glitchDuration?: number;
}

export function GlitchText({
  children,
  className,
  interval = 7,
  glitchDuration = 300,
}: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const triggerGlitch = useCallback(() => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), glitchDuration);
  }, [glitchDuration]);

  // Random interval glitch
  useEffect(() => {
    const scheduleNext = () => {
      const delay = (interval + Math.random() * 3) * 1000;
      timerRef.current = setTimeout(() => {
        triggerGlitch();
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [interval, triggerGlitch]);

  return (
    <span
      className={cn("relative inline-block cursor-default", className)}
      onMouseEnter={triggerGlitch}
    >
      {/* Base text */}
      <span className="relative z-10">{children}</span>

      {/* Red channel offset */}
      <span
        className="absolute inset-0 z-0"
        style={{
          color: "#ff0040",
          opacity: glitching ? 0.8 : 0,
          clipPath: glitching
            ? `inset(${Math.random() * 30}% 0 ${Math.random() * 30}% 0)`
            : "inset(0 0 100% 0)",
          transform: glitching ? `translateX(${2 + Math.random() * 3}px)` : "none",
          transition: glitching ? "none" : "opacity 0.1s",
        }}
        aria-hidden
      >
        {children}
      </span>

      {/* Cyan channel offset */}
      <span
        className="absolute inset-0 z-0"
        style={{
          color: "#00fff5",
          opacity: glitching ? 0.8 : 0,
          clipPath: glitching
            ? `inset(${Math.random() * 30}% 0 ${Math.random() * 30}% 0)`
            : "inset(0 0 100% 0)",
          transform: glitching ? `translateX(${-2 - Math.random() * 3}px)` : "none",
          transition: glitching ? "none" : "opacity 0.1s",
        }}
        aria-hidden
      >
        {children}
      </span>
    </span>
  );
}
