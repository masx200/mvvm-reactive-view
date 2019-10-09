export declare type CancelWatch = () => void;
interface CallbackReactiveState1<T extends string | number | boolean | undefined | object | bigint> {
    (...args: ReactiveState<T>[]): void;
}
import ReactiveState from "./reactivestate";
export declare function watch<T extends string | number | boolean | undefined | object | bigint>(state: ReactiveState<T> | Array<ReactiveState<T>>, callback: CallbackReactiveState1<T>): void;
export declare function unwatch(state: ReactiveState<any>): void;
export declare function rewatch(state: ReactiveState<any>): void;
export {};
