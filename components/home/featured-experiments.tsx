import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";

interface Project {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  github_url: string | null;
  tech_stack: string[];
}

interface FeaturedExperimentsProps {
  projects: Project[];
}

const ACCENT_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  React: "#61dafb",
  "Next.js": "#ffffff",
  Python: "#3776ab",
  Tailwind: "#06b6d4",
  Supabase: "#3ecf8e",
  PostgreSQL: "#4169e1",
  Prisma: "#2d3748",
  "Framer Motion": "#bb4bff",
  GSAP: "#48b983",
  "Three.js": "#049ef4",
  Vercel: "#ffffff",
  "Node.js": "#339933",
};

function getAccentColor(techStack: string[]): string {
  for (const tech of techStack) {
    if (ACCENT_COLORS[tech]) return ACCENT_COLORS[tech];
  }
  return "#7c3aed";
}

export function FeaturedExperiments({ projects }: FeaturedExperimentsProps) {
  const [first, ...rest] = projects.slice(0, 3);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Editorial section header */}
        <Reveal>
          <div className="relative mb-16">
            <span className="editorial-number absolute -top-8 left-0">04</span>
            <span className="editorial-heading">Selected Work</span>
          </div>
        </Reveal>

        {/* First project — split layout */}
        {first && (
          <Reveal>
            <a
              href={first.url || first.github_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-20"
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* Left: text */}
                <div className="flex-1 lg:max-w-[60%]">
                  <span className="text-8xl font-bold text-white/[0.04] leading-none select-none">
                    01
                  </span>
                  <h3 className="text-3xl font-bold text-text-primary mt-2 mb-4">
                    {first.title}
                  </h3>
                  {first.description && (
                    <p className="text-text-secondary leading-relaxed mb-6 max-w-xl">
                      {first.description}
                    </p>
                  )}
                  {first.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {first.tech_stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-brand-purple/6 text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: gradient preview */}
                <div className="w-full lg:w-[40%] shrink-0">
                  <TiltCard>
                    <div
                      className="aspect-[4/3] rounded-2xl"
                      style={{
                        background: `radial-gradient(ellipse at 30% 40%, ${getAccentColor(first.tech_stack)}22, transparent 70%), radial-gradient(ellipse at 80% 70%, ${getAccentColor(first.tech_stack)}11, transparent 60%)`,
                      }}
                    />
                  </TiltCard>
                </div>
              </div>
            </a>
          </Reveal>
        )}

        {/* Remaining projects — offset grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {rest.map((project, i) => {
            const index = i + 2; // 0-based index 1,2 -> project numbers 2,3
            const isEven = i % 2 === 0;
            return (
              <Reveal
                key={project.id}
                delay={(i + 1) * 0.12}
                className={isEven ? "lg:col-span-7" : "lg:col-span-5 lg:mt-12"}
              >
                <a
                  href={project.url || project.github_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-8 border-b border-white/[0.06]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl font-bold text-white/[0.04] leading-none select-none">
                        {String(index).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold text-text-primary group-hover:translate-x-2 transition-transform duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-text-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  {project.description && (
                    <p className="text-sm text-text-secondary leading-relaxed mb-4 pl-[4.5rem]">
                      {project.description}
                    </p>
                  )}
                  {project.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pl-[4.5rem]">
                      {project.tech_stack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-brand-purple/6 text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
