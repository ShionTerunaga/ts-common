import { BaseError, type BaseErrorOptions } from "./base-error";

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
export class SchemeError extends BaseError {
  readonly allowedSchemes: string[];
  readonly receivedScheme?: string;

  /**
   * Creates a `SchemeError` instance.
   *
   * @param options Configuration including the allowed and received schemes.
   */
  constructor(options: SchemeErrorOptions = {}) {
    const { allowedSchemes = [], receivedScheme, ...baseOptions } = options;
    const allowedText = allowedSchemes.length === 0 ? "none" : allowedSchemes.join(", ");
    const receivedText = receivedScheme ?? "unknown";

    super({
      code: "INVALID_SCHEME",
      message: `Invalid scheme: expected one of [${allowedText}], received "${receivedText}"`,
      name: "SchemeError",
      ...baseOptions,
    });

    this.allowedSchemes = allowedSchemes;
    this.receivedScheme = receivedScheme;
  }
}
