import { mkdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePackEntries } from "./generate-directory-indexes.ts";
import { run } from "./release-context.ts";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");

for (const entry of resolvePackEntries()) {
  const outputPath = join(repoRoot, "dist", relative("src", entry)).replace(/\.ts$/, ".d.ts");

  mkdirSync(dirname(outputPath), { recursive: true });
  run("pnpm", [
    "exec",
    "dts-bundle-generator",
    "--no-banner",
    "--project",
    "tsconfig.build.json",
    "-o",
    outputPath,
    entry,
  ]);
}
