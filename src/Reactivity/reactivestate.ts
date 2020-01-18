const EventTarget = window.EventTarget;
import debounce from "lodash/debounce";
import { cached_callback_eventlistner } from "../cached-map";

import isprimitive, { Primitivetype } from "../UtilTools/isprimitive";
import { defineProperty } from "../UtilTools/reflect";
import { isobject, isSet } from "../UtilTools/util";
import { UnwrapedState } from "./watch";
import { recordusestste } from "../mounted-unmounted/Component-context";
export const addonelistner = Symbol("addonelistner");
export const removeonelistner = Symbol("removeonelistner");

export const cancelsubscribe = Symbol("cancelsubscribe");
const debouncedispatch = Symbol("debouncedispatch");
export const invalid_primitive_or_object_state =
  "invalid primitive or object state";
export function isReactiveState(a: any): a is ReactiveState<any> {
  return (
    a instanceof ReactiveState && a[Symbol.toStringTag] === "ReactiveState"
  );
}

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
  value: T extends Array<any>
    ? Array<any>
    : T extends Function
    ? Function
    : T extends Primitivetype
    ? Primitivetype
    : object;

  readonly [Symbol.toStringTag] = "ReactiveState";

  constructor(init?: T) {
    this.value = init as any;

    defineProperty(this, "value", {
      value: init,
      configurable: true,
      writable: true
    });

    /*
  
 
   
    

*/
    recordusestste(this);
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
    this[memlisteners].forEach(callback => {
      this[addonelistner](callback);
    });
  }
  /*  [changetextnodesymbol](textnode: Text) {
    this[textnodesymbol] = textnode;
  } */

  /*  [changetextnodesymbol](textnode: Text) {
      this[textnodesymbol] = textnode;
    } */

  [eventtargetsymbol] = new EventTarget();
  [memlisteners] = new Set<EventListener>();

  valueOf = () => {
    return this.value;
  };
  toString() {
    const value = this.valueOf();
    return isprimitive(value)
      ? String(value)
      : isSet(value)
      ? JSON.stringify([...(value as Set<any>)])
      : isobject(value)
      ? JSON.stringify(value)
      : "";
  }

  [dispatchsymbol](eventname?: string) {
    this[debouncedispatch](eventname);
  }
  [subscribesymbol](
    callback: Function
    /*, eventname?: string*/
  ) {
    let eventlistener: EventListener;
    const possiblecallback = cached_callback_eventlistner.get(callback);
    if (possiblecallback) {
      eventlistener = possiblecallback;
    } else {
      eventlistener = () => callback(/* this.valueOf() */);

      cached_callback_eventlistner.set(callback, eventlistener);
    }

    this[memlisteners].add(eventlistener);
  }
  [cancelsubscribe](callback: Function) {
    const eventlistener = cached_callback_eventlistner.get(callback);
    /*  if (!eventlistener) {
      throw new Error();
    } */
    if (eventlistener) {
      this[memlisteners].delete(eventlistener);
      this[removeonelistner](eventlistener);
    }
  }

  [Symbol.toPrimitive](): string | undefined | Primitivetype {
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
