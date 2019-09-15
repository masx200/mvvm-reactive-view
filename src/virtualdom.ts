import Reflect from "./reflect";
import ReactiveState, { dispatchsymbol } from "./primitivestate";
import { Class } from "./rendervdomtoreal";

export default class Virtualdom {
  element: undefined | Element;
  type: string | Function | undefined | Class;
  props: object = {};
  children: Array<Virtualdom | string | ReactiveState> = [];
  directives: object = {};
  onevent: object = {};
  bindattr: object = {};
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string | ReactiveState> = []
  ) {
    // console.log(type, props, children);
    const propsentries = Object.entries(props);
    Object.assign(this, {
      type,
      bindattr: Object.fromEntries(
        propsentries
          .filter(([key]) => /[A-Za-z]/.test(key[0]))
          .filter(e => e[1] instanceof ReactiveState)
      ),
      props: Object.fromEntries(
        propsentries
          .filter(([key]) => /[A-Za-z]/.test(key[0]))
          .filter(e => !(e[1] instanceof ReactiveState))
      ),
      children,
      onevent: Object.fromEntries(
        propsentries
          .filter(([key]) => /\@/.test(key[0]))
          .map(([key, value]) => [key.slice(1), value])
      ),
      directives: Object.fromEntries(
        propsentries
          .filter(([key]) => /\*/.test(key[0]))
          .map(([key, value]) => [key.slice(1), value])
      )
    });
    Object.defineProperty(this, Symbol.toStringTag, { value: "virtualdom" });
  }
}
