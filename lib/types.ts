export const TONES = ["warm", "teasing", "short"] as const;

export type Tone = (typeof TONES)[number];

export type LinkInput = {
  name: string;
  tone: Tone;
  joke?: string;
};

export function isTone(value: string): value is Tone {
  return (TONES as readonly string[]).includes(value);
}
