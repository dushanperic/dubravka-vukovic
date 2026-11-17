# Dubravka Vuković website

A multilingual, statically generated website for attorney Dubravka Vuković. The site is built with Astro and deployed to GitHub Pages.

## Tech stack

- **Astro** builds the pages as static HTML.
- **TypeScript** is used for shared utilities and browser-side behavior, with Astro's strict TypeScript configuration.
- **Tailwind CSS 4** provides utility styling through the Tailwind Vite plugin; global styles live in `src/styles/global.css`.
- **Vitest** runs unit tests for shared utilities.
- **ESLint** and **Prettier** provide linting and formatting.

The project also declares **GSAP** and **SplitType** as animation-related runtime dependencies.

## Getting started

Use Node.js 22. The current Astro version requires Node.js 22.23.4 or newer.

```sh
npm ci
npm run dev
```

Astro starts a local development server and prints its URL in the terminal.

## Architecture

Astro routes are file-based and live in `src/pages/`. The site has localized routes for English (`en`), Serbian Cyrillic (`sr-Cyrl-RS`), and Serbian Latin (`sr-Latn`), plus the root and 404 pages.

```text
src/
  components/       Shared site chrome, UI, and page views
    views/          Landing, biography, legal areas, contact, and terms content
  config/           Layout, language, event, and transition configuration
  i18n/             Translation dictionaries, URL helpers, and unit tests
  layouts/          Shared document and page layout
  pages/            Localized Astro routes
  scripts/          Navigation, page transitions, and browser behavior
  styles/           Global Tailwind and CSS styles
```

Localized content is maintained in `src/i18n/ui.ts`. The helpers in `src/i18n/utils.ts` resolve the active language, retrieve translations, and add Astro's configured base path to internal URLs. Shared page structure and metadata are provided by `src/layouts/main.astro` and `src/components/BaseHead.astro`.

The site URL and GitHub Pages base path are configured in `astro.config.mjs`. The matching base is set in `vitest.config.ts` so URL helper tests run with the production path.

## Core dependencies

| Package | Purpose |
| --- | --- |
| `astro` | Static site generation and Astro components |
| `tailwindcss` | Utility-first styling |
| `@tailwindcss/vite` | Tailwind CSS 4 integration with Vite |
| `gsap`, `split-type` | Animation and text-splitting libraries declared by the project |
| `typescript` | TypeScript language and compiler |
| `vitest` | Unit test runner |
| `eslint`, `eslint-plugin-astro`, `typescript-eslint` | JavaScript, TypeScript, and Astro linting |
| `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss` | Formatting Astro, TypeScript, and Tailwind classes |

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run Astro and TypeScript diagnostics |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |
| `npm run format` | Format project files with Prettier |
| `npm run format:check` | Check formatting without modifying files |

Before opening a pull request, run the checks that CI uses:

```sh
npm run lint
npm run check
npm test
npm run build
```

## Git hygiene

- Create a focused branch for each change and use a pull request for review.
- Keep commits small and descriptive. Conventional Commit prefixes (for example, `feat:`, `fix:`, `docs:`) are used in recent project history.
- Commit `package-lock.json` whenever dependencies change so CI can reproduce installs with `npm ci`.
- Do not commit generated output (`dist/`), dependencies (`node_modules/`), local environment files, credentials, or machine-specific files. These are excluded by `.gitignore`.
- Run lint, checks, tests, and a production build before merging.

## Deployment

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) deploys the site to GitHub Pages when a commit is pushed to `main`.

The workflow uses Node.js 22 and `npm ci`, then runs ESLint, Astro checks, Vitest, and the Astro production build. It uploads the generated `dist/` directory as a Pages artifact and deploys it to the `github-pages` environment. GitHub Pages must be configured to use GitHub Actions as its build and deployment source.
