import ReactiveState from "./primitivestate";
import document from "./dom";
import { isvalidvdom } from "./html";
import Virtualdom from "./virtualdom";
import render from "./rendervdomtoreal";
import mount from "./mount";
import { isArray } from "./util";
export default function createApp(
  vdom:
    | Node
    | Virtualdom
    | string
    | Array<Virtualdom | string | ReactiveState | Node>
    | ReactiveState,
  container: HTMLElement | Element
): HTMLElement | Element {
  const el = container;
  if (
    !(
      isvalidvdom(vdom) ||
      vdom instanceof Node ||
      (isArray(vdom) && isNodeArray(vdom))
    )
  ) {
    console.error(vdom);
    throw TypeError("invalid Virtualdom ");
  }
  if (!(el instanceof HTMLElement)) {
    throw TypeError("invalid container HTMLElement!");
  }

  if (
    el === document.body ||
    el === document.documentElement ||
    el === document.head
  ) {
    throw Error("Do not mount  to <html> or <body> <head>.");
  }
  let elesarray: Array<any>;
  if (Array.isArray(vdom)) {
    elesarray = vdom;
  } else {
    elesarray = [vdom];
  }
  if (isvalidvdom(vdom)) {
    mount(elesarray.map(e => render(e)), container);
  } else if (vdom instanceof Node || isArray(vdom)) {
    mount(elesarray, container);
  }

  //
  return container;
}
function isNodeArray(array: any[]): array is Node[] {
  return isArray(array) && !array.map(e => e instanceof Node).includes(false);
}
