import ReactiveState from "./reactivestate";
import Virtualdom from "./virtualdom";
export declare const bindstatesymbol: unique symbol;
export declare const reactivestatesymbol: unique symbol;
export declare const virtualdomsymbol: unique symbol;
export default function render(vdom: Virtualdom<string | Function>, namespace?: string): Element;
export default function render(vdom: Virtualdom<"script" | "" | "html">, namespace?: string): Node;
export default function render(vdom: Array<Virtualdom<any> | string | ReactiveState<any> | number>, namespace?: string): Array<Node | Element>;
export default function render(vdom: string | ReactiveState<any> | number, namespace?: string): Node;
export default function render(vdom: Array<Virtualdom<any>>, namespace?: string): Array<Element>;
export default function render(vdom: Array<string | ReactiveState<any> | number>, namespace?: string): Array<Node>;
