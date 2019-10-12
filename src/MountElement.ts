export const invalid_Virtualdom = "invalid Virtualdom ";
import { VaildVDom } from "./conditon";
import document from "./dom";
import { isvalidvdom } from "./html";
import mount from "./mount";
import render from "./rendervdomtoreal";
import { toArray } from "./toArray";
import { isArray } from "./util";
export default function MountElement<T extends Element>(
  vdom: VaildVDom | Node | Element | Array<Node | Element>,
  container: T
): T {
  if (isArray(vdom)) {
    vdom = vdom.flat(Infinity);
    if (!vdom.length) {
      //不允许空数组
      console.error("Empty array not allowed");
      throw new TypeError();
    }
  }
  const el = container;
  if (!(el instanceof HTMLElement)) {
    console.error(el);
    console.error("invalid container HTMLElement!");
    throw TypeError();
  }

  if (
    el === document.body ||
    el === document.documentElement ||
    el === document.head
  ) {
    console.error(el);
    console.error("Do not mount  to <html> or <body> <head>.");
    throw Error();
  }
  /*   if (
    !(
      isvalidvdom(vdom) ||
      vdom instanceof Node ||
      (isArray(vdom) && isNodeArray(vdom))
    )
  ) {
    console.error(vdom);
    throw TypeError(invalid_Virtualdom);
  } */

  /*   let elesarray: Array<any>;
  if (Array.isArray(vdom)) {
    elesarray = vdom;
  } else {
    elesarray = [vdom];
  } */
  const elesarray = toArray(vdom);
  if (isvalidvdom(vdom)) {
    // mount(elesarray.map(e => render(e)), container);
    mount(render(elesarray), container);
  } else if (isNode(vdom) /*  instanceof Node */ || isNodeArray(vdom)) {
    mount(elesarray, container);
  } else {
    console.error(vdom);
    console.error(invalid_Virtualdom);
    throw TypeError();
  }

  //
  return container;
}
export function isNodeArray(arr: any[]): arr is Node[] {
  //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  //不允许空数组
  return !!(isArray(arr) && arr.length && arr.every(a => isNode(a)));
  //!array.map(e => e instanceof Node).includes(false);
}
export function isNode(a: any): a is Node {
  return a instanceof Node;
}
