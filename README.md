# 🧩 UI Library

A small monorepo experiment: one shared React component library, `@repo/ui`, used by two Next.js 16 apps that give the same components their own look purely through CSS variables. It tries out shadcn/ui on Base UI primitives, Tailwind CSS 4 theming, and Storybook 10 stories that double as browser tests.

**▶ [Acme Dashboard →](https://ui-library-app-one.vercel.app)** (blue) · **[Bloom Settings →](https://ui-library-app-two.vercel.app)** (violet) — the **Storybook** button in each header opens that app's Storybook.

## What's inside

| Path | What it is |
|---|---|
| `packages/ui` | `@repo/ui`: Button, Badge, Input, Textarea, Label, Checkbox, Switch, RadioGroup, Select, Dialog and Tooltip, plus `cn()`. shadcn's `base-nova` style on [Base UI](https://base-ui.com) primitives, variants with `class-variance-authority`, icons from `lucide-react`. Its own Storybook covers nine of them. |
| `apps/app-one` | **Acme Dashboard**: stat cards, a recent-activity table, quick actions and a "Create project" dialog, with mock data. Blue/indigo palette, 0.625rem radius. |
| `apps/app-two` | **Bloom Studio settings**: profile, appearance, notifications and privacy forms. Violet palette, 1.5rem radius. |

## How it works

1. `@repo/ui` is an npm workspace that exports TypeScript source (`src/index.ts`) and a base `globals.css`. Nothing is built or published: each app depends on `"@repo/ui": "*"` and compiles it through Next.js `transpilePackages`.
2. Components only use semantic Tailwind classes (`bg-primary`, `border-input`, `rounded-lg`, …). Each app's `globals.css` defines the tokens behind them (`--primary`, `--radius`, …) in OKLCH and points Tailwind at the library with `@source`, so the same components pick up that app's palette and corner radius.
3. Each app has its own Storybook that renders the library in its theme. The Vercel build runs `build-storybook` into `public/storybook`, so the Storybook ships with the site at `/storybook`.
4. Stories have `play` functions, and `@storybook/addon-vitest` runs them as tests in headless Chromium via Playwright. The a11y addon reports issues without failing the run (`a11y.test: "todo"`).
5. Three Vercel projects deploy from one repo (one `vercel.json` per workspace); an app skips its rebuild when a commit only touches the other app.

## Run locally

```bash
npm install
npm run dev:app-one         # Acme Dashboard, http://localhost:3001
npm run dev:app-two         # Bloom Settings, http://localhost:3002
npm run storybook           # library Storybook, http://localhost:6006
npm run storybook:app-one   # http://localhost:6007
npm run storybook:app-two   # http://localhost:6008
npm test                    # story tests in every workspace
```

The tests run in a real browser, so install Chromium for Playwright once with `npx playwright install chromium`.

## Status

A learning project, not a package: `@repo/ui` is private and only used inside this repo. The library's own Storybook deployment isn't public; the two app Storybooks are. `packages/ui` still has Storybook's starter examples in `src/stories/` and the create-next-app starter page.
