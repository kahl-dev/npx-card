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

`--json` structured output | `--setup` show dev setup | `--no-interactive` card only | `--help` usage info

## Gotchas

- All deps are devDependencies — esbuild bundles everything into a single zero-dep `dist/index.js`
- Banner injects shebang + `createRequire` shim — needed because @inquirer/select has CJS deps that `require("stream")`
- `bun build` ≠ `bun run build` — the former is bun's bundler, the latter runs our esbuild script
- `prepublishOnly` runs build automatically before `npm publish`
- Conventional commits enforced — commitlint rejects non-conforming messages
