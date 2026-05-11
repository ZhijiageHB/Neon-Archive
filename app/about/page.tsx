import type { Metadata } from "next";
export const dynamic = "force-static";
import { PageTransition } from "@/components/layout/page-transition";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InteractiveCard } from "@/components/ui/interactive-card";

export const metadata: Metadata = {
  title: "About",
  description: "About the person behind Neon Archive.",
};

const timeline = [
  {
    year: "2024",
    title: "Neon Archive",
    description:
      "Launched this personal technical archive to document ideas, systems, and experiments.",
  },
  {
    year: "2023",
    title: "Deep dive into full-stack",
    description:
      "Explored Next.js App Router, server components, and modern React patterns.",
  },
  {
    year: "2022",
    title: "Frontend engineering",
    description:
      "Built production interfaces with a focus on performance and interaction design.",
  },
  {
    year: "2021",
    title: "First lines of code",
    description: "Where the journey began. Hello, world.",
  },
];

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Figma",
  "Git",
];

const learning = ["Rust", "WebGL / Three.js", "Go"];

const principles = [
  {
    title: "Craft over speed",
    description:
      "Every pixel, every animation, every API call should be intentional. Shipping fast matters, but shipping right matters more.",
  },
  {
    title: "Systems thinking",
    description:
      "Good software is a system of small, composable parts. I build for the long game — reusable, extensible, and resilient.",
  },
  {
    title: "Details are the design",
    description:
      "The difference between good and great lives in the micro-interactions, the loading states, the edge cases nobody sees.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        {/* Intro */}
        <ScrollReveal>
          <section className="mb-20 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-6">
              Building things that{" "}
              <span className="gradient-text">feel alive</span>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              I&apos;m a developer and designer who believes the best interfaces
              are the ones you don&apos;t notice — they just work. This archive
              is where I collect my thoughts, experiments, and the things I
              learn along the way.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Currently exploring the space where engineering meets craft.
              Building tools, writing systems, and shipping ideas that push
              the web forward.
            </p>
          </section>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <section className="mb-20">
            <SectionHeading title="Timeline" subtitle="Key milestones along the way" />
            <div className="relative pl-6 border-l border-border-subtle">
              {timeline.map((item, i) => (
                <div key={i} className="group relative mb-10 last:mb-0 transition-all duration-300">
                  {/* Node */}
                  <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-brand-purple border-2 border-background group-hover:shadow-[0_0_12px_rgba(124,58,237,0.4)] transition-shadow duration-300" />
                  {/* Glow line segment */}
                  <div className="absolute -left-[13px] top-3 w-[2px] h-[calc(100%+16px)] bg-gradient-to-b from-brand-purple/30 to-transparent" />
                  <span className="text-xs font-mono gradient-text font-medium">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-text-primary mt-1 group-hover:text-brand-purple transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1 group-hover:text-text-secondary transition-colors">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal>
          <section className="mb-20">
            <SectionHeading
              title="Tech Stack"
              subtitle="Tools I work with daily"
            />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 text-sm font-mono rounded-full glass text-text-secondary hover:text-text-primary hover:gradient-border transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">
                Currently learning
              </p>
              <div className="flex flex-wrap gap-2">
                {learning.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 text-sm font-mono rounded-full bg-brand-cyan/8 text-brand-cyan/80 hover:text-brand-cyan transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Philosophy */}
        <ScrollReveal>
          <section>
            <SectionHeading
              title="Philosophy"
              subtitle="How I approach building"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((p, i) => (
                <div key={p.title} className={i === 0 ? "sm:col-span-2" : ""}>
                  <InteractiveCard>
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {p.description}
                    </p>
                  </InteractiveCard>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
