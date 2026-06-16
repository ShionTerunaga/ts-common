const basic = {
  OPTION_SOME: "some",
  OPTION_NONE: "none",
} as const;

/**
 * Schema for an `Option` that contains a value.
 *
 * Shape: `{ kind: "some"; value: T }`.
 * `kind` is the discriminant for the value-present branch, and `value` stores the payload.
 *
 * @template T Type of the stored `value`.
 */
export interface Some<T> {
  /** Discriminant used to identify the value-present branch. */
  readonly kind: typeof basic.OPTION_SOME;
  /** Stored value. */
  readonly value: T;
}

/**
 * Schema for an `Option` that contains no value.
 *
 * Shape: `{ kind: "none" }`.
 * `kind` is the discriminant for the empty branch.
 */
export interface None {
  /** Discriminant used to identify the empty branch. */
  readonly kind: typeof basic.OPTION_NONE;
}

/**
 * `Option` type for safely representing the presence or absence of a value.
 *
 * @template T Type of the contained value when present. `null` and `undefined` are excluded.
 */
export type Option<T> = Some<NonNullable<T>> | None;

/**
 * Creates an `Option` containing a value.
 *
 * @template T Type of the stored value.
 * @param value Non-nullable value to store.
 * @returns A value-present `Option<T>`.
 */
export function createSome<T>(value: NonNullable<T>): Option<T> {
  return {
    kind: basic.OPTION_SOME,
    value,
  };
}

/**
 * Creates an empty `Option`.
 *
 * @template T Expected value type.
 * @returns An empty `Option<NonNullable<T>>`.
 */
export function createNone<T>(): Option<NonNullable<T>> {
  return {
    kind: basic.OPTION_NONE,
  };
}

/**
 * Type guard that checks whether an `Option` contains a value.
 *
 * @template T Type of the stored value.
 * @param option `Option` value to inspect.
 * @returns `true` when the option contains a value, allowing safe access to `value`.
 */
export function isSome<T>(option: Option<NonNullable<T>>): option is Some<NonNullable<T>> {
  return option.kind === basic.OPTION_SOME;
}

/**
 * Type guard that checks whether an `Option` is empty.
 *
 * @template T Expected value type.
 * @param option `Option` value to inspect.
 * @returns `true` when the option is empty.
 */
export function isNone<T>(option: Option<T>): option is None {
  return option.kind === basic.OPTION_NONE;
}
