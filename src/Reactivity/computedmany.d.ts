import { SetterFun } from "./computed";
import { gettercallback } from "./gettercallback";
import ReactiveState from "./reactivestate.js";
import { UnWrapState } from "./unwrapstate";
import { UnWrapArray } from "./UnWrapArray";
import { StateType } from "./create-state";
export declare function computedmany<
    T extends any,
    Y extends ReactiveState<any>[]
>(
    state: Y,
    callback: gettercallback<T, UnWrapState<UnWrapArray<Y>>[]>,
    setter?: SetterFun
): StateType<T>;
//# sourceMappingURL=computedmany.d.ts.map
