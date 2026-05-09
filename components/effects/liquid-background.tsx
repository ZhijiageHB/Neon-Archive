"use client";

export function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Purple blob */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full animate-float"
        style={{
          background: "rgba(124, 58, 237, 0.10)",
          filter: "blur(120px)",
          animationDelay: "0s",
        }}
      />
      {/* Cyan blob */}
      <div
        className="absolute top-1/3 -right-1/4 w-[70vw] h-[70vw] rounded-full animate-float"
        style={{
          background: "rgba(6, 182, 212, 0.08)",
          filter: "blur(130px)",
          animationDelay: "-2s",
        }}
      />
      {/* Orange blob */}
      <div
        className="absolute -bottom-1/4 left-1/3 w-[60vw] h-[60vw] rounded-full animate-float"
        style={{
          background: "rgba(249, 115, 22, 0.06)",
          filter: "blur(110px)",
          animationDelay: "-4s",
        }}
      />
      {/* Pink blob */}
      <div
        className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] rounded-full animate-float"
        style={{
          background: "rgba(236, 72, 153, 0.05)",
          filter: "blur(100px)",
          animationDelay: "-3s",
        }}
      />
      {/* Grid overlay */}
      <div className="grid-background" />
    </div>
  );
}
