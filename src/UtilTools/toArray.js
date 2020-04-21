import { isArray, isundefined } from "./util";
export function toArray(a) {
    return (isArray(a) ? a : [a]).flat(1 / 0).filter((a) => !isundefined(a));
}
Array.prototype.filter;
//# sourceMappingURL=toArray.js.map
