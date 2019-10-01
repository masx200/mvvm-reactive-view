import {
  //   deleteProperty,
  get,
  //   getOwnPropertyDescriptor,
  has,
  ownKeys
  //   getPrototypeOf
  //   set
} from "./reflect";

import ReactiveState, {
  isReactiveState,
  dispatchsymbol
} from "./reactivestate";
import { isFunction, isArray, isobject } from "./util";
import { invalid_ReactiveState } from "./conditon";
import { invalid_Function, usestste } from "./context-mounted-unmounted-";
import readonlyproxy from "./readonlyproxy";
import { watch } from "./watch";
import { toArray } from "./toArray";
const { defineProperty } = Object;
export default (
  state: ReactiveState | Array<ReactiveState>,
  callback: Function
) => {
  if (
    !(
      (isArray(state) || isReactiveState(state)) &&
      // state instanceof ReactiveState
      isFunction(callback)
    )
  ) {
    console.error(state);
    console.error(callback);
    throw TypeError(invalid_ReactiveState + invalid_Function);
  }
  let state1array: ReactiveState[];
  //   if (isReactiveState(state)) {
  state1array = toArray(state);
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
};
/* interface Call{
    (...[]:Array)
} */
function Arraycomputed(
  state: ReactiveState[],
  callback: Function
): ReactiveState {
  const reactivestate = new ReactiveState();
  const getter = () => {
    const value = callback.call(undefined, ...state.map(st => st.valueOf()));
    return isReactiveState(value) ? value.value : value;
  };
  defineProperty(reactivestate, "value", {
    get: getter,
    configurable: true
  });
  let memorized = getter();
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
      const myvalue = get(target, "value");
      const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];

      if (has(target, key)) {
        return get(target, key);
      } else if (has(myvalueobj, key)) {
        return get(myvalueobj, key);
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
