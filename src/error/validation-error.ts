import { BaseError, type BaseErrorOptions } from "./base-error";

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
export class ValidationError extends BaseError {
  readonly field?: string;
  readonly issues: ValidationIssue[];

  /**
   * Creates a `ValidationError` instance.
   *
   * @param options Configuration including the field name and issue list.
   */
  constructor(options: ValidationErrorOptions = {}) {
    const { field, issues = [], ...baseOptions } = options;
    const message =
      baseOptions.message ?? (field ? `Validation failed for "${field}"` : "Validation failed");

    super({
      code: "VALIDATION_ERROR",
      ...baseOptions,
      message,
      name: "ValidationError",
    });

    this.field = field;
    this.issues = issues;
  }
}
