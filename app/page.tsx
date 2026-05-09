import Link from "next/link";
import { ArrowRight, Code2, BookOpen, Layers } from "lucide-react";
import { getLatestPosts, getFeaturedProjects } from "@/lib/supabase/queries";
import { PageTransition } from "@/components/layout/page-transition";
import { AnimatedText } from "@/components/ui/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate } from "@/lib/utils";

const statusItems = [
  { icon: Code2, label: "Building interfaces" },
  { icon: BookOpen, label: "Writing systems" },
  { icon: Layers, label: "Shipping ideas" },
];

export default async function HomePage() {
  const [latestPosts, featuredProjects] = await Promise.all([
    getLatestPosts(3).catch(() => []),
    getFeaturedProjects().catch(() => []),
  ]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        {/* Hero */}
        <section className="mb-24">
          <div className="space-y-2 mb-8">
            <AnimatedText delay={0}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                Crafting digital
              </h1>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                experiences at the
              </h1>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                intersection of{" "}
                <span className="gradient-text">code & design</span>
              </h1>
            </AnimatedText>
          </div>

          <AnimatedText delay={0.35}>
            <p className="max-w-lg text-text-secondary text-lg leading-relaxed">
              A personal archive exploring interfaces, systems, and ideas.
              Currently focused on building tools that feel alive.
            </p>
          </AnimatedText>

          {/* Status bar */}
          <AnimatedText delay={0.45}>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {statusItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs text-text-secondary"
                >
                  <item.icon size={13} className="text-brand-cyan" />
                  {item.label}
                </div>
              ))}
            </div>
          </AnimatedText>

          {/* CTAs */}
          <AnimatedText delay={0.55}>
            <div className="flex items-center gap-4 mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl gradient-border bg-surface text-text-primary hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-shadow"
              >
                Read the blog
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-xl hover:bg-white/[0.04]"
              >
                About me
              </Link>
            </div>
          </AnimatedText>
        </section>

        {/* Latest Posts */}
        {latestPosts.length > 0 && (
          <ScrollReveal>
            <section className="mb-24">
              <SectionHeading
                title="Latest Posts"
                subtitle="Recent thoughts and explorations"
              />
              <div className="space-y-0">
                {latestPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex items-start justify-between gap-4 py-5 border-b border-border-subtle hover:border-brand-purple/20 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <time className="text-xs text-text-muted font-mono">
                          {formatDate(post.published_at)}
                        </time>
                        {post.tags?.[0] && (
                          <span className="text-xs text-brand-cyan/70 font-mono">
                            {post.tags[0]}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-medium text-text-primary group-hover:text-brand-purple transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-1 text-sm text-text-muted line-clamp-1">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <ArrowRight
                      size={16}
                      className="mt-2 shrink-0 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-text-secondary hover:text-brand-purple transition-colors"
              >
                All posts <ArrowRight size={14} />
              </Link>
            </section>
          </ScrollReveal>
        )}

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <ScrollReveal>
            <section>
              <SectionHeading
                title="Featured Projects"
                subtitle="Selected works and experiments"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {featuredProjects.map((project) => (
                  <a
                    key={project.id}
                    href={project.url || project.github_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <InteractiveCard>
                      <h3 className="font-semibold text-text-primary mb-1">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                          {project.description}
                        </p>
                      )}
                      {project.tech_stack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech_stack.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/[0.04] text-text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </InteractiveCard>
                  </a>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>
    </PageTransition>
  );
}
