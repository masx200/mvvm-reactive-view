export const invalid_Virtualdom = "invalid Virtualdom ";
import ReactiveState from './reactivestate';
import document from "./dom";
import { isvalidvdom } from "./html";
import Virtualdom from "./virtualdom";
import render from "./rendervdomtoreal";
import mount from "./mount";
import { isArray } from "./util";
import { toArray } from "./toArray";
export default function MountElement<T extends Element>(
  vdom:
    | Node
    | Virtualdom
    | string
    | number
    | Array<Virtualdom | string | ReactiveState | Node | number>
    | ReactiveState,
  container: T
): T {
  if (isArray(vdom)) {
    vdom = vdom.flat(Infinity);
  }
  const el = container;
  if (!(el instanceof HTMLElement)) {
    console.error(el);
    throw TypeError("invalid container HTMLElement!");
  }

  if (
    el === document.body ||
    el === document.documentElement ||
    el === document.head
  ) {
    throw Error("Do not mount  to <html> or <body> <head>.");
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
  } else if (vdom instanceof Node || isNodeArray(vdom)) {
    mount(elesarray, container);
  } else {
    console.error(vdom);
    throw TypeError(invalid_Virtualdom);
  }

  //
  return container;
}
function isNodeArray(array: any[]): array is Node[] {
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  return isArray(array) && array.every(a=>a instanceof Node)
//!array.map(e => e instanceof Node).includes(false);
}
