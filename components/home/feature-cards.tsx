"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface FeatureCard {
  title: string;
  description: string;
  gradient: string;
  icon: string;
}

const features: FeatureCard[] = [
  {
    title: "Deep Stacks",
    description:
      "Next.js 15, Framer Motion, Tailwind CSS 4 — built on the bleeding edge with type-safe everything.",
    gradient: "radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.15) 0%, transparent 60%)",
    icon: "⚡",
  },
  {
    title: "Living Archives",
    description:
      "Every post, every guestbook entry — stored in Neon Postgres, rendered at the edge, cached for speed.",
    gradient: "radial-gradient(ellipse at 80% 20%, rgba(0,255,245,0.10) 0%, transparent 60%)",
    icon: "🗄️",
  },
  {
    title: "Motion First",
    description:
      "Physics-based springs, scroll-triggered reveals, 3D tilts — every interaction has weight and intent.",
    gradient: "radial-gradient(ellipse at 50% 80%, rgba(0,255,136,0.08) 0%, transparent 60%)",
    icon: "🌊",
  },
  {
    title: "Dark Aesthetic",
    description:
      "Deep blacks, neon accents, noise textures, CRT scanlines — a digital archive that feels alive.",
    gradient: "radial-gradient(ellipse at 30% 70%, rgba(240,89,218,0.10) 0%, transparent 60%)",
    icon: "🌑",
  },
];

function FeatureCardItem({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <Reveal delay={index * 0.1} direction="up">
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group relative rounded-2xl border border-white/[0.06] p-6 overflow-hidden cursor-default"
        style={{ background: card.gradient }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: card.gradient.replace(/[\d.]+\)$/, "0.25)"),
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10">
          <div className="text-2xl mb-3">{card.icon}</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {card.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {card.description}
          </p>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function FeatureCards() {
  return (
    <section className="relative py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              Built Different
            </h2>
            <p className="text-text-secondary max-w-md mx-auto">
              A personal archive engineered with production-grade tooling and obsessive attention to detail.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((card, i) => (
            <FeatureCardItem key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
