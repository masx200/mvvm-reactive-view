import { StateType } from "./create-state";
import ReactiveState from "./reactivestate.js";
export default function<T extends Exclude<object, ReactiveState<any>>>(
    init: T
): StateType<T>;
//# sourceMappingURL=handle-object-state.d.ts.map
