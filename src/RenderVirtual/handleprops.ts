import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import ReactiveState, { isReactiveState } from "../Reactivity/reactivestate.js";
import watch from "../Reactivity/watch";
import { isconnected } from "../UtilTools/isconnected";
import { get, has, set } from "../UtilTools/reflect";
import Virtualdom from "../CreateElement/VirtualElement";
import { onevent } from "./handle-onevent";
import { bindstatesymbol } from "./render-vdom-to-real";
import { addmountedlistner } from "src/others/addmountedlistner";
import { addunmountedlistner } from "src/others/addunmountedlistner";
export function handleprops(
    element: HTMLElement | Element | SVGSVGElement | SVGElement,
    vdom: Virtualdom<any>
) {
    const attribute1: Record<string, any> = createeleattr(element);
    Object.assign(attribute1, vdom.props);
    let cancelarr: undefined | Array<() => void>;
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
        .forEach((e: ReactiveState<any>) => {
            if (!has(element, bindstatesymbol)) {
                set(element, bindstatesymbol, new Set());
            }
            (get(element, bindstatesymbol) as Set<ReactiveState<any>>).add(e);
        });
}
