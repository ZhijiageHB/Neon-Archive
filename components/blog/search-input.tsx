"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useTransition, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
        params.delete("page");
      } else {
        params.delete("q");
      }
      startTransition(() => {
        router.push(`/blog?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const clear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    router.push(`/blog?${params.toString()}`, { scroll: false });
    inputRef.current?.focus();
  };

  return (
    <div className="relative mb-8">
      <div className="relative flex items-center">
        <Search
          size={16}
          className="absolute left-4 text-text-muted pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          defaultValue={initialQuery}
          placeholder="Search posts..."
          onChange={(e) => {
            const value = e.target.value;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => updateSearch(value), 300);
          }}
          className="w-full rounded-xl border border-border-subtle bg-surface pl-11 pr-10 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-200 focus:border-brand-purple/30 focus:ring-2 focus:ring-brand-purple/10"
        />
        <AnimatePresence>
          {initialQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clear}
              className="absolute right-3 p-1 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
