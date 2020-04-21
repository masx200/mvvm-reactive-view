import { isVirtualdom } from "../CreateElement/VirtualElement";
import { isReactiveState } from "../Reactivity/isReactiveState";
import { isArray, isnumber, isstring } from "../UtilTools/util";
export function isvalidvdom(v) {
    if (isstring(v)) {
        return true;
    }
    if (isnumber(v)) {
        return true;
    }
    let flag = false;
    if (isArray(v)) {
        return v.every((e) => isvalidvdom(e));
    } else if (isVirtualdom(v)) {
        return isvalidvdom(v.children);
    } else if (isReactiveState(v)) {
        return true;
    }
    return flag;
}
//# sourceMappingURL=isvalidvdom.js.map
