import { appendchild, seteletext } from "../UtilTools/dom";
import { toArray } from "../UtilTools/toArray";
export default function(ele, container, clear = true) {
    if (clear) {
        seteletext(container, "");
    }
    const eles = toArray(ele);
    eles.forEach((e) => appendchild(container, e));
    return container;
}
import mountrealelement from "./mount-real-element";
export { mountrealelement };
//# sourceMappingURL=mount-real-element.js.map
