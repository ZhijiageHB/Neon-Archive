import { Code2, Globe, Rss } from "lucide-react";

const socialLinks = [
  { href: "https://github.com", icon: Code2, label: "GitHub" },
  { href: "https://twitter.com", icon: Globe, label: "Twitter" },
  { href: "/rss.xml", icon: Rss, label: "RSS" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border-subtle">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Neon Archive
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              <link.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
