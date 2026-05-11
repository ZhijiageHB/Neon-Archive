"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FloatingDashboard } from "@/components/ui/floating-dashboard";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Lamp } from "@/components/ui/lamp";
import { Meteors } from "@/components/effects/meteors";
import { GlitchText } from "@/components/ui/glitch-text";
import { springs } from "@/lib/animations";

const cyclingWords = ["interfaces", "systems", "stories", "experiments"];

interface HeroSectionProps {
  recentPosts?: Array<{ title: string; published_at: string }>;
}

export function HeroSection({ recentPosts = [] }: HeroSectionProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % cyclingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: springs.gentle,
    },
  };

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-[90vh] overflow-hidden"
      style={{ scale: heroScale, opacity: heroOpacity }}
    >
      {/* Background layers */}
      <Lamp className="absolute top-0 left-0 right-0" />
      <Meteors className="absolute inset-0" count={20} />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Section number watermark */}
      <span className="editorial-number absolute -top-4 left-0 select-none pointer-events-none z-0">
        01
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge — top left */}
          <motion.div variants={item} className="mb-8">
            <motion.span
              className="inline-block px-3.5 py-1 rounded-full bg-brand-purple/8 text-brand-purple text-xs font-mono"
              whileHover={{ scale: 1.05 }}
            >
              personal archive
            </motion.span>
          </motion.div>

          {/* Massive title — left aligned, 70% width */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.95] mb-8 max-w-[75%]"
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ ...springs.gentle, delay: 0.3 }}
            >
              I design and build
            </motion.span>
            <br />
            <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ y: 50, opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ y: -50, opacity: 0, scale: 1.1, filter: "blur(6px)" }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className="gradient-text absolute"
                >
                  {cyclingWords[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ ...springs.gentle, delay: 0.5 }}
            >
              <GlitchText>that feel alive.</GlitchText>
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="max-w-lg text-text-secondary text-lg leading-relaxed mb-14"
          >
            A personal archive exploring interfaces, systems, and ideas.
            Building tools at the intersection of craft and code.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex items-center gap-4">
            <MagneticButton href="/blog" variant="primary">
              Read the blog
              <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton href="/about" variant="ghost">
              About me
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Floating Dashboard — absolute positioned, offset, rotated */}
        <motion.div
          className="hidden lg:block absolute top-[12%] right-[-2%] w-[380px]"
          style={{ rotate: 2 }}
          initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...springs.gentle, delay: 0.8 }}
        >
          <FloatingDashboard recentPosts={recentPosts} />
        </motion.div>

        {/* Scroll indicator — left aligned */}
        <motion.div
          className="absolute bottom-8 left-6 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-brand-purple/60 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
            scroll
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
