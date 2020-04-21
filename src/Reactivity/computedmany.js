import { apply } from "src/UtilTools/reflect";
import { isfunction, isobject, isprimitive } from "src/UtilTools/util";
import { getproperyreadproxy } from "./getproperyread-proxy";
import ReactiveState, { dispatchsymbol } from "./reactivestate.js";
import { isReactiveState } from "./isReactiveState";
import watch from "./watch";
export function computedmany(state, callback, setter) {
    const getter = () => {
        const value = apply(
            callback,
            undefined,
            state.map((st) => st.valueOf())
        );
        const possiblevalue = isReactiveState(value) ? value.valueOf() : value;
        if (isobject(possiblevalue) || isprimitive(possiblevalue)) {
            return possiblevalue;
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
    state.forEach((state) => {
        watch(state, () => {
            let newvalue = getter();
            if (newvalue !== memorized) {
                reactivestate[dispatchsymbol]();
                memorized = newvalue;
            }
        });
    });
    return getproperyreadproxy(reactivestate);
}
//# sourceMappingURL=computedmany.js.map
