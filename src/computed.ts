import ReactiveState, { isReactiveState } from "./primitivestate";
import { isFunction } from "./util";
import { invalid_ReactiveState } from "./conditon";
import { invalid_Function } from "./context-mounted-unmounted-";

export function computed(state: ReactiveState, callback: Function) {
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
}
