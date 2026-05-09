import Link from "next/link";
import { ArrowUpRight, Eye, Heart } from "lucide-react";
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
        <Reveal>
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-2">
              Writing
            </h2>
            <p className="text-text-secondary">
              Thoughts, explorations, and technical deep-dives
            </p>
          </div>
        </Reveal>

        {/* Featured post */}
        {featured && (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block mb-6"
            >
              <div className="glass rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-xs text-text-muted font-mono">
                    {formatDate(featured.published_at)}
                  </time>
                  {featured.tags?.[0] && (
                    <span className="text-xs text-brand-cyan font-mono px-2 py-0.5 rounded-full bg-brand-cyan/8">
                      {featured.tags[0]}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-text-primary group-hover:text-brand-purple transition-colors mb-2">
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p className="text-text-secondary leading-relaxed mb-4 max-w-2xl">
                    {featured.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
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
                  <span className="text-sm text-text-muted group-hover:text-brand-purple transition-colors">
                    Read article <ArrowUpRight size={14} className="inline" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block glass rounded-xl p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <time className="text-xs text-text-muted font-mono">
                      {formatDate(post.published_at)}
                    </time>
                    {post.tags?.[0] && (
                      <span className="text-[10px] text-brand-cyan font-mono">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-text-primary group-hover:text-brand-purple transition-colors mb-1.5">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-text-muted line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[11px] text-text-muted">
                        <Eye size={11} />
                        {post.views ?? 0}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-text-muted">
                        <Heart size={11} />
                        {post.likes ?? 0}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.3}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 mt-8 text-sm text-text-secondary hover:text-brand-purple transition-colors"
          >
            All posts <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
