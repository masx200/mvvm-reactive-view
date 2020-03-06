import { invalid_ReactiveState } from "src/AttributeClass/conditon";
import { invalid_Function } from "src/life-cycle-context/Component-context";
import { toArray } from "src/UtilTools/toArray";
import {
    isArray,
    isFunction} from "src/UtilTools/util";
import ReactiveState, {
    isReactiveState
} from "./reactivestate.js";
import { gettercallback, UnwrapedState } from "./watch";
import { Arraycomputed } from './Arraycomputed';

const computed = function<T extends UnwrapedState>(
    state: ReactiveState<T> | Array<ReactiveState<T>>,
    callback: gettercallback<T>,
    setter?: SetterFun
): ReactiveState<T> {
    if (!((isArray(state) || isReactiveState(state)) && isFunction(callback))) {
        console.error(state);
        console.error(callback);
        console.error(invalid_ReactiveState + invalid_Function);

        throw TypeError();
    }
    const state1array: ReactiveState<T>[] = toArray(state);
    if (!state1array.length) {
        console.error("Empty array not allowed");
        throw new Error();
    }

    const state1 = Arraycomputed(state1array, callback, setter);

    return state1;
};
export default computed;
export type SetterFun = (v: any) => void;
export { computed };
