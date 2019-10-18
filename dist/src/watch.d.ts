import ReactiveState from "./reactivestate";
export declare type CancelWatchfun = () => void;
export declare type UnwrapedState = any;
export interface CallbackReactiveState {
    (...args: UnwrapedState[]): void;
}
export declare function watch<T extends UnwrapedState>(state: ReactiveState<T> | Array<ReactiveState<T>>, callback: CallbackReactiveState): CancelWatchfun;
export declare function unwatch(state: ReactiveState<any>): void;
export declare function rewatch(state: ReactiveState<any>): void;
