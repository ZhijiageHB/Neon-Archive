"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function CursorSpotlight() {
  const [position, setPosition] = useState({ x: -400, y: -400 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
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
      className="fixed z-[2] pointer-events-none transition-opacity duration-300"
      style={{
        left: position.x - 300,
        top: position.y - 300,
        width: 600,
        height: 600,
        opacity: visible ? 1 : 0,
        background:
          "radial-gradient(circle, rgba(0,255,245,0.05) 0%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
