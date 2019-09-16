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
export function isobject(a: any) {
  return typeof a === "object" && a !== null;
}
export function isstring(a: string): true;
export function isstring(a): boolean;
export function isstring(a: any) {
  return typeof a === "string";
}
export function isfunction(a: any) {
  return typeof a === "function";
}

export function isarray(a: any) {
  return a instanceof Array && Array.isArray(a);
}
export { isfunction as isFunction, isarray as isArray, isstring as isString };
export function getsymbol(a: string) {
  return Symbol(a);
}
export function gettagtype(a: any) {
  return {}.toString
    .call(a)
    .replace("[object ", "")
    .replace("]", "")
    .toLowerCase();
}
