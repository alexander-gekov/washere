"use client";

import { useCallback, useState } from "react";
import { AddToMenu } from "@/components/AddToMenu";
import { Envelope } from "@/components/Envelope";
import { renderSampleNote, renderSkill } from "@/lib/skill";
import type { LinkInput } from "@/lib/types";

export function GiftExperience({
  slug,
  input,
  origin,
  created,
}: {
  slug: string;
  input: LinkInput;
  origin: string;
  created: boolean;
}) {
  const [opened, setOpened] = useState(created);
  const [showFiles, setShowFiles] = useState(false);
  const onOpened = useCallback(() => setOpened(true), []);

  if (created) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <p className="font-mono text-xs tracking-[0.2em] text-wax uppercase">
          Ready to send
        </p>
        <h1 className="mt-3 font-serif text-4xl italic">
          A note from {input.name}.
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Send him the link, or install it on his machine while he is away.
        </p>
        <CopyLink origin={origin} slug={slug} />
        <div className="mt-6">
          <AddToMenu slug={slug} input={input} origin={origin} />
        </div>
        <figure className="ide-scrap mt-10 p-5">
          <figcaption className="font-mono text-[0.7rem] tracking-[0.18em] text-ink-soft uppercase">
            Sample — only you see this
          </figcaption>
          <pre className="mt-4 font-serif text-xl leading-relaxed whitespace-pre-wrap">
            {renderSampleNote(input)}
          </pre>
        </figure>
        <p className="mt-6 text-sm text-ink-soft">
          This is a snapshot. A new joke later means a new link, or he clicks
          Add to again.
        </p>
        <FileToggle
          show={showFiles}
          onToggle={() => setShowFiles((value) => !value)}
          markdown={renderSkill(input)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-xl flex-col items-center justify-center text-center">
      {!opened ? (
        <Envelope name={input.name} onOpened={onOpened} />
      ) : (
        <>
          <p className="font-serif text-3xl leading-snug italic sm:text-4xl">
            {input.name} sent you a small agent skill. After you finish
            something, it may leave a short note.
          </p>
          <div className="mt-10">
            <AddToMenu slug={slug} input={input} origin={origin} />
          </div>
          <FileToggle
            show={showFiles}
            onToggle={() => setShowFiles((value) => !value)}
            markdown={renderSkill(input)}
            warn
          />
        </>
      )}
    </div>
  );
}

function CopyLink({ origin, slug }: { origin: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const href = `${origin}/s/${slug}`;

  return (
    <div className="mt-8 flex flex-col gap-2 sm:flex-row">
      <code className="flex-1 truncate border border-line bg-scrap px-3 py-3 font-mono text-sm">
        {href}
      </code>
      <button
        type="button"
        className="bg-wax px-4 py-3 font-mono text-xs tracking-[0.16em] text-[#f3ead8] uppercase"
        onClick={async () => {
          await navigator.clipboard.writeText(href);
          setCopied(true);
        }}
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

function FileToggle({
  show,
  onToggle,
  markdown,
  warn = false,
}: {
  show: boolean;
  onToggle: () => void;
  markdown: string;
  warn?: boolean;
}) {
  return (
    <div className={`w-full ${warn ? "mt-10" : "mt-8"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="font-mono text-xs tracking-wide text-ink-soft underline decoration-line underline-offset-4"
      >
        {show ? "Hide files" : "Read the files"}
      </button>
      {warn ? (
        <p className="mt-2 text-sm text-ink-soft">
          You can, if you want. It will ruin the surprise.
        </p>
      ) : null}
      {show ? (
        <pre className="ide-scrap mt-4 max-h-[28rem] overflow-auto p-4 text-left font-mono text-xs leading-relaxed">
          {markdown}
        </pre>
      ) : null}
    </div>
  );
}
