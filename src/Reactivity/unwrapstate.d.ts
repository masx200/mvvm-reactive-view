import ReactiveState from "./reactivestate";
export declare type UnWrapState<
    T extends ReactiveState<any>
> = T extends ReactiveState<infer R> ? R : never;
//# sourceMappingURL=unwrapstate.d.ts.map
