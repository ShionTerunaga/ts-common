//#region src/result/result-core.ts
const basic = {
	RESULT_OK: "ok",
	RESULT_NG: "ng"
};
function createOk(value) {
	return {
		kind: basic.RESULT_OK,
		value
	};
}
function createErr(err) {
	return {
		kind: basic.RESULT_NG,
		err
	};
}
function isOk(result) {
	return result.kind === basic.RESULT_OK;
}
function isErr(result) {
	return result.kind === basic.RESULT_NG;
}
const UNIT = Object.freeze({ _unit: Symbol("UNIT_SYMBOL") });
async function checkPromiseVoid({ fn, err, finalFn = () => {} }) {
	try {
		await fn();
		return createOk(UNIT);
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
}
function checkResultReturn({ fn, err, finalFn = () => {} }) {
	try {
		return createOk(fn());
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
}
function checkResultVoid({ fn, err, finalFn = () => {} }) {
	try {
		fn();
		return createOk(UNIT);
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
}
async function checkPromiseReturn({ fn, err, finalFn = () => {} }) {
	try {
		return createOk(await fn());
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
}
//#endregion
export { UNIT, checkPromiseReturn, checkPromiseVoid, checkResultReturn, checkResultVoid, createErr, createOk, isErr, isOk };
