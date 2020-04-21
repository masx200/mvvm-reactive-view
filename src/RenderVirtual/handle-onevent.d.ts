import onevent from "./handle-onevent";
export { onevent };
export declare const eventlistenerssymbol: unique symbol;
export default function(
    element: Element | Node,
    eventname: string,
    callback: EventListener | Array<EventListener>
): void;
export declare function firstaddlisteners(
    ele: Element | Node,
    event: string,
    callarray: Array<EventListener>
): void;
export declare function removelisteners(ele: Element | Node): void;
export declare function readdlisteners(ele: Element | Node): void;
//# sourceMappingURL=handle-onevent.d.ts.map
