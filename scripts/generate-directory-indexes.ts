import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const sourceRoot = path.join(projectRoot, "src");

function getDirectories(directoryPath: string): string[] {
  const childDirectories: string[] = [];

  for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const childPath = path.join(directoryPath, entry.name);
    childDirectories.push(childPath, ...getDirectories(childPath));
  }

  return childDirectories;
}

function toImportPath(entryName: string): string {
  return `./${entryName}`;
}

function createIndexContent(directoryPath: string): string | null {
  const exportTargets: string[] = [];

  for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    if (entry.isDirectory()) {
      const childIndexPath = path.join(directoryPath, entry.name, "index.ts");

      try {
        readFileSync(childIndexPath, "utf8");
        exportTargets.push(toImportPath(entry.name));
      } catch {
        continue;
      }

      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!entry.name.endsWith(".ts") || entry.name.endsWith(".d.ts")) {
      continue;
    }

    if (entry.name === "index.ts") {
      continue;
    }

    exportTargets.push(toImportPath(entry.name.slice(0, -3)));
  }

  if (exportTargets.length === 0) {
    return null;
  }

  const lines = exportTargets
    .sort((left, right) => left.localeCompare(right))
    .map((target) => `export * from "${target}";`);

  return `${lines.join("\n")}\n`;
}

export function generateDirectoryIndexes(): void {
  const directories = getDirectories(sourceRoot).sort(
    (left, right) => right.split(path.sep).length - left.split(path.sep).length,
  );

  for (const directoryPath of directories) {
    const indexPath = path.join(directoryPath, "index.ts");

    try {
      readFileSync(indexPath, "utf8");
      continue;
    } catch {
      const content = createIndexContent(directoryPath);

      if (content === null) {
        continue;
      }

      writeFileSync(indexPath, content, "utf8");
    }
  }
}

export function resolvePackEntries(): string[] {
  const indexEntries = [
    path.join(sourceRoot, "index.ts"),
    ...getDirectories(sourceRoot).map((directoryPath) => path.join(directoryPath, "index.ts")),
  ].filter((entryPath, index, entries) => entries.indexOf(entryPath) === index);

  return indexEntries
    .filter((entryPath) => {
      try {
        readFileSync(entryPath, "utf8");
        return true;
      } catch {
        return false;
      }
    })
    .sort((left, right) => left.localeCompare(right))
    .map((entryPath) => path.relative(projectRoot, entryPath).split(path.sep).join("/"));
}
