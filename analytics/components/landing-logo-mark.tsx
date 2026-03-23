/** Four-square grid mark (Maxnio-style logo icon) */
export function LandingLogoMark({ className }: { className?: string }) {
  return (
    <span
      className={`grid size-6 grid-cols-2 gap-0.5 ${className ?? ""}`}
      aria-hidden
    >
      <span className="rounded-[2px] bg-current" />
      <span className="rounded-[2px] bg-current" />
      <span className="rounded-[2px] bg-current" />
      <span className="rounded-[2px] bg-current" />
    </span>
  );
}
