import { removeallistenerssymbol } from "./reactivestate.js";
export function unwatch(state) {
    state[removeallistenerssymbol]();
}
//# sourceMappingURL=unwatch.js.map
