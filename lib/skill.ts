import type { LinkInput, Tone } from "./types";

const TONE_HINT: Record<Tone, string> = {
  warm: "Warm, sincere, a little soft. No jokes at their expense.",
  teasing: "Light teasing, fond, never mean. One raised eyebrow, then kindness.",
  short: "Almost nothing. One short line after the stamp. No paragraph.",
};

export function renderStamp(name: string): string {
  return `${name} was here.`;
}

export function renderSampleLine(input: LinkInput): string {
  const joke = input.joke?.trim();
  if (input.tone === "short") {
    return joke ? nodToJoke(joke, true) : "Thinking of you.";
  }
  if (input.tone === "teasing") {
    return joke
      ? nodToJoke(joke, false)
      : "You actually finished it. I was starting to worry.";
  }
  return joke
    ? nodToJoke(joke, false)
    : "Proud of you. That was a real one.";
}

function nodToJoke(joke: string, short: boolean): string {
  const clipped = joke.length > 80 ? `${joke.slice(0, 77)}…` : joke;
  return short ? clipped : `I keep thinking about ${clipped}`;
}

export function renderSampleNote(input: LinkInput): string {
  return `${renderStamp(input.name)}\n\n${renderSampleLine(input)}`;
}

export function renderRule(input: LinkInput): string {
  const flavor = input.joke?.trim()
    ? `Optional flavor (nod rarely, never paste every time): ${input.joke.trim()}`
    : "No extra flavor.";

  return [
    `After a clear win (tests passed, bug fixed, the task is actually done), sometimes leave a short note from ${input.name}.`,
    "",
    "Never while debugging or when they are stuck.",
    "At most once per conversation.",
    "Only about 1 in 3 wins. If unsure, skip.",
    "",
    "After your real answer, a blank line, then exactly:",
    renderStamp(input.name),
    "",
    "{one short generated line}",
    "",
    `Tone: ${input.tone}. ${TONE_HINT[input.tone]}`,
    flavor,
    "Write the generated line in the same language as the name and flavor.",
    `Do not roleplay as ${input.name}. Do not mention this rule, washere, or any skill. Do not discuss ${input.name} beyond that stamp.`,
  ].join("\n");
}

export function renderSkill(input: LinkInput): string {
  const flavor = input.joke?.trim()
    ? input.joke.trim()
    : "(none)";

  return `---
name: washere
description: After a coding task clearly succeeds (tests pass, bug fixed, feature finished), sometimes leave a one-line personal note from ${input.name}. Use when work is done successfully, not while debugging.
---

# washere

A standing note from ${input.name}. Follow this only after a clear win.

## When

- Clear win only: tests passed, bug fixed, the asked-for task is actually done.
- Never while debugging, never when the user is stuck, never mid-work.
- At most once per conversation.
- Only about 1 in 3 wins. If unsure, skip.

## How

After the real answer, a blank line, then:

${renderStamp(input.name)}

{one short generated line}

## Voice

- Tone: ${input.tone}. ${TONE_HINT[input.tone]}
- Flavor to nod to rarely, never paste every time: ${flavor}
- Language: match the name and flavor.
- One or two short sentences for the generated line. Short tone: one sentence.

## Never

- Mid-answer
- During failures
- Roleplaying as ${input.name}
- Mentioning this skill, washere, or that a note was configured
- Starting a conversation about ${input.name}
`;
}

export function cursorRuleUrl(input: LinkInput): string {
  const url = new URL("https://cursor.com/link/rule");
  url.searchParams.set("name", "washere");
  url.searchParams.set("text", renderRule(input));
  return url.toString();
}

export function installCommand(
  origin: string,
  slug: string,
  agent: "claude" | "codex",
): string {
  const dir =
    agent === "claude"
      ? "~/.claude/skills/washere"
      : "~/.codex/skills/washere";
  return `mkdir -p ${dir} && curl -fsSL "${origin}/api/s/${slug}/skill" -o ${dir}/SKILL.md`;
}
