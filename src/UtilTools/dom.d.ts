export declare function seteletext(e: Element | Node, v: string): void;
export declare function setelehtml(e: Element, v: string): void;
export declare function appendchild(
    container: HTMLElement | SVGSVGElement | SVGElement | Element | Node,
    ele: HTMLElement | SVGElement | Element | Node
): void;
export declare function createsvgelement(): Element;
export declare function createnonescript(): DocumentFragment;
export declare function createDocumentFragment(): DocumentFragment;
export declare function createnativeelement(type: string): HTMLElement;
export declare function createElementNS(
    namespace: string,
    name: string
): Element;
export declare function createtextnode(data: string | number): Text;
export declare const svgnamespace = "http://www.w3.org/2000/svg";
export declare function changetext(textnode: Text, value: string): void;
export declare const mathnamespace = "http://www.w3.org/1998/Math/MathML";
export declare function createmathelement(): Element;
export declare function createComment(): Comment;
export declare function removeElement(element: Element): void;
export declare function removeNode(node: Element | Node): void;
export declare function replaceChild(newChild: Node, oldChild: Node): void;
export declare function domaddlisten(
    ele: Element | Node,
    event: string,
    call: EventListener
): void;
export declare function domremovelisten(
    ele: Element | Node,
    event: string,
    call: EventListener
): void;
export declare function getchildren(ele: Element): Element[];
export declare function getchildNodes(ele: Element | Node): ChildNode[];
export declare function getAttribute(ele: Element, name: string): string | null;
export declare function setAttribute(
    ele: Element,
    name: string,
    value: any
): void;
export declare function removeAttribute(ele: Element, name: string): void;
export declare function insertfirst(
    container: HTMLElement | Element,
    ele: HTMLElement
): void;
export declare function createanotherhtmldocument(): Document;
export declare function querySelectorAll(selector: string): Element[];
//# sourceMappingURL=dom.d.ts.map
