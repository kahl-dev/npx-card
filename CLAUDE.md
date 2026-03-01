# kahl-dev

Terminal business card — `npx kahl-dev`

## Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun dev` | Run from source |
| `bun run build` | Bundle to `dist/index.js` |
| `bun lint` | Lint (ESLint with @antfu) |
| `bun lint:fix` | Auto-fix |
| `npm publish` | Publish to npm (bun can't publish) |

## CLI Flags

`--json` structured output | `--setup` show dev setup | `--no-interactive` card only

## Gotchas

- All deps are devDependencies — esbuild bundles everything into a single zero-dep `dist/index.js`
- Shebang injected via esbuild `--banner:js`, not in source
- `prepublishOnly` runs build automatically before `npm publish`
- Conventional commits enforced — commitlint rejects non-conforming messages
