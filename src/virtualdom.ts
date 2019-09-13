import { Class } from "./rendervdomtoreal";
export default class Virtualdom {
  type: string | Function | undefined | Class;
  props: object | undefined;
  children: Array<Virtualdom | string> = [];
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string> = []
  ) {
    Object.assign(this, { type, props, children });
    Object.defineProperty(this, Symbol.toStringTag, { value: "virtualdom" });
  }
}
