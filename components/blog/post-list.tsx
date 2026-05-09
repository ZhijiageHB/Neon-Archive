import { getPublishedPostsPaginated, getPostMetricsBatch } from "@/lib/supabase/queries";
import { PostCard } from "./post-card";
import { Pagination } from "@/components/ui/pagination";

interface PostListProps {
  page?: number;
  pageSize?: number;
}

export async function PostList({ page = 1, pageSize = 10 }: PostListProps) {
  let posts, total;
  try {
    const result = await getPublishedPostsPaginated(page, pageSize);
    posts = result.posts;
    total = result.total;
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

  const slugs = posts.map((p) => p.slug);
  const metricsList = slugs.length > 0
    ? await getPostMetricsBatch(slugs).catch(() => [])
    : [];
  const metricsMap = new Map(metricsList.map((m) => [m.slug, m]));

  const postsWithMetrics = posts.map((post) => {
    const m = metricsMap.get(post.slug);
    return { ...post, views: m?.views ?? 0, likes: m?.likes ?? 0 };
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      {postsWithMetrics.map((post, i) => (
        <PostCard
          key={post.id}
          slug={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          published_at={post.published_at}
          tags={post.tags}
          views={post.views}
          likes={post.likes}
          index={i}
        />
      ))}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
