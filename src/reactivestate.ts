import debounce from "lodash/debounce"

const debouncedispatch=Symbol("debouncedispatch")
export const invalid_primitive_or_object_state =
  "invalid primitive or object state";
export function isReactiveState(a: any): a is ReactiveState<any> {
  return a instanceof ReactiveState;
}
// import Reflect from "./reflect";
import isprimitive from "./isprimitive";
import { get } from "./reflect";
import { isobject, isSet } from "./util";
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

export default class ReactiveState<
  T extends string | number | boolean | undefined | object | bigint
> {
[Symbol.toStringTag]="ReactiveState"

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
  }

  /* get [Symbol.toStringTag]() {
  //  return "ReativeState";

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
  /*  [changetextnodesymbol](textnode: Text) {
      this[textnodesymbol] = textnode;
    } */
  // [textnodesymbol]: Text | undefined;
  value: T | undefined;
  [eventtargetsymbol] = new EventTarget();
  [memlisteners]: Array<[string, EventListener]> = [];

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

[debouncedispatch]=debounce((eventname)=>{
const name = eventname ? String(eventname) : "value";
    //  if (name !== "value") {
    //    this[eventtargetsymbol].dispatchEvent(
    //     new CustomEvent(name, { detail: name })
    //  );
    // }

    this[eventtargetsymbol].dispatchEvent(
      new CustomEvent("value", { detail: name })
    );

})
  [dispatchsymbol](eventname?: string) {
//添加防抖函数

this[debouncedispatch](eventname)
    
  }
  [subscribesymbol](callback: Function /*, eventname?: string*/) {
    // this[eventtargetsymbol].addEventListener("value", callback);
    // const name = eventname ? String(eventname) : "value";
    const name = "value";
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
    const value = this.valueOf();
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
