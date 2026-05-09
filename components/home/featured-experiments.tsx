import { ArrowUpRight } from "lucide-react";
import { BrowserFrame } from "@/components/ui/browser-frame";
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

const gradients = [
  "from-brand-purple/20 via-brand-cyan/10 to-brand-blue/5",
  "from-brand-orange/15 via-brand-pink/10 to-brand-purple/5",
  "from-brand-cyan/15 via-brand-blue/10 to-brand-violet/5",
];

export function FeaturedExperiments({ projects }: FeaturedExperimentsProps) {
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

        <div className="space-y-6">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <a
                href={project.url || project.github_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <TiltCard>
                  <div className="flex flex-col md:flex-row gap-6 p-6 sm:p-8">
                    {/* Browser mockup — left */}
                    <div className="md:w-3/5 shrink-0">
                      <BrowserFrame url={project.url || undefined}>
                        <div
                          className={`h-48 sm:h-56 bg-gradient-to-br ${gradients[i % gradients.length]}`}
                        />
                      </BrowserFrame>
                    </div>
                    {/* Info — right */}
                    <div className="flex flex-col justify-between py-2 md:py-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-text-primary mb-2">
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                            {project.description}
                          </p>
                        )}
                        {project.tech_stack?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {project.tech_stack.map((tech: string) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 text-[11px] font-mono rounded-full bg-brand-purple/6 text-text-muted"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-sm text-text-muted">
                        <span>View project</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
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
