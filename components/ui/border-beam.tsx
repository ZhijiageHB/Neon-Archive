"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 4,
  borderWidth = 1.5,
  colorFrom = "#7c3aed",
  colorTo = "#00fff5",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden",
        className
      )}
      style={{
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
        padding: `${borderWidth}px`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from calc(var(--beam-angle, 0deg)), transparent 0%, ${colorFrom} 10%, ${colorTo} 20%, transparent 30%)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
      <style jsx>{`
        @property --beam-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes border-beam-spin {
          to {
            --beam-angle: 360deg;
          }
        }
      `}</style>
    </div>
  );
}
