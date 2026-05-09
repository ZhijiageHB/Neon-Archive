import type { ReactNode } from "react";

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
}

export function TerminalWindow({
  children,
  title = "terminal",
}: TerminalWindowProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-border-subtle bg-surface">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-surface-soft">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 text-xs text-text-muted font-mono">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm">{children}</div>
    </div>
  );
}
