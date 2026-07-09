/**
 * Type guard that checks whether a value is `null`.
 *
 * @param value Value to inspect.
 * @returns `true` only when the value is `null`.
 */
export function isNull(value: unknown): value is null {
    return value === null;
}

/**
 * Type guard that checks whether a value is `undefined`.
 *
 * @param value Value to inspect.
 * @returns `true` only when the value is `undefined`.
 */
export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}
