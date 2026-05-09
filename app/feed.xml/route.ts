import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, title, excerpt, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(20);

  const items = (posts ?? [])
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://neon-archive.vercel.app/blog/${post.slug}</link>
      <guid>https://neon-archive.vercel.app/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt ?? ""}]]></description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Neon Archive</title>
    <link>https://neon-archive.vercel.app</link>
    <description>A personal archive exploring interfaces, systems, and ideas.</description>
    <language>en</language>
    <atom:link href="https://neon-archive.vercel.app/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
