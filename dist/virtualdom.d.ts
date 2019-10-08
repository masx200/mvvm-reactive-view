import { ElementAttrs } from "./createelement";
import { Class } from "./customclass";
import ReactiveState from "./reactivestate";
export declare function isVirtualdom(a: any): a is Virtualdom<any>;
export declare type Vdomchildren = Array<Virtualdom<any> | string | ReactiveState<any> | number>;
export default class Virtualdom<T extends Class | string | Function> {
    [Symbol.toStringTag]: string;
    element: undefined | Element | Node;
    type: T | undefined;
    props: ElementAttrs;
    children: Vdomchildren;
    directives: object;
    onevent: {
        [key: string]: Array<EventListener>;
    };
    bindattr: {
        [key: string]: ReactiveState<any>;
    };
    constructor(type: T, props?: ElementAttrs, children?: Vdomchildren);
}
