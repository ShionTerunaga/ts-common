/**
 * Returns a new object with the specified keys omitted.
 *
 * @template T Type of the source object.
 * @template S Type of the keys to remove.
 * @param obj Source object to omit keys from.
 * @param keys List of keys to remove.
 * @returns A new object typed as `Omit<T, S>`.
 */
export declare function omitElementObject<T extends object, S extends keyof T>(obj: T, keys: S[]): Omit<T, S>;

export {};
