import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writings on interfaces, systems, and engineering.",
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        <SectionHeading
          title="Blog"
          subtitle="Technical writings on interfaces, systems, and engineering"
        />
        <PostList page={page} />
      </div>
    </PageTransition>
  );
}
