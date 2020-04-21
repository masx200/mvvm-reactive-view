import { invalid_ReactiveState } from "src/AttributeClass/conditon";
import { invalid_Function } from "src/life-cycle-context/Component-context";
import { toArray } from "src/UtilTools/toArray";
import { isArray, isFunction } from "src/UtilTools/util";
import { computedmany } from "./computedmany";
import { isReactiveState } from "./isReactiveState";
function computed(state, callback, setter) {
    if (!((isArray(state) || isReactiveState(state)) && isFunction(callback))) {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);
        throw TypeError();
    }
    const state1array = toArray(state);
    if (!state1array.length) {
        console.error("Empty array not allowed");
        throw new Error();
    }
    const state1 = computedmany(state1array, callback, setter);
    return state1;
}
export default computed;
//# sourceMappingURL=computed.js.map
