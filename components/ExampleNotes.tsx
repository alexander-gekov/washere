import { HOMEPAGE_EXAMPLES } from "@/lib/examples";

export function ExampleNotes() {
  return (
    <section className="mx-auto mt-28 w-full max-w-5xl px-6 sm:mt-36">
      <p className="font-mono text-xs tracking-[0.2em] text-wax uppercase">
        How it lands
      </p>
      <h2 className="mt-4 max-w-xl font-serif text-4xl italic leading-tight">
        After they ship something, a stamp. Then one line.
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
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
