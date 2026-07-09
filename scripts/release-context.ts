import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseLatestReleaseNotes } from "./release-notes.ts";

const scriptDir = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(scriptDir, "..");
const packageJsonPath = join(repoRoot, "package.json");
const changelogPath = join(repoRoot, "CHANGELOG.md");

export interface ReleaseContext {
    notesPath: string;
    packageName: string;
    publishDir: string;
    releaseSha: string;
    tag: string;
    tempDir: string;
    version: string;
}

export function run(
    command: string,
    args: string[],
    cwd = repoRoot,
    stdio: "inherit" | "pipe" = "inherit",
) {
    return execFileSync(command, args, { cwd, encoding: "utf8", stdio });
}

export function canRun(command: string, args: string[], cwd = repoRoot) {
    try {
        execFileSync(command, args, { cwd, stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

export function hasPublishedVersion(packageName: string, packageVersion: string, cwd: string) {
    try {
        execFileSync("npm", ["view", `${packageName}@${packageVersion}`, "version"], {
            cwd,
            stdio: "ignore",
        });
        return true;
    } catch {
        return false;
    }
}

export function createReleaseContext(releaseRef = process.env.RELEASE_REF ?? "origin/release") {
    const tempDir = mkdtempSync(join(tmpdir(), "ts-utility-kit-release-"));
    const publishDir = join(tempDir, "publish");
    const notesPath = join(tempDir, "release-notes.md");

    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
        name: string;
        version: string;
    };
    const changelog = readFileSync(changelogPath, "utf8");
    const latestRelease = parseLatestReleaseNotes(changelog);

    if (latestRelease.version !== packageJson.version) {
        console.log(
            `Skipping release publication because package.json version (${packageJson.version}) does not match the latest CHANGELOG.md section (${latestRelease.version}).`,
        );
        process.exit(0);
    }

    writeFileSync(notesPath, latestRelease.notes);
    mkdirSync(publishDir, { recursive: true });
    run("git", ["archive", releaseRef, "--format=tar", "-o", join(tempDir, "release.tar")]);
    run("tar", ["-xf", join(tempDir, "release.tar"), "-C", publishDir], tempDir);

    return {
        notesPath,
        packageName: packageJson.name,
        publishDir,
        releaseSha: run("git", ["rev-parse", releaseRef], repoRoot, "pipe").trim(),
        tag: `v${packageJson.version}`,
        tempDir,
        version: packageJson.version,
    } satisfies ReleaseContext;
}

export function registerCleanup(tempDir: string) {
    const cleanup = () => {
        rmSync(tempDir, { recursive: true, force: true });
    };

    process.on("exit", cleanup);
    process.on("SIGINT", () => {
        cleanup();
        process.exit(130);
    });
    process.on("SIGTERM", () => {
        cleanup();
        process.exit(143);
    });
}
