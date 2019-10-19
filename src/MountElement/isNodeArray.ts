import { isArray } from "src/UtilTools/util";

export function isNodeArray(arr: any[]): arr is Node[] {
  //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  //不允许空数组
  return !!(isArray(arr) && arr.length && arr.every(a => isNode(a)));
  //!array.map(e => e instanceof Node).includes(false);
}
export function isNode(a: any): a is Node {
  return a instanceof Node;
}
