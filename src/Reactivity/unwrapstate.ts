import ReactiveState from "./reactivestate";

export type UnWrapState<T extends ReactiveState<any>> = T extends ReactiveState<
    infer R
>
    ? R
    : never;
