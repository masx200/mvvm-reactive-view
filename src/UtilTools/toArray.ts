import { isArray, isundefined } from "./util";
/* export function toArray<T not Array>(a: T): Array<T>;
export function toArray<T>(a: Array<T>): Array<T>; */
type Many<T> = T | Array<T>;
export function toArray<U>(a: Many<U>): Exclude<U, void>[];
export function toArray(a: any): any[] {
    return (isArray(a) ? a : [a]).flat(1 / 0).filter((a) => !isundefined(a));
}

Array.prototype.filter;
