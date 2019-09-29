import { requestAnimationFrame } from "./directives";
import { isFunction } from "./util";
import ReactiveState, {
  isReactiveState,
  subscribesymbol,
  removeallistenerssymbol,
  addallistenerssymbol
} from './reactivestate';
import { invalid_ReactiveState } from "./conditon";
import { invalid_Function } from "./context-mounted-unmounted-";
export function watch(
  state: ReactiveState,
  callback: Function,
  statekey?: string
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
    throw TypeError(invalid_ReactiveState + invalid_Function);
  }

  if (statekey) {
    state[subscribesymbol](callback, statekey);
  } else {
    state[subscribesymbol](callback);
  }

  requestAnimationFrame(() => {
    state[addallistenerssymbol]();
  });
}
export function unwatch(state: ReactiveState): void {
  state[removeallistenerssymbol]();
}

export function rewatch(state: ReactiveState): void {
  state[addallistenerssymbol]();
}
