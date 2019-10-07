interface CallbackReactiveState2<T extends string | number | boolean | undefined | object | bigint> {
    (...args: T[]): any;
}
import ReactiveState from "./reactivestate";
export default function <T extends string | number | boolean | undefined | object | bigint>(state: ReactiveState<T> | Array<ReactiveState<T>>, callback: CallbackReactiveState2<T>): ReactiveState<any>;
export declare function getproperyreadproxy<T extends object>(a: T): T;
export {};
