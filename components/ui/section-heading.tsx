import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      {eyebrow && (
        <span className="inline-block px-3 py-1 mb-3 rounded-full bg-brand-purple/8 text-brand-purple text-[10px] font-mono uppercase tracking-[0.2em]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-brand-purple/40 to-transparent" />
      {subtitle && (
        <p className="mt-3 text-base text-text-secondary max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
