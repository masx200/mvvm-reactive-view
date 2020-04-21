import { invalid_Function } from "../life-cycle-context/Component-context";
import { isstring } from "../UtilTools/util";
import directives from "./directives";
export { extenddirectives };
export default function extenddirectives(name, fun) {
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
//# sourceMappingURL=extend-directive.js.map
