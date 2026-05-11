import type { Metadata } from "next";
export const revalidate = 30;
import { PageTransition } from "@/components/layout/page-transition";
import { SectionHeading } from "@/components/ui/section-heading";
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
          <SectionHeading
            title="Guestbook"
            subtitle="Leave a message in the archive. Say something memorable."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TerminalWindow title="guestbook">
            <GuestbookForm />
          </TerminalWindow>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10">
            <GuestbookList />
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
