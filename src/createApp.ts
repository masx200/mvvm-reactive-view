import Virtualdom from "./virtualdom";
import render from "./rendervdomtoreal";
import mount from "./mount";
export default function(
  vdom: Virtualdom | string | Array<Virtualdom | string>,
  container: HTMLElement
) {
  let elesarray: Array<string | Virtualdom>;
  if (vdom instanceof Array) {
    elesarray = vdom;
  } else {
    elesarray = [vdom];
  }
  mount(elesarray.map(e => render(e)), container);

  //
}
