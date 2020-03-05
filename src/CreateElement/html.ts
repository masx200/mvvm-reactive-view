import htm from "htm";

import { invalid_Virtualdom } from "../MountElement/MountElement";
import { apply } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import Virtualdom, { Vdomchildren } from "./VirtualElement";
import h from "./create-element";
import { isvalidvdom } from "./isvalidvdom";
import ReactiveState from "src/Reactivity/reactivestate.js";

function htmlold(...inargs: any[]): Virtualdom<any> | Vdomchildren {
    return apply(htm, h, inargs);
}

export { html };
export default function html(
    ...args: any[]
): Virtualdom<any> | Vdomchildren | string | number | ReactiveState<any> {
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
