import { isArray } from "./util";
/* export function toArray<T not Array>(a: T): Array<T>;
export function toArray<T>(a: Array<T>): Array<T>; */
// export function toArray<T>(a: Array<T>): Array<T>;
export function toArray(a: any): any[] {
  return (isArray(a) ? a : [a]).flat();
}
