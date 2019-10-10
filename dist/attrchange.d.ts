export declare const attributeChangedCallback = "attributeChangedCallback";
export declare class AttrChange extends HTMLElement {
    textContent: string;
    innerHTML: string;
    innerText: string;
    setAttribute(qualifiedName: string, value: string): void;
    removeAttribute(qualifiedName: string): void;
}
