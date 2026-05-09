import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <div className="max-w-md mx-auto text-center">
        <div className="font-mono text-6xl font-bold gradient-text mb-4">
          404
        </div>
        <div className="font-mono text-sm text-text-muted mb-2">
          <span className="text-brand-cyan">$</span> signal lost
        </div>
        <div className="font-mono text-xs text-text-muted mb-8 leading-relaxed">
          <p>ERR_ROUTE_NOT_FOUND</p>
          <p className="mt-1">
            The requested path does not exist in this archive.
          </p>
          <p className="mt-1">Check the URL or return to a known signal.</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl gradient-border bg-surface text-text-primary hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-shadow"
        >
          Return to base
        </Link>
      </div>
    </div>
  );
}
