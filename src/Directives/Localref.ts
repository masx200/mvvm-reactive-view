import Virtualdom from "../CreateElement/VirtualElement";
import { apply, set } from "../UtilTools/reflect";
import { isfunction, isobject } from "../UtilTools/util";
export const Localref = (
    ref: unknown, //{ value: Element } | ((value: Element) => void),
    ele: Element,
    _vdom: Virtualdom<any>
) => {
    if (isfunction(ref)) {
        apply(ref, undefined, [ele]);
    } else if (isobject(ref)) {
        set(ref, "value", ele);
    } else {
        console.log(_vdom);
        console.error(ref);
        console.error("invalid ref");
        throw TypeError();
    }
};
