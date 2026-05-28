# ts-utility-kit

Shared TypeScript utilities packaged as focused subpath modules.

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
npm i github:ShionTerunaga/ts-utility-kit#v1.4.0
```

## Import Style

This package exposes subpath modules. Import from the feature you need.

```ts
import { ValidationError } from "ts-utility-kit/error";
import { omitElementObject } from "ts-utility-kit/object";
import { createSome } from "ts-utility-kit/option";
```

Available subpath exports:

- `ts-utility-kit/error`
- `ts-utility-kit/is`
- `ts-utility-kit/merger`
- `ts-utility-kit/object`
- `ts-utility-kit/option`
- `ts-utility-kit/result`
- `ts-utility-kit/types`

## Package Guide

### `ts-utility-kit/error`

Use this when you want application errors with consistent names, codes, status values, or metadata.

```ts
import {
  BadRequestError,
  NotFoundError,
  SchemeError,
  ValidationError,
} from "ts-utility-kit/error";

throw new ValidationError({
  field: "email",
  issues: [{ path: "email", message: "Invalid format" }],
});

throw new SchemeError({
  allowedSchemes: ["https"],
  receivedScheme: "http",
});

throw new NotFoundError({
  details: { resource: "user", id: "42" },
});
```

Included exports:

- `BaseError`
- `BaseHttpError`
- HTTP error classes such as `BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError`, `PayloadTooLargeError`, and `UnsupportedMediaTypeError`
- `SchemeError`
- `ValidationError`

### `ts-utility-kit/is`

Use these small type guards when narrowing nullable values.

```ts
import { isNull, isUndefined } from "ts-utility-kit/is";

function normalize(value: unknown) {
  if (isNull(value) || isUndefined(value)) {
    return "empty";
  }

  return String(value);
}
```

### `ts-utility-kit/merger`

Use this when you want to merge class name arrays while removing empty entries and duplicates.

```ts
import { classMerger } from "ts-utility-kit/merger";

const className = classMerger(["button", "", "button", "primary"]);
// "button primary"
```

### `ts-utility-kit/object`

Use this when you want to copy an object without specific keys.

```ts
import { omitElementObject } from "ts-utility-kit/object";

const user = {
  id: 1,
  name: "Shion",
  password: "secret",
};

const safeUser = omitElementObject(user, ["password"]);
```

### `ts-utility-kit/option`

Use this when you want to represent nullable values explicitly as `Some` or `None`.

```ts
import {
  createNone,
  createSome,
  isNone,
  isSome,
  optionConversion,
} from "ts-utility-kit/option";

const token = optionConversion(process.env.API_TOKEN);

if (isSome(token)) {
  console.log(token.value);
}

const fallback = isNone(token) ? "guest" : token.value;
const fixed = createSome("ready");
const empty = createNone<string>();
```

Included exports:

- `Option<T>`
- `createSome(value)`
- `createNone()`
- `isSome(option)`
- `isNone(option)`
- `optionConversion(value)`

### `ts-utility-kit/result`

Use this when you want functions to return `Result<T, E>` instead of throwing directly.

```ts
import {
  UNIT,
  checkPromiseReturn,
  createErr,
  createOk,
  isErr,
  isOk,
} from "ts-utility-kit/result";

const result = await checkPromiseReturn({
  fn: async () => fetchUser(),
  err: (error) => createErr(error),
});

if (isOk(result)) {
  console.log(result.value);
}

if (isErr(result)) {
  console.error(result.err);
}

const done = createOk(UNIT);
```

Included exports:

- `Result<T, E>`
- `createOk(value)`
- `createErr(error)`
- `isOk(result)`
- `isErr(result)`
- `UNIT` and `Unit`
- `checkResultReturn({ fn, err, finalFn? })`
- `checkResultVoid({ fn, err, finalFn? })`
- `checkPromiseReturn({ fn, err, finalFn? })`
- `checkPromiseVoid({ fn, err, finalFn? })`

### `ts-utility-kit/types`

Use this when you only need shared TypeScript utility types.

```ts
import type { Dict, Without } from "ts-utility-kit/types";

interface User {
  id: string;
  name: string;
  password: string;
}

type PublicUser = Without<User, "password">;
type UserMap = Dict<PublicUser>;
```

Included exports:

- `Dict<T>`
- `Without<T, K>`

The built files are committed to the `release` branch, so the package can be installed directly from this GitHub repository without running build scripts.
