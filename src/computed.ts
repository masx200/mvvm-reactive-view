import {
  deleteProperty,
  get,
  getOwnPropertyDescriptor,
  has,
  ownKeys,
  set
} from "./reflect";

import ReactiveState, {
  isReactiveState,
  dispatchsymbol
} from "./primitivestate";
import { isFunction, isArray } from "./util";
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

/* function computed(state: ReactiveState, callback: Function): ReactiveState {
  const reactivestate = new ReactiveState();
  const getter = () => {
    return callback.call(undefined, state);
  };
  defineProperty(reactivestate, "value", {
    get: getter,
    configurable: true
  });
  let memorized = getter();
  watch(state, () => {
    let newvalue = getter();
    if (newvalue !== memorized) {
      reactivestate[dispatchsymbol]();
    }
    //
  });
  return readonlyproxy(reactivestate);
} */

function Arraycomputed(
  state: ReactiveState[],
  callback: Function
): ReactiveState {
  const reactivestate = new ReactiveState();
  const getter = () => {
    return callback.call(undefined, ...state);
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

export function getproperyreadproxy(a: any) {
  return new Proxy(a, {
    ownKeys(target) {
      return Array.from(
        new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
      );
    },
    has(target, key) {
      const myvalue = get(target, "value");
      return has(target, key) || has(myvalue, key);
    },
    get(target, key) {
      const myvalue = get(target, "value");

      if (has(target, key)) {
        return get(target, key);
      } else if (has(myvalue, key)) {
        return get(myvalue, key);
      }
    }
  });
}
