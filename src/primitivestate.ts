import { getsymbol, isobject } from "./util";
import isprimitive from "./isprimitive";
export const eventtargetsymbol = Symbol("eventtatget");
export const memlisteners = Symbol("memlisteners");
export const dispatchsymbol = getsymbol("dispatch");
export const subscribesymbol = getsymbol("subscribe");
export const removeallistenerssymbol = getsymbol("removeallisteners");
export const addallistenerssymbol = getsymbol("addallisteners");
export default class ReactiveState extends Array {
  value: string | number | boolean | undefined | object;
  [eventtargetsymbol] = new EventTarget();
  [memlisteners] = [];
  constructor(init: string | number | boolean | object | undefined) {
    super();
    if (isprimitive(init) || isobject(init)) {
      this.value = init;
    } else {
      throw TypeError("invalid State");
    }
    // this[eventtargetsymbol] = new EventTarget();

    Object.defineProperty(this, Symbol.toStringTag, {
      value: "ReactiveState"
    });
  }
  [Symbol.toPrimitive]() {
    //return this.value;
    let value = this.value;
    return isprimitive(value)
      ? value
      : isobject(value)
      ? JSON.stringify(value)
      : void 0;
  }
  valueOf() {
    return this.value;
  }
  toString() {
    let value = this.value;
    return isprimitive(value)
      ? String(value)
      : isobject(value)
      ? JSON.stringify(value)
      : "";
  }
  [dispatchsymbol](eventname?: string) {
    let name = eventname ? String(eventname) : "value";
    if (name !== "value") {
      this[eventtargetsymbol].dispatchEvent(new Event(name));
    }

    this[eventtargetsymbol].dispatchEvent(new Event("value"));
  }
  [subscribesymbol](callback: Function, eventname?: string) {
    // this[eventtargetsymbol].addEventListener("value", callback);
    let name = eventname ? String(eventname) : "value";
    this[memlisteners].push([name, () => callback(this)]);
  }
  [removeallistenerssymbol]() {
    this[memlisteners].forEach(([value, callback]) => {
      this[eventtargetsymbol].removeEventListener(value, callback);
    });
  }
  [addallistenerssymbol]() {
    this[memlisteners].forEach(([value, callback]) => {
      this[eventtargetsymbol].addEventListener(value, callback);
    });
  }
}
