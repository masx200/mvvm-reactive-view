export function issymbol(a: any): a is symbol {
    return typeof a === "symbol";
}

export { isplainobject };
export { isfunction as isFunction, isarray as isArray, isstring as isString };
export { isprimitive };

const isplainobject = (a: any): a is Record<any, any> =>
    isobject(a) && gettagtype(a) === "Object";

import isprimitive from "./isprimitive";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function isundefined(a: any): a is void {
    return (!a && a === void 0) || a === null;
}

export function isnumber(a: any): a is number {
    return typeof a === "number";
}
export function isboolean(a: any): a is boolean {
    return typeof a === "boolean";
}
export function isobject(a: any): a is Exclude<object, Function> {
    return typeof a === "object" && a !== null;
}

export function isstring(a: any): a is string {
    return typeof a === "string";
}
export function isfunction(a: any): a is Function {
    return typeof a === "function";
}

export function isarray(a: any): a is Array<any> {
    return Array.isArray(a) && a instanceof Array;
}
/* export function getsymbol(a: string) {
  return Symbol(a);
} */
export function gettagtype(a: any): string {
    return {}.toString
        .call(a)
        .replace("[object ", "")
        .replace("]", "")

        .trim();
}

export function isSet(a: any): a is Set<any> {
    return a instanceof Set;
}
export function isMap(a: any): a is Map<any, any> {
    return a instanceof Map;
}
const camelizeRE = /-(\w)/g;
export const camelize = (str: string): string => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = (str: string): string => {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
};

export function isWeakMap(a: any): a is WeakMap<any, any> {
    return a instanceof WeakMap;
}
