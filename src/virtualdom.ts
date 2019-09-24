export function isVirtualdom(a: any): a is Virtualdom {
  return a instanceof Virtualdom;
}
import ReactiveState, { isReactiveState } from "./primitivestate";
import { Class } from "./rendervdomtoreal";

export default class Virtualdom {
  options: any 
  element: undefined | Element 
  type: string | Function | Class;
  props: { [key: string]: string | object } = {};
  children: Array<Virtualdom | string | ReactiveState> = [];
  directives: object = {};
  onevent: object = {};
  bindattr: { [key: string]: ReactiveState } = {};
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
          .filter(
            e => isReactiveState(e[1])
            // e[1] instanceof ReactiveState
          )
      ),
      props: Object.fromEntries(
        propsentries
          .filter(([key]) => /[A-Za-z]/.test(key[0]))
          .filter(
            e => !isReactiveState(e[1])
            //    e[1] instanceof ReactiveState
          )
      ),
      children: children.flat(),
      onevent: Object.fromEntries(
        propsentries
          .filter(([key]) => /\@/.test(key[0]))
          .map(([key, value]) => [
            key.slice(1),
            //把事件绑定变成事件数组
            [value].flat()
          ])
      ),
      directives: Object.fromEntries(
        propsentries
          .filter(([key]) => /\*/.test(key[0]))
          .map(([key, value]) => [key.slice(1), value])
      )
    });
    Object.defineProperty(this, Symbol.toStringTag, {
      value: "virtualdom",
      configurable: true
    });
  }
}
