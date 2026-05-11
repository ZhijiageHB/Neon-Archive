"use client";

import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface PostListWrapperProps {
  children: ReactNode;
}

export function PostListWrapper({ children }: PostListWrapperProps) {
  return <AnimatePresence mode="popLayout">{children}</AnimatePresence>;
}
