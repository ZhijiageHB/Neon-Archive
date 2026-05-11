"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "neon-archive-intro-seen";

export function IntroScreen() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"typing-neon" | "typing-archive" | "glitch" | "dissolve" | "done">("typing-neon");
  const [neonText, setNeonText] = useState("");
  const [archiveText, setArchiveText] = useState("");

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) {
      setPhase("done");
      return;
    }
    setShow(true);
  }, []);

  // Typing "NEON"
  useEffect(() => {
    if (phase !== "typing-neon" || !show) return;
    const target = "NEON";
    let i = 0;
    const timer = setInterval(() => {
      if (i < target.length) {
        setNeonText(target.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setPhase("typing-archive"), 200);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [phase, show]);

  // Typing "ARCHIVE"
  useEffect(() => {
    if (phase !== "typing-archive") return;
    const target = "ARCHIVE";
    let i = 0;
    const timer = setInterval(() => {
      if (i < target.length) {
        setArchiveText(target.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setPhase("glitch"), 300);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [phase]);

  // Glitch + dissolve
  useEffect(() => {
    if (phase !== "glitch") return;
    const timer = setTimeout(() => setPhase("dissolve"), 300);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "dissolve") return;
    const timer = setTimeout(() => {
      setPhase("done");
      setShow(false);
      localStorage.setItem(STORAGE_KEY, "1");
    }, 600);
    return () => clearTimeout(timer);
  }, [phase]);

  if (!show || phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <div className="text-center">
          <div
            className="font-mono text-5xl sm:text-7xl font-bold tracking-wider"
            style={{
              color: "#e8e8f0",
              textShadow:
                phase === "glitch"
                  ? "2px 0 #ff0040, -2px 0 #00fff5"
                  : "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            <span>{neonText}</span>
            {phase === "typing-neon" && (
              <span className="inline-block w-[3px] h-[1em] bg-[#7c3aed] ml-1 animate-blink align-middle" />
            )}
          </div>
          <div
            className="font-mono text-5xl sm:text-7xl font-bold tracking-wider mt-2"
            style={{
              color: "#9ca3b8",
              textShadow:
                phase === "glitch"
                  ? "-2px 0 #ff0040, 2px 0 #00fff5"
                  : "0 0 20px rgba(0,255,245,0.2)",
            }}
          >
            <span>{archiveText}</span>
            {phase === "typing-archive" && (
              <span className="inline-block w-[3px] h-[1em] bg-[#00fff5] ml-1 animate-blink align-middle" />
            )}
          </div>
        </div>

        {/* Glitch overlay */}
        {phase === "glitch" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0, 0.5, 0] }}
            transition={{ duration: 0.3, ease: "linear" }}
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.03) 2px, rgba(124,58,237,0.03) 4px)",
            }}
          />
        )}

        {/* Dissolve effect */}
        {phase === "dissolve" && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
