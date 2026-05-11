"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadBlogImage(file: File) {
  const supabase = await createClient();
  const ext = file.name.split(".").pop() ?? "png";
  const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    return { success: false, url: "", error: error.message };
  }

  const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
  return { success: true, url: data.publicUrl, error: "" };
}

export async function createPost(
  _prevState: { success: boolean; error: string; slug: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const tagsRaw = formData.get("tags") as string;
  const coverImage = formData.get("cover_image") as string;
  const published = formData.get("published") === "true";

  if (!title?.trim()) {
    return { success: false, error: "Title is required.", slug: "" };
  }
  if (!slug?.trim()) {
    return { success: false, error: "Slug is required.", slug: "" };
  }
  if (!content?.trim()) {
    return { success: false, error: "Content is required.", slug: "" };
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const supabase = await createClient();
  const { error } = await supabase.from("posts").insert({
    title: title.trim(),
    slug: slug.trim(),
    excerpt: excerpt?.trim() || null,
    content: content,
    cover_image: coverImage?.trim() || null,
    tags,
    published,
    published_at: new Date().toISOString(),
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "A post with this slug already exists.", slug: "" };
    }
    return { success: false, error: `Failed to create post: ${error.message}`, slug: "" };
  }

  // Create metrics entry
  await supabase.from("post_metrics").insert({ slug: slug.trim(), views: 0, likes: 0 });

  revalidatePath("/blog");
  revalidatePath("/");
  return { success: true, error: "", slug: slug.trim() };
}

export async function incrementViews(slug: string) {
  const supabase = await createClient();
  await supabase.rpc("increment_post_views", { p_slug: slug });
}

export async function incrementLikes(slug: string) {
  const supabase = await createClient();
  await supabase.rpc("increment_post_likes", { p_slug: slug });
  revalidatePath(`/blog/${slug}`);
}

export async function createGuestbookMessage(
  _prevState: { success: boolean; error: string },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!name?.trim() || !message?.trim()) {
    return { success: false, error: "Name and message are required." };
  }

  if (name.length > 50) {
    return { success: false, error: "Name must be 50 characters or less." };
  }

  if (message.length > 500) {
    return { success: false, error: "Message must be 500 characters or less." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("guestbook")
    .insert({ name: name.trim(), message: message.trim() });

  if (error) {
    return { success: false, error: "Failed to post message. Try again." };
  }

  revalidatePath("/guestbook");
  return { success: true, error: "" };
}

export async function createComment(
  _prevState: { success: boolean; error: string },
  formData: FormData
) {
  const slug = formData.get("slug") as string;
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!name?.trim() || !message?.trim()) {
    return { success: false, error: "Name and message are required." };
  }
  if (name.length > 50) {
    return { success: false, error: "Name must be 50 characters or less." };
  }
  if (message.length > 1000) {
    return { success: false, error: "Message must be 1000 characters or less." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("comments")
    .insert({ post_slug: slug, name: name.trim(), message: message.trim() });

  if (error) {
    return { success: false, error: "Failed to post comment. Try again." };
  }

  revalidatePath(`/blog/${slug}`);
  return { success: true, error: "" };
}
