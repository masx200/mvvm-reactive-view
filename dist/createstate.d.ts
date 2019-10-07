import ReactiveState from "./reactivestate";
export declare const set_prototype: Set<any>;
export default function <T extends string | number | boolean | undefined | object | bigint>(init: ReactiveState<T>): ReactiveState<T>;
export default function <T extends string | number | boolean | undefined | object | bigint>(init: T): ReactiveState<T>;
