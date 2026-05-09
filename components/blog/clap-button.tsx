"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { incrementLikes } from "@/lib/supabase/actions";

interface ClapButtonProps {
  slug: string;
  initialLikes: number;
}

export function ClapButton({ slug, initialLikes }: ClapButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [particles, setParticles] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleClap = () => {
    setLikes((prev) => prev + 1);

    // Spawn particles
    const id = Date.now();
    setParticles((prev) => [...prev, id]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p !== id));
    }, 700);

    startTransition(async () => {
      await incrementLikes(slug);
    });
  };

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        onClick={handleClap}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        disabled={isPending}
        className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-border bg-surface text-text-primary text-sm font-medium hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-shadow cursor-pointer disabled:opacity-50"
        aria-label={`Like post, ${likes} likes`}
      >
        <Heart size={18} className="text-brand-purple" fill="currentColor" />
        <span>{likes}</span>
      </motion.button>

      {/* Particles */}
      <AnimatePresence>
        {particles.map((id) => (
          <motion.span
            key={id}
            initial={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            animate={{
              opacity: 0,
              scale: 0.5,
              y: -40 - Math.random() * 30,
              x: (Math.random() - 0.5) * 40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 pointer-events-none text-brand-purple"
          >
            <Heart size={12} fill="currentColor" />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
