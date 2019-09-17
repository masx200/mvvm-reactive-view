export function isReactiveState(a: any): a is ReactiveState {
  return a instanceof ReactiveState;
}
// import Reflect from "./reflect";
import { getsymbol, isobject } from "./util";
export const textnodesymbol = Symbol("textnode");
export const changetextnodesymbol = Symbol("changetextnode");
import isprimitive from "./isprimitive";
export const eventtargetsymbol = Symbol("eventtatget");
export const memlisteners = Symbol("memlisteners");
export const dispatchsymbol = getsymbol("dispatch");
export const subscribesymbol = getsymbol("subscribe");
export const removeallistenerssymbol = getsymbol("removeallisteners");
export const addallistenerssymbol = getsymbol("addallisteners");
/* const forkarryaprototype = {};
ownKeys(Array.prototype).forEach(key => {
  forkarryaprototype[key] = Array.prototype[key];
}); */
/* class forkarray {}
Object.assign(forkarray.prototype, forkarryaprototype);
forkarray.prototype.constructor = forkarray;
deleteProperty(forkarray.prototype, "length"); */
export default class ReactiveState /* extends forkarray  */ {
  [addallistenerssymbol]() {
    this[memlisteners].forEach(([value, callback]) => {
      this[eventtargetsymbol].addEventListener(value, callback);
    });
  }
  /*  [changetextnodesymbol](textnode: Text) {
    this[textnodesymbol] = textnode;
  } */
  [textnodesymbol]: Text | undefined = undefined;
  value: string | number | boolean | undefined | object;
  [eventtargetsymbol] = new EventTarget();
  [memlisteners] = [];
  constructor(init: string | number | boolean | object | undefined) {
    //super();
    if (isprimitive(init) || isobject(init)) {
      Object.defineProperty(this, "value", {
        value: init,
        configurable: true,
        writable: true
      });

      // this.value = init;
    } else {
      throw TypeError("invalid State");
    }
    // this[eventtargetsymbol] = new EventTarget();

    Object.defineProperty(this, Symbol.toStringTag, {
      value: "ReactiveState",
      configurable: true
    });
  }

  valueOf() {
    return this.value;
  }
  toString() {
    const value = this.value;
    return isprimitive(value)
      ? String(value)
      : isobject(value)
      ? JSON.stringify(value)
      : "";
  }
  [dispatchsymbol](eventname?: string) {
    const name = eventname ? String(eventname) : "value";
    if (name !== "value") {
      this[eventtargetsymbol].dispatchEvent(new Event(name));
    }

    this[eventtargetsymbol].dispatchEvent(new Event("value"));
  }
  [subscribesymbol](callback: Function, eventname?: string) {
    // this[eventtargetsymbol].addEventListener("value", callback);
    const name = eventname ? String(eventname) : "value";
    this[memlisteners].push([name, () => callback(this)]);
  }
  [removeallistenerssymbol]() {
    this[memlisteners].forEach(([value, callback]) => {
      this[eventtargetsymbol].removeEventListener(value, callback);
    });
  }
  [Symbol.toPrimitive]() {
    //return this.value;
    const value = this.value;
    return isprimitive(value)
      ? value
      : isobject(value)
      ? JSON.stringify(value)
      : void 0;
  }
}
