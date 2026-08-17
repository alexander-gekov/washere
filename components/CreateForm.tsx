"use client";

import { useState } from "react";
import { createLink } from "@/app/actions";
import { TONES, type Tone } from "@/lib/types";

const TONE_COPY: Record<Tone, string> = {
  warm: "Sincere",
  teasing: "A little sly",
  short: "Almost nothing",
};

export function CreateForm() {
  const [tone, setTone] = useState<Tone>("warm");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const result = await createLink(new FormData(event.currentTarget));
    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <form
      id="create"
      onSubmit={onSubmit}
      className="ide-scrap mx-auto mt-8 w-full max-w-xl p-6 sm:p-8"
    >
      <label className="block font-mono text-[0.7rem] tracking-[0.18em] text-ink-soft uppercase">
        Your name
        <input
          name="name"
          required
          maxLength={40}
          placeholder="Maya"
          className="mt-2 w-full border-b border-line bg-transparent py-2 font-serif text-2xl outline-none placeholder:text-line focus:border-wax"
        />
      </label>

      <fieldset className="mt-8">
        <legend className="font-mono text-[0.7rem] tracking-[0.18em] text-ink-soft uppercase">
          Tone
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {TONES.map((option) => (
            <label
              key={option}
              className={`cursor-pointer border px-2 py-3 text-center ${
                tone === option
                  ? "border-wax bg-wax text-[#f3ead8]"
                  : "border-line hover:border-ink-soft"
              }`}
            >
              <input
                type="radio"
                name="tone"
                value={option}
                checked={tone === option}
                onChange={() => setTone(option)}
                className="sr-only"
              />
              <span className="block font-serif text-lg capitalize">
                {option}
              </span>
              <span className="mt-1 block font-mono text-[0.65rem] tracking-wide opacity-80">
                {TONE_COPY[option]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-8 block font-mono text-[0.7rem] tracking-[0.18em] text-ink-soft uppercase">
        A personal moment or joke
        <span className="ml-2 normal-case tracking-normal opacity-70">
          optional
        </span>
        <textarea
          name="joke"
          maxLength={280}
          rows={3}
          placeholder="the rooftop ramen, or how he always forgets to eat"
          className="mt-2 w-full resize-none border border-line bg-transparent p-3 font-serif text-lg outline-none placeholder:text-line focus:border-wax"
        />
      </label>

      {error ? (
        <p className="mt-4 font-mono text-sm text-wax" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-8 w-full bg-mark py-3 font-mono text-xs tracking-[0.2em] text-on-mark uppercase hover:bg-wax hover:text-[#f3ead8] disabled:opacity-60"
      >
        {pending ? "Sealing…" : "Make the note"}
      </button>
    </form>
  );
}
