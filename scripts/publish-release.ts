import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseLatestReleaseNotes } from "./release-notes.ts";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const tempDir = mkdtempSync(join(tmpdir(), "ts-shared-publish-release-"));

const gitUserName = process.env.GIT_USER_NAME ?? "github-actions[bot]";
const gitUserEmail =
  process.env.GIT_USER_EMAIL ?? "41898282+github-actions[bot]@users.noreply.github.com";
const releaseRef = process.env.RELEASE_REF ?? "origin/release";
const publishDir = join(tempDir, "publish");

function run(
  command: string,
  args: string[],
  cwd = repoRoot,
  stdio: "inherit" | "pipe" = "inherit",
) {
  return execFileSync(command, args, { cwd, encoding: "utf8", stdio });
}

function canRun(command: string, args: string[], cwd = repoRoot) {
  try {
    execFileSync(command, args, { cwd, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function cleanup() {
  rmSync(tempDir, { recursive: true, force: true });
}

function hasPublishedVersion(packageName: string, packageVersion: string) {
  try {
    execFileSync("npm", ["view", `${packageName}@${packageVersion}`, "version"], {
      cwd: publishDir,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

const packageJson = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8")) as {
  name: string;
  version: string;
};
const changelog = readFileSync(join(repoRoot, "CHANGELOG.md"), "utf8");
const latestRelease = parseLatestReleaseNotes(changelog);
const packageName = packageJson.name;
const version = packageJson.version;

if (latestRelease.version !== version) {
  console.log(
    `Skipping release publication because package.json version (${version}) does not match the latest CHANGELOG.md section (${latestRelease.version}).`,
  );
  process.exit(0);
}

const tag = `v${version}`;
const notesPath = join(tempDir, "release-notes.md");
const releaseSha = run("git", ["rev-parse", releaseRef], repoRoot, "pipe").trim();

writeFileSync(notesPath, latestRelease.notes);
mkdirSync(publishDir, { recursive: true });
run("git", ["archive", releaseRef, "--format=tar", "-o", join(tempDir, "release.tar")]);
run("tar", ["-xf", join(tempDir, "release.tar"), "-C", publishDir], tempDir);

run("git", ["config", "user.name", gitUserName]);
run("git", ["config", "user.email", gitUserEmail]);

if (hasPublishedVersion(packageName, version)) {
  console.log(`Skipping npm publish because ${packageName}@${version} is already available.`);
} else {
  run("npm", ["publish", "--access", "public"], publishDir);
}

if (canRun("git", ["rev-parse", "--verify", `refs/tags/${tag}`])) {
  const existingTagSha = run("git", ["rev-list", "-n", "1", tag], repoRoot, "pipe").trim();

  if (existingTagSha !== releaseSha) {
    throw new Error(`Tag ${tag} already exists on ${existingTagSha}, expected ${releaseSha}.`);
  }
} else {
  run("git", ["tag", "-a", tag, releaseSha, "-m", tag]);
  run("git", ["push", "origin", tag]);
}

if (canRun("gh", ["release", "view", tag])) {
  run("gh", [
    "release",
    "edit",
    tag,
    "--target",
    releaseSha,
    "--title",
    tag,
    "--notes-file",
    notesPath,
  ]);
} else {
  run("gh", [
    "release",
    "create",
    tag,
    "--target",
    releaseSha,
    "--title",
    tag,
    "--notes-file",
    notesPath,
  ]);
}
