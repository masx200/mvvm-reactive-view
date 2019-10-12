/* interface CallbackReactiveState<
 
> {
  (...args: T[]): any;
} */
import { invalid_ReactiveState } from "./conditon";
import { invalid_Function, usestste } from "./context-mounted-unmounted";
import ReactiveState, {
  dispatchsymbol,
  isReactiveState
} from "./reactivestate";
import readonlyproxy from "./readonlyproxy";
import {
  apply,
  //   getPrototypeOf
  //   set
  defineProperty,
  //   deleteProperty,
  get,
  //   getOwnPropertyDescriptor,
  has,
  ownKeys,
  getOwnPropertyDescriptor
} from "./reflect";
import { toArray } from "./toArray";
import { isArray, isFunction, isobject, isprimitive, issymbol } from "./util";
import { CallbackReactiveState, UnwrapedState, watch } from "./watch";

//const { defineProperty } = Object;
export default function<T extends UnwrapedState>(
  state: ReactiveState<T> | Array<ReactiveState<T>>,
  callback: CallbackReactiveState
): Readonly<ReactiveState<any>> {
  if (
    !(
      (isArray(state) || isReactiveState(state)) &&
      // state instanceof ReactiveState
      isFunction(callback)
    )
  ) {
    console.error(state);
    console.error(callback);
    console.error(invalid_ReactiveState + invalid_Function);

    throw TypeError();
  }
  const state1array: ReactiveState<T>[] =
    //   if (isReactiveState(state)) {
    toArray(state);
  if (!state1array.length) {
    console.error("Empty array not allowed");
    throw new Error();
  }
  /*  state1 = Arraycomputed(
      toArray(state),

      callback
    ); */
  //   } else if (isArray(state)) {
  //     state1array = state;
  //     // state1 = Arraycomputed(state, callback);
  //   } else {
  //     state1array = Array.from(state);
  //   }
  const state1 = Arraycomputed(state1array, callback);
  usestste(state1);
  return state1;
}

function Arraycomputed<T extends UnwrapedState>(
  state: ReactiveState<T>[],
  callback: CallbackReactiveState
): Readonly<ReactiveState<any>> {
  const reactivestate = new ReactiveState();
  const getter = () => {
    //自动解包
    const value = apply(callback, undefined, state.map(st => st.valueOf()));
    // callback(...state.map(st => st.valueOf()));
    const possiblevalue = isReactiveState(value) ? value.valueOf() : value;

    if (isobject(possiblevalue) || isprimitive(possiblevalue)) {
      return possiblevalue;
    } else {
      console.error(possiblevalue);
      throw TypeError();
    }
  };

  let memorized = getter();

  // if (isFunction(memorized)) {
  //   console.error(memorized);
  //   throw new TypeError();
  // }
  defineProperty(reactivestate, "value", {
    get: getter,
    configurable: true
  });

  state.forEach(state => {
    watch(state, () => {
      let newvalue = getter();
      if (newvalue !== memorized) {
        reactivestate[dispatchsymbol]();

        memorized = newvalue;
      }
      //
    });
  });

  return readonlyproxy(getproperyreadproxy(reactivestate));
}
const __proto__ = "__proto__";
export function getproperyreadproxy<T extends object>(a: T): T;
export function getproperyreadproxy(a: object) {
  /* 把基本类型原型的属性 也加上*/
  //   const target = isobject(a) ? a : getPrototypeOf(a);
  const target = a;
  return new Proxy(target, {
    getOwnPropertyDescriptor(target, key) {
      //对于symbol属性，返回undefined
      if (issymbol(key)) {
        return;
      } else {
        return getOwnPropertyDescriptor(target, key);
      }
    },
    ownKeys(target) {
      let myvalue = get(target, "value");
      const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
      //   return ownKeys(target);
      return Array.from(new Set([...ownKeys(target), ...ownKeys(myvalueobj)]));

      /* Array.from(
        new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
      ); */
    },
    has(target, key) {
      const myvalue = get(target, "value");
      const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
      return has(target, key) || has(myvalueobj, key);
    },
    get(target, key) {
      if (has(target, key)) {
        return get(target, key);
      } else {
        const myvalue = get(target, "value");
        const myvalueobj = isobject(myvalue) ? myvalue : Object(myvalue);

        if (has(myvalueobj, key)) {
          /* 对于string,number等原始类型,返回的函数要绑定this */
          const property = get(myvalueobj, key);
          return isFunction(property) ? property.bind(myvalueobj) : property;
        }
      }
      //   return get(target, key);
      /*  const myvalue = get(target, "value");

      if (has(target, key)) {
        return get(target, key);
      } else if (has(myvalue, key)) {
        return get(myvalue, key);
      } */
    }
  });
}
