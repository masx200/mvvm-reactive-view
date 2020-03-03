import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import ReactiveState, { isReactiveState } from "../Reactivity/reactivestate.js";
import watch from "../Reactivity/watch";
import { isconnected } from "../UtilTools/isconnected";
import { get, has, set } from "../UtilTools/reflect";
import { isfunction } from "../UtilTools/util";
import Virtualdom from "../CreateElement/VirtualElement";
import directives from "../Directives/directives";
import { onevent } from "./handle-onevent";
import { bindstatesymbol /* virtualdomsymbol */ } from "./render-vdom-to-real";

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
            if (
                isfunction(direfun) /* typeof directives[name] === "function" */
                /*name in directives &&*/
            ) {
                direfun(element, vdom, value);
            } else {
                console.error(vdom.directives);
                console.error("invalid directives " + name);
                throw new Error();
            }
        });

        const attribute1: Record<string, any> = createeleattr(element);
        Object.assign(
            attribute1,

            /* 把属性为false的先不设置 */
            vdom.props
        );
        /* 添加常量的属性 */

        /* 为了垃圾回收,所以不要给dom元素添加没必要的属性 */

        /* 添加绑定属性 */

        Object.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
            attribute1[key] = primitivestate.valueOf();
            watch(primitivestate, (/* state: ReactiveState<any> */) => {
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

        /* 添加事件绑定和指令执行 */

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
