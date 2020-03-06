import ReactiveState, { addallistenerssymbol } from "./reactivestate.js";
export function rewatch(state: ReactiveState<any>): void {
    state[addallistenerssymbol]();
}
