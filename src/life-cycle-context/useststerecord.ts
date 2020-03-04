import ReactiveState from "../Reactivity/reactivestate.js";
import { ctxopen, StateSet } from "./Component-context";
export function useststerecord(state: ReactiveState<any>) {
    if (ctxopen) {
        StateSet.add(state);
    }
}
