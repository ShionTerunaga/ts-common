# TypeScript Tooling

This project no longer uses Vite+. Use the local package scripts through `pnpm`.

## Workflow

- `pnpm install` - install dependencies
- `pnpm build` - bundle `src/index.ts` into `dist/index.js` with `rolldown` and flatten declarations into `dist/index.d.ts` with `dts-bundle-generator`; type checking still uses TypeScript 7 beta via `tsgo`
- `pnpm typecheck` - run TypeScript checks without emitting files
- `pnpm lint` - run `oxlint`
- `pnpm lint:fix` - auto-fix what `oxlint` can fix
- `pnpm format` - check formatting with `oxfmt`
- `pnpm format:write` - write formatting changes with `oxfmt`
- `pnpm test` - run tests with `vitest`
- `pnpm check` - run formatter, linter, and type checking together

## Notes

- TypeScript 7 beta is currently provided by `@typescript/native-preview`, so the compiler entry point is `tsgo` instead of `tsc`.
- Library source files in `src/` should use Node ESM-compatible relative imports such as `./file.js` so the emitted output runs correctly.
- Release scripts under `scripts/` still run directly from `.ts` files via `node --experimental-strip-types`, so those imports should keep their `.ts` extensions where needed.

## Review Checklist for Agents

- [ ] Run `pnpm install` after pulling remote changes and before getting started.
- [ ] Run `pnpm check` and `pnpm test` to validate changes.
