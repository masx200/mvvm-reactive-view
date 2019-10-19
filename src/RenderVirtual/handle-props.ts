import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import ReactiveState, { isReactiveState } from "src/Reactivity/ReactiveState";
import watch from "src/Reactivity/watch";
import { isconnected } from "src/UtilTools/isconnected";
import { get, has, set } from "src/UtilTools/reflect";
import { isfunction } from "src/UtilTools/util";
import Virtualdom from "src/CreateElement/VirtualElement";
import directives from "../Directives/directives";
import { onevent } from "./handle-onevent";
import { bindstatesymbol, virtualdomsymbol } from "./render-vdom-to-real";

export default handleprops;
function handleprops(
  element: HTMLElement | Element | SVGSVGElement | SVGElement,
  vdom: Virtualdom<any>
) {
  ((element, vdom) => {
    Object.entries(vdom.directives).forEach(([name, value]) => {
      if (
        isfunction(
          directives[name]
        ) /* typeof directives[name] === "function" */
        /*name in directives &&*/
      ) {
        directives[name](value, element, vdom);
      } else {
        console.error(vdom.directives);
        console.error("invalid directives " + name);
        throw new Error();
      }
    });

    const attribute1: { [key: string]: any } = createeleattr(element);
    Object.assign(
      attribute1,

      /* 把属性为false的先不设置 */
      vdom.props
      // Object.fromEntries(Object.entries(vdom.props).filter())
    );
    /* 添加常量的属性 */
    set(element, virtualdomsymbol, vdom);
    // element[virtualdomsymbol] = vdom;
    vdom.element = element;
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
    .filter(
      e => isReactiveState(e)
      // e instanceof ReactiveState
    )

    .forEach((e: ReactiveState<any>) => {
      if (!has(element, bindstatesymbol)) {
        set(element, bindstatesymbol, new Set());
        // element[bindstatesymbol] = new Set();
      }
      (get(element, bindstatesymbol) as Set<ReactiveState<any>>).add(e);
      //   element[bindstatesymbol].add(e);
    });
}
