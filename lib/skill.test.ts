import assert from "node:assert/strict";
import test from "node:test";
import {
  cursorRuleUrl,
  installCommand,
  renderRule,
  renderSampleNote,
  renderSkill,
  renderStamp,
} from "./skill";

test("stamp and sample stay third-person", () => {
  const input = { name: "Maya", tone: "warm" as const };
  assert.equal(renderStamp(input.name), "Maya was here.");
  const sample = renderSampleNote(input);
  assert.match(sample, /^Maya was here\.\n\n/);
  assert.doesNotMatch(sample, /P\.S\. from Maya/);
});

test("skill and rule include the win rules", () => {
  const input = {
    name: "Maya",
    tone: "teasing" as const,
    joke: "the rooftop ramen",
  };
  const skill = renderSkill(input);
  const rule = renderRule(input);
  for (const text of [skill, rule]) {
    assert.match(text, /1 in 3/);
    assert.match(text, /once per conversation/);
    assert.match(text, /Maya was here\./);
    assert.match(text, /rooftop ramen/);
    assert.match(text, /[Rr]oleplay(ing)? as Maya/);
  }
});

test("install helpers point at user-level paths", () => {
  const cmd = installCommand("https://washere.dev", "x7k2m9q", "claude");
  assert.match(cmd, /~\/\.claude\/skills\/washere/);
  assert.match(cmd, /\/api\/s\/x7k2m9q\/skill/);
  const url = cursorRuleUrl({ name: "Maya", tone: "short" });
  assert.match(url, /^https:\/\/cursor\.com\/link\/rule/);
  assert.match(url, /washere/);
});
