import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
import { createcostumelemet } from "./customelement";
import directives from "./directives";
import {
  changetext,
  createDocumentFragment,
  createElementNS,
  createmathelement,
  //   createnonescript,
  createnativeelement,
  createsvgelement,
  createtextnode,
  mathnamespace,
  svgnamespace
} from "./dom";
import { iscomponent } from "./iscomponent";
import { isconnected } from "./isconnected";
import mount from "./mount";
import onevent /*  eventlistenerssymbol  */ from "./onevent";
import ReactiveState, { isReactiveState } from "./reactivestate";
import { get, has, set } from "./reflect";
import { isArray, isfunction, isnumber, isobject, isstring } from "./util";
import Virtualdom, { isVirtualdom } from "./virtualdom";
import { watch } from "./watch";

export const bindstatesymbol = Symbol("bindstate");

export const reactivestatesymbol = Symbol("reactive");
export const virtualdomsymbol = Symbol("virtualelement");
function throwinvalideletype(type?: any) {
  console.error(type);
  console.error("invalid element type!");
  throw TypeError(/*"invalid element type!"*/);
}
export default function render(
  vdom: Virtualdom<string | Function>,
  namespace?: string
): Element;
export default function render(
  vdom: Virtualdom<"script" | "" | "html">,
  namespace?: string
): Node;
export default function render(
  vdom: Array<Virtualdom<any> | string | ReactiveState<any> | number>,
  namespace?: string
): Array<Node | Element>;
export default function render(
  vdom: string | ReactiveState<any> | number,
  namespace?: string
): Node;
export default function render(
  vdom: Array<Virtualdom<any>>,
  namespace?: string
): Array<Element>;
export default function render(
  vdom: Array<string | ReactiveState<any> | number>,
  namespace?: string
): Array<Node>;
export default function render(
  vdom:
    | Virtualdom<any>
    | string
    | number
    | ReactiveState<any>
    | Array<Virtualdom<any> | string | ReactiveState<any> | number>,
  namespace?: string
): Array<Node | Element> | Element | Node {
  if (isArray(vdom)) {
    return (vdom as (string | number | ReactiveState<any> | Virtualdom<any>)[])
      .map(a => render(a as any))
      .flat(1 / 0);
  }
  if (isnumber(vdom) || isstring(vdom)) {
    const textnode = createtextnode(vdom);
    set(textnode, virtualdomsymbol, vdom);
    // textnode[virtualdomsymbol] = vdom;
    return textnode;

    // } else if (typeof vdom === "string") {
    // return createtextnode(vdom);
  } else if (isReactiveState(vdom) /*instanceof ReactiveState*/) {
    const reactive = vdom;
    const textnode = createtextnode(String(reactive));
    set(textnode, virtualdomsymbol, vdom);
    // textnode[virtualdomsymbol] = reactive;

    //textnode[reactivestatesymbol] = reactive;
    /*  try {
      reactive[textnodesymbol] = textnode;
    } catch (error) {
      console.warn(error);
    } */

    watch(reactive, (/* state: ReactiveState<any> */) => {
      const state = reactive;
      if (isconnected(element)) {
        changetext(textnode, String(state));
      }
    });
    const element = textnode;
    set(element, bindstatesymbol, new Set());
    // element[bindstatesymbol] = new Set();
    (get(element, bindstatesymbol) as Set<ReactiveState<any>>).add(reactive);
    // element[bindstatesymbol].add(reactive);
    return textnode;
  } else if (
    isVirtualdom(vdom)
    //vdom instanceof Virtualdom && "type" in vdom
  ) {
    const { type } = vdom;
    let element:
      | Element
      | HTMLElement
      | SVGSVGElement
      | SVGElement
      | undefined = undefined;
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
        const fragmentnode = createDocumentFragment();

        mount(render(vdom.children), fragmentnode);

        return fragmentnode;
        //不要创建html元素
        // return render(vdom.children);
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
    /*  if (element) {
      const attribute1: { [key: string]: any } = createeleattr(element);
      Object.assign(
        attribute1,

        /* 把属性为false的先不设置 */
    //     vdom.props
    //     // Object.fromEntries(Object.entries(vdom.props).filter())
    //   );
    // } */
    // apply(handleprops)

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
      if (
        !iscomponent(type)
        // componentsymbol !== type[componentsymbol]
      ) {
        if (element) {
          mount(
            vdom.children.map(e => {
              if (type === "svg" && isVirtualdom(e)) {
                /* 没想到svg的创建方式这么特别?否则显示不出svg */
                //   element.innerHTML = element.innerHTML;
                return render(e, svgnamespace);
              } else if (type === "math" && isVirtualdom(e)) {
                return render(e, mathnamespace);
              } else if (namespace && isVirtualdom(e)) {
                return render(e, namespace);
              } else {
                return render(e as any) as any;
              }
            }),

            element
          );
          //   return element;
        }
      }
    }
    /* 对于select元素,设置value属性时,如果没有 找到对应的option元素,则设置失败,
    
    改成先加children,后设attributes,
    */
    if (element) {
      handleprops(element, vdom);
    }

    return element as Node | Element;
  } else {
    throwinvalideletype(vdom);
    // throw TypeError("invalid element type!");
  }
  //   throw Error();
  //   throwinvalideletype();

  /* console.error(vdom);
  throw new Error(); */
  //   return;
  throw new Error();
}

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
        directives[name](element, value, vdom);
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
