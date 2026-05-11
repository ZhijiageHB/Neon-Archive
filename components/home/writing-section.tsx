import Link from "next/link";
import { ArrowRight, Eye, Heart } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  tags: string[];
  published_at: string;
  views?: number;
  likes?: number;
}

interface WritingSectionProps {
  posts: Post[];
}

export function WritingSection({ posts }: WritingSectionProps) {
  const [featured, ...rest] = posts;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Editorial section header */}
        <Reveal>
          <div className="relative mb-16">
            <span className="editorial-number absolute -top-8 left-0">05</span>
            <span className="editorial-heading">Writing</span>
          </div>
        </Reveal>

        {/* Featured post — no card */}
        {featured && (
          <Reveal direction="left">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <time className="text-xs font-mono text-text-muted">
                  {formatDate(featured.published_at)}
                </time>
                {featured.tags?.[0] && (
                  <span className="text-xs font-mono text-brand-cyan/70">
                    {featured.tags[0]}
                  </span>
                )}
              </div>

              <Link href={`/blog/${featured.slug}`} className="group block">
                <h3 className="text-3xl sm:text-4xl font-bold text-text-primary group-hover:text-brand-purple transition-colors">
                  {featured.title}
                </h3>
              </Link>

              {featured.excerpt && (
                <p className="text-text-secondary max-w-2xl mt-3">
                  {featured.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Eye size={13} />
                    {featured.views ?? 0}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Heart size={13} />
                    {featured.likes ?? 0}
                  </span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Read article
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Decorative gradient line */}
              <div className="h-px w-full bg-gradient-to-r from-brand-purple/30 via-brand-cyan/20 to-transparent mt-8" />
            </div>
          </Reveal>
        )}

        {/* Remaining posts — editorial vertical list */}
        {rest.length > 0 && (
          <div>
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-6 border-t border-white/[0.04] hover:pl-2 transition-all duration-300"
                >
                  <time className="text-xs font-mono text-text-muted w-24 shrink-0">
                    {formatDate(post.published_at)}
                  </time>
                  <h4 className="text-lg font-semibold text-text-primary group-hover:text-brand-purple group-hover:translate-x-2 transition-all duration-300 flex-1">
                    {post.title}
                  </h4>
                  {post.tags?.[0] && (
                    <span className="text-xs text-brand-cyan/60 font-mono shrink-0">
                      {post.tags[0]}
                    </span>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* "All posts" link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mt-10 group"
        >
          View all posts
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
