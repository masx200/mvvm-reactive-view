import ReactiveState from "./reactivestate";
export function isReactiveState(a) {
    return (
        a instanceof ReactiveState && a[Symbol.toStringTag] === "ReactiveState"
    );
}
//# sourceMappingURL=isReactiveState.js.map
