import { ElementAttrs } from "./create-element";
import { Class } from "../CustomClass/customclass";
import ReactiveState from "../Reactivity/ReactiveState";
import { VaildVDom } from "./isvalidvdom";
export declare function isVirtualdom(a: any): a is Virtualdom<any>;
export declare const isvirtualelement: unique symbol;
export declare type Vdomchildren = Array<VaildVDom>;
export { createVirtualElement };
declare function createVirtualElement<T extends Class | string | Function>(type: T, props?: ElementAttrs, children?: Vdomchildren): Virtualdom<T>;
interface Virtualdom<T extends Class | string | Function> {
    readonly [isvirtualelement]: unique symbol;
    readonly [Symbol.toStringTag]: "VirtualElement";
    element: Element | undefined;
    type: T;
    props: ElementAttrs;
    children: Vdomchildren;
    directives: Record<string, any>;
    onevent: Record<string, Array<EventListener>>;
    bindattr: Record<string, ReactiveState<any>>;
}
export default Virtualdom;
