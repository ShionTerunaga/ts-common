import { type Result, createOk } from "./result-core";

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
interface CheckResultReturn<T, E> {
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
interface CheckResultVoid<E> {
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
interface CheckPromiseReturn<T, E> {
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
interface CheckPromiseVoid<E> {
  /** Async function to execute. */
  fn: () => Promise<void>;
  /** Mapper that converts a thrown value into a failed `Result`. */
  err: (e: unknown) => Result<never, NonNullable<E>>;
  /** Cleanup callback that always runs after execution. */
  finalFn?: () => void;
}

const UNIT_SYMBOL = Symbol("UNIT_SYMBOL");

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
export const UNIT: Unit = Object.freeze({
  _unit: UNIT_SYMBOL,
});

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
export async function checkPromiseVoid<E>({
  fn,
  err,
  finalFn = () => {},
}: CheckPromiseVoid<E>): Promise<Result<Unit, E>> {
  try {
    await fn();

    return createOk(UNIT);
  } catch (e) {
    return err(e);
  } finally {
    finalFn();
  }
}

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
export function checkResultReturn<T, E>({
  fn,
  err,
  finalFn = () => {},
}: CheckResultReturn<T, E>): Result<T, E> {
  try {
    const result = fn();

    return createOk(result);
  } catch (e) {
    return err(e);
  } finally {
    finalFn();
  }
}

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
export function checkResultVoid<E>({
  fn,
  err,
  finalFn = () => {},
}: CheckResultVoid<E>): Result<Unit, E> {
  try {
    fn();

    return createOk(UNIT);
  } catch (e) {
    return err(e);
  } finally {
    finalFn();
  }
}

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
export async function checkPromiseReturn<T, E>({
  fn,
  err,
  finalFn = () => {},
}: CheckPromiseReturn<T, E>): Promise<Result<T, E>> {
  try {
    const result = await fn();

    return createOk(result);
  } catch (e) {
    return err(e);
  } finally {
    finalFn();
  }
}
