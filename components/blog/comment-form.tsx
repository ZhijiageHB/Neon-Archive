"use client";

import { useActionState } from "react";
import { MessageSquare } from "lucide-react";
import { createComment } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";
import { FormField, FormMessage } from "@/components/ui/form-field";

interface CommentFormProps {
  slug: string;
}

export function CommentForm({ slug }: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(createComment, {
    success: false,
    error: "",
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="slug" value={slug} />
      <FormField label="name" name="name" required maxLength={50} placeholder="visitor" />
      <FormField label="message" name="message" type="textarea" required maxLength={1000} placeholder="share your thoughts..." />
      <FormMessage error={state.error || undefined} success={state.success ? "comment posted successfully." : undefined} />
      <Button type="submit" disabled={isPending}>
        <MessageSquare size={14} />
        {isPending ? "posting..." : "post comment"}
      </Button>
    </form>
  );
}
