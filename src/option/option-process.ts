import { type Option, createNone, createSome } from "./option-core";

/**
 * Converts `null` or `undefined` into `None`, and every other value into `Some`.
 *
 * @template T Type of the value being converted.
 * @param value Value to wrap in an `Option`.
 * @returns `None` for `null` or `undefined`, otherwise `Some`.
 */
export function optionConversion<T>(value: T): Option<T> {
  if (value === null || value === undefined) {
    return createNone();
  }

  return createSome(value);
}
