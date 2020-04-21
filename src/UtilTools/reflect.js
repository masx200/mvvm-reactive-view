import { isMap, isWeakMap } from "./util";
export const {
    apply,
    construct,
    defineProperty,
    deleteProperty,
    getOwnPropertyDescriptor,
    getPrototypeOf,
    has,
    ownKeys,
    preventExtensions
} = Reflect;
export function get(target, propertyKey) {
    if (isMap(target) || isWeakMap(target)) {
        return target.get(propertyKey);
    } else {
        return Reflect.get(target, propertyKey);
    }
}
export function set(target, propertyKey, value) {
    if (isMap(target) || isWeakMap(target)) {
        target.set(propertyKey, value);
        return true;
    } else {
        return Reflect.set(target, propertyKey, value);
    }
}
//# sourceMappingURL=reflect.js.map
