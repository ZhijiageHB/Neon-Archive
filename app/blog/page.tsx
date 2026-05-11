import { Suspense } from "react";
import type { Metadata } from "next";
export const revalidate = 60;
import { PageTransition } from "@/components/layout/page-transition";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostList } from "@/components/blog/post-list";
import { PostCardSkeleton } from "@/components/ui/skeleton-card";
import { SearchInput } from "@/components/blog/search-input";
import { Lamp } from "@/components/ui/lamp";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writings on interfaces, systems, and engineering.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const query = params.q?.trim() || undefined;

  return (
    <PageTransition>
      <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-20">
        <Lamp className="absolute top-0 left-0 right-0" />
        <SectionHeading
          title="Blog"
          subtitle="Technical writings on interfaces, systems, and engineering"
        />
        <Suspense fallback={<div className="mb-8 h-12" />}>
          <SearchInput />
        </Suspense>
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <PostList page={page} search={query} />
        </Suspense>
      </div>
    </PageTransition>
  );
}
