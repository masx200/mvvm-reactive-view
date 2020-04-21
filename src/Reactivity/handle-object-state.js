import deepobserve from "@masx200/deep-observe-agent-proxy";
import { combineproxy } from "src/others/combineproxy";
import {
    defineProperty,
    deleteProperty,
    get,
    getOwnPropertyDescriptor,
    has,
    ownKeys,
    set
} from "../UtilTools/reflect";
import {
    isarray,
    isfunction,
    isobject,
    isplainobject,
    isSet,
    issymbol
} from "../UtilTools/util";
import { set_prototype } from "./create-state";
import { isReactiveState } from "./isReactiveState";
import ReactiveState, {
    dispatchsymbol,
    invalid_primitive_or_object_state
} from "./reactivestate.js";
import watch from "./watch";
export default function(init) {
    let initobj = init;
    const containReactiveState =
        isplainobject(init) &&
        Object.values(init).some((a) => isReactiveState(a));
    const state_entries = Object.entries(init).filter((e) => {
        const a = e[1];
        return isReactiveState(a);
    });
    if (containReactiveState) {
        initobj = Object.assign({}, init);
        state_entries.forEach(([key, state]) => {
            defineProperty(initobj, key, {
                enumerable: true,
                get() {
                    return state.valueOf();
                },
                set: (nvalue) => {
                    state.value = nvalue;
                },
                configurable: true
            });
        });
    }
    const reactive = new ReactiveState({
        value: initobj
    });
    if (containReactiveState) {
        state_entries.forEach(([key, state]) => {
            watch(state, () => {
                reactive[dispatchsymbol]();
            });
        });
    }
    return combineproxy(reactive, Object.assign({}, handler));
}
const handler = {};
handler.ownKeys = (target) => {
    return Array.from(
        new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
    );
};
handler.setPrototypeOf = () => {
    return false;
};
handler.defineProperty = () => {
    return false;
};
handler.getOwnPropertyDescriptor = (target, key) => {
    if (issymbol(key)) {
        return;
    }
    const myvalue = get(target, "value");
    const descripter =
        getOwnPropertyDescriptor(target, key) ||
        getOwnPropertyDescriptor(myvalue, key);
    if (descripter) {
        descripter.configurable = true;
    }
    return descripter;
};
handler.deleteProperty = (target, key) => {
    const myvalue = get(target, "value");
    if (has(myvalue, key)) {
        deleteProperty(myvalue, key);
        target[dispatchsymbol]();
        return true;
    } else {
        return true;
    }
};
handler.has = (target, key) => {
    const myvalue = get(target, "value");
    return has(target, key) || has(myvalue, key);
};
handler.get = (target, key) => {
    const value = get(target, "value");
    const deepflage = isarray(value) || isplainobject(value);
    if (key === "value" && deepflage) {
        return deepobserve(get(target, key), (_target_, _patharray) => {
            target[dispatchsymbol]();
        });
    } else if (has(target, key)) {
        return get(target, key);
    } else if (has(value, key)) {
        const resultvalue = get(value, key);
        if (isSet(value)) {
            if (key === "add" || key === "clear" || key === "delete") {
                switch (key) {
                    case "add": {
                        return ((add) => {
                            if (!set_prototype.has.call(value, add)) {
                                const returnvalue = set_prototype[key].call(
                                    value,
                                    add
                                );
                                target[dispatchsymbol]();
                                return returnvalue;
                            }
                            return;
                        }).bind(value);
                    }
                    case "delete": {
                        return ((dele) => {
                            if (set_prototype.has.call(value, dele)) {
                                const returnvalue = set_prototype[key].call(
                                    value,
                                    dele
                                );
                                target[dispatchsymbol]();
                                return returnvalue;
                            }
                            return;
                        }).bind(value);
                    }
                    case "clear": {
                        return (() => {
                            if (value.size) {
                                const returnvalue = set_prototype[key].call(
                                    value
                                );
                                target[dispatchsymbol]();
                                return returnvalue;
                            }
                            return;
                        }).bind(value);
                    }
                }
            } else {
                return isfunction(resultvalue)
                    ? resultvalue.bind(value)
                    : resultvalue;
            }
        } else if (
            deepflage &&
            (isarray(resultvalue) || isplainobject(resultvalue))
        ) {
            return deepobserve(resultvalue, () => {
                target[dispatchsymbol]();
            });
        } else {
            return resultvalue;
        }
    }
};
handler.set = (target, key, value) => {
    if (isReactiveState(value)) {
        value = value.valueOf();
    }
    const myvalue = get(target, "value");
    if (key === "value" && isobject(value)) {
        if (target[key] !== value) {
            set(target, key, value);
            target[dispatchsymbol]();
        }
        return true;
    } else if (!has(target, key)) {
        if (myvalue[key] !== value) {
            set(myvalue, key, value);
            target[dispatchsymbol]();
        }
        return true;
    } else {
        console.error(value);
        console.error(invalid_primitive_or_object_state);
        throw TypeError();
    }
};
//# sourceMappingURL=handle-object-state.js.map
