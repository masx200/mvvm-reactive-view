export const invalid_primitive_or_object_state =
  "invalid primitive or object state";
export function isReactiveState(a: any): a is ReactiveState {
  return a instanceof ReactiveState;
}
// import Reflect from "./reflect";
import { getsymbol, isobject, isSet } from "./util";
// export const textnodesymbol = Symbol("textnode");
export const changetextnodesymbol = Symbol("changetextnode");
import isprimitive from "./isprimitive";
import { get } from "./reflect";
export const eventtargetsymbol = Symbol("eventtatget");
export const memlisteners = Symbol("memlisteners");
export const dispatchsymbol = Symbol("dispatch");
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
export default class ReactiveState
/* extends forkarray  */

{
  /* get [Symbol.toStringTag]() {
    return "ReativeState";

} */
  [addallistenerssymbol]() {
    this[memlisteners].forEach(([value, callback]) => {
      this[eventtargetsymbol].addEventListener(value, callback);
    });
  }
  /*  [changetextnodesymbol](textnode: Text) {
    this[textnodesymbol] = textnode;
  } */
  // [textnodesymbol]: Text | undefined;
  value: string | number | boolean | undefined | object;
  [eventtargetsymbol] = new EventTarget();
  [memlisteners]: Array<[string, EventListener]> = [];
  constructor(init?: string | number | boolean | object | undefined) {
    //super();
    if (isprimitive(init) || isobject(init)) {
      Object.defineProperty(this, "value", {
        value: init,
        configurable: true,
        writable: true
      });

      // this.value = init;
    } else {
      console.error(init);
      throw TypeError(invalid_primitive_or_object_state);
    }
    // this[eventtargetsymbol] = new EventTarget();

    /*
    Object.defineProperty(this, Symbol.toStringTag, {
      value: "ReactiveState",
      configurable: true
    });

*/
  }

  valueOf=() =>{
    return this.value;
  }
  toString() {
    const value = this.value;
    return isprimitive(value)
      ? String(value)
      : isSet(value)
      ? JSON.stringify([...value])
      : isobject(value)
      ? JSON.stringify(value)
      : "";
  }
  [dispatchsymbol](eventname?: string) {
    const name = eventname ? String(eventname) : "value";
    if (name !== "value") {
      this[eventtargetsymbol].dispatchEvent(
        new CustomEvent(name, { detail: name })
      );
    }

    this[eventtargetsymbol].dispatchEvent(
      new CustomEvent("value", { detail: name })
    );
  }
  [subscribesymbol](callback: Function, eventname?: string) {
    // this[eventtargetsymbol].addEventListener("value", callback);
    const name = eventname ? String(eventname) : "value";
    this[memlisteners].push([
      name,
      (event: Event) => callback.call(undefined, this, get(event, "detail"))
    ]);
  } /*  */
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
Reflect.defineProperty(ReactiveState.prototype, Symbol.toStringTag, {
  value: "ReactiveState"
});
