import { Code2, Rss, ExternalLink } from "lucide-react";
import { MagneticLink } from "@/components/ui/magnetic-link";

const socialLinks = [
  { href: "https://github.com/ZhijiageHB/Neon-Archive", icon: Code2, label: "GitHub" },
  { href: "https://x.com", icon: ExternalLink, label: "Twitter" },
  { href: "/feed.xml", icon: Rss, label: "RSS" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden">
      {/* Gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[200px] bg-gradient-to-t from-brand-purple/8 via-brand-cyan/4 to-transparent blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12">
        {/* Brand */}
        <div className="text-center mb-10">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Neon</span>{" "}
            <span className="text-text-primary">Archive</span>
          </h2>
          <p className="text-text-secondary text-lg">
            A personal archive exploring interfaces, systems, and ideas.
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {socialLinks.map((link) => (
            <MagneticLink key={link.label} href={link.href}>
              <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors">
                <link.icon size={16} />
                {link.label}
              </span>
            </MagneticLink>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Neon Archive. Built with Next.js &
          Supabase.
        </p>
      </div>
    </footer>
  );
}
