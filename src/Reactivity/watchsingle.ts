import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Function } from "../life-cycle-context/Component-context";
import { usewatch } from "../life-cycle-context/usewatchrecord";
import ReactiveState, { isReactiveState, subscribesymbol } from "./reactivestate.js";
import { isFunction } from "../UtilTools/util";
import { Listener } from "./custom-observer-target";
import { rewatch } from './watch';
export function watchsingle(state: ReactiveState<any>, callback: Listener) {
    if (!(isReactiveState(state) && isFunction(callback))) {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);
        throw TypeError();
    }
    state[subscribesymbol](callback);
    requestAnimationFrame(() => {
        rewatch(state);
    });
    usewatch(state, callback);
}
