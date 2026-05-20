export { classMerger } from "./merger/class-merger.js";
export { BaseError, type BaseErrorOptions } from "./error/base-error.js";
export {
  BadGatewayError,
  BadRequestError,
  BaseHttpError,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  type HttpErrorOptions,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  NotAcceptableError,
  NotImplementedError,
  PayloadTooLargeError,
  PaymentRequiredError,
  PreconditionFailedError,
  ProxyAuthenticationRequiredError,
  ServiceUnavailableError,
  TimeoutError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableEntityError,
  UnsupportedMediaTypeError,
} from "./error/http-error.js";
export { SchemeError, type SchemeErrorOptions } from "./error/scheme-error.js";
export {
  ValidationError,
  type ValidationErrorOptions,
  type ValidationIssue,
} from "./error/validation-error.js";
export { isNull, isUndefined } from "./common/is.js";
export { omitElementObject } from "./object/object.js";
export { envParse } from "./non-nullable/env-parse.js";
export { optionUtility, type Option } from "./non-nullable/option.js";
export { resultUtility, type Result, type Unit } from "./non-nullable/result.js";
export type { Dict, Without } from "./types/object.js";
