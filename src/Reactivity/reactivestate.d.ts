import { Primitivetype } from "../UtilTools/isprimitive";
import { Listener } from "./custom-observer-target";
export declare const addonelistner: unique symbol;
export declare const removeonelistner: unique symbol;
export declare const cancelsubscribe: unique symbol;
declare const debouncedispatch: unique symbol;
export declare const invalid_primitive_or_object_state =
    "invalid primitive or object state";
declare const Targetsymbol: unique symbol;
declare const memlisteners: unique symbol;
export declare const dispatchsymbol: unique symbol;
export declare const subscribesymbol: unique symbol;
export declare const removeallistenerssymbol: unique symbol;
export declare const addallistenerssymbol: unique symbol;
export declare const tagtypesym: unique symbol;
export default class ReactiveState<T> {
    constructor(init: { value: T });
    constructor(init: { get: () => T; set?: (v: T) => void });
    [tagtypesym]: string;
    value: T;
    readonly [Symbol.toStringTag] = "ReactiveState";
    private [debouncedispatch];
    [removeallistenerssymbol](): void;
    [removeonelistner](callback: Listener): void;
    [addonelistner](callback: Listener): void;
    [addallistenerssymbol](): void;
    private [Targetsymbol];
    private [memlisteners];
    valueOf: () => T;
    toString(): string;
    [dispatchsymbol](): void;
    [subscribesymbol](eventlistener: Listener): void;
    [cancelsubscribe](eventlistener: Listener): void;
    [Symbol.toPrimitive](): string | undefined | Primitivetype;
}
export {};
//# sourceMappingURL=reactivestate.d.ts.map
