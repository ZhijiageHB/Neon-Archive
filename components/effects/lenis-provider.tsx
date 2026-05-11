"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutExpo approximation
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Write velocity to CSS variable for skewY effect
    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      document.documentElement.style.setProperty(
        "--scroll-vel",
        String(Math.max(-1, Math.min(1, velocity)))
      );
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
