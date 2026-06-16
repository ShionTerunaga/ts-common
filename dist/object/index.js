//#region src/object/object.ts
/**
* Returns a new object with the specified keys omitted.
*
* @template T Type of the source object.
* @template S Type of the keys to remove.
* @param obj Source object to omit keys from.
* @param keys List of keys to remove.
* @returns A new object typed as `Omit<T, S>`.
*/
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
