import { isArray } from "../UtilTools/util";
export function isNodeArray(arr) {
    return !!(isArray(arr) && arr.length && arr.every((a) => isNode(a)));
}
export function isNode(a) {
    return a instanceof Node;
}
//# sourceMappingURL=isNodeArray.js.map
