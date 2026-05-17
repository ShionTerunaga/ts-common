# ts-shared

Shared TypeScript utilities packaged.

[日本語 README](./README.ja.md)

## Install From GitHub

```bash
npm i github:ShionTerunaga/ts-shared#release
```

Install a fixed version by pinning a Git tag:

```bash
npm i github:ShionTerunaga/ts-shared#v1.1.5
```

## Usage

```ts
import { omitElementObject } from "ts-shared/object";
import { createSome, isSome, optionConversion } from "ts-shared/option";
import { createErr, createOk, isOk } from "ts-shared/result";

const maybeName = optionConversion("Shion");

if (isSome(maybeName)) {
  console.log(maybeName.value);
}

const someUser = createSome({ id: 1, name: "Shion", password: "secret" });

if (isSome(someUser)) {
  const safeUser = omitElementObject(someUser.value, ["password"]);
  console.log(safeUser);
}

function validateUserName(name: string) {
  if (name.length === 0) {
    return createErr(new Error("name is required"));
  }

  return createOk({ name });
}

const saveUser = validateUserName("Shion");

if (isOk(saveUser)) {
  console.log(saveUser.value.name);
} else {
  console.error(saveUser.err);
}
```

Available subpath exports:

- `ts-shared/error`: Base application errors plus reusable HTTP, validation, and scheme-specific error classes.
- `ts-shared/is`: Small type guards such as `isNull` and `isUndefined`.
- `ts-shared/merger`: Utility for merging class name arrays while removing empty values and duplicates.
- `ts-shared/object`: Object helpers such as `omitElementObject` for safely dropping keys from objects.
- `ts-shared/option`: `Option<T>` helpers for representing nullable values as `Some` or `None`.
- `ts-shared/result`: `Result<T, E>` helpers for representing success or failure without throwing.
- `ts-shared/types`: Shared utility types such as `Dict<T>` and stricter omission helpers.

The built files are committed to the `release` branch, so the package can be installed directly from this GitHub repository without running build scripts. For reproducible installs, prefer pinning a release tag such as `#v1.1.5`.

## Development

```bash
vp install
vp check
vp test
vp build
```

## Release Flow

Create a changeset for user-facing changes before opening or merging a PR.

```bash
vp run changeset
```

The `Release PR` workflow opens or updates the Changesets release PR into `main`. When that release PR branch (`changeset-release/main`) is merged into `main`, the `Sync Release` workflow reflects the merged commit to `release`. After `release` is updated, the `Publish Release` workflow rebuilds `dist/`, pushes the built artifacts if needed, and then creates or updates the Git tag and GitHub Release.
Each generated changelog item will also include the source PR and the contributor's GitHub username.
