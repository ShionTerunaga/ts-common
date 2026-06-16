declare const basic: {
	readonly OPTION_SOME: "some";
	readonly OPTION_NONE: "none";
};
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
type Option$1<T> = Some<NonNullable<T>> | None;
/**
 * Creates an `Option` containing a value.
 *
 * @template T Type of the stored value.
 * @param value Non-nullable value to store.
 * @returns A value-present `Option<T>`.
 */
export declare function createSome<T>(value: NonNullable<T>): Option$1<T>;
/**
 * Creates an empty `Option`.
 *
 * @template T Expected value type.
 * @returns An empty `Option<NonNullable<T>>`.
 */
export declare function createNone<T>(): Option$1<NonNullable<T>>;
/**
 * Type guard that checks whether an `Option` contains a value.
 *
 * @template T Type of the stored value.
 * @param option `Option` value to inspect.
 * @returns `true` when the option contains a value, allowing safe access to `value`.
 */
export declare function isSome<T>(option: Option$1<NonNullable<T>>): option is Some<NonNullable<T>>;
/**
 * Type guard that checks whether an `Option` is empty.
 *
 * @template T Expected value type.
 * @param option `Option` value to inspect.
 * @returns `true` when the option is empty.
 */
export declare function isNone<T>(option: Option$1<T>): option is None;
/**
 * Converts `null` or `undefined` into `None`, and every other value into `Some`.
 *
 * @template T Type of the value being converted.
 * @param value Value to wrap in an `Option`.
 * @returns `None` for `null` or `undefined`, otherwise `Some`.
 */
export declare function optionConversion<T>(value: T): Option$1<T>;

export {
	Option$1 as Option,
};

export {};
