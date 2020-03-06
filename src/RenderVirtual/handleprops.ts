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
export function handleprops(element: HTMLElement | Element | SVGSVGElement | SVGElement, vdom: Virtualdom<any>) {
    /* if (!vdom.element) {
    vdom.element = element;
  }
 */
    vdom.element.push(element);
    /*  if (vdom.element.length > 1) {
    console.log(vdom);
  } */
    // ((element, vdom) => {
    const attribute1: Record<string, any> = createeleattr(element);
    Object.assign(attribute1, vdom.props);
    addmountedlistner(element, () => {
        const cacelarr = Object.entries(vdom.bindattr).map(([key, primitivestate]) => {
            attribute1[key] = primitivestate.valueOf();
            return watch(primitivestate, () => {
                const state = primitivestate;
                if (isconnected(element)) {
                    attribute1[key] = state.valueOf();
                }
            });
        });
        addunmountedlistner(element, () => {
            cacelarr.forEach((f) => {
                f();
            });
        });
    });
    Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
        onevent(element, event, callbacks);
    });
    //  })(element, vdom);
    /*  if (!element[bindstatesymbol]) {
      element[bindstatesymbol] = new Set();
    }
  */
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
