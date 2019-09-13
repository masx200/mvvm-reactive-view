import { isvalidvdom } from "./html";
import Virtualdom from "./virtualdom";
import render from "./rendervdomtoreal";
import mount from "./mount";
export default function(
  vdom: Virtualdom | string | Array<Virtualdom | string>,
  container: HTMLElement
) {
  const el = container;
  if (!isvalidvdom(vdom)) {
    throw TypeError(
      "invalid Virtualdom " + "\n" + JSON.stringify(vdom, null, 4)
    );
  }
  if (!(el instanceof HTMLElement)) {
    throw TypeError("invalid container HTMLElement!");
  }

  if (
    el === document.body ||
    el === document.documentElement ||
    el === document.head
  ) {
    throw Error(
      "Do not mount  to <html> or <body> <head>- mount to normal elements instead."
    );
  }
  let elesarray: Array<string | Virtualdom>;
  if (vdom instanceof Array) {
    elesarray = vdom;
  } else {
    elesarray = [vdom];
  }
  mount(elesarray.map(e => render(e)), container);

  //
  return container;
}
