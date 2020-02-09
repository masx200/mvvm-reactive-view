export const invalid_Virtualdom = "invalid Virtualdom ";

import mount from "./mount-real-element";
import render from "../RenderVirtual/render-vdom-to-real";
import { toArray } from "../UtilTools/toArray";
import { isArray } from "../UtilTools/util";
import { isvalidvdom, VaildVDom } from "../CreateElement/isvalidvdom";
import { isNode, isNodeArray } from "./isNodeArray";
export default function MountElement<T extends Element>(
    vdom: VaildVDom | Node | Element | Array<Node | Element>,
    container: T
): T {
    if (isArray(vdom)) {
        vdom = vdom.flat(Infinity);
        if (!vdom.length) {
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
