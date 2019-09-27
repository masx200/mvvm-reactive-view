import { has, get } from "./reflect";
import { isFunction } from "./util";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function isundefined(a: any) {
  return typeof a === "undefined";
}

export function isnumber(a: any) {
  return typeof a === "number";
}
export function isboolean(a: any) {
  return typeof a === "boolean";
}
export function isobject(a: any): a is object {
  return typeof a === "object" && a !== null;
}
// export function isstring(a: string): true;
// export function isstring(a): boolean;
export function isstring(a: any): a is string {
  return typeof a === "string";
}
export function isfunction(a: any): a is Function {
  return typeof a === "function";
}

export function isarray(a: any): a is Array<any> {
  return a instanceof Array && Array.isArray(a) && gettagtype(a) === "array";
}
export { isfunction as isFunction, isarray as isArray, isstring as isString };
export function getsymbol(a: string) {
  return Symbol(a);
}
export function gettagtype(a: any): string {
  return {}.toString
    .call(a)
    .replace("[object ", "")
    .replace("]", "")
    .toLowerCase()
    .trim();
}
export function ispromise(a: any): a is Promise<any> {
  return (
    gettagtype(a) === "promise" && isFunction(get(a, "then")) && has(a, "catch")
  );
}
export function isSet(a: any): a is Set<any> {
  return gettagtype(a) === "set" && a instanceof Set;
}
