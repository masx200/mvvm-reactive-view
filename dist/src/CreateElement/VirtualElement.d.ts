import { Class } from "../CustomClass/customclass";
import ReactiveState from "../Reactivity/ReactiveState";
import { ElementAttrs } from "./create-element";
import { VaildVDom } from "./isvalidvdom";
export declare function isVirtualdom(a: any): a is Virtualdom<any>;
export declare type Vdomchildren = Array<VaildVDom>;
export { createVirtualElement };
declare function createVirtualElement<T extends Class | string | Function>(type: T, props?: ElementAttrs, children?: Vdomchildren): Virtualdom<T>;
interface Virtualdom<T extends Class | string | Function> {
    readonly [Symbol.toStringTag]: "VirtualElement";
    readonly element: Element[];
    readonly type: T;
    readonly props: ElementAttrs;
    readonly children: Vdomchildren;
    readonly directives: Record<string, any>;
    readonly onevent: Record<string, Array<EventListener>>;
    readonly bindattr: Record<string, ReactiveState<any>>;
}
export default Virtualdom;
