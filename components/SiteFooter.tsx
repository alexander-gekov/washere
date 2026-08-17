export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-5xl px-6 pb-12 text-sm text-ink-soft">
      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>Open source. Snapshot at install. Never phones home.</p>
        <a
          className="font-mono text-xs tracking-wide underline decoration-foil underline-offset-4 hover:text-ink"
          href="https://github.com/alexandergekov/washere"
        >
          github.com/alexandergekov/washere
        </a>
      </div>
    </footer>
  );
}
