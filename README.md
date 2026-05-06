# example-repo

A TypeScript Node.js project.

## Requirements

- Node.js >= 20

## Setup

```bash
npm install
```

## Scripts

- `npm run dev` — run `src/index.ts` directly with `tsx` (no build step).
- `npm run build` — compile TypeScript to `dist/`.
- `npm start` — run the compiled output from `dist/`.
- `npm run typecheck` — type-check without emitting files.
- `npm run clean` — remove the `dist/` folder.

## Project structure

```
.
├── src/
│   └── index.ts
├── dist/              # build output (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```
