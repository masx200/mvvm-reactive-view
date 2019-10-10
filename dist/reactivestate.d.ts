/// <reference types="lodash" />
export declare const removeonelistner: unique symbol;
declare const callbackmap: unique symbol;
export declare const unsubscribe: unique symbol;
declare const debouncedispatch: unique symbol;
export declare const invalid_primitive_or_object_state = "invalid primitive or object state";
export declare function isReactiveState(a: any): a is ReactiveState<any>;
import { UnwrapedState } from "./watch";
export declare const changetextnodesymbol: unique symbol;
export declare const eventtargetsymbol: unique symbol;
export declare const memlisteners: unique symbol;
export declare const dispatchsymbol: unique symbol;
export declare const subscribesymbol: unique symbol;
export declare const removeallistenerssymbol: unique symbol;
export declare const addallistenerssymbol: unique symbol;
export default class ReactiveState<T extends UnwrapedState> {
    [callbackmap]: Map<Function, EventListener>;
    readonly [Symbol.toStringTag] = "ReactiveState";
    constructor(init?: T);
    [addallistenerssymbol](): void;
    value: T | undefined;
    [eventtargetsymbol]: EventTarget;
    [memlisteners]: Set<EventListener>;
    valueOf: () => T | undefined;
    toString(): string;
    [debouncedispatch]: ((eventname?: string | undefined) => void) & import("lodash").Cancelable;
    [dispatchsymbol](eventname?: string): void;
    [subscribesymbol](callback: Function): void;
    [unsubscribe](callback: Function): void;
    [removeallistenerssymbol](): void;
    [removeonelistner](callback: EventListener): void;
    [Symbol.toPrimitive](): string | undefined;
}
export {};
