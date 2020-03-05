import Virtualdom from "../CreateElement/VirtualElement";
import { invalid_Function } from "../life-cycle-context/Component-context";
import { isstring } from "../UtilTools/util";
import directives from "./directives";
export interface Extendfun {
    (
        value: unknown,
        element: Element,
        vdom: Virtualdom<any>,

        onmounted: (call: () => void) => void,
        onunmounted: (call: () => void) => void,
        onupdated: (call: () => void) => void
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
}
