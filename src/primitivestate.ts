import { getsymbol } from "./util";
import isprimitive from "./isprimitive";
export const eventtargetsymbol = Symbol("eventtatget");
export const memlisteners = Symbol("memlisteners");
export const dispatchsymbol = getsymbol("dispatch");
export const subscribesymbol = getsymbol("subscribe");
export const removeallistenerssymbol = getsymbol("removeallisteners");
export const addallistenerssymbol = getsymbol("addallisteners");
export default class {
  value: string | number | boolean | undefined;
  [eventtargetsymbol] = new EventTarget();
  [memlisteners] = [];
  constructor(init: string | number | boolean) {
    if (isprimitive(init)) {
      this.value = init;
    } else {
      throw TypeError("invalid primitive");
    }
    // this[eventtargetsymbol] = new EventTarget();

    Object.defineProperty(this, Symbol.toStringTag, {
      value: "primitivestate"
    });
  }
  [Symbol.toPrimitive]() {
    return this.value;
  }
  valueOf() {
    return this.value;
  }
  toString() {
    return String(this.value);
  }
  [dispatchsymbol]() {
    this[eventtargetsymbol].dispatchEvent(new Event("value"));
  }
  [subscribesymbol](callback: EventListener) {
    // this[eventtargetsymbol].addEventListener("value", callback);
    this[memlisteners].push(["value", callback]);
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
