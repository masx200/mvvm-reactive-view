import ReactiveState from "./reactivestate";
export function isReactiveState(a: any): a is ReactiveState<any> {
    return (
        a instanceof ReactiveState && a[Symbol.toStringTag] === "ReactiveState"
    );
}
