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
export class BaseError extends Error {
    declare cause?: unknown;
    declare code?: string;
    declare details?: unknown;

    /**
     * Creates a `BaseError` instance.
     *
     * @param options Configuration for the message, code, cause, and extra details.
     */
    constructor(options: BaseErrorOptions = {}) {
        const { cause, code, details, message = "Application Error", name = "BaseError" } = options;

        super(message, cause === undefined ? undefined : { cause });

        this.name = name;
        this.code = code;
        this.details = details;

        if (cause !== undefined && !("cause" in this)) {
            Object.defineProperty(this, "cause", {
                configurable: true,
                enumerable: false,
                value: cause,
                writable: true,
            });
        }
    }
}
