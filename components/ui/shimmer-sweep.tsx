"use client";

import { cn } from "@/lib/utils";

interface ShimmerSweepProps {
  className?: string;
  interval?: number;
}

export function ShimmerSweep({
  className,
  interval = 3,
}: ShimmerSweepProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none",
        className
      )}
    >
      <div
        className="absolute top-0 left-0 h-px w-[100px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          animation: `shimmer-sweep ${interval}s ease-out infinite`,
        }}
      />
      <style jsx>{`
        @keyframes shimmer-sweep {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
