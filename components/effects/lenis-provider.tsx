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

    // Write velocity to CSS variable for skewY effect (throttled to every 2nd frame)
    let frameCount = 0;
    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      frameCount++;
      if (frameCount % 2 === 0) {
        document.documentElement.style.setProperty(
          "--scroll-vel",
          String(Math.max(-1, Math.min(1, velocity)))
        );
      }
    });

    let rafId: number;
    function raf(time: number) {
      // Pause when tab is hidden to save CPU
      if (document.visibilityState === "visible") {
        lenis.raf(time);
      }
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
