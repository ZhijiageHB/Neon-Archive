import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";

const row1 = [
  "Next.js",
  "Supabase",
  "Framer Motion",
  "Vercel",
  "TypeScript",
  "Tailwind CSS",
];

const row2 = [
  "React",
  "PostgreSQL",
  "Server Actions",
  "React Server Components",
  "Fluid Compute",
  "Node.js",
];

const row3 = [
  "Figma",
  "Git",
  "Docker",
  "AWS",
  "Redis",
  "GraphQL",
];

export function TechMarquee() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10 relative">
            <span className="editorial-number absolute -top-8 left-0">03</span>
            <h2 className="editorial-heading relative">Stack</h2>
            <p className="mt-3 text-sm text-text-muted max-w-md">
              Craft chosen for performance, developer experience, and scale.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Marquee items={row1} direction="left" speed={35} className="mb-4" />
        </Reveal>
        <Reveal delay={0.15}>
          <Marquee items={row2} direction="right" speed={40} className="mb-4" />
        </Reveal>
        <Reveal delay={0.2}>
          <Marquee items={row3} direction="right" speed={45} />
        </Reveal>
      </div>
    </section>
  );
}
