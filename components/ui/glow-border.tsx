import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  color?: "brand-purple" | "brand-cyan" | "brand-orange" | "brand-pink";
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
          "absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-md",
          color === "brand-purple" && "bg-brand-purple/15",
          color === "brand-cyan" && "bg-brand-cyan/15",
          color === "brand-orange" && "bg-brand-orange/15",
          color === "brand-pink" && "bg-brand-pink/15"
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
