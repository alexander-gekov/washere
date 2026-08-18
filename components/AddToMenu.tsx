"use client";

import { useState } from "react";
import type { LinkInput } from "@/lib/types";
import { cursorRuleUrl, installCommand } from "@/lib/skill";

type Agent = "cursor" | "claude" | "codex";

export function AddToMenu({
  slug,
  input,
  origin,
}: {
  slug: string;
  input: LinkInput;
  origin: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<Agent | null>(null);

  async function onPick(agent: Exclude<Agent, "cursor">) {
    const command = installCommand(origin, slug, agent);
    await navigator.clipboard.writeText(command);
    setCopied(agent);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-3 bg-mark px-5 py-3 font-mono text-xs tracking-[0.18em] text-on-mark uppercase"
      >
        Add to
        <span aria-hidden className="text-[0.7rem]">
          ▾
        </span>
      </button>
      {open ? (
        <ul className="absolute z-10 mt-2 min-w-full border border-ink bg-scrap font-mono text-sm shadow-[4px_4px_0_var(--ink)]">
          <li>
            <a
              href={cursorRuleUrl(input)}
              className="block w-full px-4 py-2.5 text-left hover:bg-paper-deep"
            >
              Cursor
            </a>
          </li>
          {(
            [
              ["claude", "Claude Code"],
              ["codex", "Codex"],
            ] as const
          ).map(([id, label]) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => void onPick(id)}
                className="block w-full px-4 py-2.5 text-left hover:bg-paper-deep"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {copied ? (
        <p className="mt-3 font-mono text-xs text-ink-soft">
          Command copied for {copied === "claude" ? "Claude Code" : "Codex"}.
          Paste it in a terminal on their machine.
        </p>
      ) : null}
    </div>
  );
}
