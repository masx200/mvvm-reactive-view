import Virtualdom from "../CreateElement/VirtualElement";
import { invalid_Function } from "../mounted-unmounted/Component-context";
import { isstring } from "../UtilTools/util";
import directives from "./directives";
export interface Extendfun {
    (
        value: unknown,
        element: Element,
        vdom: Virtualdom<any>,

        onmounted: (call: () => void) => void,
        onunmounted: (call: () => void) => void
    ): void;
}
export interface ExtendOptions {
    [s: string]: Extendfun;
}
export { extenddirectives };
export default function extenddirectives(name: string, fun: Extendfun) {
    if (!isstring(name)) {
        console.error(name);
        throw new TypeError();
    }
    if (typeof fun !== "function") {
        console.error(fun);
        console.error(invalid_Function);
        throw TypeError();
    } else {
        if (!directives[name]) {
            Reflect.set(directives, name, fun);
        } else {
            console.error(directives);
            console.error("can not extend existing directive");
            throw new Error();
        }
    }
    // return directives;
}

// export default function extenddirectives(options: ExtendOptions = {}) {
//     if (!isplainobject(options)) {
//         console.error(options);
//         throw new TypeError();
//     }
//     Object.entries(options).forEach(([key, value]) => {
//         if (typeof value !== "function") {
//             console.error(value);
//             console.error(invalid_Function);
//             throw TypeError();
//         } else {
//             if (!directives[key]) {
//                 Reflect.set(directives, key, value);
//             } else {
//                 console.error(directives);
//                 console.error("do not extend existing directive");
//                 throw new Error();
//             }
//         }
//     });
//     return directives;
// }
