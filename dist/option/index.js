//#region src/option/option-core.ts
const basic = {
	OPTION_SOME: "some",
	OPTION_NONE: "none"
};
/**
* Creates an `Option` containing a value.
*
* @template T Type of the stored value.
* @param value Non-nullable value to store.
* @returns A value-present `Option<T>`.
*/
function createSome(value) {
	return {
		kind: basic.OPTION_SOME,
		value
	};
}
/**
* Creates an empty `Option`.
*
* @template T Expected value type.
* @returns An empty `Option<NonNullable<T>>`.
*/
function createNone() {
	return { kind: basic.OPTION_NONE };
}
/**
* Type guard that checks whether an `Option` contains a value.
*
* @template T Type of the stored value.
* @param option `Option` value to inspect.
* @returns `true` when the option contains a value, allowing safe access to `value`.
*/
function isSome(option) {
	return option.kind === basic.OPTION_SOME;
}
/**
* Type guard that checks whether an `Option` is empty.
*
* @template T Expected value type.
* @param option `Option` value to inspect.
* @returns `true` when the option is empty.
*/
function isNone(option) {
	return option.kind === basic.OPTION_NONE;
}
//#endregion
//#region src/option/option-process.ts
/**
* Converts `null` or `undefined` into `None`, and every other value into `Some`.
*
* @template T Type of the value being converted.
* @param value Value to wrap in an `Option`.
* @returns `None` for `null` or `undefined`, otherwise `Some`.
*/
function optionConversion(value) {
	if (value === null || value === void 0) return createNone();
	return createSome(value);
}
//#endregion
export { createNone, createSome, isNone, isSome, optionConversion };
