import type { Tone } from "./types";

export const HOMEPAGE_EXAMPLES: {
  tone: Tone;
  label: string;
  win: string;
  note: string;
}[] = [
  {
    tone: "warm",
    label: "Warm",
    win: "tests passed · 47/47",
    note: "Alex was here.\n\nProud of you. That was a real one.",
  },
  {
    tone: "teasing",
    label: "Teasing",
    win: "bug closed · checkout race",
    note: "Alex was here.\n\nYou actually finished it. I was starting to worry.",
  },
  {
    tone: "short",
    label: "Short",
    win: "shipped · one-line fix",
    note: "Alex was here.\n\nThinking of you.",
  },
];
