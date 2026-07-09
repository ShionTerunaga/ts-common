import { BaseError, type BaseErrorOptions } from "./base-error";

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
export class BaseHttpError extends BaseError {
    expose: boolean;
    status: number;
    statusText: string;

    /**
     * Creates a `BaseHttpError` instance.
     *
     * @param options Configuration including HTTP status and exposure settings.
     */
    constructor(options: HttpErrorOptions = {}) {
        const {
            cause,
            code,
            details,
            expose,
            message,
            name = "BaseHttpError",
            status,
            statusText,
        } = options;

        super({
            cause,
            code,
            details,
            message,
            name,
        });

        this.expose = expose ?? false;
        this.status = status ?? 500;
        this.statusText = statusText ?? "Internal Server Error";
    }
}

/** Error representing HTTP 401 Unauthorized. */
export class UnauthorizedError extends BaseHttpError {
    /**
     * Creates an `UnauthorizedError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "UNAUTHORIZED",
            expose: true,
            message: "Unauthorized",
            name: "UnauthorizedError",
            status: 401,
            statusText: "Unauthorized",
            ...options,
        });
    }
}

/** Error representing HTTP 400 Bad Request. */
export class BadRequestError extends BaseHttpError {
    /**
     * Creates a `BadRequestError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "BAD_REQUEST",
            expose: true,
            message: "Bad Request",
            name: "BadRequestError",
            status: 400,
            statusText: "Bad Request",
            ...options,
        });
    }
}

/** Error representing HTTP 402 Payment Required. */
export class PaymentRequiredError extends BaseHttpError {
    /**
     * Creates a `PaymentRequiredError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "PAYMENT_REQUIRED",
            expose: true,
            message: "Payment Required",
            name: "PaymentRequiredError",
            status: 402,
            statusText: "Payment Required",
            ...options,
        });
    }
}

/** Error representing HTTP 403 Forbidden. */
export class ForbiddenError extends BaseHttpError {
    /**
     * Creates a `ForbiddenError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "FORBIDDEN",
            expose: true,
            message: "Forbidden",
            name: "ForbiddenError",
            status: 403,
            statusText: "Forbidden",
            ...options,
        });
    }
}

/** Error representing HTTP 405 Method Not Allowed. */
export class MethodNotAllowedError extends BaseHttpError {
    /**
     * Creates a `MethodNotAllowedError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "METHOD_NOT_ALLOWED",
            expose: true,
            message: "Method Not Allowed",
            name: "MethodNotAllowedError",
            status: 405,
            statusText: "Method Not Allowed",
            ...options,
        });
    }
}

/** Error representing HTTP 406 Not Acceptable. */
export class NotAcceptableError extends BaseHttpError {
    /**
     * Creates a `NotAcceptableError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "NOT_ACCEPTABLE",
            expose: true,
            message: "Not Acceptable",
            name: "NotAcceptableError",
            status: 406,
            statusText: "Not Acceptable",
            ...options,
        });
    }
}

/** Error representing HTTP 407 Proxy Authentication Required. */
export class ProxyAuthenticationRequiredError extends BaseHttpError {
    /**
     * Creates a `ProxyAuthenticationRequiredError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "PROXY_AUTHENTICATION_REQUIRED",
            expose: true,
            message: "Proxy Authentication Required",
            name: "ProxyAuthenticationRequiredError",
            status: 407,
            statusText: "Proxy Authentication Required",
            ...options,
        });
    }
}

/** Error representing HTTP 404 Not Found. */
export class NotFoundError extends BaseHttpError {
    /**
     * Creates a `NotFoundError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "NOT_FOUND",
            expose: true,
            message: "Not Found",
            name: "NotFoundError",
            status: 404,
            statusText: "Not Found",
            ...options,
        });
    }
}

/** Error representing HTTP 409 Conflict. */
export class ConflictError extends BaseHttpError {
    /**
     * Creates a `ConflictError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "CONFLICT",
            expose: true,
            message: "Conflict",
            name: "ConflictError",
            status: 409,
            statusText: "Conflict",
            ...options,
        });
    }
}

/** Error representing HTTP 410 Gone. */
export class GoneError extends BaseHttpError {
    /**
     * Creates a `GoneError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "GONE",
            expose: true,
            message: "Gone",
            name: "GoneError",
            status: 410,
            statusText: "Gone",
            ...options,
        });
    }
}

/** Error representing HTTP 412 Precondition Failed. */
export class PreconditionFailedError extends BaseHttpError {
    /**
     * Creates a `PreconditionFailedError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "PRECONDITION_FAILED",
            expose: true,
            message: "Precondition Failed",
            name: "PreconditionFailedError",
            status: 412,
            statusText: "Precondition Failed",
            ...options,
        });
    }
}

/** Error representing HTTP 413 Payload Too Large. */
export class PayloadTooLargeError extends BaseHttpError {
    /**
     * Creates a `PayloadTooLargeError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "PAYLOAD_TOO_LARGE",
            expose: true,
            message: "Payload Too Large",
            name: "PayloadTooLargeError",
            status: 413,
            statusText: "Payload Too Large",
            ...options,
        });
    }
}

/** Error representing HTTP 415 Unsupported Media Type. */
export class UnsupportedMediaTypeError extends BaseHttpError {
    /**
     * Creates an `UnsupportedMediaTypeError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "UNSUPPORTED_MEDIA_TYPE",
            expose: true,
            message: "Unsupported Media Type",
            name: "UnsupportedMediaTypeError",
            status: 415,
            statusText: "Unsupported Media Type",
            ...options,
        });
    }
}

export class UnprocessableEntityError extends BaseHttpError {
    /**
     * Creates an `UnprocessableEntityError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "UNPROCESSABLE_ENTITY",
            expose: true,
            message: "Unprocessable Entity",
            name: "UnprocessableEntityError",
            status: 422,
            statusText: "Unprocessable Entity",
            ...options,
        });
    }
}

export class TooManyRequestsError extends BaseHttpError {
    /**
     * Creates a `TooManyRequestsError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "TOO_MANY_REQUESTS",
            expose: true,
            message: "Too Many Requests",
            name: "TooManyRequestsError",
            status: 429,
            statusText: "Too Many Requests",
            ...options,
        });
    }
}

export class TimeoutError extends BaseHttpError {
    /**
     * Creates a `TimeoutError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "REQUEST_TIMEOUT",
            expose: true,
            message: "Request Timeout",
            name: "TimeoutError",
            status: 408,
            statusText: "Request Timeout",
            ...options,
        });
    }
}

export class InternalServerError extends BaseHttpError {
    /**
     * Creates an `InternalServerError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "INTERNAL_SERVER_ERROR",
            expose: false,
            message: "Internal Server Error",
            name: "InternalServerError",
            status: 500,
            statusText: "Internal Server Error",
            ...options,
        });
    }
}

export class NotImplementedError extends BaseHttpError {
    /**
     * Creates a `NotImplementedError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "NOT_IMPLEMENTED",
            expose: false,
            message: "Not Implemented",
            name: "NotImplementedError",
            status: 501,
            statusText: "Not Implemented",
            ...options,
        });
    }
}

export class BadGatewayError extends BaseHttpError {
    /**
     * Creates a `BadGatewayError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "BAD_GATEWAY",
            expose: false,
            message: "Bad Gateway",
            name: "BadGatewayError",
            status: 502,
            statusText: "Bad Gateway",
            ...options,
        });
    }
}

export class ServiceUnavailableError extends BaseHttpError {
    /**
     * Creates a `ServiceUnavailableError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "SERVICE_UNAVAILABLE",
            expose: false,
            message: "Service Unavailable",
            name: "ServiceUnavailableError",
            status: 503,
            statusText: "Service Unavailable",
            ...options,
        });
    }
}

export class GatewayTimeoutError extends BaseHttpError {
    /**
     * Creates a `GatewayTimeoutError` with default HTTP metadata.
     *
     * @param options Optional overrides for the default HTTP error fields.
     */
    constructor(options: HttpErrorOptions = {}) {
        super({
            code: "GATEWAY_TIMEOUT",
            expose: false,
            message: "Gateway Timeout",
            name: "GatewayTimeoutError",
            status: 504,
            statusText: "Gateway Timeout",
            ...options,
        });
    }
}
