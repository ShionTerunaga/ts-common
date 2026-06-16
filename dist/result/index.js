//#region src/result/result-core.ts
const basic = {
	RESULT_OK: "ok",
	RESULT_NG: "ng"
};
/**
* Creates a successful `Result` from a value.
*
* @template T Type of the success value.
* @param value Non-nullable success value to store in the `Result`.
* @returns A `Result<T, never>` representing success.
*/
function createOk(value) {
	return {
		kind: basic.RESULT_OK,
		value
	};
}
/**
* Creates a failed `Result` from an error value.
*
* @template E Type of the error value.
* @param err Non-nullable error value to store in the `Result`.
* @returns A `Result<never, E>` representing failure.
*/
function createErr(err) {
	return {
		kind: basic.RESULT_NG,
		err
	};
}
/**
* Type guard that checks whether a `Result` is successful.
*
* @template T Type of the success value.
* @template E Type of the error value.
* @param result `Result` value to inspect.
* @returns `true` when the result is successful, allowing safe access to `value`.
*/
function isOk(result) {
	return result.kind === basic.RESULT_OK;
}
/**
* Type guard that checks whether a `Result` is failed.
*
* @template T Type of the success value.
* @template E Type of the error value.
* @param result `Result` value to inspect.
* @returns `true` when the result is failed, allowing safe access to `err`.
*/
function isErr(result) {
	return result.kind === basic.RESULT_NG;
}
/**
* Shared instance used for successful operations with no return value.
*/
const UNIT = Object.freeze({ _unit: Symbol("UNIT_SYMBOL") });
/**
* Executes an async void function and converts its outcome into `Result`.
*
* @template E Type of the failure value.
* @param options Configuration containing the function, error mapper, and cleanup callback.
* @param options.fn Async function to execute.
* @param options.err Mapper that converts a thrown value into a failed `Result`.
* @param options.finalFn Cleanup callback that always runs after execution.
* @returns A `Promise<Result<Unit, E>>` containing `UNIT` on success or the mapped error on failure.
*/
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
/**
* Executes a synchronous function and converts its return value or thrown error into `Result`.
*
* @template T Type of the success value.
* @template E Type of the failure value.
* @param options Configuration containing the function, error mapper, and cleanup callback.
* @param options.fn Synchronous function to execute. Must return a non-nullable value.
* @param options.err Mapper that converts a thrown value into a failed `Result`.
* @param options.finalFn Cleanup callback that always runs after execution.
* @returns A `Result<T, E>` containing the return value on success or the mapped error on failure.
*/
function checkResultReturn({ fn, err, finalFn = () => {} }) {
	try {
		return createOk(fn());
	} catch (e) {
		return err(e);
	} finally {
		finalFn();
	}
}
/**
* Executes a synchronous void function and converts its outcome into `Result`.
*
* @template E Type of the failure value.
* @param options Configuration containing the function, error mapper, and cleanup callback.
* @param options.fn Synchronous function to execute.
* @param options.err Mapper that converts a thrown value into a failed `Result`.
* @param options.finalFn Cleanup callback that always runs after execution.
* @returns A `Result<Unit, E>` containing `UNIT` on success or the mapped error on failure.
*/
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
/**
* Executes an async function and converts its resolved value or thrown error into `Result`.
*
* @template T Type of the success value.
* @template E Type of the failure value.
* @param options Configuration containing the function, error mapper, and cleanup callback.
* @param options.fn Async function to execute. Must resolve to a non-nullable value.
* @param options.err Mapper that converts a thrown value into a failed `Result`.
* @param options.finalFn Cleanup callback that always runs after execution.
* @returns A `Promise<Result<T, E>>` containing the resolved value on success or the mapped error on failure.
*/
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
