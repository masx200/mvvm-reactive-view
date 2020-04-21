import htm from "../../@types/htm/index";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import { apply } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import h from "./create-element";
import { isvalidvdom } from "./isvalidvdom";
function htmlold(...inargs) {
    return apply(htm, h, inargs);
}
export { html };
export default function html(...args) {
    const prevdom = toArray(htmlold(...args));
    const vdom = prevdom.length === 1 ? prevdom[0] : prevdom;
    if (isvalidvdom(vdom)) {
        return vdom;
    } else {
        console.error(vdom);
        console.error(invalid_Virtualdom);
        throw new TypeError();
    }
}
//# sourceMappingURL=html.js.map
