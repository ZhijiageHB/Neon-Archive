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
    <section className="py-16 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="glass rounded-2xl p-6 sm:p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-1">
                  Guestbook
                </h2>
                <p className="text-sm text-text-secondary">
                  Leave a trace in the archive
                </p>
              </div>
              <Link
                href="/guestbook"
                className="text-sm text-text-muted hover:text-brand-purple transition-colors"
              >
                View all <ArrowUpRight size={14} className="inline" />
              </Link>
            </div>

            <div className="rounded-xl bg-text-primary/[0.02] border border-border-subtle p-5 font-mono text-sm">
              {messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <Reveal key={msg.id} delay={i * 0.08}>
                      <div>
                        <span className="text-brand-purple">{msg.name}</span>
                        <span className="text-text-muted">: </span>
                        <span className="text-text-secondary">{msg.message}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted">
                  {"// no messages yet. be the first."}
                </p>
              )}
              <div className="mt-3 flex items-center gap-1">
                <span className="text-brand-purple">$</span>
                <span className="inline-block w-2 h-4 bg-brand-purple animate-blink" />
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/guestbook"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-border bg-surface text-text-primary text-sm font-medium hover:shadow-[0_0_20px_rgba(124,58,237,0.10)] transition-shadow"
              >
                Leave a message
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
