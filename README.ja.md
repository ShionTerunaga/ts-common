# ts-utility-kit

TypeScript の共通ユーティリティを、用途ごとのサブパス module としてまとめたパッケージです。

[English README](./README.md)

## npm registry からインストール

```bash
npm i ts-utility-kit
```

npm registry で公開されている最新版を通常インストールしたい場合はこちらです。

## GitHub からインストール

```bash
npm i github:ShionTerunaga/ts-utility-kit#release
```

GitHub 上のビルド済み `release` ブランチから直接入れたい場合はこちらです。

特定バージョンに固定したい場合は、`release` の代わりにバージョンタグを指定してください。

```bash
npm i github:ShionTerunaga/ts-utility-kit#v1.4.0
```

## import 方法

このパッケージは root ではなく、機能ごとのサブパスから import します。

```ts
import { ValidationError } from "ts-utility-kit/error";
import { omitElementObject } from "ts-utility-kit/object";
import { createSome } from "ts-utility-kit/option";
```

利用できるサブパス export:

- `ts-utility-kit/error`
- `ts-utility-kit/is`
- `ts-utility-kit/merger`
- `ts-utility-kit/object`
- `ts-utility-kit/option`
- `ts-utility-kit/result`
- `ts-utility-kit/types`

## パッケージ別ガイド

### `ts-utility-kit/error`

エラー名、コード、HTTP status、追加メタデータをそろえて扱いたいときに使います。

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

主な export:

- `BaseError`
- `BaseHttpError`
- `BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError`, `PayloadTooLargeError`, `UnsupportedMediaTypeError` などの HTTP エラー
- `SchemeError`
- `ValidationError`

### `ts-utility-kit/is`

nullable な値や `unknown` を絞り込みたいときの小さな型ガードです。

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

class 名の配列を結合し、空文字や重複を除きたいときに使います。

```ts
import { classMerger } from "ts-utility-kit/merger";

const className = classMerger(["button", "", "button", "primary"]);
// "button primary"
```

### `ts-utility-kit/object`

object から特定のキーを除いた新しい値を作りたいときに使います。

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

nullable な値を `Some` / `None` として明示的に扱いたいときに使います。

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

主な export:

- `Option<T>`
- `createSome(value)`
- `createNone()`
- `isSome(option)`
- `isNone(option)`
- `optionConversion(value)`

### `ts-utility-kit/result`

例外をそのまま投げる代わりに、成功と失敗を `Result<T, E>` として返したいときに使います。

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

主な export:

- `Result<T, E>`
- `createOk(value)`
- `createErr(error)`
- `isOk(result)`
- `isErr(result)`
- `UNIT` と `Unit`
- `checkResultReturn({ fn, err, finalFn? })`
- `checkResultVoid({ fn, err, finalFn? })`
- `checkPromiseReturn({ fn, err, finalFn? })`
- `checkPromiseVoid({ fn, err, finalFn? })`

### `ts-utility-kit/types`

実行時コードではなく、共通の TypeScript utility type だけ使いたいときに向いています。

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

主な export:

- `Dict<T>`
- `Without<T, K>`

ビルド済みファイルを `release` ブランチに含めているため、ビルドスクリプトを実行せずにこの GitHub リポジトリを直接インストールできます。
