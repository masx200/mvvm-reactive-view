export type CancelWatch = () => void;
interface CallbackReactiveState<
  T extends string | number | boolean | undefined | object | bigint
> {
  (...args: T[]): void;
}
// import { CallbackReactiveState } from "./computed";
import { invalid_ReactiveState } from "./conditon";
import { invalid_Function } from "./context-mounted-unmounted-";
import ReactiveState, {
  addallistenerssymbol,
  isReactiveState,
  removeallistenerssymbol,
  subscribesymbol
} from "./reactivestate";
//import { requestAnimationFrame } from "./directives";
import { isarray, isFunction } from "./util";
import { toArray } from "./toArray";

export function watch<
  T extends string | number | boolean | undefined | object | bigint
>(
  state: ReactiveState<T> | Array<ReactiveState<T>>,

  callback: CallbackReactiveState<T>
) {
  if (isarray(state)) {
    const statearray = toArray(state);
    if (!statearray.length) {
      console.error("Empty array not allowed");
      throw new Error();
    }
    statearray.forEach(state1 => {
      watchsingle(state1, () => {
//watch的回调函数自动解包
        callback(...statearray.map(r=>r.valueOf()));
      });
    });
  } else if (isReactiveState(state)) {
  //  watchsingle(state, callback);
return watch(toArray(state))
  } else {
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
): void {
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

  state[subscribesymbol](

callback




);

  //  if (statekey) {

  //   state[subscribesymbol](callback, statekey);
  // } else {

  //  }

  requestAnimationFrame(() => {
    rewatch(state);
    // state[addallistenerssymbol]();
  });
}
export function unwatch(state: ReactiveState<any>): void {
  state[removeallistenerssymbol]();
}

export function rewatch(state: ReactiveState<any>): void {
  state[addallistenerssymbol]();
}
