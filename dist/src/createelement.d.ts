import h from "./createelement";
export { h };
import ReactiveState from "./reactivestate";
import Virtualdom, { Vdomchildren } from "./VirtualElement";
declare type styleprop = string | object | ReactiveState<string> | ReactiveState<object>;
declare type classprop = string | Set<string> | Array<string> | ReactiveState<string | Set<string> | Array<string>>;
export interface ElementAttrs {
    style?: styleprop;
    class?: classprop;
    [key: string]: any;
}
export default function <T extends Function | string>(type: T, propsorchildren?: Vdomchildren, ...children: Vdomchildren): Virtualdom<T>;
export default function <T extends Vdomchildren>(type: "", propsorchildren?: T, ...children: T): T;
export default function <T extends Vdomchildren>(type: "", props?: ElementAttrs, ...children: T): T;
export default function <T extends Function | string>(type: T, props?: ElementAttrs, ...children: Vdomchildren): Virtualdom<T>;
