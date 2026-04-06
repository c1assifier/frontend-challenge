# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cat Pinterest — a React app for browsing cat images with favorites support, built as a frontend internship challenge. Data comes from [thecatapi.com](https://thecatapi.com). Features: browse cats, add/remove favorites, persist favorites in localStorage.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Type-check + build for production
npm run lint         # Lint (zero warnings allowed)
npm run lint:fix     # Auto-fix lint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting without writing
```

There are no tests configured.

## Architecture

The project follows Feature-Sliced Design (FSD) conventions:

- `src/app/` — app entry point (`App.tsx` composes pages)
- `src/entities/cat/` — cat domain: `types.ts` defines the `Cat` type, `api.ts` fetches from thecatapi
- `src/pages/cats/` — `CatsPage` — the only page, handles fetch state and renders the grid
- `src/main.tsx` — React root mount

**Path alias:** `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig`). Always use `@/` for imports within `src/`.

## Import Order

ESLint enforces strict import ordering (via `eslint-plugin-import`):
1. Node built-ins
2. External packages
3. Internal (`@/**`) — alphabetically sorted
4. Parent/sibling/index

Groups must be separated by blank lines. Run `npm run lint:fix` to auto-fix.
