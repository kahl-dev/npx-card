# kahl-dev

Terminal business card — `npx kahl-dev`

```
╭───────────────────────────────────────────╮
│                                           │
│   Patrick Kahl / kahl-dev                 │
│   Senior Fullstack Developer              │
│   @ LOUIS INTERNET                        │
│                                           │
│   GitHub    github.com/kahl-dev           │
│   Web       kahl.dev                      │
│   CodePen   codepen.io/kahl-dev           │
│                                           │
│   Terminal-native. Writing code           │
│      since 2002. Catppuccin everywhere.   │
│                                           │
│              Card:  npx kahl-dev          │
│                                           │
╰───────────────────────────────────────────╯
```

## Install

```bash
npx kahl-dev
```

No install needed. Runs instantly — zero runtime dependencies.

## Usage

```bash
npx kahl-dev              # Card + interactive menu
npx kahl-dev --setup      # Card + dev setup info
npx kahl-dev --json       # Structured JSON output
npx kahl-dev --no-interactive  # Card only, no menu
npx kahl-dev --help       # Usage info
```

Links are clickable in terminals that support [OSC 8 hyperlinks](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda) (Ghostty, iTerm2, Windows Terminal, etc.).

## How It Works

Single TypeScript file, bundled to one zero-dep JS file with esbuild. All dependencies are dev-only — the published package ships a single `dist/index.js` with no `node_modules`.

Catppuccin Mocha palette. Responsive layout (compact fallback for narrow terminals).

## License

MIT © 2026 [Patrick Kahl](https://kahl.dev)
