/** Decorative, non-interactive background layers used across sections. */

export function GridGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.35] mask-fade-b"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,155,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(46,155,255,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* glow orbs */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-pulse-glow" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
    </div>
  );
}

export function GlowOrb({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}
