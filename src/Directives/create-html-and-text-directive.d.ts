import ReactiveState from "../Reactivity/reactivestate.js";
export { createhtmlandtextdirective };
declare function createhtmlandtextdirective(
    seteletext: (e: Element, v: string) => void,
    errorname: string,
    ele: Element,
    text: string | ReactiveState<any>,
    onmount: (call: () => void) => void,
    onunmount: (call: () => void) => void
): void;
//# sourceMappingURL=create-html-and-text-directive.d.ts.map
