# ts-utility-kit

Shared TypeScript utilities packaged.

[日本語 README](./README.ja.md)

## Install From npm

```bash
npm i ts-utility-kit
```

Use this when you want to install the latest published version from the npm registry.

## Install From GitHub

```bash
npm i github:ShionTerunaga/ts-utility-kit#release
```

Use this when you want to install directly from the built `release` branch on GitHub.

To pin a specific version, install from a version tag instead of `release`.

```bash
npm i github:ShionTerunaga/ts-utility-kit#v1.5.1
```

## Usage

```ts
import { envParse, optionUtility, resultUtility } from "ts-utility-kit";

const env = envParse(process.env.API_TOKEN);

if (env.isSome) {
  console.log("token exists:", env.value);
}
```

The built files are committed to the `release` branch, so the package can be installed directly from this GitHub repository without running build scripts.
Version tags are created in the `vxx.yy.zz` format, for example `v2.0.0`.

## Included Utilities

All public APIs are exported from the package root.

### `optionUtility` and `envParse`

Use `optionUtility` when you want to represent nullable values as an explicit `Some | None` union.
Use `envParse` when you want to convert `process.env` style values into an `Option<string>`.

```ts
import { envParse, optionUtility } from "ts-utility-kit";

const token = envParse(process.env.API_TOKEN);
const nickname = optionUtility.optionConversion(user.nickname);

if (token.isSome) {
  console.log(token.value);
}

const fallback = nickname.isSome ? nickname.value : "guest";
```

Available helpers:

- `optionUtility.createSome(value)`
- `optionUtility.createNone()`
- `optionUtility.optionConversion(value)`

### `resultUtility`

Use `resultUtility` when you want functions to return `Ok | Err` values instead of throwing directly.

```ts
import { resultUtility } from "ts-utility-kit";

const result = await resultUtility.checkPromiseReturn({
  fn: async () => {
    return await fetchUser();
  },
  err: (error) => {
    return resultUtility.createNg(error);
  },
});

if (result.isOk) {
  console.log(result.value);
} else {
  console.error(result.err);
}
```

Available helpers:

- `resultUtility.createOk(value)`
- `resultUtility.createNg(error)`
- `resultUtility.checkResultReturn({ fn, err, finalFn? })`
- `resultUtility.checkResultVoid({ fn, err, finalFn? })`
- `resultUtility.checkPromiseReturn({ fn, err, finalFn? })`
- `resultUtility.checkPromiseVoid({ fn, err, finalFn? })`
- `resultUtility.UNIT`

### Error classes

Use the custom error classes when you want consistent error names, codes, and metadata.

```ts
import { BadRequestError, SchemeError, ValidationError } from "ts-utility-kit";

throw new ValidationError({
  field: "email",
  issues: [{ path: "email", message: "Invalid format" }],
});

throw new SchemeError({
  allowedSchemes: ["https"],
  receivedScheme: "http",
});

throw new BadRequestError({
  details: { reason: "Missing query parameter" },
});
```

Included error exports:

- `BaseError`
- `BaseHttpError` and HTTP subclasses such as `BadRequestError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`, `TooManyRequestsError`, and `InternalServerError`
- `SchemeError`
- `ValidationError`

### `classMerger`

Use `classMerger` to deduplicate class names while preserving order.

```ts
import { classMerger } from "ts-utility-kit";

const className = classMerger(["button", "", "button", "primary"]);
// "button primary"
```

### `omitElementObject`

Use `omitElementObject` to create a new object without specific keys.

```ts
import { omitElementObject } from "ts-utility-kit";

const user = {
  id: 1,
  name: "Shion",
  password: "secret",
};

const safeUser = omitElementObject(user, ["password"]);
```

### `isNull` and `isUndefined`

Use the type guards when narrowing unknown values.

```ts
import { isNull, isUndefined } from "ts-utility-kit";

function normalize(value: unknown) {
  if (isNull(value) || isUndefined(value)) {
    return "empty";
  }

  return String(value);
}
```

### Utility types

The package also exports these TypeScript-only utility types:

- `Dict<T>`
- `Without<T, K>`

## Development

```bash
pnpm install
pnpm check
pnpm test
pnpm build
```

`pnpm build` bundles the library entrypoint with Rolldown and flattens the public type definitions into `dist/index.d.ts` using `dts-bundle-generator`. Type checking still runs on TypeScript 7 beta (`tsgo`).

## Release Flow

Create a changeset for user-facing changes before opening or merging a PR.

```bash
pnpm changeset
```

The `Release PR` workflow opens or updates the Changesets release PR into `main`. When that release PR branch (`changeset-release/main`) is merged into `main`, the `Sync Release` workflow reflects the merged commit to `release`. After `release` is updated, the `Publish Release` workflow generates release notes from the latest `CHANGELOG.md` entry and then creates or updates the Git tag and GitHub Release.
Each generated changelog item will also include the source PR and the contributor's GitHub username.
