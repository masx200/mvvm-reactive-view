import { invalid_ReactiveState } from "../AttributeClass/conditon";
import { invalid_Function } from "../life-cycle-context/Component-context";
import { usewatch } from "../life-cycle-context/usewatchrecord";
import { subscribesymbol } from "./reactivestate.js";
import { isReactiveState } from "./isReactiveState";
import { isFunction } from "../UtilTools/util";
import { rewatch } from "./rewatch";
export function watchsingle(state, callback) {
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
//# sourceMappingURL=watchsingle.js.map
