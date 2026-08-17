# washere

A small agent skill that leaves a note after a win.

Someone who loves a developer fills in a name, a tone, and maybe a joke. He gets a short link, installs it into Cursor, Claude Code, or Codex, and once in a while — after tests pass, after a bug dies — the agent adds:

```
Maya was here.

Thinking of you.
```

The install is a snapshot. The skill never phones home.

## Develop

```bash
npm install
npx convex dev
```

In another terminal:

```bash
npm run dev
```

Copy `NEXT_PUBLIC_CONVEX_URL` from Convex into `.env.local`. See `.env.local.example`.

```bash
npm test
npm run lint
```

## Install paths

- **Cursor:** Add to → Cursor opens a rule deeplink (`https://cursor.com/link/rule`). Always-on, user-level.
- **Claude Code / Codex:** Add to copies a one-liner that writes `SKILL.md` to `~/.claude/skills/washere` or `~/.codex/skills/washere`.

## Product rules

- After a clear win only
- About 1 in 3 wins
- At most once per conversation
- Generated lines, not a notes file
- No accounts
