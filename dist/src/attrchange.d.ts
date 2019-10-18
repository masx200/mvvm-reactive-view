import { readysymbol } from "./readysymbol";
export declare const attributeChangedCallback: unique symbol;
export declare const firstinstalledcallback: unique symbol;
export declare class AttrChange extends HTMLElement {
    disconnectedCallback(): Promise<void>;
    connectedCallback(): Promise<void>;
    [readysymbol]: boolean;
    constructor();
    setAttribute(qualifiedName: string, value: string): void;
    removeAttribute(qualifiedName: string): void;
}
