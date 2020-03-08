import debounce from "src/UtilTools/debounce";
// import debounce from "lodash/debounce";
import { useststerecord } from "../life-cycle-context/useststerecord";
import isprimitive, { Primitivetype } from "../UtilTools/isprimitive";
// import { defineProperty } from "../UtilTools/reflect";
import { isobject, isSet, gettagtype } from "../UtilTools/util";
import ObserverTarget, { Listener } from "./custom-observer-target";
export const addonelistner = Symbol("addonelistner");
export const removeonelistner = Symbol("removeonelistner");

export const cancelsubscribe = Symbol("cancelsubscribe");
const debouncedispatch = Symbol("debouncedispatch");
export const invalid_primitive_or_object_state =
    "invalid primitive or object state";
const Targetsymbol = Symbol("eventtatget");
const memlisteners = Symbol("memlisteners");
export const dispatchsymbol = Symbol("dispatch");
export const subscribesymbol = Symbol("subscribe");
export const removeallistenerssymbol = Symbol("removeallisteners");
export const addallistenerssymbol = Symbol("addallisteners");
export const tagtypesym = Symbol("tagtype");

export default class ReactiveState<T> {
    constructor(init: { value: T });
    constructor(init: { get: () => T; set?: (v: T) => void });
    constructor(init: { value?: T; get?: () => T; set?: (v: T) => void }) {
        // let getter: undefined | (() => T);
        // let setter: undefined | ((v: T) => void);

        if ("value" in init) {
            let value = init.value;
            this[tagtypesym] = gettagtype(value);
            Object.defineProperty(this, "value", {
                // Uncaught TypeError: 'getOwnPropertyDescriptor' on proxy: trap returned descriptor for property 'value' that is incompatible with the existing property in the proxy target
                configurable: true,
                get: () => value,
                set: (v: T) => {
                    const tag = gettagtype(v);
                    if (tag !== this[tagtypesym]) {
                        throw TypeError();
                    }
                    value = v;
                }
            });
        } else {
            const getter = init.get;
            const setter = init.set;
            if (!getter) {
                throw TypeError();
            }
            this[tagtypesym] = gettagtype(getter());
            if (setter) {
                Object.defineProperty(this, "value", {
                    configurable: true,
                    get: getter,
                    set: (v: T) => {
                        const tag = gettagtype(v);
                        if (tag !== this[tagtypesym]) {
                            throw TypeError();
                        }
                        setter(v);
                    }
                });
            } else {
                Object.defineProperty(this, "value", {
                    configurable: true,
                    get: getter
                });
            }
        }

        // this.value = init as any;

        // defineProperty(this, "value", {
        //     value: init,
        //     configurable: true,
        //     writable: true
        // });

        useststerecord(this);
    }
    [tagtypesym]: string;
    value!: T;

    readonly [Symbol.toStringTag] = "ReactiveState";

    private [debouncedispatch]: () => void = (() => {
        const debouncedfun = debounce(() => {
            this[Targetsymbol].dispatch();
        });
        return () => {
            debouncedfun();
        };
    })();

    [removeallistenerssymbol]() {
        this[memlisteners].forEach((callback) => {
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
        this[memlisteners].forEach((callback) => {
            this[addonelistner](callback);
        });
    }

    private [Targetsymbol] = new ObserverTarget();
    private [memlisteners] = new Set<Listener>();

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
