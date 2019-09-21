import ReactiveState from "./primitivestate";
import document from "./dom";
import { isvalidvdom } from "./html";
import Virtualdom from "./virtualdom";
import render from "./rendervdomtoreal";
import mount from "./mount";
export default function createApp(
  vdom:
    | Virtualdom
    | string
    | Array<Virtualdom | string | ReactiveState>
    | ReactiveState,
  container: HTMLElement | Element
): HTMLElement | Element {
  const el = container;
  if (!isvalidvdom(vdom)) {
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
  mount(elesarray.map(e => render(e)), container);

  //
  return container;
}
