import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GuestbookForm } from "@/components/guestbook/guestbook-form";
import { GuestbookList } from "@/components/guestbook/guestbook-list";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a trace in the archive.",
};

export default function GuestbookPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary font-mono">
              <span className="text-brand-cyan">$</span> echo &quot;leave a
              trace&quot;
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Messages are stored in the archive. Say something memorable.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TerminalWindow title="guestbook">
            <GuestbookForm />
          </TerminalWindow>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10">
            <h2 className="text-sm font-mono text-text-muted mb-4">
              <span className="text-brand-purple">~/archive</span>{" "}
              <span className="text-text-muted">→</span> cat guestbook.log
            </h2>
            <GuestbookList />
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
