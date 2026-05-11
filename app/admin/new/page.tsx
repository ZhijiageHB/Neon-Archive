import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { BlogUploadForm } from "@/components/admin/blog-upload-form";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new blog post.",
};

export default function AdminNewPostPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            New Post
          </h1>
          <p className="text-sm text-text-muted font-mono">
            Upload a Markdown file or write content directly.
          </p>
        </div>
        <BlogUploadForm />
      </div>
    </PageTransition>
  );
}
