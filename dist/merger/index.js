//#region src/merger/class-merger.ts
function classMerger(classes) {
	const length = classes.length;
	if (length === 0) return "";
	const firstClass = classes[0];
	if (length === 1) return firstClass;
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (let index = 0; index < length; index += 1) {
		const cls = classes[index];
		if (cls === "" || seen.has(cls)) continue;
		seen.add(cls);
		out.push(cls);
	}
	return out.length === 1 ? out[0] : out.join(" ");
}
//#endregion
export { classMerger };
