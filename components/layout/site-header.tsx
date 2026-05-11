"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/about", label: "About" },
  { href: "/admin/new", label: "Admin" },
];

const dockSpring = { stiffness: 300, damping: 20 };

function DockItem({
  mouseX,
  children,
  className,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    if (!ref.current) return 150;
    const bounds = ref.current.getBoundingClientRect();
    return val - bounds.left - bounds.width / 2;
  });

  const scale = useSpring(
    useTransform(distance, [-150, 0, 150], [1, 1.3, 1]),
    dockSpring
  );

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(Infinity);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="mx-auto max-w-6xl px-6"
        animate={{ paddingTop: scrolled ? 12 : 16, paddingBottom: scrolled ? 12 : 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.nav
          className={cn(
            "flex items-center justify-between rounded-xl glass px-5 py-3 transition-shadow duration-300",
            scrolled && "shadow-[0_0_0_1px_rgba(124,58,237,0.1),0_8px_32px_rgba(0,0,0,0.4)]"
          )}
          animate={{ paddingTop: scrolled ? 8 : 12, paddingBottom: scrolled ? 8 : 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-text-primary hover:opacity-80 transition-opacity"
          >
            <span className="gradient-text">Neon</span> Archive
          </Link>

          {/* Desktop */}
          <ul
            className="hidden md:flex items-center gap-1"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          >
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <DockItem mouseX={mouseX}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-3.5 py-1.5 text-sm rounded-lg transition-colors",
                        isActive
                          ? "text-text-primary"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-highlight"
                          className="absolute inset-0 rounded-lg bg-white/[0.06]"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  </DockItem>
                </li>
              );
            })}
          </ul>

          {/* Desktop search */}
          <Link
            href="/blog"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/[0.06] transition-colors"
            aria-label="Search posts"
          >
            <Search size={17} />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5 text-text-secondary hover:text-text-primary transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="md:hidden overflow-hidden mt-2 rounded-xl glass"
            >
              <ul className="p-3 flex flex-col gap-1">
                {links.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block px-4 py-2.5 text-sm rounded-lg transition-colors",
                          isActive
                            ? "text-text-primary bg-white/[0.06]"
                            : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
