const waittranformcsssymbol = Symbol("waittranformcss");
export const innerwatchrecords = Symbol("innerwatchrecord");
export const innerstatesymbol = Symbol("innerstate");
import createeleattragentreadwrite from "@masx200/dom-element-attribute-agent-proxy";
import { isvalidvdom } from "src/CreateElement/isvalidvdom";
import { isclassextendsHTMLElement } from "src/CustomClass/isclassextendsHTMLElement";
import { registercssprefix } from "src/ScopedCSS/registercssprefix";
import { waitloadallstyle } from "src/ScopedCSS/waitloadallstyle";
import { cached_create_componet } from "../cached-map";
// import { Class } from "./rendervdomtoreal";
import Virtualdom, { Vdomchildren } from "../CreateElement/VirtualElement";
import { Custom } from "../CustomClass/customclass";
import {
  closectx,
  getMounted,
  getstates,
  getUnMounted,
  getwatchrecords,
  invalid_Function,
  openctx
} from "../mounted-unmounted/Component-context";
// import { isvalidvdom } from "../CreateElement/html";
// import { Promise } from "q";
// import { inflate } from "zlib";
// import { componentsymbol } from "./iscomponent";
// import { insertfirst } from "./dom";
import mount from "../MountElement/mount-real-element";
import {
  /* createApp, */ invalid_Virtualdom
} from "../MountElement/MountElement";
import ReactiveState, {
  dispatchsymbol /* , { dispatchsymbol } */
} from "../Reactivity/ReactiveState";
import readonlyproxy from "../Reactivity/readonly-proxy";
import render from "../RenderVirtual/render-vdom-to-real";
import {
  /* parsecsstext,
                        prefixcssrules,
                        cssrulestocsstext, */
  //   savestyleblob,
  componentsstylesheet
  //   createlinkstylesheet,
  //   transformcsstext,
  //   registercssprefix
  /*  loadlinkstyle,
                        createlinkstylesheet */
  //   savestyleblob
  //   waitloadallstyle
} from "../ScopedCSS/parsecss-transformcss";
import { seteletext } from "../UtilTools/dom";
import { apply, defineProperty, get, set } from "../UtilTools/reflect";
import { setimmediate } from "../UtilTools/setimmediate";
import { toArray } from "../UtilTools/toArray";
import { isfunction, isobject, isstring } from "../UtilTools/util";
import {
  AttrChange,
  attributeChangedCallback,
  connectedCallback,
  disconnectedCallback,
  firstinstalledcallback
} from "./attr-change";
import createcomponent from "./createComponent";
import { componentsymbol } from "./iscomponent";
import { readysymbol } from "./readysymbol";
export const attributessymbol = Symbol("attributes");
const elementsymbol = Symbol("innerelement");
const inner_vdom_symbol = Symbol("innervdom");
const mountedsymbol = Symbol("mounted");
const unmountedsymbol = Symbol("unmounted");
export interface Htmlelementconstructor {
  new (): HTMLElement;
  prototype: HTMLElement;
  defaultProps?: Record<string, any>;
  css?: string;
}
function createComponent(custfun: Custom): Htmlelementconstructor {
  if (isfunction(custfun)) {
    const cached_class = cached_create_componet.get(custfun);
    if (cached_class) {
      return cached_class;
    }

    const defaultProps = get(custfun, "defaultProps"); //custfun["defaultProps"];
    const css = get(custfun, "css");
    class Component extends AttrChange {
      [innerwatchrecords]: [ReactiveState<any>, Function][];
      [attributessymbol]: Record<string, ReactiveState<any>> = {};
      // new (propsjson?: object | undefined, children?: any[] | undefined): HTMLElement

      //   constructor(...args: any[]);

      [waittranformcsssymbol]: undefined | (() => Promise<void>);
      constructor(
        propsjson: Record<string, any> = {},
        children: Vdomchildren = [] /* , options?: any */ //   : HTMLElement;
      ) {
        super();
        // this[attributessymbol] = {};
        const css = get(this.constructor, "css");

        if (css) {
          const prefix = this.tagName.toLowerCase();
          if (
            !get(componentsstylesheet, prefix)
            /*  componentsstylesheet[prefix] */
          ) {
            set(componentsstylesheet, prefix, new Set());
            /* 改成异步解析css转换 */
            // console.trace();
            this[waittranformcsssymbol] = () => {
              return setimmediate(() => {
                registercssprefix(css, prefix);
              });
            };

            /* 把css文本先解析成cssom ,然后添加前缀,然后转成字符串,生成blob,再生成link-stylesheet,添加*/
            /* const cssomold = parsecsstext(css);
                const cssomnew = prefixcssrules(cssomold, prefix);
                //   console.log([css, prefix, cssomold, cssomnew]);
                const cssnewtext = cssrulestocsstext(cssomnew); */
            // const cssnewtext = transformcsstext(css, prefix);
            // savestyleblob(prefix, cssnewtext);
            // console.log(cssnewtext, componentsstylesheet);
          }
        }
        // const defaultProps = get(this.constructor, "defaultProps");
        // this.constructor["defaultProps"];
        const attrs: Record<string, any> = createeleattragentreadwrite(this);
        //   const props = {};
        /*    if (isobject(defaultProps)) {
          Object.assign(attrs, defaultProps);
          // Object.assign(props, this.constructor["defaultProps"]);
        } */
        if (isobject(propsjson)) {
          Object.assign(attrs, propsjson);
          // Object.assign(props, propsjson);
        }
        // console.log({ ...attrs });
        //   this[attributessymbol] = createeleattragentreadwrite(this);
        // const props = createeleattragentreadwrite(this);/
        const props = attrs;
        openctx();

        const thisattributess = Object.fromEntries(
          Object.entries(props).map(([key]) => [
            key,
            (() => {
              /* 使用getter来保证每次访问到最新的attribute */
              const attributes = createeleattragentreadwrite(this) as Record<
                string,
                any
              >;
              const state = new ReactiveState();
              defineProperty(state, "value", {
                get() {
                  return get(attributes, key);
                },
                configurable: true
              });
              //   usestste(state);
              return state;
            })()
          ])
        );
        this[attributessymbol] = thisattributess;
        // console.log({ props, thisattributess });
        // debugger;
        /* 把attributes的reactivestates也放进innerstates中 */
        const readonlyprop = readonlyproxy(
          Object.fromEntries(
            Object.entries(thisattributess).map(([key, value]) => [
              key,
              readonlyproxy(value)
            ])
          )
        );

        let possiblyvirtualdom:
          | string
          | Virtualdom<any>
          | ReactiveState<any>
          | (string | Virtualdom<any> | ReactiveState<any>)[]
          | any;
        try {
          possiblyvirtualdom = apply(custfun, undefined, [
            readonlyprop,
            children.flat(1 / 0)
          ]);
          /* custfun.call(
            undefined,
            //让组件里面无法修改props的reactivestate的value
            // readonlyproxy(thisattributess),
            readonlyprop,
            children */
          // );
        } catch (error) {
          closectx();
          console.error("error in component");
          throw error;
        }
        /* 
        if (isArray(possiblyvirtualdom)) {
          possiblyvirtualdom = possiblyvirtualdom
            .flat(Infinity)
            .filter(Boolean);
        } */
        possiblyvirtualdom = toArray(possiblyvirtualdom);
        if (isvalidvdom(possiblyvirtualdom)) {
          const vdomarray /* isArray(possiblyvirtualdom)
                ? possiblyvirtualdom
                : [possiblyvirtualdom]; */ = toArray(
            possiblyvirtualdom
          );
          //
          this[inner_vdom_symbol] = vdomarray.flat(Infinity).filter(Boolean);
          this[mountedsymbol] = getMounted();
          this[unmountedsymbol] = getUnMounted();
          this[innerstatesymbol] = getstates();
          this[innerwatchrecords] = getwatchrecords();
          closectx();
        } else {
          closectx();
          console.error(possiblyvirtualdom);
          console.error(invalid_Virtualdom);
          throw TypeError();
        }

        //   this[mountedsymbol] = getMounted();
        //   this[unmountedsymbol] = getUnMounted();
      }
      //   prototype!: HTMLElement;
      //   defaultProps?: { [key: string]: any } | undefined;
      //  css?: string | undefined;
      [innerstatesymbol]: Array<ReactiveState<any>>;
      static [componentsymbol] = componentsymbol;
      static css = isstring(css) && css ? css : undefined;
      [readysymbol] = false;
      [mountedsymbol]: Array<Function>;
      [unmountedsymbol]: Array<Function>;
      static defaultProps = isobject(defaultProps)
        ? JSON.parse(JSON.stringify(defaultProps))
        : undefined;

      [elementsymbol]: Array<Node>;
      [inner_vdom_symbol]: Array<
        Virtualdom<any> | ReactiveState<any> | string | number
      >;
      [firstinstalledcallback]() {
        const thencallbackfirst = () => {
          /* 异步解析转换css */
          seteletext(this, "");
          /* 挂载link style sheet到head上 */
          return waitloadallstyle(prefix, document.head);
        };
        const thencallbacksecond = () => {
          //   console.log("style load all");
          //   console.log("mount1");
          mount(this[elementsymbol], this, false);
          this[waittranformcsssymbol] = undefined;
        };
        if (!this[elementsymbol]) {
          this[elementsymbol] = render(this[inner_vdom_symbol]).flat(Infinity);
        }

        const css = get(this.constructor, "css");
        const prefix = this.tagName.toLowerCase();
        if (css /*  && componentsstylesheet[prefix] */) {
          const waitcallback = this[waittranformcsssymbol];
          if (waitcallback) {
            waitcallback()
              .then(thencallbackfirst)
              .then(thencallbacksecond);
          } else {
            Promise.resolve(thencallbackfirst).then(thencallbacksecond);
          }

          /* 先清空当前组件 的children */

          /* 应该要等待css加载完成之后再渲染出来,否则会有页面跳动 */
          /* 是css里面的@import导致的 */
          /* 挂载样式到组件最前面 */
          //   console.log(componentsstylesheet[prefix]);
          // if (componentsstylesheet[prefix]) {
          /* const stylelinkelement = createlinkstylesheet(
              componentsstylesheet[prefix]
            ); */
          /*   stylelinkelement.onload = () => {
              mount(this[elementsymbol], this, false);
            };
            stylelinkelement.onerror = () => {
              mount(this[elementsymbol], this, false);
            }; */
          // insertfirst(this, stylelinkelement);
          // }
          /*  Promise.all(
              [...componentsstylesheet[prefix]].map(styleurl =>
                loadlinkstyle(createlinkstylesheet(styleurl), this)
              )
            )
*/
        } else {
          // console.log("mount2");
          mount(this[elementsymbol], this);
        }
      }
      connectedCallback() {
        setimmediate(() => {
          connectedCallback(this);
          // if (!this[elementsymbol]) {
          //   this[elementsymbol] = render(this[vdomsymbol]).flat(Infinity);
          // }
          //    /*  if (!this[readysymbol]) {
          //       this[readysymbol] = true;
          //       /* 这段代码只在初始化时执行一次 */
          //       //   mount(this[elementsymbol], this, false);
          //     } */
          //把mounted callback 异步执行
          this[mountedsymbol].forEach(f => {
            setimmediate(f);
          });
        });

        // onmounted(this);
        // super.connectedCallback();
      }
      disconnectedCallback() {
        setimmediate(() => {
          disconnectedCallback(this);
          this[unmountedsymbol].forEach(f => {
            setimmediate(f);
          });
        });

        // onunmounted(this);
        // super.disconnectedCallback();
      }
      [attributeChangedCallback](
        name: string /* , oldValue: any, newValue: any */
      ) {
        // console.log(this[attributessymbol]);
        // if (!this[attributessymbol]) {
        //   this[attributessymbol] = {};
        // }
        if (this[readysymbol]) {
          {
            const propreactivestate = this[attributessymbol][name];
            /*   const attributes = createeleattragentreadwrite(this) as Record<
              string,
              any
            >; */
            if (propreactivestate) {
              /* 使用getter来保证每次访问到最新的attribute */
              propreactivestate[dispatchsymbol]();
              //   propreactivestate["value"] = attributes[name];

              /* 当属性改变时要跟ReactiveState同步状态 */
              /*   set(
            get(this, attributessymbol)[name],
            "value,",
            (createeleattragentreadwrite(this) as { [key: string]: any })[
              name
            ] as any */
              //   );
              /*   this[attributessymbol][name].value = createeleattragentreadwrite(
            this
          )[name]; */
              //   this[attributessymbol][name][dispatchsymbol]();
            }
          }
        }
      }
    }
    cached_create_componet.set(custfun, Component);
    return Component;
  } else {
    console.error(custfun);
    console.error(invalid_Function);
    throw TypeError();
  }
}
export { createcomponent as createComponent };
export default (custfun: Custom | Htmlelementconstructor) =>
  autocreateclass(custfun);
export function autocreateclass(
  custfun: Custom | Htmlelementconstructor
): Htmlelementconstructor {
  if (isclassextendsHTMLElement(custfun)) {
    return custfun;
  } else if (isfunction(custfun)) {
    return createComponent(custfun);
  } else {
    throw TypeError();
  }
}
