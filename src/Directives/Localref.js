import { apply, set } from "../UtilTools/reflect";
import { isfunction, isobject } from "../UtilTools/util";
export const Localref = (ref, ele, _vdom) => {
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
//# sourceMappingURL=Localref.js.map
