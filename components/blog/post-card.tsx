"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { PostMetrics } from "./post-metrics";
import { springs } from "@/lib/animations";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string;
  tags: string[];
  views?: number;
  likes?: number;
  index?: number;
}

export function PostCard({
  slug,
  title,
  excerpt,
  published_at,
  tags,
  views = 0,
  likes = 0,
  index = 0,
}: PostCardProps) {
  return (
    <motion.div
      layout
      layoutId={`post-${slug}`}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...springs.smooth, delay: index * 0.06 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group flex items-start justify-between gap-4 py-6 border-b border-border-subtle hover:border-brand-purple/20 transition-all duration-300 hover:pl-2 hover:shadow-[0_0_0_1px_rgba(0,255,245,0.15),0_0_20px_rgba(0,255,245,0.08),0_0_60px_rgba(0,255,245,0.03)] hover:rounded-lg"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <time className="text-xs text-text-muted font-mono">
              {formatDate(published_at)}
            </time>
            {tags.length > 0 && (
              <span className="text-xs text-brand-cyan/70 font-mono px-2 py-0.5 rounded-full bg-brand-cyan/5">
                {tags[0]}
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-purple transition-colors duration-300 line-clamp-1">
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
        <motion.div
          className="mt-1 shrink-0 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.2 }}
        >
          <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.div>
      </Link>
    </motion.div>
  );
}
