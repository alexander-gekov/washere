export function Stamp({ className = "" }: { className?: string }) {
  return (
    <span className={`stamp ${className}`} aria-label="washere">
      <span className="text-[0.65rem]">was</span>
      <span className="text-[0.8rem]">here</span>
    </span>
  );
}
