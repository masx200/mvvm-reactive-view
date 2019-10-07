/* export interface CallbackReactiveState<T extends string | number | boolean | undefined | object|bigint > {
  
 (...ReactiveState<T>[])=>any
} */
interface CallbackReactiveState2<
  T extends string | number | boolean | undefined | object | bigint
> {
  (...args: T[]): any;
}
import { invalid_ReactiveState } from "./conditon";
import { invalid_Function, usestste } from "./context-mounted-unmounted-";
import ReactiveState, {
  dispatchsymbol,
  isReactiveState
} from "./reactivestate";
import readonlyproxy from "./readonlyproxy";
import {
  defineProperty,
  //   deleteProperty,
  get,
  //   getOwnPropertyDescriptor,
  has,
  ownKeys,
  apply
  //   getPrototypeOf
  //   set
} from "./reflect";
import { toArray } from "./toArray";
import { isArray, isFunction, isobject } from "./util";
import { watch } from "./watch";

//const { defineProperty } = Object;
export default function<
  T extends string | number | boolean | undefined | object | bigint
>(
  state: ReactiveState<T> | Array<ReactiveState<T>>,
  callback: CallbackReactiveState2<T>
): ReactiveState<any> {
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

function Arraycomputed<
  T extends string | number | boolean | undefined | object | bigint
>(
  state: ReactiveState<T>[],
  callback: CallbackReactiveState2<T>
): ReactiveState<any> {
  const reactivestate = new ReactiveState();
  const getter = () => {
    const value = apply(callback, undefined, state.map(st => st.valueOf()));
    // callback(...state.map(st => st.valueOf()));
    return isReactiveState(value) ? value.value : value;
  };

  let memorized = getter();

  if (isFunction(memorized)) {
    console.error(memorized);
    throw new TypeError();
  }
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

  return getproperyreadproxy(readonlyproxy(reactivestate));
}
const __proto__ = "__proto__";
export function getproperyreadproxy<T extends object>(a: T): T;
export function getproperyreadproxy(a: object) {
  /* 把基本类型原型的属性 也加上*/
  //   const target = isobject(a) ? a : getPrototypeOf(a);
  const target = a;
  return new Proxy(target, {
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
          return get(myvalueobj, key);
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
