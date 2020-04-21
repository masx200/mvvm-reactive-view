var _a, _b, _c;
import debounce from "src/UtilTools/debounce";
import { useststerecord } from "../life-cycle-context/useststerecord";
import isprimitive from "../UtilTools/isprimitive";
import { isobject, isSet, gettagtype } from "../UtilTools/util";
import ObserverTarget from "./custom-observer-target";
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
export default class ReactiveState {
    constructor(init) {
        this[Symbol.toStringTag] = "ReactiveState";
        this[_a] = (() => {
            const debouncedfun = debounce(() => {
                this[Targetsymbol].dispatch();
            });
            return () => {
                debouncedfun();
            };
        })();
        this[_b] = new ObserverTarget();
        this[_c] = new Set();
        this.valueOf = () => {
            return this.value;
        };
        if ("value" in init) {
            let value = init.value;
            this[tagtypesym] = gettagtype(value);
            Object.defineProperty(this, "value", {
                configurable: true,
                get: () => value,
                set: (v) => {
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
                    set: (v) => {
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
        useststerecord(this);
    }
    [((_a = debouncedispatch), removeallistenerssymbol)]() {
        this[memlisteners].forEach((callback) => {
            this[removeonelistner](callback);
        });
    }
    [removeonelistner](callback) {
        this[Targetsymbol].removeListener(callback);
    }
    [addonelistner](callback) {
        this[Targetsymbol].addListener(callback);
    }
    [addallistenerssymbol]() {
        this[memlisteners].forEach((callback) => {
            this[addonelistner](callback);
        });
    }
    toString() {
        const value = this.valueOf();
        return isprimitive(value)
            ? String(value)
            : isSet(value)
            ? JSON.stringify([...value])
            : isobject(value)
            ? JSON.stringify(value)
            : "";
    }
    [((_b = Targetsymbol), (_c = memlisteners), dispatchsymbol)]() {
        this[debouncedispatch]();
    }
    [subscribesymbol](eventlistener) {
        this[memlisteners].add(eventlistener);
        this[addonelistner](eventlistener);
    }
    [cancelsubscribe](eventlistener) {
        if (eventlistener) {
            this[memlisteners].delete(eventlistener);
            this[removeonelistner](eventlistener);
        }
    }
    [Symbol.toPrimitive]() {
        const value = this.valueOf();
        return isprimitive(value)
            ? value
            : isobject(value)
            ? JSON.stringify(value)
            : void 0;
    }
}
//# sourceMappingURL=reactivestate.js.map
