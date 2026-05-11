"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Meteor {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
  delay: number;
  duration: number;
}

function generateMeteors(count: number): Meteor[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 40,
    angle: 135 + (Math.random() * 30 - 15),
    length: 100 + Math.random() * 200,
    delay: Math.random() * 8,
    duration: 1.5 + Math.random() * 1.5,
  }));
}

interface MeteorsProps {
  className?: string;
  count?: number;
}

export function Meteors({ className, count = 25 }: MeteorsProps) {
  const [meteors] = useState(() => generateMeteors(count));

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {meteors.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.length}px`,
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.5), transparent)",
            transform: `rotate(${m.angle}deg)`,
            animation: `meteor-fly ${m.duration}s linear infinite`,
            animationDelay: `${m.delay}s`,
            opacity: 0,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes meteor-fly {
          0% {
            transform: rotate(var(--angle, 135deg)) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            transform: rotate(var(--angle, 135deg)) translateX(600px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
