"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { createGuestbookMessage } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";

export function GuestbookForm() {
  const [state, formAction, isPending] = useActionState(
    createGuestbookMessage,
    { success: false, error: "" }
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-text-secondary mb-1.5">
          <span className="text-brand-cyan font-mono">$</span> name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={50}
          placeholder="visitor"
          className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-subtle text-text-primary text-sm font-mono placeholder:text-text-muted focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-text-secondary mb-1.5">
          <span className="text-brand-cyan font-mono">$</span> message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={500}
          rows={3}
          placeholder="leave a trace..."
          className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border-subtle text-text-primary text-sm font-mono placeholder:text-text-muted focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all resize-none"
        />
      </div>

      {state.error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 font-mono"
        >
          error: {state.error}
        </motion.p>
      )}

      {state.success && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-green-400 font-mono"
        >
          message sent successfully.
        </motion.p>
      )}

      <Button type="submit" disabled={isPending}>
        <Send size={14} />
        {isPending ? "sending..." : "send"}
      </Button>
    </form>
  );
}
