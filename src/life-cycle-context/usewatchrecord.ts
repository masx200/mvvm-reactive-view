import ReactiveState from "../Reactivity/reactivestate.js";
import { ctxopen, watchrecord } from './Component-context';
export function usewatch(state: ReactiveState<any>, callback: Function) {
    if (ctxopen) {
        watchrecord.push([state, callback]);
    }
}
