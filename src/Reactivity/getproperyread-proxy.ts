import { isFunction, isobject, issymbol } from "../UtilTools/util";
import {
    get,
    has,
    ownKeys,
    getOwnPropertyDescriptor
} from "../UtilTools/reflect";

export function getproperyreadproxy<T extends object>(a: T): T {
    const __proto__ = "__proto__";

    const target = a;
    return new Proxy(target, {
        getOwnPropertyDescriptor(target, key) {
            if (issymbol(key)) {
                return;
            } else {
                return getOwnPropertyDescriptor(target, key);
            }
        },
        ownKeys(target) {
            let myvalue = get(target, "value");
            const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];

            return Array.from(
                new Set([...ownKeys(target), ...ownKeys(myvalueobj)])
            );

            /* Array.from(
          new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
        ); */
        },
        has(target, key) {
            const myvalue = get(target, "value");
            const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
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

            /*  const myvalue = get(target, "value");
  
        if (has(target, key)) {
          return get(target, key);
        } else if (has(myvalue, key)) {
          return get(myvalue, key);
        } */
        }
    });
}
