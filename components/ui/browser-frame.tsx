import type { ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
}

export function BrowserFrame({
  children,
  url,
  className = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden border border-border-subtle bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-surface-soft">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        {url && (
          <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-white text-xs text-text-muted font-mono truncate">
            {url}
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
