declare const basic: {
	readonly RESULT_OK: "ok";
	readonly RESULT_NG: "ng";
};
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
export declare function createOk<T>(value: NonNullable<T>): Result<T, never>;
/**
 * Creates a failed `Result` from an error value.
 *
 * @template E Type of the error value.
 * @param err Non-nullable error value to store in the `Result`.
 * @returns A `Result<never, E>` representing failure.
 */
export declare function createErr<E>(err: NonNullable<E>): Result<never, E>;
/**
 * Type guard that checks whether a `Result` is successful.
 *
 * @template T Type of the success value.
 * @template E Type of the error value.
 * @param result `Result` value to inspect.
 * @returns `true` when the result is successful, allowing safe access to `value`.
 */
export declare function isOk<T, E>(result: Result<T, E>): result is Ok<NonNullable<T>>;
/**
 * Type guard that checks whether a `Result` is failed.
 *
 * @template T Type of the success value.
 * @template E Type of the error value.
 * @param result `Result` value to inspect.
 * @returns `true` when the result is failed, allowing safe access to `err`.
 */
export declare function isErr<T, E>(result: Result<T, E>): result is Err<NonNullable<E>>;
/**
 * Configuration for wrapping a synchronous function that returns a value into `Result`.
 *
 * Shape: `{ fn, err, finalFn? }`.
 * `fn` executes the main synchronous operation, `err` maps a thrown value into a failed `Result`,
 * and `finalFn` runs in the `finally` phase when provided.
 *
 * @template T Type returned on success.
 * @template E Type returned on failure.
 */
export interface CheckResultReturn<T, E> {
	/** Synchronous function to execute. Must return a non-nullable value. */
	fn: () => NonNullable<T>;
	/** Mapper that converts a thrown value into a failed `Result`. */
	err: (e: unknown) => Result<never, NonNullable<E>>;
	/** Cleanup callback that always runs after execution. */
	finalFn?: () => void;
}
/**
 * Configuration for wrapping a synchronous void function into `Result`.
 *
 * Shape: `{ fn, err, finalFn? }`.
 * `fn` executes the main synchronous operation, `err` maps a thrown value into a failed `Result`,
 * and `finalFn` runs in the `finally` phase when provided.
 *
 * @template E Type returned on failure.
 */
export interface CheckResultVoid<E> {
	/** Synchronous function to execute. */
	fn: () => void;
	/** Mapper that converts a thrown value into a failed `Result`. */
	err: (e: unknown) => Result<never, NonNullable<E>>;
	/** Cleanup callback that always runs after execution. */
	finalFn?: () => void;
}
/**
 * Configuration for wrapping an async function that resolves to a value into `Result`.
 *
 * Shape: `{ fn, err, finalFn? }`.
 * `fn` executes the main async operation, `err` maps a thrown value into a failed `Result`,
 * and `finalFn` runs in the `finally` phase when provided.
 *
 * @template T Type resolved on success.
 * @template E Type returned on failure.
 */
export interface CheckPromiseReturn<T, E> {
	/** Async function to execute. Must resolve to a non-nullable value. */
	fn: () => Promise<NonNullable<T>>;
	/** Mapper that converts a thrown value into a failed `Result`. */
	err: (e: unknown) => Result<never, NonNullable<E>>;
	/** Cleanup callback that always runs after execution. */
	finalFn?: () => void;
}
/**
 * Configuration for wrapping an async void function into `Result`.
 *
 * Shape: `{ fn, err, finalFn? }`.
 * `fn` executes the main async operation, `err` maps a thrown value into a failed `Result`,
 * and `finalFn` runs in the `finally` phase when provided.
 *
 * @template E Type returned on failure.
 */
export interface CheckPromiseVoid<E> {
	/** Async function to execute. */
	fn: () => Promise<void>;
	/** Mapper that converts a thrown value into a failed `Result`. */
	err: (e: unknown) => Result<never, NonNullable<E>>;
	/** Cleanup callback that always runs after execution. */
	finalFn?: () => void;
}
declare const UNIT_SYMBOL: unique symbol;
/**
 * Unit type used to represent a successful operation with no value.
 *
 * Shape: `{ _unit: typeof UNIT_SYMBOL }`.
 * `_unit` is a unique symbol marker used to distinguish this no-value success type.
 */
export interface Unit {
	/** Unique symbol used to identify the `Unit` shape. */
	readonly _unit: typeof UNIT_SYMBOL;
}
/**
 * Shared instance used for successful operations with no return value.
 */
export declare const UNIT: Unit;
/**
 * Executes an async void function and converts its outcome into `Result`.
 *
 * @template E Type of the failure value.
 * @param options Configuration containing the function, error mapper, and cleanup callback.
 * @param options.fn Async function to execute.
 * @param options.err Mapper that converts a thrown value into a failed `Result`.
 * @param options.finalFn Cleanup callback that always runs after execution.
 * @returns A `Promise<Result<Unit, E>>` containing `UNIT` on success or the mapped error on failure.
 */
export declare function checkPromiseVoid<E>({ fn, err, finalFn, }: CheckPromiseVoid<E>): Promise<Result<Unit, E>>;
/**
 * Executes a synchronous function and converts its return value or thrown error into `Result`.
 *
 * @template T Type of the success value.
 * @template E Type of the failure value.
 * @param options Configuration containing the function, error mapper, and cleanup callback.
 * @param options.fn Synchronous function to execute. Must return a non-nullable value.
 * @param options.err Mapper that converts a thrown value into a failed `Result`.
 * @param options.finalFn Cleanup callback that always runs after execution.
 * @returns A `Result<T, E>` containing the return value on success or the mapped error on failure.
 */
export declare function checkResultReturn<T, E>({ fn, err, finalFn, }: CheckResultReturn<T, E>): Result<T, E>;
/**
 * Executes a synchronous void function and converts its outcome into `Result`.
 *
 * @template E Type of the failure value.
 * @param options Configuration containing the function, error mapper, and cleanup callback.
 * @param options.fn Synchronous function to execute.
 * @param options.err Mapper that converts a thrown value into a failed `Result`.
 * @param options.finalFn Cleanup callback that always runs after execution.
 * @returns A `Result<Unit, E>` containing `UNIT` on success or the mapped error on failure.
 */
export declare function checkResultVoid<E>({ fn, err, finalFn, }: CheckResultVoid<E>): Result<Unit, E>;
/**
 * Executes an async function and converts its resolved value or thrown error into `Result`.
 *
 * @template T Type of the success value.
 * @template E Type of the failure value.
 * @param options Configuration containing the function, error mapper, and cleanup callback.
 * @param options.fn Async function to execute. Must resolve to a non-nullable value.
 * @param options.err Mapper that converts a thrown value into a failed `Result`.
 * @param options.finalFn Cleanup callback that always runs after execution.
 * @returns A `Promise<Result<T, E>>` containing the resolved value on success or the mapped error on failure.
 */
export declare function checkPromiseReturn<T, E>({ fn, err, finalFn, }: CheckPromiseReturn<T, E>): Promise<Result<T, E>>;

export {};
