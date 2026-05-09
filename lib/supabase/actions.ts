"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
