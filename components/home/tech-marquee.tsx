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

export function TechMarquee() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-center text-xs font-mono text-text-muted uppercase tracking-widest mb-8">
            tools I work with
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Marquee items={row1} direction="left" speed={35} className="mb-4" />
        </Reveal>
        <Reveal delay={0.15}>
          <Marquee items={row2} direction="right" speed={40} />
        </Reveal>
      </div>
    </section>
  );
}
