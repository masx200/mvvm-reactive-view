export function isobject(a: any) {
  return typeof a === "object" && a !== null;
}
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
  return Symbol.for(a);
}
export function gettagtype(a: any) {
  return {}.toString
    .call(a)
    .replace("[object ", "")
    .replace("]", "")
    .toLowerCase();
}
