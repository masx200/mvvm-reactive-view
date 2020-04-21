import { readysymbol } from "./readysymbol";
export declare const attributeChangedCallback: unique symbol;
export declare const firstinstalledcallback: unique symbol;
export declare function connectedCallback(componentelement: HTMLElement): void;
export declare function disconnectedCallback(
    componentelement: HTMLElement
): void;
export declare class AttrChange extends HTMLElement {
    disconnectedCallback(): void;
    connectedCallback(): void;
    [readysymbol]: boolean;
    constructor();
}
//# sourceMappingURL=attr-change.d.ts.map
