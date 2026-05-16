const basic = {
  OPTION_SOME: "some",
  OPTION_NONE: "none",
} as const;

interface Some<T> {
  readonly kind: typeof basic.OPTION_SOME;
  readonly value: T;
}

interface None {
  readonly kind: typeof basic.OPTION_NONE;
}

export type Option<T> = Some<NonNullable<T>> | None;

export function createSome<T>(value: NonNullable<T>): Option<T> {
  return {
    kind: basic.OPTION_SOME,
    value,
  };
}

export function createNone<T>(): Option<NonNullable<T>> {
  return {
    kind: basic.OPTION_NONE,
  };
}

export function isSome<T>(option: Option<NonNullable<T>>): option is Some<NonNullable<T>> {
  return option.kind === basic.OPTION_SOME;
}

export function isNone<T>(option: Option<T>): option is None {
  return option.kind === basic.OPTION_NONE;
}
