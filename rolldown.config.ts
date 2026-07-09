import { globSync } from "node:fs";
import { relative } from "node:path";
import { defineConfig } from "rolldown";

const input = Object.fromEntries(
    globSync("src/**/index.ts")
        .sort()
        .map((file) => [relative("src", file).replace(/\.ts$/, ""), file]),
);

export default defineConfig({
    input,
    output: {
        dir: "./dist",
        entryFileNames: "[name].js",
        format: "esm",
        sourcemap: false,
    },
    external: [],
    treeshake: true,
});
