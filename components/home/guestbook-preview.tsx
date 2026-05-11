import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface GuestbookPreviewProps {
  messages: Message[];
}

export function GuestbookPreview({ messages }: GuestbookPreviewProps) {
  return (
    <section className="py-24 pb-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <Reveal>
          <div className="relative mb-12">
            <span className="editorial-number absolute -top-8 left-0">
              06
            </span>
            <span className="editorial-heading">Guestbook</span>
          </div>
        </Reveal>

        {/* Terminal panel — offset left */}
        <Reveal>
          <div className="max-w-2xl lg:ml-[8%]">
            <div className="glass rounded-2xl overflow-hidden relative">
              {/* Terminal gutter line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple/30 via-brand-cyan/20 to-transparent" />

              <div className="p-6 sm:p-8 pl-7">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-text-secondary font-mono">
                    visitor@neon:~$ guestbook
                  </p>
                  <Link
                    href="/guestbook"
                    className="text-xs text-text-muted hover:text-brand-purple transition-colors font-mono"
                  >
                    view all <ArrowUpRight size={12} className="inline" />
                  </Link>
                </div>

                <div className="space-y-4 font-mono text-sm">
                  {messages.length > 0 ? (
                    messages.map((msg, i) => (
                      <Reveal key={msg.id} delay={i * 0.06}>
                        <div className="flex items-baseline gap-2">
                          <span className="text-brand-purple shrink-0">
                            {msg.name}
                          </span>
                          <span className="text-text-muted">:</span>
                          <span className="text-text-secondary">
                            {msg.message}
                          </span>
                        </div>
                      </Reveal>
                    ))
                  ) : (
                    <p className="text-text-muted">
                      {"// no messages yet. be the first."}
                    </p>
                  )}
                  <div className="flex items-center gap-1 pt-2">
                    <span className="text-brand-purple">$</span>
                    <span className="inline-block w-2 h-4 bg-brand-purple animate-blink" />
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/guestbook"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-border bg-surface text-text-primary text-sm font-medium hover:shadow-[0_0_20px_rgba(124,58,237,0.10)] transition-shadow"
                  >
                    Leave a message
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
