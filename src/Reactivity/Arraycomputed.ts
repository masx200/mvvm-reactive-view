import { apply } from "src/UtilTools/reflect";
import { isfunction, isobject, isprimitive } from "src/UtilTools/util";
import { getproperyreadproxy } from "./getproperyread-proxy";
import ReactiveState, { dispatchsymbol, isReactiveState } from "./reactivestate.js";
import watch, { gettercallback, UnwrapedState } from "./watch";
import { SetterFun } from './computed';
export function Arraycomputed<T extends UnwrapedState>(state: ReactiveState<T>[], callback: gettercallback<T>, setter?: SetterFun): ReactiveState<T> {
    const getter = () => {
        const value = apply(callback, undefined, state.map((st) => st.valueOf()));
        const possiblevalue = isReactiveState(value) ? value.valueOf() : value;
        if (isobject(possiblevalue) || isprimitive(possiblevalue)) {
            return possiblevalue as T;
        }
        else {
            console.error(possiblevalue);
            throw TypeError();
        }
    };
    let memorized = getter();
    const reactivestate = new ReactiveState({
        set: isfunction(setter) ? setter : undefined,
        get: getter
    });
    // defineProperty(reactivestate, "value", {
    //     set: isfunction(setter) ? setter : undefined,
    //     get: getter,
    //     configurable: true
    // });
    state.forEach((state) => {
        watch(state, () => {
            let newvalue = getter();
            if (newvalue !== memorized) {
                reactivestate[dispatchsymbol]();
                memorized = newvalue;
            }
            //
        });
    });
    return getproperyreadproxy(reactivestate);
}
