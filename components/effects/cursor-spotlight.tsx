"use client";

import { useCallback, useRef, useEffect } from "react";

export function CursorSpotlight() {
  const elRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (elRef.current) {
        elRef.current.style.left = `${e.clientX - 300}px`;
        elRef.current.style.top = `${e.clientY - 300}px`;
        elRef.current.style.opacity = "1";
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (elRef.current) {
      elRef.current.style.opacity = "0";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={elRef}
      className="fixed z-[2] pointer-events-none opacity-0 transition-opacity duration-300"
      style={{
        left: -400,
        top: -400,
        width: 600,
        height: 600,
        background:
          "radial-gradient(circle, rgba(0,255,245,0.05) 0%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
