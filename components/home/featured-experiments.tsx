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

export function FeaturedExperiments({ projects }: FeaturedExperimentsProps) {
  const [first, ...rest] = projects.slice(0, 3);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-2">
              Featured Experiments
            </h2>
            <p className="text-text-secondary">
              Selected works and explorations
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Large card — first project */}
          {first && (
            <Reveal className="md:col-span-2">
              <a
                href={first.url || first.github_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <TiltCard>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl sm:text-2xl font-semibold text-text-primary">
                        {first.title}
                      </h3>
                      <ArrowUpRight size={18} className="text-text-muted shrink-0 mt-1" />
                    </div>
                    {first.description && (
                      <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-xl">
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
                </TiltCard>
              </a>
            </Reveal>
          )}

          {/* Smaller cards */}
          {rest.map((project, i) => (
            <Reveal key={project.id} delay={(i + 1) * 0.1}>
              <a
                href={project.url || project.github_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <TiltCard>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {project.title}
                      </h3>
                      <ArrowUpRight size={16} className="text-text-muted shrink-0 mt-0.5" />
                    </div>
                    {project.description && (
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        {project.description}
                      </p>
                    )}
                    {project.tech_stack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
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
                  </div>
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
