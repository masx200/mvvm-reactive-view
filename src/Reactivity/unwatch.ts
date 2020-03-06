import ReactiveState, { removeallistenerssymbol } from "./reactivestate.js";
export function unwatch(state: ReactiveState<any>): void {
    state[removeallistenerssymbol]();
}
