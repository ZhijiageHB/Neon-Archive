import { getPublishedPosts, getPostMetrics } from "@/lib/supabase/queries";
import { PostCard } from "./post-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export async function PostList() {
  const posts = await getPublishedPosts();

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-text-muted font-mono text-sm">
          {"// no posts yet"}
        </p>
      </div>
    );
  }

  const postsWithMetrics = await Promise.all(
    posts.map(async (post) => {
      const metrics = await getPostMetrics(post.slug);
      return { ...post, ...metrics };
    })
  );

  return (
    <div>
      {postsWithMetrics.map((post, i) => (
        <ScrollReveal key={post.id} delay={i * 0.05}>
          <PostCard
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            published_at={post.published_at}
            tags={post.tags}
            views={post.views}
            likes={post.likes}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
