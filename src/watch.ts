import Primitivestate, {
  subscribesymbol,
  removeallistenerssymbol,
  addallistenerssymbol
} from "./primitivestate";
export function watch(state: Primitivestate, callback: Function): void {
  state[subscribesymbol](callback);
  requestAnimationFrame(() => {
    state[addallistenerssymbol]();
  });
}
export function unwatch(state: Primitivestate): void {
  state[removeallistenerssymbol]();
}
