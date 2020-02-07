import { isArray } from "../UtilTools/util";

export function isNodeArray(arr: any[]): arr is Node[] {
  return !!(isArray(arr) && arr.length && arr.every(a => isNode(a)));
}
export function isNode(a: any): a is Node {
  return a instanceof Node;
}
