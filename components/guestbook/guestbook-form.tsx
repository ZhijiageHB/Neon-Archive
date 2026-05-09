"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { createGuestbookMessage } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";
import { FormField, FormMessage } from "@/components/ui/form-field";

export function GuestbookForm() {
  const [state, formAction, isPending] = useActionState(
    createGuestbookMessage,
    { success: false, error: "" }
  );

  return (
    <form action={formAction} className="space-y-4">
      <FormField label="name" name="name" required maxLength={50} placeholder="visitor" />
      <FormField label="message" name="message" type="textarea" required maxLength={500} placeholder="leave a trace..." />
      <FormMessage error={state.error || undefined} success={state.success ? "message sent successfully." : undefined} />
      <Button type="submit" disabled={isPending}>
        <Send size={14} />
        {isPending ? "sending..." : "send"}
      </Button>
    </form>
  );
}
