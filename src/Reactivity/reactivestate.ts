import ObserverTarget, { Listener } from "./custom-observer-target";
import debounce from "lodash/debounce";

import isprimitive, { Primitivetype } from "../UtilTools/isprimitive";
import { defineProperty } from "../UtilTools/reflect";
import { isobject, isSet } from "../UtilTools/util";
import { UnwrapedState } from "./watch";
import { recordusestste } from "../mounted-unmounted/Component-context";
export const addonelistner = Symbol("addonelistner");
export const removeonelistner = Symbol("removeonelistner");

export const cancelsubscribe = Symbol("cancelsubscribe");
const debouncedispatch = Symbol("debouncedispatch");
export const invalid_primitive_or_object_state =
    "invalid primitive or object state";
export function isReactiveState(a: any): a is ReactiveState<any> {
    return (
        a instanceof ReactiveState && a[Symbol.toStringTag] === "ReactiveState"
    );
}

export const changetextnodesymbol = Symbol("changetextnode");
export const Targetsymbol = Symbol("eventtatget");
export const memlisteners = Symbol("memlisteners");
export const dispatchsymbol = Symbol("dispatch");
export const subscribesymbol = Symbol("subscribe");
export const removeallistenerssymbol = Symbol("removeallisteners");
export const addallistenerssymbol = Symbol("addallisteners");

export default class ReactiveState<T extends UnwrapedState> {
    value: T extends Array<any>
        ? Array<any>
        : T extends Function
        ? Function
        : T extends Primitivetype
        ? Primitivetype
        : object;

    readonly [Symbol.toStringTag] = "ReactiveState";

    constructor(init?: T) {
        this.value = init as any;

        defineProperty(this, "value", {
            value: init,
            configurable: true,
            writable: true
        });

        recordusestste(this);
    }
    [debouncedispatch]: () => void = (() => {
        const debouncedfun = debounce(() => {
            this[Targetsymbol].dispatch();
        });
        return () => {
            debouncedfun();
        };
    })();

    [removeallistenerssymbol]() {
        this[memlisteners].forEach(callback => {
            this[removeonelistner](callback);
        });
    }
    [removeonelistner](callback: Listener) {
        this[Targetsymbol].removeListener(callback);
    }
    [addonelistner](callback: Listener) {
        this[Targetsymbol].addListener(callback);
    }
    [addallistenerssymbol]() {
        this[memlisteners].forEach(callback => {
            this[addonelistner](callback);
        });
    }

    [Targetsymbol] = new ObserverTarget();
    [memlisteners] = new Set<Listener>();

    valueOf = () => {
        return this.value;
    };
    toString() {
        const value = this.valueOf();
        return isprimitive(value)
            ? String(value)
            : isSet(value)
            ? JSON.stringify([...(value as Set<any>)])
            : isobject(value)
            ? JSON.stringify(value)
            : "";
    }

    [dispatchsymbol]() {
        this[debouncedispatch]();
    }
    [subscribesymbol](eventlistener: Listener) {
        this[memlisteners].add(eventlistener);
        this[addonelistner](eventlistener);
    }
    [cancelsubscribe](eventlistener: Listener) {
        if (eventlistener) {
            this[memlisteners].delete(eventlistener);
            this[removeonelistner](eventlistener);
        }
    }

    [Symbol.toPrimitive](): string | undefined | Primitivetype {
        const value = this.valueOf();
        return isprimitive(value)
            ? value
            : isobject(value)
            ? JSON.stringify(value)
            : void 0;
    }
}
