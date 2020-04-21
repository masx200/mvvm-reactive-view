import { combineproxy } from "src/others/combineproxy";
import {
    get,
    getOwnPropertyDescriptor,
    has,
    ownKeys
} from "../UtilTools/reflect";
import { isFunction, isobject, issymbol } from "../UtilTools/util";
import { StateType } from "./create-state";
const handler: ProxyHandler<any> = {
    getOwnPropertyDescriptor(target, key) {
        if (issymbol(key)) {
            return;
        } else {
            let myvalue = get(target, "value");
            const descripter =
                getOwnPropertyDescriptor(target, key) ||
                getOwnPropertyDescriptor(myvalue, key);
            if (descripter) {
                descripter.configurable = true;
            }

            return descripter;
        }
    },
    ownKeys(target) {
        let myvalue = get(target, "value");
        // const myvalueobj = isobject(myvalue) ? myvalue : myvalue[proto]; //Reflect.getPrototypeOf(myvalue);
        const myvalueobj = isobject(myvalue) ? myvalue : {};
        return Array.from(
            new Set([...ownKeys(target), ...ownKeys(myvalueobj)])
        );
    },
    has(target, key) {
        const myvalue = get(target, "value");
        const myvalueobj = isobject(myvalue) ? myvalue : {};
        // const myvalueobj = isobject(myvalue) ? myvalue : myvalue[proto]; //Reflect.getPrototypeOf(myvalue);
        return has(target, key) || has(myvalueobj, key);
    },
    get(target, key) {
        if (has(target, key)) {
            return get(target, key);
        } else {
            const myvalue = get(target, "value");
            const myvalueobj = Object(myvalue);

            if (has(myvalueobj, key)) {
                const property = get(myvalueobj, key);
                return isFunction(property)
                    ? property.bind(myvalueobj)
                    : property;
            }
        }
    }
};
export function getproperyreadproxy<T extends any>(a: T): StateType<T> {
    // Uncaught TypeError: Reflect.getPrototypeOf called on non-object
    // const proto = "__proto__";

    const target = a;
    return combineproxy(target, Object.assign({}, handler)) as StateType<T>;
}
