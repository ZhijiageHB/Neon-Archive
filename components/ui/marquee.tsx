"use client";

import { useState } from "react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  items,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  const duplicated = [...items, ...items];

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <div
        className="flex w-max gap-4"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex-shrink-0 px-5 py-2.5 rounded-full border border-border-subtle bg-surface/80 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-brand-purple/30 transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
