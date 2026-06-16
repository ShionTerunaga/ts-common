export { type Result, type Ok, type Err, createErr, createOk, isOk, isErr } from "./result-core";
export {
  type Unit,
  UNIT,
  checkPromiseReturn,
  checkPromiseVoid,
  checkResultReturn,
  checkResultVoid,
} from "./result-process";
