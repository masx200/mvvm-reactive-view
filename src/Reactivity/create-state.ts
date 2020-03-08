// import { any } from "./watch";
import { combineproxy } from "src/others/combineproxy";
import { set } from "../UtilTools/reflect";
import { isfunction, isobject, isprimitive } from "../UtilTools/util";
import { getproperyreadproxy } from "./getproperyread-proxy";
import handleobjectstate from "./handle-object-state";
import ReactiveState, {
    dispatchsymbol,
    invalid_primitive_or_object_state} from "./reactivestate.js";
import { GetParentType } from "./GetParentType";
import { isReactiveState } from "./isReactiveState";
export type StateType<T> = ReactiveState<GetParentType<T>> & GetParentType<T>;
export const set_prototype = Set.prototype;

export default createState;
export { createState };
const handler: ProxyHandler<any> = {
    defineProperty() {
        return false;
    },
    deleteProperty() {
        return false;
    },
    set(target, key, value) {
        if (
            key ===
            "value" /* &&
            ((isprimitive(value) && isprimitive(init)) ||
                (isfunction(value) && isfunction(init))) */
        ) {
            if (target[key] !== value) {
                set(target, key, value);
                target[dispatchsymbol]();
            }
            return true;
        } else {
            console.error(value);
            // console.error(init);
            console.error(invalid_primitive_or_object_state);
            throw TypeError();
        }
    },
    setPrototypeOf() {
        return false;
    }
};
function createState<T extends Exclude<any, ReactiveState<any>>>(
    init: T
): StateType<T> {
    if (isprimitive(init) || isfunction(init)) {
        return getproperyreadproxy(
            combineproxy(
                new ReactiveState({ value: init }),
                Object.assign({}, handler)
            )
        );
    } else if (isReactiveState(init)) {
        // return createState(init.valueOf() as any);
        throw TypeError();
    } else if (isobject(init)) {
        //

        return handleobjectstate(init) as StateType<T>;
    } else {
        throw TypeError();
    }
}
