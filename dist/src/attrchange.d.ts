import ReactiveState from "./reactivestate";
import { attributessymbol } from "./createComponent";
export declare const attributeChangedCallback = "attributeChangedCallback";
export declare class AttrChange extends HTMLElement {
    [attributessymbol]: Record<string, ReactiveState<any>>;
    constructor();
    setAttribute(qualifiedName: string, value: string): void;
    removeAttribute(qualifiedName: string): void;
}
