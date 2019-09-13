import { isstring, isarray, isobject, isfunction } from "./util";

export default class setlikearray extends Array {
  constructor() {
    super();
    Object.defineProperty(this, Symbol.toStringTag, { value: "setlikearray" });
  }
  push(...items: any[]): number {
    items.forEach(item => {
      if (isfunction(item) || isobject(item)) {
        if (!this.includes(item)) {
          super.push(item);
        }
      }
    });

    return this.length;
  }
}
