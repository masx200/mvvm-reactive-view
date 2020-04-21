import Virtualdom, { Vdomchildren } from "../CreateElement/VirtualElement";
import ReactiveState from "../Reactivity/reactivestate.js";
export declare const bindstatesymbol: unique symbol;
export default render;
declare function render(vdom: Virtualdom<"">, namespace?: string): Node;
declare function render(
    vdom: string | ReactiveState<any> | number,
    namespace?: string
): Node;
declare function render(
    vdom: Virtualdom<string | Function>,
    namespace?: string
): Element;
declare function render(
    vdom: Vdomchildren,
    namespace?: string
): Array<Node | Element>;
declare function render(
    vdom: Array<string | ReactiveState<any> | number | Virtualdom<"">>,
    namespace?: string
): Array<Node>;
declare function render(
    vdom: Array<Virtualdom<any>>,
    namespace?: string
): Array<Element>;
export { render };
//# sourceMappingURL=render-vdom-to-real.d.ts.map
