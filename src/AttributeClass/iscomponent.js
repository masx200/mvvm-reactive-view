import { get } from "../UtilTools/reflect";
import { isFunction } from "../UtilTools/util";
const componentsymbol = Symbol("component");
export { componentsymbol };
export function iscomponent(a) {
    return isFunction(a) && get(a, componentsymbol) === componentsymbol;
}
//# sourceMappingURL=iscomponent.js.map
