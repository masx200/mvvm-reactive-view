import { gettercallback } from "./gettercallback";
import ReactiveState from "./reactivestate.js";
import { UnWrapState } from "./unwrapstate";
import { UnWrapArray } from "./UnWrapArray";
export declare type CancelWatchfun = () => void;
declare function watch<T extends any, Y extends ReactiveState<T>>(
    state: Y,
    callback: gettercallback<void, [UnWrapState<Y>]>
): CancelWatchfun;
declare function watch<T extends any, Y extends Array<ReactiveState<T>>>(
    state: Y,
    callback: gettercallback<void, UnWrapState<UnWrapArray<Y>>[]>
): CancelWatchfun;
export default watch;
//# sourceMappingURL=watch.d.ts.map
