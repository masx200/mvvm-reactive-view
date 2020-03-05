import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import ReactiveState, { isReactiveState } from "../Reactivity/reactivestate.js";
import watch from "../Reactivity/watch";
import { isconnected } from "../UtilTools/isconnected";
import { get, has, set } from "../UtilTools/reflect";
import { isfunction } from "../UtilTools/util";
import Virtualdom from "../CreateElement/VirtualElement";
import directives from "../Directives/directives";
import { onevent } from "./handle-onevent";
import { bindstatesymbol } from "./render-vdom-to-real";
import {
    addmountedlistner,
    addunmountedlistner,
    addupdatedlistner
} from "src/others/addlistener-mount-unmount-updated.js";

export default handleprops;
function handleprops(
    element: HTMLElement | Element | SVGSVGElement | SVGElement,
    vdom: Virtualdom<any>
) {
    /* if (!vdom.element) {
    vdom.element = element;
  }
 */
    vdom.element.push(element);
    /*  if (vdom.element.length > 1) {
    console.log(vdom);
  } */
    ((element, vdom) => {
        Object.entries(vdom.directives).forEach(([name, value]) => {
            const direfun = directives[name];
            if (isfunction(direfun)) {
                direfun(
                    value,
                    element,
                    vdom,
                    call => {
                        addmountedlistner(element, call);
                    },
                    call => {
                        addunmountedlistner(element, call);
                    },
                    call => {
                        addupdatedlistner(element, call);
                    }
                );
            } else {
                console.error(vdom.directives);
                console.error("invalid directives " + name);
                throw new Error();
            }
        });

        const attribute1: Record<string, any> = createeleattr(element);
        Object.assign(
            attribute1,

            vdom.props
        );

        Object.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
            attribute1[key] = primitivestate.valueOf();
            watch(primitivestate, () => {
                const state = primitivestate;
                if (isconnected(element)) {
                    attribute1[key] = state.valueOf();
                }
            });
            /*     primitivestate[subscribesymbol]();
        requestAnimationFrame(() => {
          primitivestate[addallistenerssymbol]();
        }); */
        });

        /*  if (!element[eventlistenerssymbol]) {
        element[eventlistenerssymbol] = [];
      }
  */
        Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
            onevent(element, event, callbacks);
        });
    })(element, vdom);
    /*  if (!element[bindstatesymbol]) {
      element[bindstatesymbol] = new Set();
    }
  */
    [...Object.values(vdom.bindattr), ...Object.values(vdom.directives)]
        .flat(1 / 0)
        .filter(e => isReactiveState(e))

        .forEach((e: ReactiveState<any>) => {
            if (!has(element, bindstatesymbol)) {
                set(element, bindstatesymbol, new Set());
            }
            (get(element, bindstatesymbol) as Set<ReactiveState<any>>).add(e);
        });
}
