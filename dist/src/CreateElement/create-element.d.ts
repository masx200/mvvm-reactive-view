import h from "./create-element";
export { h };
import { Custom } from "../CustomClass/customclass";
import ReactiveState from "../Reactivity/ReactiveState";
import Virtualdom, { Vdomchildren } from "./VirtualElement";
import { Htmlelementconstructor } from "../AttributeClass/createComponent";
declare type styleprop = string | object | ReactiveState<string> | ReactiveState<object>;
declare type classprop = string | Set<string> | Array<string> | ReactiveState<string | Set<string> | Array<string>>;
export interface ElementAttrs {
    style?: styleprop;
    class?: classprop;
    [key: string]: any;
}
export default function <T extends Htmlelementconstructor | string | Custom>(type: T, propsorchildren?: Vdomchildren, ...children: Vdomchildren): Virtualdom<T>;
export default function <T extends Vdomchildren>(type: "", propsorchildren?: T, ...children: T): T;
export default function <T extends Vdomchildren>(type: "", props?: ElementAttrs, ...children: T): T;
export default function <T extends Htmlelementconstructor | string | Custom>(type: T, props?: ElementAttrs, ...children: Vdomchildren): Virtualdom<T>;
