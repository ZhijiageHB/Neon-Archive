import {
  getLatestPosts,
  getFeaturedProjects,
  getGuestbookMessages,
  getPostMetricsBatch,
} from "@/lib/supabase/queries";
import { PageTransition } from "@/components/layout/page-transition";
import { HeroSection } from "@/components/home/hero-section";
import { TechMarquee } from "@/components/home/tech-marquee";
import { FeaturedExperiments } from "@/components/home/featured-experiments";
import { WritingSection } from "@/components/home/writing-section";
import { GuestbookPreview } from "@/components/home/guestbook-preview";

export default async function HomePage() {
  const [latestPosts, featuredProjects, guestbookMessages] =
    await Promise.all([
      getLatestPosts(4).catch(() => []),
      getFeaturedProjects().catch(() => []),
      getGuestbookMessages().catch(() => []),
    ]);

  const slugs = latestPosts.map((p) => p.slug);
  const metricsList = slugs.length > 0
    ? await getPostMetricsBatch(slugs).catch(() => [])
    : [];
  const metricsMap = new Map(metricsList.map((m) => [m.slug, m]));

  const postsWithMetrics = latestPosts.map((post) => {
    const m = metricsMap.get(post.slug);
    return { ...post, views: m?.views ?? 0, likes: m?.likes ?? 0 };
  });

  return (
    <PageTransition>
      <HeroSection recentPosts={latestPosts} />
      <TechMarquee />
      {featuredProjects.length > 0 && (
        <FeaturedExperiments projects={featuredProjects} />
      )}
      {postsWithMetrics.length > 0 && (
        <WritingSection posts={postsWithMetrics} />
      )}
      <GuestbookPreview messages={guestbookMessages.slice(0, 3)} />
    </PageTransition>
  );
}
