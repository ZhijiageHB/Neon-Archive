import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getLatestPosts,
  getFeaturedProjects,
  getGuestbookMessages,
  getPostMetrics,
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

  // Fetch metrics for posts
  const postsWithMetrics = await Promise.all(
    latestPosts.map(async (post) => {
      try {
        const metrics = await getPostMetrics(post.slug);
        return { ...post, ...metrics };
      } catch {
        return { ...post, views: 0, likes: 0 };
      }
    })
  );

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
