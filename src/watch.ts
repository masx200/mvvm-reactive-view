import Reflect from "./reflect";
import { isFunction } from "./util";
import ReactiveState, {
  subscribesymbol,
  removeallistenerssymbol,
  addallistenerssymbol
} from "./primitivestate";
export function watch(
  state: ReactiveState,
  callback: Function,
  statekey?: string
): void {
  if (!(state instanceof ReactiveState && isFunction(callback))) {
    throw TypeError("invalid state or callback");
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
