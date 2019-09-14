import Primitivestate, {
  subscribesymbol,
  removeallistenerssymbol
} from "./primitivestate";
export function watch(state: Primitivestate, callback: Function): void {
  state[subscribesymbol](callback);
}
export function unwatch(state: Primitivestate): void {
  state[removeallistenerssymbol]();
}
