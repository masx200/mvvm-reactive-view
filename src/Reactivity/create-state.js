import { combineproxy } from "src/others/combineproxy";
import { set } from "../UtilTools/reflect";
import { isfunction, isobject, isprimitive } from "../UtilTools/util";
import { getproperyreadproxy } from "./getproperyread-proxy";
import handleobjectstate from "./handle-object-state";
import ReactiveState, {
    dispatchsymbol,
    invalid_primitive_or_object_state
} from "./reactivestate.js";
import { isReactiveState } from "./isReactiveState";
export const set_prototype = Set.prototype;
export default createState;
export { createState };
const handler = {
    defineProperty() {
        return false;
    },
    deleteProperty() {
        return false;
    },
    set(target, key, value) {
        if (key === "value") {
            if (target[key] !== value) {
                set(target, key, value);
                target[dispatchsymbol]();
            }
            return true;
        } else {
            console.error(value);
            console.error(invalid_primitive_or_object_state);
            throw TypeError();
        }
    },
    setPrototypeOf() {
        return false;
    }
};
function createState(init) {
    if (isprimitive(init) || isfunction(init)) {
        return getproperyreadproxy(
            combineproxy(
                new ReactiveState({ value: init }),
                Object.assign({}, handler)
            )
        );
    } else if (isReactiveState(init)) {
        throw TypeError();
    } else if (isobject(init)) {
        return handleobjectstate(init);
    } else {
        throw TypeError();
    }
}
//# sourceMappingURL=create-state.js.map
