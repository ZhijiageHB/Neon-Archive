import { createClient } from "@/lib/supabase/server";

export async function getPublishedPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, cover_image, tags, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) throw error;
  return data;
}

export async function getPostMetrics(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("post_metrics")
    .select("views, likes")
    .eq("slug", slug)
    .single();

  return data ?? { views: 0, likes: 0 };
}

export async function getLatestPosts(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, tags, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getFeaturedProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getGuestbookMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function incrementViews(slug: string) {
  const supabase = await createClient();
  await supabase.rpc("increment_post_views", { p_slug: slug });
}

export async function incrementLikes(slug: string) {
  const supabase = await createClient();
  await supabase.rpc("increment_post_likes", { p_slug: slug });
}
