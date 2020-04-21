import { gettercallback } from "./gettercallback";
import ReactiveState from "./reactivestate.js";
import { UnWrapState } from "./unwrapstate";
import { UnWrapArray } from "./UnWrapArray";
import { StateType } from "src";
declare function computed<T extends any, Y extends ReactiveState<any>>(
    state: Y,
    callback: gettercallback<T, [UnWrapState<Y>]>,
    setter?: SetterFun
): StateType<T>;
declare function computed<T extends any, Y extends ReactiveState<any>[]>(
    state: Y,
    callback: gettercallback<T, UnWrapState<UnWrapArray<Y>>[]>,
    setter?: SetterFun
): StateType<T>;
export default computed;
export declare type SetterFun = (v: any) => void;
//# sourceMappingURL=computed.d.ts.map
