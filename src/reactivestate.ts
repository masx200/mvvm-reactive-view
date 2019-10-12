export const addonelistner = Symbol("addonelistner");
export const removeonelistner = Symbol("removeonelistner");
import debounce from "lodash/debounce";
// import Reflect from "./reflect";
import isprimitive from "./isprimitive";
import { gettagtype, isobject, isSet } from "./util";
import { UnwrapedState } from "./watch";
export const callbackmap = Symbol("callbackmap");
export const cancelsubscribe = Symbol("cancelsubscribe");
const debouncedispatch = Symbol("debouncedispatch");
export const invalid_primitive_or_object_state =
  "invalid primitive or object state";
export function isReactiveState(a: any): a is ReactiveState<any> {
  return a instanceof ReactiveState && gettagtype(a) === "ReactiveState";
}
// export const textnodesymbol = Symbol("textnode");
export const changetextnodesymbol = Symbol("changetextnode");
export const eventtargetsymbol = Symbol("eventtatget");
export const memlisteners = Symbol("memlisteners");
export const dispatchsymbol = Symbol("dispatch");
export const subscribesymbol = Symbol("subscribe");
export const removeallistenerssymbol = Symbol("removeallisteners");
export const addallistenerssymbol = Symbol("addallisteners");
/* const forkarryaprototype = {};
ownKeys(Array.prototype).forEach(key => {
  forkarryaprototype[key] = Array.prototype[key];
}); */
/* class forkarray {}
Object.assign(forkarray.prototype, forkarryaprototype);
forkarray.prototype.constructor = forkarray;
deleteProperty(forkarray.prototype, "length"); */
/* extends forkarray  */

export default class ReactiveState<T extends UnwrapedState> {
  [callbackmap] = new Map<Function, EventListener>();

  readonly [Symbol.toStringTag] = "ReactiveState";

  constructor(init?: T) {
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
      console.error(invalid_primitive_or_object_state);
      throw TypeError();
    }
    // this[eventtargetsymbol] = new EventTarget();

    /*
  //  Object.defineProperty(this, Symbol.toStringTag, {
 //     value: "ReactiveState",
   //   configurable: true
    //});

*/

    const debouncedfun = debounce((eventname?: string) => {
      const name = eventname ? String(eventname) : "value";

      this[eventtargetsymbol].dispatchEvent(
        new CustomEvent("value", { detail: name })
      );
    });
    this[debouncedispatch] = (eventname?: string) => {
      debouncedfun(eventname);
    };
  }
  [debouncedispatch]: (eventname?: string | undefined) => void;
  /* get [Symbol.toStringTag]() {
  //  return "ReativeState";

} */
  [removeallistenerssymbol]() {
    this[memlisteners].forEach(callback => {
      this[removeonelistner](callback);
    });
  }
  [removeonelistner](callback: EventListener) {
    const name = "value";
    this[eventtargetsymbol].removeEventListener(name, callback);
  }
  [addonelistner](callback: EventListener) {
    const name = "value";
    this[eventtargetsymbol].addEventListener(name, callback);
  }
  [addallistenerssymbol]() {
    // const name = "value";
    this[memlisteners].forEach(callback => {
      this[addonelistner](callback);
      //   this[eventtargetsymbol].addEventListener(name, callback);
    });
  }
  /*  [changetextnodesymbol](textnode: Text) {
    this[textnodesymbol] = textnode;
  } */
  // [textnodesymbol]: Text | undefined;
  /*  [changetextnodesymbol](textnode: Text) {
      this[textnodesymbol] = textnode;
    } */
  // [textnodesymbol]: Text | undefined;
  value: T | undefined;
  [eventtargetsymbol] = new EventTarget();
  [memlisteners] = new Set<EventListener>();

  //剑头函数绑定this
  valueOf = () => {
    return this.value;
  };
  toString() {
    const value = this.valueOf();
    return isprimitive(value)
      ? String(value)
      : isSet(value)
      ? JSON.stringify([...value])
      : isobject(value)
      ? JSON.stringify(value)
      : "";
  }

  [dispatchsymbol](eventname?: string) {
    //添加防抖函数

    this[debouncedispatch](eventname);
  }
  [subscribesymbol](
    callback: Function
    /*, eventname?: string*/
  ) {
    let eventlistener: EventListener;
    const possiblecallback = this[callbackmap].get(callback);
    if (possiblecallback) {
      eventlistener = possiblecallback;
    } else {
      //自动解包
      eventlistener = () => callback(this.valueOf());

      this[callbackmap].set(callback, eventlistener);
    }
    // this[eventtargetsymbol].addEventListener("value", callback);
    // const name = eventname ? String(eventname) : "value";
    //  const name = "value";
    this[memlisteners].add(eventlistener);
  }
  [cancelsubscribe](callback: Function) {
    const eventlistener = this[callbackmap].get(callback);
    if (!eventlistener) {
      throw new Error();
    }
    this[memlisteners].delete(eventlistener);
    this[removeonelistner](eventlistener);
  }

  [Symbol.toPrimitive]() {
    //return this.value;
    const value = this.valueOf();
    return isprimitive(value)
      ? value
      : isobject(value)
      ? JSON.stringify(value)
      : void 0;
  }
}
/* Reflect.defineProperty(ReactiveState.prototype, Symbol.toStringTag, {
  value: "ReactiveState"
}); */
