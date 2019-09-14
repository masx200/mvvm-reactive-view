import { Class } from "./rendervdomtoreal";
export default class Virtualdom {
  type: string | Function | undefined | Class;
  props: object | undefined = {};
  children: Array<Virtualdom | string> = [];
  directives: object = {};
  on: object = {};
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string> = []
  ) {
    const propsentries = Object.entries(props);
    Object.assign(this, {
      type,
      props: Object.fromEntries(
        propsentries.filter(([key]) => /[A-Za-z]/.test(key[0]))
      ),
      children,
      on: Object.fromEntries(propsentries.filter(([key]) => /\@/.test(key[0]))),
      directives: Object.fromEntries(
        propsentries.filter(([key]) => /\*/.test(key[0]))
      )
    });
    Object.defineProperty(this, Symbol.toStringTag, { value: "virtualdom" });
  }
}
