"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FloatingDashboard } from "@/components/ui/floating-dashboard";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SplitText } from "@/components/ui/split-text";

const cyclingWords = ["interfaces", "systems", "stories", "experiments"];

interface HeroSectionProps {
  recentPosts?: Array<{ title: string; published_at: string }>;
}

export function HeroSection({ recentPosts = [] }: HeroSectionProps) {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % cyclingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Title */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-brand-purple/8 text-brand-purple text-xs font-mono">
                personal archive
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <SplitText text="I design and build" delay={0.1} />
              <br />
              <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    className="gradient-text absolute"
                  >
                    {cyclingWords[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <SplitText text="that feel alive." delay={0.3} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="max-w-md text-text-secondary text-lg leading-relaxed mb-10"
            >
              A personal archive exploring interfaces, systems, and ideas.
              Building tools at the intersection of craft and code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="flex items-center gap-4"
            >
              <MagneticButton href="/blog" variant="primary">
                Read the blog
                <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton href="/about" variant="ghost">
                About me
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: Floating Dashboard */}
          <div className="hidden lg:block">
            <FloatingDashboard recentPosts={recentPosts} />
          </div>
        </div>
      </div>
    </section>
  );
}
