import {requestAnimationFrame}from "./directives.ts"
export const reactivestatesymbol = Symbol("reactivestate");
import { watch } from "./watch";
import ReactiveState, {
  changetextnodesymbol,
  dispatchsymbol,
  textnodesymbol
} from "./primitivestate";
import Reflect from "./reflect";
export const virtualdomsymbol = Symbol("virtualdom");
import { eventlistenerssymbol } from "./onevent";
import { subscribesymbol, addallistenerssymbol } from "./primitivestate";
import directives from "./directives";
import onevent from "./onevent";
import { createcostumelemet } from "./customelement";
import {
  svgnamespace,
  createsvgelement,
  createnonescript,
  createnativeelement,
  createElementNS,
  createtextnode,
  changetext
} from "./dom";
function throwinvalideletype() {
  throw TypeError("invalid element type!");
}
import mount from "./mount";
import createeleattr from "dom-element-attribute-agent-proxy";
// import { isstring, isarray, isobject, isfunction } from "./util";
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
      } else {
        element = namespace
          ? createElementNS(namespace, type)
          : createnativeelement(type);
      }
    } else if (typeof type == "function") {
      element = createcostumelemet(type, vdom.children);
    } else {
      throwinvalideletype();
      // throw TypeError("invalid element type!");
    }
handleprops(element,vdom);

    /* 自定义组件不添加children,而是从构造函数传入 */
    if (typeof type !== "function") {
      mount(
        vdom.children.map(e => {
          if (type === "svg") {
            /* 没想到svg的创建方式这么特别?否则显示不出svg */
            //   element.innerHTML = element.innerHTML;
            return render(e, svgnamespace);
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
    throwinvalideletype();
    // throw TypeError("invalid element type!");
  }
}

export interface Class {
  new (children?: any[]): HTMLElement;
}




function handleprops(element,vdom){
((element,vdom)=>{



Object.entries(vdom.directives).forEach(([name, value]) => {
      if (name in directives && typeof directives[name] === "function") {
        directives[name](element, value, vdom);
      } else {
        throw new Error("invalid directives " + name);
      }
    });
   
 var attribute1 = createeleattr(element);
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

})(element,vdom);

}
