export declare const attributeChangedCallback = "attributeChangedCallback";
export declare class AttrChange extends HTMLElement {
    prototype: HTMLElement;
    textContent: string;
    innerHTML: string;
    innerText: string;
    [attributeChangedCallback](name: string): void;
    setAttribute(qualifiedName: string, value: string): void;
    removeAttribute(qualifiedName: string): void;
}
