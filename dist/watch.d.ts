export declare type CancelWatchfun = () => void;
export declare type UnwrapedState = string | number | boolean | undefined | object | bigint;
export interface CallbackReactiveState {
    (...args: UnwrapedState[]): void;
}
import ReactiveState from "./reactivestate";
export declare function watch<T extends UnwrapedState>(state: ReactiveState<T> | Array<ReactiveState<T>>, callback: CallbackReactiveState): void;
export declare function unwatch(state: ReactiveState<any>): void;
export declare function rewatch(state: ReactiveState<any>): void;
