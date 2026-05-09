"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  className?: string;
  filename?: string;
}

export function CodeBlock({ children, className, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const language = className?.replace("language-", "") ?? "";

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border-subtle bg-[#1a1a2e]">
      {/* macOS-style header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle bg-surface-soft">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          {filename && (
            <span className="text-xs text-text-muted font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {language && (
            <span className="text-[10px] text-text-muted uppercase tracking-wider">
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="p-1 text-text-muted hover:text-text-primary transition-colors rounded cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
