declare const basic: {
	readonly RESULT_OK: "ok";
	readonly RESULT_NG: "ng";
};
export interface OK<T> {
	readonly kind: typeof basic.RESULT_OK;
	readonly value: T;
}
export interface Err<E> {
	readonly kind: typeof basic.RESULT_NG;
	readonly err: E;
}
export type Result<T, E> = OK<NonNullable<T>> | Err<NonNullable<E>>;
export declare function createOk<T>(value: NonNullable<T>): Result<T, never>;
export declare function createErr<E>(err: NonNullable<E>): Result<never, E>;
export declare function isOk<T, E>(result: Result<T, E>): result is OK<NonNullable<T>>;
export declare function isErr<T, E>(result: Result<T, E>): result is Err<NonNullable<E>>;
export interface CheckResultReturn<T, E> {
	fn: () => NonNullable<T>;
	err: (e: unknown) => Result<never, NonNullable<E>>;
	finalFn?: () => void;
}
export interface CheckResultVoid<E> {
	fn: () => void;
	err: (e: unknown) => Result<never, NonNullable<E>>;
	finalFn?: () => void;
}
export interface CheckPromiseReturn<T, E> {
	fn: () => Promise<NonNullable<T>>;
	err: (e: unknown) => Result<never, NonNullable<E>>;
	finalFn?: () => void;
}
export interface CheckPromiseVoid<E> {
	fn: () => Promise<void>;
	err: (e: unknown) => Result<never, NonNullable<E>>;
	finalFn?: () => void;
}
declare const UNIT_SYMBOL: unique symbol;
export interface Unit {
	readonly _unit: typeof UNIT_SYMBOL;
}
export declare const UNIT: Unit;
export declare function checkPromiseVoid<E>({ fn, err, finalFn, }: CheckPromiseVoid<E>): Promise<Result<Unit, E>>;
export declare function checkResultReturn<T, E>({ fn, err, finalFn, }: CheckResultReturn<T, E>): Result<T, E>;
export declare function checkResultVoid<E>({ fn, err, finalFn, }: CheckResultVoid<E>): Result<Unit, E>;
export declare function checkPromiseReturn<T, E>({ fn, err, finalFn, }: CheckPromiseReturn<T, E>): Promise<Result<T, E>>;

export {};
