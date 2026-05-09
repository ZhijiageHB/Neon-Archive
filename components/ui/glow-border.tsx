import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function GlowBorder({
  children,
  className,
  color = "brand-purple",
}: GlowBorderProps) {
  return (
    <div className={cn("relative group", className)}>
      <div
        className={cn(
          "absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-sm",
          `bg-${color}/20`
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
