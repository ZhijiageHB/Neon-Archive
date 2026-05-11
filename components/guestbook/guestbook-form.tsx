"use client";

import { useActionState, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { createGuestbookMessage } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";
import { FormField, FormMessage } from "@/components/ui/form-field";

const terminalResponses = [
  "> encrypting message...",
  "> writing to archive...",
  "> stored. ✓",
];

export function GuestbookForm() {
  const [state, formAction, isPending] = useActionState(
    createGuestbookMessage,
    { success: false, error: "" }
  );
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    if (!isPending) return;
    setShowTerminal(true);
    setTerminalStep(0);
  }, [isPending]);

  useEffect(() => {
    if (!showTerminal) return;
    if (terminalStep >= terminalResponses.length) {
      const timer = setTimeout(() => setShowTerminal(false), 1000);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setTerminalStep((s) => s + 1), 400);
    return () => clearTimeout(timer);
  }, [showTerminal, terminalStep]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="relative">
        <FormField
          label="name"
          name="name"
          required
          maxLength={50}
          placeholder="visitor"
        />
        <span className="absolute left-16 top-[2.15rem] text-xs font-mono text-brand-purple/60 pointer-events-none select-none">
          visitor@neon:~$
        </span>
      </div>
      <FormField
        label="message"
        name="message"
        type="textarea"
        required
        maxLength={500}
        placeholder="leave a trace..."
      />

      {/* Terminal response sequence */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 font-mono text-xs space-y-1 overflow-hidden"
          >
            {terminalResponses.slice(0, terminalStep + 1).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={
                  i === terminalResponses.length - 1 && terminalStep >= terminalResponses.length - 1
                    ? "text-neon-green"
                    : "text-text-muted"
                }
              >
                {line}
              </motion.p>
            ))}
            {terminalStep < terminalResponses.length && (
              <span className="inline-block w-2 h-3.5 bg-brand-purple animate-blink" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <FormMessage
        error={state.error || undefined}
        success={state.success ? "message sent successfully." : undefined}
      />
      <Button type="submit" disabled={isPending}>
        <Send size={14} />
        {isPending ? "sending..." : "send"}
      </Button>
    </form>
  );
}
