export const bindstatesymbol = Symbol("bindstate");

export const reactivestatesymbol = Symbol("reactive");
import { watch } from "./watch";
import ReactiveState, { textnodesymbol } from "./primitivestate";
export const virtualdomsymbol = Symbol("virtualdom");
import directives from "./directives";
import onevent, { eventlistenerssymbol } from "./onevent";
import { createcostumelemet } from "./customelement";
import {
  mathnamespace,
  createmathelement,
  svgnamespace,
  createsvgelement,
  createnonescript,
  createnativeelement,
  createElementNS,
  createtextnode,
  changetext
} from "./dom";
function throwinvalideletype(type) {
  console.error(type);
  throw TypeError("invalid element type!");
}
import mount from "./mount";
import createeleattr from "dom-element-attribute-agent-proxy";
import { isobject } from "./util";
import Virtualdom from "./virtualdom";

export default function render(
  vdom: Virtualdom | string | ReactiveState,
  namespace?: string
):
  | HTMLElement
  | Text
  | SVGSVGElement
  | DocumentFragment
  | SVGElement
  | Element {
  if (typeof vdom === "string") {
    return createtextnode(vdom);
  } else if (vdom instanceof ReactiveState) {
    const reactive = vdom;
    const textnode = createtextnode(String(reactive));
    textnode[reactivestatesymbol] = reactive;
    reactive[textnodesymbol] = textnode;
    watch(reactive, (state: { value: string }) => {
      changetext(textnode, String(state));
    });
    const element = textnode;
    element[bindstatesymbol] = new Set();
    element[bindstatesymbol].add(reactive);
    return textnode;
  } else if (vdom instanceof Virtualdom && "type" in vdom) {
    const { type } = vdom;
    let element: HTMLElement | SVGSVGElement | SVGElement | Element;
    if (typeof type === "string") {
      if (type === "script") {
        /* 禁止加载脚本 */

        return createnonescript();
      } else if (type === "svg") {
        /* 没想到svg的创建方式这么特别?否则显示不出svg */
        element = createsvgelement();
      } else if (type === "math") {
        /* 没想到svg的创建方式这么特别?否则显示不出svg */
        element = createmathelement();
      } else {
        element = namespace
          ? createElementNS(namespace, type)
          : createnativeelement(type);
      }
    } else if (typeof type == "function") {
      //添加默认props

      /*static defaultProps = {
        name: 'Omi',
        myAge: 18
  }*/
      if (isobject(type["defaultProps"])) {
        vdom.props = JSON.parse(
          JSON.stringify({ ...type["defaultProps"], ...vdom.props })
        );
      }

      const propsjson = JSON.parse(
        JSON.stringify({
          ...vdom.props,
          ...Object.fromEntries(
            Object.entries(vdom.bindattr).map(([key, value]) => {
              return [key, value.value];
            })
          )
        })
      );
      element = createcostumelemet(
        type,
        propsjson,
        vdom.children,
        vdom.options
      );
    } else {
      throwinvalideletype(vdom);
      // throw TypeError("invalid element type!");
    }
    handleprops(element, vdom);

    /* 自定义组件不添加children,而是从构造函数传入 */
    if (typeof type !== "function") {
      mount(
        vdom.children.map(e => {
          if (type === "svg") {
            /* 没想到svg的创建方式这么特别?否则显示不出svg */
            //   element.innerHTML = element.innerHTML;
            return render(e, svgnamespace);
          } else if (type === "math") {
            return render(e, mathnamespace);
          } else if (namespace) {
            return render(e, namespace);
          } else {
            return render(e);
          }
        }),

        element
      );
    }
    return element;
  } else {
    throwinvalideletype(vdom);
    // throw TypeError("invalid element type!");
  }
}

export interface Class {
  new (propsjson?: object, children?: any[], options?: any): HTMLElement;
  prototype: HTMLElement;
}
import { isReactiveState } from "./primitivestate";
function handleprops(
  element: HTMLElement | Element | SVGSVGElement | SVGElement,
  vdom: Virtualdom
) {
  ((element, vdom) => {
    Object.entries(vdom.directives).forEach(([name, value]) => {
      if (name in directives && typeof directives[name] === "function") {
        directives[name](element, value, vdom);
      } else {
        throw new Error("invalid directives " + name);
      }
    });

    const attribute1 = createeleattr(element);
    Object.assign(attribute1, vdom.props);
    /* 添加常量的属性 */
    element[virtualdomsymbol] = vdom;
    vdom.element = element;
    /* 添加绑定属性 */

    Object.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
      attribute1[key] = primitivestate.value;
      watch(primitivestate, (state: { value: any }) => {
        attribute1[key] = state.value;
      });
      /*     primitivestate[subscribesymbol]();
      requestAnimationFrame(() => {
        primitivestate[addallistenerssymbol]();
      }); */
    });

    /* 添加事件绑定和指令执行 */

    if (!element[eventlistenerssymbol]) {
      element[eventlistenerssymbol] = [];
    }

    Object.entries(vdom.onevent).forEach(([event, callbacks]) => {
      onevent(element, event, callbacks);
    });
  })(element, vdom);
  if (!element[bindstatesymbol]) {
    element[bindstatesymbol] = new Set();
  }

  [Object.values(vdom.bindattr), Object.values(vdom.directives)]
    .flat()
    .filter(
      e => isReactiveState(e)
      // e instanceof ReactiveState
    )

    .forEach(e => element[bindstatesymbol].add(e));
}
