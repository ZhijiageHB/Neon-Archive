import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { PostMetrics } from "./post-metrics";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string;
  tags: string[];
  views?: number;
  likes?: number;
}

export function PostCard({
  slug,
  title,
  excerpt,
  published_at,
  tags,
  views = 0,
  likes = 0,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex items-start justify-between gap-4 py-6 border-b border-border-subtle hover:border-brand-purple/20 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <time className="text-xs text-text-muted font-mono">
            {formatDate(published_at)}
          </time>
          {tags.length > 0 && (
            <span className="text-xs text-brand-cyan/70 font-mono">
              {tags[0]}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-purple transition-colors line-clamp-1">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-1 text-sm text-text-secondary line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="mt-3">
          <PostMetrics views={views} likes={likes} />
        </div>
      </div>
      <ArrowUpRight
        size={20}
        className="mt-1 shrink-0 text-text-muted opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
      />
    </Link>
  );
}
