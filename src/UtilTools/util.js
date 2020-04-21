export function issymbol(a) {
    return typeof a === "symbol";
}
export { isplainobject };
export { isfunction as isFunction, isarray as isArray, isstring as isString };
export { isprimitive };
const isplainobject = (a) => {
    return (
        !!a &&
        gettagtype(a) === "Object" &&
        Reflect.getPrototypeOf(a) === Object.prototype
    );
};
import isprimitive from "./isprimitive";
export function isundefined(a) {
    return (!a && a === void 0) || a === null;
}
export function isnumber(a) {
    return typeof a === "number";
}
export function isboolean(a) {
    return typeof a === "boolean";
}
export function isobject(a) {
    return typeof a === "object" && a !== null;
}
export function isstring(a) {
    return typeof a === "string";
}
export function isfunction(a) {
    return typeof a === "function";
}
export function isarray(a) {
    return Array.isArray(a) && a instanceof Array;
}
export function gettagtype(a) {
    return Object.prototype.toString
        .call(a)
        .replace("[object ", "")
        .replace("]", "")
        .trim();
}
export function isSet(a) {
    return a instanceof Set;
}
export function isMap(a) {
    return a instanceof Map;
}
const camelizeRE = /-(\w)/g;
export const camelize = (str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = (str) => {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
};
export function isWeakMap(a) {
    return a instanceof WeakMap;
}
//# sourceMappingURL=util.js.map
