import { isReactiveState } from "./reactivestate";
import { isconnected } from "./isconnected";
import { componentsymbol } from "./iscomponent";

export const bindstatesymbol = Symbol("bindstate");

export const reactivestatesymbol = Symbol("reactive");
import { watch } from "./watch";
import ReactiveState ,{isReactiveState}/* textnodesymbol */ from "./reactivestate";
export const virtualdomsymbol = Symbol("virtualdom");
import directives from "./directives";
import onevent /*  eventlistenerssymbol  */ from "./onevent";
import { createcostumelemet } from "./customelement";
import {
  mathnamespace,
  createmathelement,
  svgnamespace,
  createsvgelement,
  //   createnonescript,
  createnativeelement,
  createElementNS,
  createtextnode,
  changetext,
  createDocumentFragment
} from "./dom";
function throwinvalideletype(type) {
  console.error(type);
console.error("invalid element type!")
  throw TypeError(/*"invalid element type!"*/);
}
import mount from "./mount";
import createeleattr from "dom-element-attribute-agent-proxy";
import { isobject, isArray, isfunction, isstring, isnumber } from "./util";
import Virtualdom,{isVirtualdom} from "./virtualdom";
export default function render(
  vdom: Array<Virtualdom | string | ReactiveState | number>,
  namespace?: string
): Array<Node|Element>;
export default function render(
  vdom: string | ReactiveState | number,
  namespace?: string
): Node ;
export default function render(
  vdom: Virtualdom ,
  namespace?: string
): Element;
export default function render(
  vdom:
    | Virtualdom
    | string
    | number
    | ReactiveState
    | Array<Virtualdom | string | ReactiveState | number>,
  namespace?: string
) {
  if (isnumber(vdom)) {
    return createtextnode(vdom);
  } else if (typeof vdom === "string") {
    return createtextnode(vdom);
  } else if (isReactiveState(vdom )/*instanceof ReactiveState*/) {
    const reactive = vdom;
    const textnode = createtextnode(String(reactive));
    textnode[reactivestatesymbol] = reactive;
    /*  try {
      reactive[textnodesymbol] = textnode;
    } catch (error) {
      console.warn(error);
    } */

    watch(reactive, (state: ReactiveState) => {
      if (isconnected(element)) {
        changetext(textnode, String(state));
      }
    });
    const element = textnode;
    element[bindstatesymbol] = new Set();
    element[bindstatesymbol].add(reactive);
    return textnode;
  } else if (
isVirtualdom(vdom)
//vdom instanceof Virtualdom && "type" in vdom

) {
    const { type } = vdom;
    let element: Element | HTMLElement | SVGSVGElement | SVGElement;
    if (typeof type === "string") {
      if (type === "script") {
        /* 禁止加载脚本 */

        return createDocumentFragment();
      } else if (type === "svg") {
        /* 没想到svg的创建方式这么特别?否则显示不出svg */
        element = createsvgelement();
      } else if (type === "math") {
        /* 没想到svg的创建方式这么特别?否则显示不出svg */
        element = createmathelement();
      } else if ("" === type || type === "html") {
        //不要创建html元素
        return render(vdom.children);
        // element = createDocumentFragment();
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
        vdom.children
        // vdom.options
      );
    } else {
      throwinvalideletype(vdom);
      // throw TypeError("invalid element type!");
    }
    handleprops(element, vdom);

    /* 自定义组件不添加children,而是从构造函数传入 */
    /* web components也可以设置 childnodes,比如说slot */
    /* https://webkit.org/blog/4096/introducing-shadow-dom-api/ */
    /*  */
    /* https://developer.mozilla.org/zh-CN/docs/Web/API/Element/slot */
    if (
      type &&
      (isfunction(type) || isstring(type))
      // /
      //   /

      /* typeof type !== "function" */
    ) {
      /* 如果自己创造的组件就不加children, */
      if (!type[componentsymbol]) {
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
    }
    return element;
  } else if (isArray(vdom)) {
    return vdom.map(a => render(a)).flat();
  } else {
    throwinvalideletype(vdom);
    // throw TypeError("invalid element type!");
  }
}

function handleprops(
  element: HTMLElement | Element | SVGSVGElement | SVGElement,
  vdom: Virtualdom
) {
  ((element, vdom) => {
    Object.entries(vdom.directives).forEach(([name, value]) => {
      if (/*name in directives &&*/ typeof directives[name] === "function") {
        directives[name](element, value, vdom);
      } else {
console.error(vdom.directives)
console.error("invalid directives " + name)
        throw new Error();
      }
    });

    const attribute1 = createeleattr(element);
    Object.assign(
      attribute1,

      /* 把属性为false的先不设置 */
      vdom.props
      // Object.fromEntries(Object.entries(vdom.props).filter())
    );
    /* 添加常量的属性 */
    element[virtualdomsymbol] = vdom;
    vdom.element = element;
    /* 添加绑定属性 */

    Object.entries(vdom.bindattr).forEach(([key, primitivestate]) => {
      attribute1[key] = primitivestate.value;
      watch(primitivestate, (state: ReactiveState) => {
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
    .flat()
    .filter(
      e => isReactiveState(e)
      // e instanceof ReactiveState
    )

    .forEach(e => {
      if (!element[bindstatesymbol]) {
        element[bindstatesymbol] = new Set();
      }
      element[bindstatesymbol].add(e);
    });
}
