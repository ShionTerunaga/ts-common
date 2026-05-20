export declare function classMerger(classes: ReadonlyArray<string>): string;
export interface BaseErrorOptions {
	cause?: unknown;
	code?: string;
	details?: unknown;
	message?: string;
	name?: string;
}
export declare class BaseError extends Error {
	cause?: unknown;
	code?: string;
	details?: unknown;
	constructor(options?: BaseErrorOptions);
}
export interface HttpErrorOptions extends BaseErrorOptions {
	expose?: boolean;
	status?: number;
	statusText?: string;
}
export declare class BaseHttpError extends BaseError {
	expose: boolean;
	status: number;
	statusText: string;
	constructor(options?: HttpErrorOptions);
}
export declare class UnauthorizedError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class BadRequestError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class PaymentRequiredError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class ForbiddenError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class MethodNotAllowedError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class NotAcceptableError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class ProxyAuthenticationRequiredError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class NotFoundError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class ConflictError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class GoneError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class PreconditionFailedError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class PayloadTooLargeError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class UnsupportedMediaTypeError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class UnprocessableEntityError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class TooManyRequestsError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class TimeoutError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class InternalServerError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class NotImplementedError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class BadGatewayError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class ServiceUnavailableError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export declare class GatewayTimeoutError extends BaseHttpError {
	constructor(options?: HttpErrorOptions);
}
export interface SchemeErrorOptions extends BaseErrorOptions {
	allowedSchemes?: string[];
	receivedScheme?: string;
}
export declare class SchemeError extends BaseError {
	readonly allowedSchemes: string[];
	readonly receivedScheme?: string;
	constructor(options?: SchemeErrorOptions);
}
export interface ValidationIssue {
	message: string;
	path?: string;
}
export interface ValidationErrorOptions extends BaseErrorOptions {
	field?: string;
	issues?: ValidationIssue[];
}
export declare class ValidationError extends BaseError {
	readonly field?: string;
	readonly issues: ValidationIssue[];
	constructor(options?: ValidationErrorOptions);
}
export declare function isNull(value: unknown): value is null;
export declare function isUndefined(value: unknown): value is undefined;
export declare function omitElementObject<T extends object, S extends keyof T>(obj: T, keys: S[]): Omit<T, S>;
declare const basic: {
	readonly OPTION_SOME: "some";
	readonly OPTION_NONE: "none";
};
export interface Some<T> {
	readonly kind: typeof basic.OPTION_SOME;
	readonly isSome: true;
	readonly isNone: false;
	readonly value: T;
}
export interface None {
	readonly kind: typeof basic.OPTION_NONE;
	readonly isSome: false;
	readonly isNone: true;
}
type Option$1<T> = Some<NonNullable<T>> | None;
export declare const optionUtility: Readonly<{
	createSome: <T>(value: NonNullable<T>) => Option$1<T>;
	createNone: () => Option$1<never>;
	optionConversion: <T>(value: T) => Option$1<T>;
}>;
export declare function envParse(env: string | undefined): Option$1<string>;
declare const basic$1: {
	readonly RESULT_OK: "ok";
	readonly RESULT_NG: "ng";
};
export interface OK<T> {
	readonly kind: typeof basic$1.RESULT_OK;
	readonly isOk: true;
	readonly isErr: false;
	readonly value: T;
}
export interface NG<E> {
	readonly kind: typeof basic$1.RESULT_NG;
	readonly isOk: false;
	readonly isErr: true;
	readonly err: E;
}
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
export type Result<T, E> = OK<NonNullable<T>> | NG<NonNullable<E>>;
export declare const resultUtility: Readonly<{
	UNIT: Unit;
	checkResultReturn: <T, E>({ fn, err, finalFn, }: CheckResultReturn<T, E>) => Result<T, E>;
	checkResultVoid: <E>({ fn, err, finalFn, }: CheckResultVoid<E>) => Result<Unit, E>;
	checkPromiseReturn: <T, E>({ fn, err, finalFn, }: CheckPromiseReturn<T, E>) => Promise<Result<T, E>>;
	checkPromiseVoid: <E>({ fn, err, finalFn, }: CheckPromiseVoid<E>) => Promise<Result<Unit, E>>;
	createOk: <T>(value: NonNullable<T>) => Result<T, never>;
	createNg: <E>(err: NonNullable<E>) => Result<never, E>;
}>;
/**
 * 柔軟なオブジェクト
 */
export type Dict<T> = Record<string, T>;
/**
 * Omitよりも厳密に型をチェックする(Omitは余計なプロパティを許容してしまう)
 */
export type Without<T, K extends keyof T> = {
	[P in Exclude<keyof T, K>]: T[P];
} & {
	[P in K]?: never;
};

export {
	Option$1 as Option,
};

export {};
