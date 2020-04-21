import { Htmlelementconstructor } from "../CustomClass/customclass";
import ReactiveState from "../Reactivity/reactivestate.js";
import { ElementAttributes } from "./create-element";
import { VaildVDom } from "./isvalidvdom";
export declare function isVirtualdom(a: any): a is Virtualdom<any>;
export declare type Vdomchildren = Array<VaildVDom>;
export { createVirtualElement };
declare function createVirtualElement<
    T extends Htmlelementconstructor | string | Function
>(type: T, props?: ElementAttributes, children?: Vdomchildren): Virtualdom<T>;
interface Virtualdom<T extends Htmlelementconstructor | string | Function> {
    readonly [Symbol.toStringTag]: "VirtualElement";
    readonly type: T;
    readonly props: Record<string, any>;
    readonly children: Vdomchildren;
    readonly directives: Record<string, any>;
    readonly onevent: Record<string, Array<EventListener>>;
    readonly bindattr: Record<string, ReactiveState<any>>;
}
export default Virtualdom;
//# sourceMappingURL=VirtualElement.d.ts.map
