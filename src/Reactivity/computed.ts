/* interface CallbackReactiveState<
 
> {
  (...args: T[]): any;
} */
import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Function, usestste } from "../context-mounted-unmounted";
import {
  apply,
  //   getPrototypeOf
  //   set
  defineProperty
} from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import { isArray, isFunction, isobject, isprimitive } from "../UtilTools/util";
import computed from "./computed";
import { getproperyreadproxy } from "./getproperyreadproxy";
import ReactiveState, {
  dispatchsymbol,
  isReactiveState
} from "./reactivestate";
import readonlyproxy from "./readonlyproxy";
import { CallbackReactiveState, UnwrapedState, watch } from "./watch";

//const { defineProperty } = Object;
export default function<T extends UnwrapedState>(
  state: ReactiveState<T> | Array<ReactiveState<T>>,
  callback: CallbackReactiveState
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

function Arraycomputed<T extends UnwrapedState>(
  state: ReactiveState<T>[],
  callback: CallbackReactiveState
): ReactiveState<any> {
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

// export function getproperyreadproxy<T extends object>(a: T): T;

export { computed };
