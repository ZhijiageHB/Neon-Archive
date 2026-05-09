import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);

  const blogPosts = (posts ?? []).map((post) => ({
    url: `https://neon-archive.vercel.app/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://neon-archive.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://neon-archive.vercel.app/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://neon-archive.vercel.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://neon-archive.vercel.app/guestbook",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
    ...blogPosts,
  ];
}
