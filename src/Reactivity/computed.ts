import { invalid_ReactiveState } from "src/AttributeClass/conditon";
import { invalid_Function } from "src/life-cycle-context/Component-context";
import { toArray } from "src/UtilTools/toArray";
import { isArray, isFunction } from "src/UtilTools/util";
import { computedmany } from "./computedmany";
// import { any } from "./watch";
import { gettercallback } from "./gettercallback";
import ReactiveState from "./reactivestate.js";
import { isReactiveState } from "./isReactiveState";
import { UnWrapState } from "./unwrapstate";
import { UnWrapArray } from "./UnWrapArray";
function computed<T extends any, Y extends ReactiveState<any>>(
    state: Y,
    callback: gettercallback<T, [UnWrapState<Y>]>,
    setter?: SetterFun
): ReactiveState<T>;
function computed<T extends any, Y extends ReactiveState<any>[]>(
    state: Y,
    callback: gettercallback<T, UnWrapState<UnWrapArray<Y>>[]>,
    setter?: SetterFun
): ReactiveState<T>;
function computed(
    state: ReactiveState<any> | Array<ReactiveState<any>>,
    callback: gettercallback<any, any[]>,
    setter?: SetterFun
): ReactiveState<any> {
    if (!((isArray(state) || isReactiveState(state)) && isFunction(callback))) {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);

        throw TypeError();
    }
    const state1array: ReactiveState<any>[] = toArray(state);
    if (!state1array.length) {
        console.error("Empty array not allowed");
        throw new Error();
    }

    const state1 = computedmany(state1array, callback, setter);

    return state1;
}
export default computed;
export type SetterFun = (v: any) => void;
// export { computed };
