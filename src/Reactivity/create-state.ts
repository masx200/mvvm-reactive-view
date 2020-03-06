import { set } from "../UtilTools/reflect";
import { isfunction, isobject, isprimitive } from "../UtilTools/util";
import { getproperyreadproxy } from "./getproperyread-proxy";

import handleobjectstate from "./handle-object-state";
import ReactiveState, {
    dispatchsymbol,
    invalid_primitive_or_object_state,
    isReactiveState
} from "./reactivestate.js";
// import { any } from "./watch";
import { combineproxy } from "src/others/combineproxy";
export const set_prototype = Set.prototype;

export default createState;
export { createState };
function createState<T extends any>(init: ReactiveState<T>): ReactiveState<T>;
function createState<T extends any>(
    init: Exclude<T, ReactiveState<any>> | undefined
): ReactiveState<T>;

function createState<T extends any>(
    init: Exclude<T, ReactiveState<any>> | ReactiveState<T> | undefined
) {
    /*   if (!(isprimitive(init) || isobject(init) || isReactiveState(init))) {
    console.error(init);
    console.error(invalid_primitive_or_object_state);
    throw TypeError();
  } */

    if (isprimitive(init) || isfunction(init)) {
        const handler: ProxyHandler<any> = {
            defineProperty() {
                return false;
            },
            deleteProperty() {
                return false;
            },
            set(target, key, value) {
                /*  if (key === textnodesymbol) {
      return set(target, key, value);
    } */

                if (
                    key === "value" &&
                    ((isprimitive(value) && isprimitive(init)) ||
                        (isfunction(value) && isfunction(init)))
                ) {
                    if (target[key] !== value) {
                        set(target, key, value);
                        target[dispatchsymbol]();
                    }
                    return true;
                } else {
                    console.error(value);
                    console.error(init);
                    console.error(invalid_primitive_or_object_state);
                    throw TypeError();
                }
            },
            setPrototypeOf() {
                return false;
            }
        };
        return getproperyreadproxy(
            combineproxy(new ReactiveState({ value: init }), handler)
        );
    } else if (isReactiveState(init)) {
        return createState(init.valueOf() as any);
    } else if (isobject(init)) {
        //

        return handleobjectstate(init);
    } else {
        throw Error();
    }
}
