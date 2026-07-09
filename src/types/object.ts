/**
 * Dictionary type with arbitrary string keys.
 *
 * @template T Type stored in each property.
 */
export type Dict<T> = Record<string, T>;

/**
 * Helper type that expresses omitted properties more strictly than `Omit`.
 *
 * Keys included in `K` are treated as `never`, which helps prevent extra properties
 * from being supplied accidentally.
 *
 * @template T Source object type.
 * @template K Keys to exclude.
 */
export type Without<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
} & {
    [P in K]?: never;
};
