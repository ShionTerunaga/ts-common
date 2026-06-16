/**
 * Common options for constructing a `BaseError`.
 *
 * Shape: `{ cause?, code?, details?, message?, name? }`.
 * `cause` stores the underlying reason, `code` is an application-level identifier, `details`
 * carries arbitrary metadata, and `message` / `name` override the base `Error` fields.
 */
export interface BaseErrorOptions {
	/** Underlying cause of the error. */
	cause?: unknown;
	/** Application-specific error code. */
	code?: string;
	/** Optional structured details attached to the error. */
	details?: unknown;
	/** Message assigned to `Error.message`. */
	message?: string;
	/** Name assigned to `Error.name`. */
	name?: string;
}
/**
 * Base error that can carry `cause`, `code`, and `details`.
 */
export declare class BaseError extends Error {
	cause?: unknown;
	code?: string;
	details?: unknown;
	/**
	 * Creates a `BaseError` instance.
	 *
	 * @param options Configuration for the message, code, cause, and extra details.
	 */
	constructor(options?: BaseErrorOptions);
}
/**
 * Options for constructing HTTP-related errors.
 *
 * Shape: `{ ...BaseErrorOptions, expose?, status?, statusText? }`.
 * `expose` controls whether the message is safe for clients, `status` stores the HTTP status code,
 * and `statusText` stores the associated reason phrase.
 */
export interface HttpErrorOptions extends BaseErrorOptions {
	/** Whether the error message can be safely exposed to clients. */
	expose?: boolean;
	/** HTTP status code. */
	status?: number;
	/** Text description associated with the HTTP status. */
	statusText?: string;
}
/**
 * Base error that includes HTTP status metadata.
 */
export declare class BaseHttpError extends BaseError {
	expose: boolean;
	status: number;
	statusText: string;
	/**
	 * Creates a `BaseHttpError` instance.
	 *
	 * @param options Configuration including HTTP status and exposure settings.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 401 Unauthorized. */
export declare class UnauthorizedError extends BaseHttpError {
	/**
	 * Creates an `UnauthorizedError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 400 Bad Request. */
export declare class BadRequestError extends BaseHttpError {
	/**
	 * Creates a `BadRequestError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 402 Payment Required. */
export declare class PaymentRequiredError extends BaseHttpError {
	/**
	 * Creates a `PaymentRequiredError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 403 Forbidden. */
export declare class ForbiddenError extends BaseHttpError {
	/**
	 * Creates a `ForbiddenError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 405 Method Not Allowed. */
export declare class MethodNotAllowedError extends BaseHttpError {
	/**
	 * Creates a `MethodNotAllowedError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 406 Not Acceptable. */
export declare class NotAcceptableError extends BaseHttpError {
	/**
	 * Creates a `NotAcceptableError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 407 Proxy Authentication Required. */
export declare class ProxyAuthenticationRequiredError extends BaseHttpError {
	/**
	 * Creates a `ProxyAuthenticationRequiredError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 404 Not Found. */
export declare class NotFoundError extends BaseHttpError {
	/**
	 * Creates a `NotFoundError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 409 Conflict. */
export declare class ConflictError extends BaseHttpError {
	/**
	 * Creates a `ConflictError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 410 Gone. */
export declare class GoneError extends BaseHttpError {
	/**
	 * Creates a `GoneError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 412 Precondition Failed. */
export declare class PreconditionFailedError extends BaseHttpError {
	/**
	 * Creates a `PreconditionFailedError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 413 Payload Too Large. */
export declare class PayloadTooLargeError extends BaseHttpError {
	/**
	 * Creates a `PayloadTooLargeError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/** Error representing HTTP 415 Unsupported Media Type. */
export declare class UnsupportedMediaTypeError extends BaseHttpError {
	/**
	 * Creates an `UnsupportedMediaTypeError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
export declare class UnprocessableEntityError extends BaseHttpError {
	/**
	 * Creates an `UnprocessableEntityError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
export declare class TooManyRequestsError extends BaseHttpError {
	/**
	 * Creates a `TooManyRequestsError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
export declare class TimeoutError extends BaseHttpError {
	/**
	 * Creates a `TimeoutError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
export declare class InternalServerError extends BaseHttpError {
	/**
	 * Creates an `InternalServerError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
export declare class NotImplementedError extends BaseHttpError {
	/**
	 * Creates a `NotImplementedError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
export declare class BadGatewayError extends BaseHttpError {
	/**
	 * Creates a `BadGatewayError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
export declare class ServiceUnavailableError extends BaseHttpError {
	/**
	 * Creates a `ServiceUnavailableError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
export declare class GatewayTimeoutError extends BaseHttpError {
	/**
	 * Creates a `GatewayTimeoutError` with default HTTP metadata.
	 *
	 * @param options Optional overrides for the default HTTP error fields.
	 */
	constructor(options?: HttpErrorOptions);
}
/**
 * Options for constructing a `SchemeError`.
 *
 * Shape: `{ ...BaseErrorOptions, allowedSchemes?, receivedScheme? }`.
 * `allowedSchemes` lists the accepted scheme values, and `receivedScheme` stores the actual input.
 */
export interface SchemeErrorOptions extends BaseErrorOptions {
	/** List of allowed schemes. */
	allowedSchemes?: string[];
	/** Scheme that was actually received. */
	receivedScheme?: string;
}
/**
 * Error used when a URL or identifier scheme does not match expectations.
 */
export declare class SchemeError extends BaseError {
	readonly allowedSchemes: string[];
	readonly receivedScheme?: string;
	/**
	 * Creates a `SchemeError` instance.
	 *
	 * @param options Configuration including the allowed and received schemes.
	 */
	constructor(options?: SchemeErrorOptions);
}
/**
 * Schema describing a single validation issue.
 *
 * Shape: `{ message: string; path?: string }`.
 * `message` describes the issue, and `path` points to the field or nested location when available.
 */
export interface ValidationIssue {
	/** Message describing the validation issue. */
	message: string;
	/** Field or path where the issue occurred. */
	path?: string;
}
/**
 * Options for constructing a `ValidationError`.
 *
 * Shape: `{ ...BaseErrorOptions, field?, issues? }`.
 * `field` identifies the primary failing field, and `issues` stores the detailed validation entries.
 */
export interface ValidationErrorOptions extends BaseErrorOptions {
	/** Primary field associated with the validation failure. */
	field?: string;
	/** List of individual validation issues. */
	issues?: ValidationIssue[];
}
/**
 * Error representing a failed validation of input or structure.
 */
export declare class ValidationError extends BaseError {
	readonly field?: string;
	readonly issues: ValidationIssue[];
	/**
	 * Creates a `ValidationError` instance.
	 *
	 * @param options Configuration including the field name and issue list.
	 */
	constructor(options?: ValidationErrorOptions);
}

export {};
