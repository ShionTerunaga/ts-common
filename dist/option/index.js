//#region src/option/option-core.ts
const basic = {
	OPTION_SOME: "some",
	OPTION_NONE: "none"
};
function createSome(value) {
	return {
		kind: basic.OPTION_SOME,
		value
	};
}
function createNone() {
	return { kind: basic.OPTION_NONE };
}
function isSome(option) {
	return option.kind === basic.OPTION_SOME;
}
function isNone(option) {
	return option.kind === basic.OPTION_NONE;
}
//#endregion
//#region src/option/option-process.ts
function optionConversion(value) {
	if (value === null || value === void 0) return createNone();
	return createSome(value);
}
//#endregion
export { createNone, createSome, isNone, isSome, optionConversion };
