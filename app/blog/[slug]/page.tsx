import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getPostMetrics } from "@/lib/supabase/queries";
import { incrementViews } from "@/lib/supabase/actions";
import { PageTransition } from "@/components/layout/page-transition";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { PostMetrics } from "@/components/blog/post-metrics";
import { ClapButton } from "@/components/blog/clap-button";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt ?? undefined,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  // Increment views (fire-and-forget)
  incrementViews(slug);

  const metrics = await getPostMetrics(slug);

  return (
    <>
      <ReadingProgress />
      <PageTransition>
        <article className="mx-auto max-w-3xl px-6 pt-32 pb-20">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 mb-8 text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <time className="text-sm text-text-muted font-mono">
                {formatDate(post.published_at)}
              </time>
              {post.tags?.length > 0 && (
                <div className="flex items-center gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs text-brand-cyan/70 font-mono px-2 py-0.5 rounded-full bg-brand-cyan/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-text-primary mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-text-secondary leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="mt-5">
              <PostMetrics views={metrics.views} likes={metrics.likes} />
            </div>
          </header>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-brand-purple/30 via-brand-cyan/20 to-transparent mb-10" />

          {/* Content */}
          <div className="mb-16">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-brand-purple/30 mb-8" />

          {/* Clap */}
          <div className="flex items-center justify-between">
            <ClapButton slug={post.slug} initialLikes={metrics.likes} />
            <Link
              href="/blog"
              className="text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              All posts &rarr;
            </Link>
          </div>
        </article>
      </PageTransition>
    </>
  );
}
