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

export {};
