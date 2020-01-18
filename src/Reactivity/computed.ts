import { invalid_Function } from "src/mounted-unmounted/Component-context";
import { apply, defineProperty } from "src/UtilTools/reflect";
import { toArray } from "src/UtilTools/toArray";
import {
  isArray,
  isFunction,
  isfunction,
  isobject,
  isprimitive
} from "src/UtilTools/util";

import { getproperyreadproxy } from "./getproperyread-proxy";
import ReactiveState, {
  dispatchsymbol,
  isReactiveState
} from "./ReactiveState";
import watch, { CallbackReactiveState, UnwrapedState } from "./watch";
import { invalid_ReactiveState } from "src/AttributeClass/conditon";

/* interface CallbackReactiveState<
import { invalid_Function } from '../mounted-unmounted/Component-context';
import { apply, defineProperty } from '../UtilTools/reflect';
import { toArray } from '../UtilTools/toArray';
import { isArray, isFunction, isfunction, isobject, isprimitive } from '../UtilTools/util';
import { getproperyreadproxy } from './getproperyread-proxy';
import ReactiveState, { dispatchsymbol, isReactiveState } from './ReactiveState';
import { CallbackReactiveState, UnwrapedState, watch } from './watch';

 
> {
  (...args: T[]): any;
} */

const computed = function<T extends UnwrapedState>(
  state: ReactiveState<T> | Array<ReactiveState<T>>,
  callback: CallbackReactiveState,
  setter?: SetterFun
): ReactiveState<any> {
  if (!((isArray(state) || isReactiveState(state)) && isFunction(callback))) {
    console.error(state);
    console.error(callback);
    console.error(invalid_ReactiveState + invalid_Function);

    throw TypeError();
  }
  const state1array: ReactiveState<T>[] = toArray(state);
  if (!state1array.length) {
    console.error("Empty array not allowed");
    throw new Error();
  }
  /*  state1 = Arraycomputed(
      toArray(state),

      callback
    ); */

  const state1 = Arraycomputed(state1array, callback, setter);

  return state1;
};
export default computed;
type SetterFun = (v: any) => void;
function Arraycomputed<T extends UnwrapedState>(
  state: ReactiveState<T>[],
  callback: CallbackReactiveState,
  setter?: SetterFun
): ReactiveState<any> {
  const reactivestate = new ReactiveState();
  const getter = () => {
    const value = apply(
      callback,
      undefined,
      state.map(st => st.valueOf())
    );

    const possiblevalue = isReactiveState(value) ? value.valueOf() : value;

    if (isobject(possiblevalue) || isprimitive(possiblevalue)) {
      return possiblevalue;
    } else {
      console.error(possiblevalue);
      throw TypeError();
    }
  };

  let memorized = getter();

  defineProperty(reactivestate, "value", {
    set: isfunction(setter) ? setter : undefined,
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

  return getproperyreadproxy(reactivestate);
}

export { computed };
