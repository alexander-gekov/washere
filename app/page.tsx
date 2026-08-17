import { CreateForm } from "@/components/CreateForm";
import { ExampleNotes } from "@/components/ExampleNotes";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main>
        <section className="mx-auto w-full max-w-5xl px-6 pt-20 sm:pt-28">
          <p className="font-mono text-xs tracking-[0.22em] text-wax uppercase">
            A skill for his agent
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] italic sm:text-7xl">
            Leave a note in his coding agent.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink-soft">
            After he ships something — tests pass, a bug dies — it may leave a
            stamp. Your name. One line. Then it gets out of the way.
          </p>
          <a
            href="#create"
            className="mt-8 inline-block bg-ink px-5 py-3 font-mono text-xs tracking-[0.2em] text-[#f3ead8] uppercase"
          >
            Write one
          </a>
        </section>

        <ExampleNotes />

        <section className="mx-auto mt-20 w-full max-w-5xl px-6">
          <p className="font-mono text-xs tracking-[0.2em] text-wax uppercase">
            How it works
          </p>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "You write the setup",
                d: "Your name, a tone, maybe a private joke. Two minutes.",
              },
              {
                n: "02",
                t: "He installs a skill",
                d: "A short link. Add to Cursor, Claude Code, or Codex. User-level, not in git.",
              },
              {
                n: "03",
                t: "A note after a win",
                d: "About one in three finished tasks. Once per chat. Never mid-debug.",
              },
            ].map((step) => (
              <li key={step.n}>
                <p className="font-mono text-xs text-foil">{step.n}</p>
                <h3 className="mt-2 font-serif text-2xl italic">{step.t}</h3>
                <p className="mt-2 text-ink-soft">{step.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto mt-24 w-full max-w-5xl px-6 pb-8">
          <h2 className="text-center font-serif text-4xl italic">
            Make his note
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-ink-soft">
            No account. The link is a snapshot. The installed skill never
            phones home.
          </p>
          <CreateForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
