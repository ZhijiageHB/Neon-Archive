"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

interface Feature {
  title: string;
  description: string;
  accent: string;
}

const features: Feature[] = [
  {
    title: "Deep Stacks",
    description:
      "Next.js 15, Framer Motion, Tailwind CSS 4 — built on the bleeding edge with type-safe everything.",
    accent: "#7c3aed",
  },
  {
    title: "Living Archives",
    description:
      "Every post, every guestbook entry — stored in Neon Postgres, rendered at the edge, cached for speed.",
    accent: "#00fff5",
  },
  {
    title: "Motion First",
    description:
      "Physics-based springs, scroll-triggered reveals, 3D tilts — every interaction has weight and intent.",
    accent: "#00ff88",
  },
  {
    title: "Dark Aesthetic",
    description:
      "Deep blacks, neon accents, noise textures, CRT scanlines — a digital archive that feels alive.",
    accent: "#f059da",
  },
];

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal direction="left" delay={index * 0.08}>
      <motion.div
        className="group flex items-start gap-8 py-10 border-t border-white/[0.04] cursor-default"
        whileHover={{ x: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Large index number */}
        <span className="hidden sm:block text-6xl font-bold text-white/[0.04] group-hover:text-brand-purple/20 transition-colors duration-500 w-20 shrink-0 leading-none pt-1">
          {num}
        </span>

        {/* Vertical divider */}
        <div className="hidden sm:block w-px self-stretch bg-white/[0.06] shrink-0" />

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-text-primary mb-2">
            {feature.title}
          </h3>
          <div
            className="h-px w-12 mb-3 transition-all duration-500 group-hover:w-24"
            style={{ background: feature.accent }}
          />
          <p className="text-text-secondary max-w-md leading-relaxed">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function FeatureCards() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <Reveal>
          <div className="relative mb-12">
            <span className="editorial-number absolute -top-8 left-0">
              02
            </span>
            <span className="editorial-heading">Built Different</span>
          </div>
        </Reveal>

        {/* Feature rows */}
        <div>
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
