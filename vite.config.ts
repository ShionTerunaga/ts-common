import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite-plus";
import {
  generateDirectoryIndexes,
  resolvePackEntries,
} from "./scripts/generate-directory-indexes.ts";

if (process.argv.includes("pack")) {
  generateDirectoryIndexes();
}

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "ts-utility-kit": fileURLToPath(new URL("./src/index.ts", import.meta.url)),
    },
  },
  pack: {
    entry: resolvePackEntries(),
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {},
});
