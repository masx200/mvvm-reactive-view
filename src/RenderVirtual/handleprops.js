import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import { isReactiveState } from "../Reactivity/isReactiveState";
import watch from "../Reactivity/watch";
import { isconnected } from "../UtilTools/isconnected";
import { get, has, set } from "../UtilTools/reflect";
import { onevent } from "./handle-onevent";
import { bindstatesymbol } from "./render-vdom-to-real";
import { addmountedlistner } from "src/others/addmountedlistner";
import { addunmountedlistner } from "src/others/addunmountedlistner";
export function handleprops(element, vdom) {
    const attribute1 = createeleattr(element);
    Object.assign(attribute1, vdom.props);
    let cancelarr;
    addmountedlistner(element, () => {
        cancelarr = Object.entries(vdom.bindattr).map(
            ([key, primitivestate]) => {
                attribute1[key] = primitivestate.valueOf();
                return watch(primitivestate, () => {
                    const state = primitivestate;
                    if (isconnected(element)) {
                        attribute1[key] = state.valueOf();
                    }
                });
            }
        );
    });
    addunmountedlistner(element, () => {
        cancelarr &&
            cancelarr.forEach((f) => {
                f();
            });
    });
    Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
        onevent(element, event, callbacks);
    });
    [...Object.values(vdom.bindattr), ...Object.values(vdom.directives)]
        .flat(1 / 0)
        .filter((e) => isReactiveState(e))
        .forEach((e) => {
            if (!has(element, bindstatesymbol)) {
                set(element, bindstatesymbol, new Set());
            }
            get(element, bindstatesymbol).add(e);
        });
}
//# sourceMappingURL=handleprops.js.map
