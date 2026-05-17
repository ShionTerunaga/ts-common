import { type Option, createNone, createSome } from "./option-core";

export function optionConversion<T>(value: T): Option<T> {
  if (value === null || value === undefined) {
    return createNone();
  }

  return createSome(value);
}
