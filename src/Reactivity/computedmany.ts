import { apply } from "src/UtilTools/reflect";
import { isfunction, isobject, isprimitive } from "src/UtilTools/util";
import { SetterFun } from "./computed";
import { getproperyreadproxy } from "./getproperyread-proxy";
// import watch, { any } from "./watch";
import { gettercallback } from "./gettercallback";
import ReactiveState, { dispatchsymbol } from "./reactivestate.js";
import { isReactiveState } from "./isReactiveState";
import watch from "./watch";
import { UnWrapState } from "./unwrapstate";
import { UnWrapArray } from "./UnWrapArray";
export function computedmany<T extends any, Y extends ReactiveState<any>[]>(
    state: Y,
    callback: gettercallback<T, UnWrapState<UnWrapArray<Y>>[]>,
    setter?: SetterFun
): ReactiveState<T> {
    const getter = () => {
        const value = apply(
            callback,
            undefined,
            state.map((st) => st.valueOf())
        );
        const possiblevalue = isReactiveState(value) ? value.valueOf() : value;
        if (isobject(possiblevalue) || isprimitive(possiblevalue)) {
            return possiblevalue as T;
        } else {
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
