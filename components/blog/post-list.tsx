import { getPublishedPosts, getPostMetrics } from "@/lib/supabase/queries";
import { PostCard } from "./post-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export async function PostList() {
  let posts;
  try {
    posts = await getPublishedPosts();
  } catch {
    return (
      <div className="py-16 text-center">
        <p className="text-text-muted font-mono text-sm">
          {"// no posts yet"}
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
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
      try {
        const metrics = await getPostMetrics(post.slug);
        return { ...post, ...metrics };
      } catch {
        return { ...post, views: 0, likes: 0 };
      }
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
