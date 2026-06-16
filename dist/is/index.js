//#region src/is/is.ts
/**
* Type guard that checks whether a value is `null`.
*
* @param value Value to inspect.
* @returns `true` only when the value is `null`.
*/
function isNull(value) {
	return value === null;
}
/**
* Type guard that checks whether a value is `undefined`.
*
* @param value Value to inspect.
* @returns `true` only when the value is `undefined`.
*/
function isUndefined(value) {
	return value === void 0;
}
//#endregion
export { isNull, isUndefined };
