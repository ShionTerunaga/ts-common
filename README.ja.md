# ts-shared

TypeScript の共通ユーティリティ集です。

[English README](./README.md)

## GitHub からインストール

```bash
npm i github:ShionTerunaga/ts-shared#release
```

特定バージョンに固定したい場合は、`release` の代わりにバージョンタグを指定してください。

```bash
npm i github:ShionTerunaga/ts-shared#v1.5.1
```

## 使い方

```ts
import { envParse, optionUtility, resultUtility } from "ts-shared";

const env = envParse(process.env.API_TOKEN);

if (env.isSome) {
  console.log("token exists:", env.value);
}
```

ビルド済みファイルを `release` ブランチに含めているため、ビルドスクリプトを実行せずにこの GitHub リポジトリを直接インストールできます。
バージョンタグは `vxx.yy.zz` 形式で作成しており、例えば `v2.0.0` のようになります。

## 含まれているユーティリティ

公開 API はすべてパッケージのルートから import できます。

### `optionUtility` と `envParse`

`optionUtility` は、nullable な値を明示的な `Some | None` の union として扱いたいときに使います。
`envParse` は、`process.env` のような値を `Option<string>` に変換したいときに使います。

```ts
import { envParse, optionUtility } from "ts-shared";

const token = envParse(process.env.API_TOKEN);
const nickname = optionUtility.optionConversion(user.nickname);

if (token.isSome) {
  console.log(token.value);
}

const fallback = nickname.isSome ? nickname.value : "guest";
```

利用できる helper:

- `optionUtility.createSome(value)`
- `optionUtility.createNone()`
- `optionUtility.optionConversion(value)`

### `resultUtility`

`resultUtility` は、例外をそのまま投げる代わりに `Ok | Err` を返したいときに使います。

```ts
import { resultUtility } from "ts-shared";

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

利用できる helper:

- `resultUtility.createOk(value)`
- `resultUtility.createNg(error)`
- `resultUtility.checkResultReturn({ fn, err, finalFn? })`
- `resultUtility.checkResultVoid({ fn, err, finalFn? })`
- `resultUtility.checkPromiseReturn({ fn, err, finalFn? })`
- `resultUtility.checkPromiseVoid({ fn, err, finalFn? })`
- `resultUtility.UNIT`

### エラークラス

独自のエラー名、コード、メタデータをそろえて扱いたいときは、用意されているエラークラスを使います。

```ts
import { BadRequestError, SchemeError, ValidationError } from "ts-shared";

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

含まれるエクスポート:

- `BaseError`
- `BaseHttpError` と、`BadRequestError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`, `TooManyRequestsError`, `InternalServerError` などの HTTP エラー
- `SchemeError`
- `ValidationError`

### `classMerger`

`classMerger` は、順序を保ったまま class 名の重複を除きたいときに使います。

```ts
import { classMerger } from "ts-shared";

const className = classMerger(["button", "", "button", "primary"]);
// "button primary"
```

### `omitElementObject`

`omitElementObject` は、特定のキーを除いた新しい object を作りたいときに使います。

```ts
import { omitElementObject } from "ts-shared";

const user = {
  id: 1,
  name: "Shion",
  password: "secret",
};

const safeUser = omitElementObject(user, ["password"]);
```

### `isNull` と `isUndefined`

これらの type guard は、`unknown` な値を絞り込みたいときに使います。

```ts
import { isNull, isUndefined } from "ts-shared";

function normalize(value: unknown) {
  if (isNull(value) || isUndefined(value)) {
    return "empty";
  }

  return String(value);
}
```

### ユーティリティ型

TypeScript 専用の utility type も export しています。

- `Dict<T>`
- `Without<T, K>`

## 開発

```bash
vp install
vp check
vp test
vp build
```

## リリースフロー

ユーザー向けの変更を含む PR では、事前に changeset を作成してください。

```bash
vp run changeset
```

`Release PR` workflow が Changesets の release PR を `main` 向けに自動で作成または更新します。その release PR ブランチ (`changeset-release/main`) が `main` にマージされると、`Sync Release` workflow がそのコミットを `release` に反映します。`release` 更新後は `Publish Release` workflow が `dist/` の再ビルド、必要な配布ファイルの push、タグ作成、GitHub Release の作成または更新まで自動で実行します。
生成される changelog の各項目には、元 PR へのリンクとコントリビュータの GitHub ユーザー名も含まれます。
