import { HOMEPAGE_EXAMPLES } from "@/lib/examples";

export function ExampleNotes() {
  return (
    <section className="mx-auto mt-20 w-full max-w-5xl px-6">
      <p className="font-mono text-xs tracking-[0.2em] text-wax uppercase">
        How it lands
      </p>
      <h2 className="mt-3 max-w-xl font-serif text-4xl italic leading-tight">
        After he ships something, a stamp. Then one line.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {HOMEPAGE_EXAMPLES.map((example) => (
          <figure key={example.tone} className="ide-scrap p-5">
            <figcaption className="flex items-center justify-between gap-3 font-mono text-[0.65rem] tracking-[0.16em] text-ink-soft uppercase">
              <span>{example.label}</span>
              <span className="text-foil">{example.win}</span>
            </figcaption>
            <pre className="mt-4 font-serif text-lg leading-relaxed whitespace-pre-wrap">
              {example.note}
            </pre>
          </figure>
        ))}
      </div>
    </section>
  );
}
