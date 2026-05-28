//#region src/object/object.ts
function omitElementObject(obj, keys) {
	const entries = Object.entries(obj).filter(([k]) => {
		return !keys.some((key) => String(key) === k);
	});
	const typedResult = {};
	for (const [k, v] of entries) typedResult[k] = v;
	return typedResult;
}
//#endregion
export { omitElementObject };
