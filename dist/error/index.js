//#region src/error/base-error.ts
/**
* Base error that can carry `cause`, `code`, and `details`.
*/
var BaseError = class extends Error {
	/**
	* Creates a `BaseError` instance.
	*
	* @param options Configuration for the message, code, cause, and extra details.
	*/
	constructor(options = {}) {
		const { cause, code, details, message = "Application Error", name = "BaseError" } = options;
		super(message, cause === void 0 ? void 0 : { cause });
		this.name = name;
		this.code = code;
		this.details = details;
		if (cause !== void 0 && !("cause" in this)) Object.defineProperty(this, "cause", {
			configurable: true,
			enumerable: false,
			value: cause,
			writable: true
		});
	}
};
//#endregion
//#region src/error/http-error.ts
/**
* Base error that includes HTTP status metadata.
*/
var BaseHttpError = class extends BaseError {
	expose;
	status;
	statusText;
	/**
	* Creates a `BaseHttpError` instance.
	*
	* @param options Configuration including HTTP status and exposure settings.
	*/
	constructor(options = {}) {
		const { cause, code, details, expose, message, name = "BaseHttpError", status, statusText } = options;
		super({
			cause,
			code,
			details,
			message,
			name
		});
		this.expose = expose ?? false;
		this.status = status ?? 500;
		this.statusText = statusText ?? "Internal Server Error";
	}
};
/** Error representing HTTP 401 Unauthorized. */
var UnauthorizedError = class extends BaseHttpError {
	/**
	* Creates an `UnauthorizedError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "UNAUTHORIZED",
			expose: true,
			message: "Unauthorized",
			name: "UnauthorizedError",
			status: 401,
			statusText: "Unauthorized",
			...options
		});
	}
};
/** Error representing HTTP 400 Bad Request. */
var BadRequestError = class extends BaseHttpError {
	/**
	* Creates a `BadRequestError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "BAD_REQUEST",
			expose: true,
			message: "Bad Request",
			name: "BadRequestError",
			status: 400,
			statusText: "Bad Request",
			...options
		});
	}
};
/** Error representing HTTP 402 Payment Required. */
var PaymentRequiredError = class extends BaseHttpError {
	/**
	* Creates a `PaymentRequiredError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "PAYMENT_REQUIRED",
			expose: true,
			message: "Payment Required",
			name: "PaymentRequiredError",
			status: 402,
			statusText: "Payment Required",
			...options
		});
	}
};
/** Error representing HTTP 403 Forbidden. */
var ForbiddenError = class extends BaseHttpError {
	/**
	* Creates a `ForbiddenError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "FORBIDDEN",
			expose: true,
			message: "Forbidden",
			name: "ForbiddenError",
			status: 403,
			statusText: "Forbidden",
			...options
		});
	}
};
/** Error representing HTTP 405 Method Not Allowed. */
var MethodNotAllowedError = class extends BaseHttpError {
	/**
	* Creates a `MethodNotAllowedError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "METHOD_NOT_ALLOWED",
			expose: true,
			message: "Method Not Allowed",
			name: "MethodNotAllowedError",
			status: 405,
			statusText: "Method Not Allowed",
			...options
		});
	}
};
/** Error representing HTTP 406 Not Acceptable. */
var NotAcceptableError = class extends BaseHttpError {
	/**
	* Creates a `NotAcceptableError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "NOT_ACCEPTABLE",
			expose: true,
			message: "Not Acceptable",
			name: "NotAcceptableError",
			status: 406,
			statusText: "Not Acceptable",
			...options
		});
	}
};
/** Error representing HTTP 407 Proxy Authentication Required. */
var ProxyAuthenticationRequiredError = class extends BaseHttpError {
	/**
	* Creates a `ProxyAuthenticationRequiredError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "PROXY_AUTHENTICATION_REQUIRED",
			expose: true,
			message: "Proxy Authentication Required",
			name: "ProxyAuthenticationRequiredError",
			status: 407,
			statusText: "Proxy Authentication Required",
			...options
		});
	}
};
/** Error representing HTTP 404 Not Found. */
var NotFoundError = class extends BaseHttpError {
	/**
	* Creates a `NotFoundError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "NOT_FOUND",
			expose: true,
			message: "Not Found",
			name: "NotFoundError",
			status: 404,
			statusText: "Not Found",
			...options
		});
	}
};
/** Error representing HTTP 409 Conflict. */
var ConflictError = class extends BaseHttpError {
	/**
	* Creates a `ConflictError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "CONFLICT",
			expose: true,
			message: "Conflict",
			name: "ConflictError",
			status: 409,
			statusText: "Conflict",
			...options
		});
	}
};
/** Error representing HTTP 410 Gone. */
var GoneError = class extends BaseHttpError {
	/**
	* Creates a `GoneError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "GONE",
			expose: true,
			message: "Gone",
			name: "GoneError",
			status: 410,
			statusText: "Gone",
			...options
		});
	}
};
/** Error representing HTTP 412 Precondition Failed. */
var PreconditionFailedError = class extends BaseHttpError {
	/**
	* Creates a `PreconditionFailedError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "PRECONDITION_FAILED",
			expose: true,
			message: "Precondition Failed",
			name: "PreconditionFailedError",
			status: 412,
			statusText: "Precondition Failed",
			...options
		});
	}
};
/** Error representing HTTP 413 Payload Too Large. */
var PayloadTooLargeError = class extends BaseHttpError {
	/**
	* Creates a `PayloadTooLargeError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "PAYLOAD_TOO_LARGE",
			expose: true,
			message: "Payload Too Large",
			name: "PayloadTooLargeError",
			status: 413,
			statusText: "Payload Too Large",
			...options
		});
	}
};
/** Error representing HTTP 415 Unsupported Media Type. */
var UnsupportedMediaTypeError = class extends BaseHttpError {
	/**
	* Creates an `UnsupportedMediaTypeError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "UNSUPPORTED_MEDIA_TYPE",
			expose: true,
			message: "Unsupported Media Type",
			name: "UnsupportedMediaTypeError",
			status: 415,
			statusText: "Unsupported Media Type",
			...options
		});
	}
};
var UnprocessableEntityError = class extends BaseHttpError {
	/**
	* Creates an `UnprocessableEntityError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "UNPROCESSABLE_ENTITY",
			expose: true,
			message: "Unprocessable Entity",
			name: "UnprocessableEntityError",
			status: 422,
			statusText: "Unprocessable Entity",
			...options
		});
	}
};
var TooManyRequestsError = class extends BaseHttpError {
	/**
	* Creates a `TooManyRequestsError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "TOO_MANY_REQUESTS",
			expose: true,
			message: "Too Many Requests",
			name: "TooManyRequestsError",
			status: 429,
			statusText: "Too Many Requests",
			...options
		});
	}
};
var TimeoutError = class extends BaseHttpError {
	/**
	* Creates a `TimeoutError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "REQUEST_TIMEOUT",
			expose: true,
			message: "Request Timeout",
			name: "TimeoutError",
			status: 408,
			statusText: "Request Timeout",
			...options
		});
	}
};
var InternalServerError = class extends BaseHttpError {
	/**
	* Creates an `InternalServerError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "INTERNAL_SERVER_ERROR",
			expose: false,
			message: "Internal Server Error",
			name: "InternalServerError",
			status: 500,
			statusText: "Internal Server Error",
			...options
		});
	}
};
var NotImplementedError = class extends BaseHttpError {
	/**
	* Creates a `NotImplementedError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "NOT_IMPLEMENTED",
			expose: false,
			message: "Not Implemented",
			name: "NotImplementedError",
			status: 501,
			statusText: "Not Implemented",
			...options
		});
	}
};
var BadGatewayError = class extends BaseHttpError {
	/**
	* Creates a `BadGatewayError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "BAD_GATEWAY",
			expose: false,
			message: "Bad Gateway",
			name: "BadGatewayError",
			status: 502,
			statusText: "Bad Gateway",
			...options
		});
	}
};
var ServiceUnavailableError = class extends BaseHttpError {
	/**
	* Creates a `ServiceUnavailableError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "SERVICE_UNAVAILABLE",
			expose: false,
			message: "Service Unavailable",
			name: "ServiceUnavailableError",
			status: 503,
			statusText: "Service Unavailable",
			...options
		});
	}
};
var GatewayTimeoutError = class extends BaseHttpError {
	/**
	* Creates a `GatewayTimeoutError` with default HTTP metadata.
	*
	* @param options Optional overrides for the default HTTP error fields.
	*/
	constructor(options = {}) {
		super({
			code: "GATEWAY_TIMEOUT",
			expose: false,
			message: "Gateway Timeout",
			name: "GatewayTimeoutError",
			status: 504,
			statusText: "Gateway Timeout",
			...options
		});
	}
};
//#endregion
//#region src/error/scheme-error.ts
/**
* Error used when a URL or identifier scheme does not match expectations.
*/
var SchemeError = class extends BaseError {
	allowedSchemes;
	receivedScheme;
	/**
	* Creates a `SchemeError` instance.
	*
	* @param options Configuration including the allowed and received schemes.
	*/
	constructor(options = {}) {
		const { allowedSchemes = [], receivedScheme, ...baseOptions } = options;
		const allowedText = allowedSchemes.length === 0 ? "none" : allowedSchemes.join(", ");
		super({
			code: "INVALID_SCHEME",
			message: `Invalid scheme: expected one of [${allowedText}], received "${receivedScheme ?? "unknown"}"`,
			name: "SchemeError",
			...baseOptions
		});
		this.allowedSchemes = allowedSchemes;
		this.receivedScheme = receivedScheme;
	}
};
//#endregion
//#region src/error/validation-error.ts
/**
* Error representing a failed validation of input or structure.
*/
var ValidationError = class extends BaseError {
	field;
	issues;
	/**
	* Creates a `ValidationError` instance.
	*
	* @param options Configuration including the field name and issue list.
	*/
	constructor(options = {}) {
		const { field, issues = [], ...baseOptions } = options;
		const message = baseOptions.message ?? (field ? `Validation failed for "${field}"` : "Validation failed");
		super({
			code: "VALIDATION_ERROR",
			...baseOptions,
			message,
			name: "ValidationError"
		});
		this.field = field;
		this.issues = issues;
	}
};
//#endregion
export { BadGatewayError, BadRequestError, BaseError, BaseHttpError, ConflictError, ForbiddenError, GatewayTimeoutError, GoneError, InternalServerError, MethodNotAllowedError, NotAcceptableError, NotFoundError, NotImplementedError, PayloadTooLargeError, PaymentRequiredError, PreconditionFailedError, ProxyAuthenticationRequiredError, SchemeError, ServiceUnavailableError, TimeoutError, TooManyRequestsError, UnauthorizedError, UnprocessableEntityError, UnsupportedMediaTypeError, ValidationError };
