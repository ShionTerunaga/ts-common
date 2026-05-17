# ts-shared

TypeScript の共通ユーティリティ集です。

[English README](./README.md)

## GitHub からインストール

```bash
npm i github:ShionTerunaga/ts-shared#release
```

固定バージョンで入れたい場合は、Git タグを指定します。

```bash
npm i github:ShionTerunaga/ts-shared#v1.1.5
```

## 使い方

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

利用できるサブパス export は次のとおりです。

- `ts-shared/error`: アプリケーション共通の `BaseError` と、HTTP・バリデーション・スキーム用の各種エラークラスをまとめています。
- `ts-shared/is`: `isNull` や `isUndefined` などの小さな型ガードを提供します。
- `ts-shared/merger`: class 名の配列を結合し、空文字や重複を取り除くユーティリティです。
- `ts-shared/object`: `omitElementObject` など、オブジェクトを安全に加工するヘルパーを提供します。
- `ts-shared/option`: nullable な値を `Some` / `None` として扱うための `Option<T>` ユーティリティです。
- `ts-shared/result`: 例外を投げずに成功 / 失敗を表現するための `Result<T, E>` ユーティリティです。
- `ts-shared/types`: `Dict<T>` や、より厳密な omit 用の型など、共通で使う型定義をまとめています。

ビルド済みファイルを `release` ブランチに含めているため、ビルドスクリプトを実行せずにこの GitHub リポジトリを直接インストールできます。再現性を重視する場合は、`#v1.1.5` のようにリリースタグを固定して使うのがおすすめです。

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
