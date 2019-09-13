export default class Virtualdom {
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string> = []
  ) {
    Object.assign(this, { type, props, children });
    Object.defineProperty(this, Symbol.toStringTag, { value: "virtualdom" });
  }
}
