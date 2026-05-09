"use client";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Aurora gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-purple/8 blur-[120px] animate-float" />
      <div
        className="absolute top-[10%] right-[-15%] w-[50%] h-[50%] rounded-full bg-brand-cyan/6 blur-[120px] animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-brand-violet/5 blur-[100px] animate-float"
        style={{ animationDelay: "-5s" }}
      />
      {/* Grid */}
      <div className="grid-background" />
    </div>
  );
}
