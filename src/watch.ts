import debounce from "lodash/debounce";
import { invalid_ReactiveState } from "./conditon";
import { invalid_Function, usewatch } from "./context-mounted-unmounted";
import { Primitivetype } from "./isprimitive";
import ReactiveState, {
  addallistenerssymbol,
  cancelsubscribe,
  isReactiveState,
  removeallistenerssymbol,
  subscribesymbol
} from "./reactivestate";
import { toArray } from "./toArray";
//import { requestAnimationFrame } from "./directives";
import { isarray, isFunction } from "./util";
export type CancelWatchfun = () => void;
export type UnwrapedState = Primitivetype | Exclude<object, Function>;

export interface CallbackReactiveState /* <
  
> */ {
  (...args: UnwrapedState[]): void;
}

export function watch<T extends UnwrapedState>(
  state: ReactiveState<T> | Array<ReactiveState<T>>,

  callback: CallbackReactiveState
) {
  if (isarray(state) || isReactiveState(state)) {
    const statearray: ReactiveState<any>[] = toArray(state);
    if (!statearray.length) {
      console.error("Empty array not allowed");
      throw new Error();
    }
    /* 给watch的callback自动防抖 */
    const debouncedcallback = debounce(callback);
    const stateandlisteners: [ReactiveState<any>, Function][] = statearray.map(
      state1 => {
        const listener = () => {
          //watch的回调函数自动解包
          debouncedcallback(...statearray.map(r => r.valueOf()));
        };
        watchsingle(
          state1,

          listener
        );

        return [state1, listener];
      }
    );

    const cancelWatch: CancelWatchfun = () => {
      stateandlisteners.forEach(([state, listener]) => {
        state[cancelsubscribe](listener);
      });
    };
    return cancelWatch;
  }
  //  else if (isReactiveState(state)) {
  //  watchsingle(state, callback);
  ////return watch(toArray(state),callback)
  // }
  else {
    console.error(state);
    console.error(callback);
    console.error(invalid_ReactiveState + invalid_Function);
    throw new TypeError();
  }
}

function watchsingle(
  state: ReactiveState<any>,
  callback: Function
  //  statekey?: string
) {
  if (
    !(
      isReactiveState(state) &&
      // state instanceof ReactiveState
      isFunction(callback)
    )
  ) {
    console.error(state);
    console.error(callback);
    console.error(invalid_ReactiveState + invalid_Function);

    throw TypeError();
  }

  state[subscribesymbol](callback);

  //  if (statekey) {

  //   state[subscribesymbol](callback, statekey);
  // } else {

  //  }

  requestAnimationFrame(() => {
    rewatch(state);
    // state[addallistenerssymbol]();
  });

  usewatch(state, callback);
}
export function unwatch(state: ReactiveState<any>): void {
  state[removeallistenerssymbol]();
}

export function rewatch(state: ReactiveState<any>): void {
  state[addallistenerssymbol]();
}
