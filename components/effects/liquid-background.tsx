"use client";

export function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Purple blob */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full animate-float"
        style={{
          background: "rgba(124, 58, 237, 0.20)",
          filter: "blur(70px)",
          willChange: "transform",
          animationDelay: "0s",
          animationDuration: "10s",
        }}
      />
      {/* Electric Cyan blob */}
      <div
        className="absolute top-1/3 -right-1/4 w-[70vw] h-[70vw] rounded-full animate-float"
        style={{
          background: "rgba(0, 255, 245, 0.08)",
          filter: "blur(70px)",
          willChange: "transform",
          animationDelay: "-3s",
          animationDuration: "10s",
        }}
      />
      {/* Neon Green blob */}
      <div
        className="absolute -bottom-1/4 left-1/3 w-[60vw] h-[60vw] rounded-full animate-float"
        style={{
          background: "rgba(0, 255, 136, 0.06)",
          filter: "blur(70px)",
          willChange: "transform",
          animationDelay: "-6s",
          animationDuration: "10s",
        }}
      />
      {/* Pink blob */}
      <div
        className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] rounded-full animate-float"
        style={{
          background: "rgba(240, 89, 218, 0.10)",
          filter: "blur(70px)",
          willChange: "transform",
          animationDelay: "-5s",
          animationDuration: "10s",
        }}
      />
      {/* Grid overlay */}
      <div className="grid-background" />
    </div>
  );
}
