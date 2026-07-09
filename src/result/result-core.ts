const basic = {
    RESULT_OK: "ok",
    RESULT_NG: "ng",
} as const;

/**
 * Schema representing a successful result.
 *
 * Shape: `{ kind: "ok"; value: T }`.
 * `kind` is the discriminant for the success branch, and `value` is the success payload.
 *
 * @template T Type of the success value stored in `value`.
 */
export interface Ok<T> {
    /** Discriminant used to identify the success branch. */
    readonly kind: typeof basic.RESULT_OK;
    /** Value carried by the success branch. */
    readonly value: T;
}

/**
 * Schema representing a failed result.
 *
 * Shape: `{ kind: "ng"; err: E }`.
 * `kind` is the discriminant for the failure branch, and `err` is the failure payload.
 *
 * @template E Type of the error value stored in `err`.
 */
export interface Err<E> {
    /** Discriminant used to identify the failure branch. */
    readonly kind: typeof basic.RESULT_NG;
    /** Error value carried by the failure branch. */
    readonly err: E;
}

/**
 * Result type that holds either a success value or an error value.
 *
 * @template T Type of the success value. `null` and `undefined` are excluded.
 * @template E Type of the error value. `null` and `undefined` are excluded.
 */
export type Result<T, E> = Ok<NonNullable<T>> | Err<NonNullable<E>>;

/**
 * Creates a successful `Result` from a value.
 *
 * @template T Type of the success value.
 * @param value Non-nullable success value to store in the `Result`.
 * @returns A `Result<T, never>` representing success.
 */
export function createOk<T>(value: NonNullable<T>): Result<T, never> {
    return { kind: basic.RESULT_OK, value };
}

/**
 * Creates a failed `Result` from an error value.
 *
 * @template E Type of the error value.
 * @param err Non-nullable error value to store in the `Result`.
 * @returns A `Result<never, E>` representing failure.
 */
export function createErr<E>(err: NonNullable<E>): Result<never, E> {
    return { kind: basic.RESULT_NG, err };
}

/**
 * Type guard that checks whether a `Result` is successful.
 *
 * @template T Type of the success value.
 * @template E Type of the error value.
 * @param result `Result` value to inspect.
 * @returns `true` when the result is successful, allowing safe access to `value`.
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<NonNullable<T>> {
    return result.kind === basic.RESULT_OK;
}

/**
 * Type guard that checks whether a `Result` is failed.
 *
 * @template T Type of the success value.
 * @template E Type of the error value.
 * @param result `Result` value to inspect.
 * @returns `true` when the result is failed, allowing safe access to `err`.
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<NonNullable<E>> {
    return result.kind === basic.RESULT_NG;
}
