import { createReleaseContext, canRun, registerCleanup, repoRoot, run } from "./release-context.ts";

const gitUserName = process.env.GIT_USER_NAME ?? "github-actions[bot]";
const gitUserEmail =
  process.env.GIT_USER_EMAIL ?? "41898282+github-actions[bot]@users.noreply.github.com";

const release = createReleaseContext();

registerCleanup(release.tempDir);

run("git", ["config", "user.name", gitUserName]);
run("git", ["config", "user.email", gitUserEmail]);

if (canRun("git", ["rev-parse", "--verify", `refs/tags/${release.tag}`])) {
  const existingTagSha = run("git", ["rev-list", "-n", "1", release.tag], repoRoot, "pipe").trim();

  if (existingTagSha !== release.releaseSha) {
    throw new Error(
      `Tag ${release.tag} already exists on ${existingTagSha}, expected ${release.releaseSha}.`,
    );
  }
} else {
  run("git", ["tag", "-a", release.tag, release.releaseSha, "-m", release.tag]);
  run("git", ["push", "origin", release.tag]);
}

if (canRun("gh", ["release", "view", release.tag])) {
  run("gh", [
    "release",
    "edit",
    release.tag,
    "--target",
    release.releaseSha,
    "--title",
    release.tag,
    "--notes-file",
    release.notesPath,
  ]);
} else {
  run("gh", [
    "release",
    "create",
    release.tag,
    "--target",
    release.releaseSha,
    "--title",
    release.tag,
    "--notes-file",
    release.notesPath,
  ]);
}
