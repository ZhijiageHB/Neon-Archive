"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { createComment } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";

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

      <div>
        <label
          htmlFor="comment-name"
          className="block text-sm text-text-secondary mb-1.5"
        >
          name
        </label>
        <input
          id="comment-name"
          name="name"
          type="text"
          required
          maxLength={50}
          placeholder="visitor"
          className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-subtle text-text-primary text-sm font-mono placeholder:text-text-muted focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="comment-message"
          className="block text-sm text-text-secondary mb-1.5"
        >
          message
        </label>
        <textarea
          id="comment-message"
          name="message"
          required
          maxLength={1000}
          rows={3}
          placeholder="share your thoughts..."
          className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-subtle text-text-primary text-sm font-mono placeholder:text-text-muted focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all resize-none"
        />
      </div>

      {state.error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 font-mono"
        >
          error: {state.error}
        </motion.p>
      )}

      {state.success && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-600 font-mono"
        >
          comment posted successfully.
        </motion.p>
      )}

      <Button type="submit" disabled={isPending}>
        <MessageSquare size={14} />
        {isPending ? "posting..." : "post comment"}
      </Button>
    </form>
  );
}
