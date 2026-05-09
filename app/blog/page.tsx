import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writings on interfaces, systems, and engineering.",
};

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        <SectionHeading
          title="Blog"
          subtitle="Technical writings on interfaces, systems, and engineering"
        />
        <PostList />
      </div>
    </PageTransition>
  );
}
